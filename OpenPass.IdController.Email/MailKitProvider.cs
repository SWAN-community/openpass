using MailKit.Security;
using Microsoft.Extensions.Logging;
using MimeKit;
using MimeKit.Text;
using System;
using System.Linq;
using System.Net.Mail;
using System.Threading;
using System.Threading.Tasks;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;

namespace OpenPass.IdController.Email
{
    public class MailKitProvider : IEmailProvider
    {
        private readonly string _host;
        private readonly int _port;
        private readonly string _userName;
        private readonly string _password;
        private readonly SecureSocketOptions _options;
        private readonly ILogger<MailKitProvider> _logger;

        public MailKitProvider(
            string host,
            int port,
            string userName,
            string password,
            SecureSocketOptions options,
            ILogger<MailKitProvider> logger)
        {
            _host = host;
            _port = port;
            _userName = userName;
            _password = password;
            _options = options;
            _logger = logger;
        }

        public async Task<bool> Send(
            MailMessage message,
            CancellationToken stopToken)
        {
            using (var emailClient = new SmtpClient())
            {
                emailClient.Connect(_host, _port, _options, stopToken);
                try
                {
                    emailClient.Authenticate(_userName, _password, stopToken);
                    if (stopToken.IsCancellationRequested == false)
                    {
                        _logger.LogTrace($@"Sending email to '{message.To}'");
                        await emailClient.SendAsync(
                            CopyMessage(message),
                            stopToken);
                        _logger.LogTrace($@"Sent email to '{message.To}'");
                    }
                }
                catch (Exception ex)
                {
                    _logger.LogWarning(
                        $@"Exception with SMTP host '{_host}'", ex);
                }
                finally
                {
                    emailClient.Disconnect(true, stopToken);
                }
                return true;
            }
        }

        private MimeMessage CopyMessage(MailMessage source)
        {
            var copy = new MimeMessage();
            copy.To.AddRange(source.To.Select(i => 
                new MailboxAddress(i.DisplayName, i.Address)));
            copy.From.Add(new MailboxAddress(
                source.From.DisplayName, 
                source.From.Address));
            copy.Subject = source.Subject;
            copy.Body = new TextPart(TextFormat.Html)
            {
                Text = source.Body
            };
            return copy;
        }
    }
}