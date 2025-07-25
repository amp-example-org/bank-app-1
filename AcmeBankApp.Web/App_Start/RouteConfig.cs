using System.Web.Mvc;
using System.Web.Routing;

namespace AcmeBankApp.Web.App_Start
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            // Legacy route for Angular SPA
            routes.MapRoute(
                name: "AngularApp",
                url: "app/{*catchall}",
                defaults: new { controller = "App", action = "Index" },
                namespaces: new[] { "AcmeBankApp.Web.Controllers" }
            );

            // API routes for Angular to call
            routes.MapRoute(
                name: "Api",
                url: "api/{action}",
                defaults: new { controller = "Api" },
                namespaces: new[] { "AcmeBankApp.Web.Controllers" }
            );

            // Default MVC route
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional },
                namespaces: new[] { "AcmeBankApp.Web.Controllers" }
            );
        }
    }
}
