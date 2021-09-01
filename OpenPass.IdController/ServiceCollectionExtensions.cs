using Microsoft.Extensions.DependencyInjection;
<<<<<<< HEAD
using OpenPass.IdController.DataAccess;
=======
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f
using OpenPass.IdController.Helpers;
using OpenPass.IdController.Helpers.Adapters;
using OpenPass.IdController.Helpers.Configuration;

namespace OpenPass.IdController
{
    public static class ServiceCollectionExtensions
    {
<<<<<<< HEAD
        public static IServiceCollection AddConfigurationHelper(this IServiceCollection services)
        {
            services.AddSingleton<IConfigurationHelper, ConfigurationHelper>();
            return services;
        }

=======
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f
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
<<<<<<< HEAD

        public static IServiceCollection AddUserPreferencesRepository(this IServiceCollection services)
        {
            services.AddSingleton<IUserPreferencesRepository>(p => new StaticUserPreferencesRepository());
            return services;
        }
=======
>>>>>>> 6c306a3f96610e772cab2728cdd0874f645fbd4f
    }
}
