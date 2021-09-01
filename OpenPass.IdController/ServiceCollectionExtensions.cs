using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using OpenPass.IdController.Email;
using OpenPass.IdController.Helpers;
using OpenPass.IdController.Helpers.Adapters;
using OpenPass.IdController.Helpers.Configuration;

namespace OpenPass.IdController
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddConfigurationManager(this IServiceCollection services)
        {
            services.AddSingleton<IConfigurationManager, ConfigurationManager>();
            return services;
        }

        public static IServiceCollection AddViewRenderHelper(this IServiceCollection services)
        {
            services.AddSingleton<IViewRenderHelper, ViewRenderHelper>();
            return services;
        }

        public static IServiceCollection AddEmailHelper(this IServiceCollection services)
        {
            services.AddSingleton<IEmailProvider>((s) =>
            {
                // Creates a new email provider based on the MailKit open
                // source project. This is considered more robust and flexible 
                // than the SmtpClient provided by Microsoft.
                // See https://dotnetcoretutorials.com/2017/11/02/using-mailkit-send-receive-email-asp-net-core/
                var config = s.GetRequiredService<IConfigurationManager>();
                return new MailKitProvider(
                    config.SmtpSettings.Host,
                    config.SmtpSettings.Port,
                    config.SmtpSettings.UserName,
                    config.SmtpSettings.Password,
                    MailKit.Security.SecureSocketOptions.SslOnConnect,
                    s.GetRequiredService<ILoggerFactory>()
                        .CreateLogger<MailKitProvider>());
            });
            services.AddSingleton<IEmailHelper, EmailHelper>();

            return services;
        }

        public static IServiceCollection AddCodeGeneratorHelper(this IServiceCollection services)
        {
            services.AddSingleton<ICodeGeneratorHelper, CodeGeneratorHelper>();

            return services;
        }

        public static IServiceCollection AddCookieHelper(this IServiceCollection services)
        {
            services.AddSingleton<ICookieHelper, CookieHelper>();

            return services;
        }

        public static IServiceCollection AddMetricHelper(this IServiceCollection services)
        {
            services.AddSingleton<IMetricHelper, MetricHelper>();

            return services;
        }

        public static IServiceCollection AddUid2Adapter(this IServiceCollection services)
        {
            services.AddSingleton<IIdentifierAdapter, Uid2Adapter>();

            return services;
        }

        public static IServiceCollection AddIdentifierHelper(this IServiceCollection services)
        {
            services.AddSingleton<IIdentifierHelper, IdentifierHelper>();

            return services;
        }
    }
}
