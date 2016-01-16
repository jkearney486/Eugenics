using Microsoft.Owin;
using Owin;
using System.Web.Http;
using LightInject;
using Newtonsoft.Json.Serialization;
using Eugenics.Dao.Interface;
using Eugenics.Dao.Dapper;
using Eugenics.Dao;

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

            // Convention-based routing.
            configuration.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            // camelCase Json.NET
            configuration.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();

            // down with XML
            configuration.Formatters.Remove(configuration.Formatters.XmlFormatter);

            // Dependency Injection
            var container = new ServiceContainer();

            container.RegisterApiControllers();
            container.Register<IConnectionStringProvider, WebConfigConnectionStringProvider>(new PerContainerLifetime());
            container.Register<IAvatarDao, DapperAvatarDao>(new PerContainerLifetime());
            container.Register<ICharacterDao, DapperCharacterDao>(new PerContainerLifetime());
            container.Register<IClassDao, DapperClassDao>(new PerContainerLifetime());
            container.Register<IClassPromotionDao, DapperClassPromotionDao>(new PerContainerLifetime());
            container.Register<IClassSetDao, DapperClassSetDao>(new PerContainerLifetime());
            container.Register<IClassSkillDao, DapperClassSkillDao>(new PerContainerLifetime());
            container.Register<ICharacterSkillDao, DapperCharacterSkillDao>(new PerContainerLifetime());
            container.Register<IInheritanceClassSetDao, DapperInheritanceClassSetDao>(new PerContainerLifetime());
            container.Register<ISkillDao, DapperSkillDao>(new PerContainerLifetime());
            container.Register<ISupportDao, DapperSupportDao>(new PerContainerLifetime());

            container.EnableWebApi(configuration);
            
            // Add Web Api middleware
            app.UseWebApi(configuration);
        }
    }
}
