using Microsoft.Owin;
using Owin;
using System.Web.Http;
using LightInject;
using Newtonsoft.Json.Serialization;

[assembly: OwinStartup(typeof(Eugenics.Startup))]

namespace Eugenics
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // Web Api
            var configuration = new HttpConfiguration();

            configuration.MapHttpAttributeRoutes();

            // camelCase Json.NET
            configuration.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            // Dependency Injection
            var container = new ServiceContainer();

            container.RegisterApiControllers();
            //container.Register<IUserDao, DapperUserDao>(new PerContainerLifetime());
            
            container.EnableWebApi(configuration);
            
            // Add Web Api middleware
            app.UseWebApi(configuration);
        }
    }
}
