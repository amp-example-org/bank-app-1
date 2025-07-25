using System.Web.Mvc;
using AcmeBankApp.Web.Helpers;

namespace AcmeBankApp.Web.Controllers
{
    /// <summary>
    /// Controller that hosts the Angular 7 SPA
    /// </summary>
    public class AppController : Controller
    {
        public ActionResult Index()
        {
            // Temporarily bypass authentication for testing
            /*
            // Legacy: Basic authentication check
            if (Session["UserId"] == null)
            {
                return RedirectToAction("Login", "Account");
            }
            */
            
            // Mock session data for testing
            Session["UserId"] = 1;
            Session["UserName"] = "testuser";
            Session["FullName"] = "Test User";

            // Pass user information to Angular app via ViewBag
            ViewBag.UserId = Session["UserId"];
            ViewBag.UserName = Session["UserName"];
            ViewBag.FullName = Session["FullName"];
            
            // Legacy: Pass configuration to client-side
            ViewBag.MaxTransferAmount = System.Configuration.ConfigurationManager.AppSettings["MaxTransferAmount"];
            ViewBag.SessionTimeout = System.Configuration.ConfigurationManager.AppSettings["SessionTimeoutMinutes"];
            
            // Security issue: Pass API key to client
            ViewBag.ApiKey = System.Configuration.ConfigurationManager.AppSettings["BankApiKey"];
            
            // LogHelper.LogUserActivity(Session["UserName"]?.ToString(), "AngularAppAccess", "Accessed Angular SPA");
            
            return View();
        }
    }
}
