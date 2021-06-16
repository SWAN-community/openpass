using Microsoft.Extensions.Logging;
using OpenPass.IdController.Email;
using OpenPass.IdController.Helpers.Configuration;
using System;
using System.Collections.Generic;
using System.Net.Mail;
using System.Threading;
using System.Threading.Tasks;

namespace OpenPass.IdController.Helpers
{
    public interface IEmailHelper
    {
        Task SendOtpEmail(string recipient, string otp, CancellationToken stopToken);

        bool IsValidEmail(string email);
    }

    public class EmailHelper : IEmailHelper
    {
        private static readonly string _metricPrefix = "email.";

        private readonly IMetricHelper _metricsHelper;
        private readonly ILogger _logger;
        private readonly IViewRenderHelper _viewRenderHelper;
        private readonly IConfigurationManager _configurationManager;
        private readonly IEmailProvider _emailProvider;

        public EmailHelper(
            IMetricHelper metricsHelper,
            IViewRenderHelper viewRenderHelper,
            IConfigurationManager configurationManager,
            IEmailProvider emailProvider,
            ILogger<EmailHelper> logger)
        {
            _metricsHelper = metricsHelper;
            _viewRenderHelper = viewRenderHelper;
            _configurationManager = configurationManager;
            _logger = logger;
            _emailProvider = emailProvider;
        }

        public async Task SendOtpEmail(string recipient, string otp, CancellationToken stopToken)
        {
            var viewData = new Dictionary<string, object>
            {
                { "Code", otp }
            };

            var subject = "OpenPass Verification Code";
            var body = await _viewRenderHelper.RenderToStringAsync("Email/VerificationCode", null, viewData);

            await SendEmailAsync(recipient, subject, body, "otp", stopToken, isBodyHtml: true);
        }

        public bool IsValidEmail(string email)
        {
            if (string.IsNullOrEmpty(email))
                return false;

            try
            {
                var mail = new MailAddress(email);
                return mail.Address == email;
            }
            catch
            {
                return false;
            }
        }

        private async Task SendEmailAsync(
            string recipient, 
            string subject, 
            string body, 
            string token, 
            CancellationToken stopToken, 
            bool isBodyHtml = false)
        {
            var senderMailAddress =
                new MailAddress(
                    _configurationManager.SmtpSettings.Address, 
                    _configurationManager.SmtpSettings.DisplayName);
            var recipientMailAddress = new MailAddress(recipient);

            var message = new MailMessage
            {
                From = senderMailAddress,
                To = { recipientMailAddress },
                Subject = subject,
                Body = body,
                IsBodyHtml = isBodyHtml
            };

            var metric = $"{_metricPrefix}.{token}";
            var success = false;
            try
            {
                success = await _emailProvider.Send(message, stopToken);
            }
            catch (Exception ex)
            {
                _logger.LogError("Error when sending email", ex);
            }
            finally
            {
                if (success)
                {
                    _metricsHelper.SendCounterMetric($"{metric}.success");
                }
                else
                {
                    _metricsHelper.SendCounterMetric($"{metric}.error");
                }
            }
        }
    }
}
