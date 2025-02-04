using System;
using System.IO;
using System.Reflection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using Swan.Client;
using Swan.Client.Model.Configuration;
using Owid.Client.Model.Configuration;

namespace OpenPass.IdController
{
    internal class Startup
    {
        private readonly IWebHostEnvironment _env;

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            _env = env;
        }

        /// <summary>
        /// Holds key/value configuration data, read from, in order, every step overriding the previous one:
        ///  - the appsettings.json file
        ///  - the appsettings.[Environment].json file based on current environment (Development, Prod)
        ///  - the command line arguments
        /// </summary>
        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add Configuration Manager
            services.AddConfigurationManager();

            // Registers response compression services
            services.AddResponseCompression();

            // Add in-memory cache to store OTPs temporarily
            services.AddMemoryCache();

            // [Custom] Add view render helper
            services.AddViewRenderHelper();

            // Add metric helper
            services.AddMetricHelper();

            // [Custom] Add email helper
            services.AddEmailHelper();

            // [Custom] Add code generator helper (for generating and validating OTP codes)
            services.AddCodeGeneratorHelper();

            // [Custom] Add cookie helper
            services.AddCookieHelper();

            // [Custom] Add UID2 adapter
            services.AddUid2Adapter();

            services.AddIdentifierHelper();

            // Get the SWAN connection configuration and OWID configuration.
            var owidConfig = Configuration.GetSection(
                    "OwidConfiguration").Get<OwidConfiguration>();
            services.AddSingleton(owidConfig);
            services.AddSingleton<ISwanConnection>(
                new SwanConnection(Configuration.GetSection(
                    "SwanConfiguration").Get<SwanConfiguration>(), owidConfig));            

            // Configure MVC, controllers and metrics.
            services.AddMvc()
                .AddApplicationPart(Assembly.Load(new AssemblyName(
                    "Swan.Client.Controllers")))
                .AddApplicationPart(Assembly.Load(new AssemblyName(
                    "Owid.Client.Controllers")))
                .SetCompatibilityVersion(CompatibilityVersion.Latest);
            services.AddControllers();
            services.AddMetrics();

            // Register the Swagger generator, defining 1 or more Swagger documents
            services.AddSwaggerGen(x =>
            {
                x.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = "Open Pass Id Controller API",
                    Description = "OpenPass is a product that provides a clear value proposition for end users of personalized advertising."
                });

                // Set the comments path for the Swagger JSON and UI.
                var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
                var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
                x.IncludeXmlComments(xmlPath);
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory)
        {
            // Enables response compression when applicable
            app.UseResponseCompression();

            if (!_env.IsDevelopment())
            {
                // Enable serving static files
                var path = Path.Combine(_env.ContentRootPath, "dist");
                var provider = new PhysicalFileProvider(path);
                app.UseFileServer(new FileServerOptions { FileProvider = provider, RequestPath = "/open-pass" });
            }

            app.UseStaticFiles();

            // Enable routing and controller end points.
            app.UseRouting();
            app.UseEndpoints((config) =>
            {
                config.MapControllers();
            });

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "OpenPass API V1");
            });
        }
    }
}
