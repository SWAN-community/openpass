using Microsoft.Extensions.Configuration;
using OpenPass.IdController.Models.Configuration;

namespace OpenPass.IdController.Helpers.Configuration
{
    public class ConfigurationManager : IConfigurationManager
    {
        private readonly IConfiguration _configuration;

        public ConfigurationManager(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public SmtpSettings SmtpSettings => GetSection<SmtpSettings>();
        public Uid2Configuration Uid2Configuration => GetSection<Uid2Configuration>();

        private T GetSection<T>()
            where T : class
        {
            return _configuration.GetSection(typeof(T).Name).Get<T>();
        }
    }
}
