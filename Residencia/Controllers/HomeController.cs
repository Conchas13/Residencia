using Microsoft.AspNetCore.Mvc;
using Residencia.Data;
using Residencia.Models;
using System.Diagnostics;
using System.Text.Json;

namespace Residencia.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult Estados()
        {
            return View();
        }

        public IActionResult Covid()
        {
            return View();
        }
        public IActionResult GetInfectados()
        {
            DL dL = new DL();
            var lista = dL.GetInfectados();
            
            return Json(lista);
            //return Json("Hola Aby Feeeaaa♥");
            
        }

        public IActionResult GetSexo()
        {
            DL dL = new DL();
            var lista = dL.GetSexo();

            return Json(lista);

        }

        public IActionResult GetEdad()
        {
            DL dL = new DL();
            var lista = dL.GetEdad();

            return Json(lista);

        }

        public IActionResult GetFallecidos()
        {
            DL dL = new DL();
            var lista = dL.GetFallecidos();

            return Json(lista);

        }

        public IActionResult GetEstados()
        {
            DL dL = new DL();
            var lista = dL.GetEstados();

            return Json(lista);

        }

        public IActionResult GetOEnfer()
        {
            DL dL = new DL();
            var lista = dL.GetOEnfer();

            return Json(lista);

        }

        public IActionResult GetEmbarazadas()
        {
            DL dL = new DL();
            var lista = dL.GetEmbarazadas();

            return Json(lista);

        }

        public IActionResult GetIntubados()
        {
            DL dL = new DL();
            var lista = dL.GetIntubados();

            return Json(lista);

        }

        public IActionResult GetInstitucion()
        {
            DL dL = new DL();
            var lista = dL.GetInstitucion();

            return Json(lista);

        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}