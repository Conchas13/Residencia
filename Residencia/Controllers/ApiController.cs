using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Threading.Tasks;

namespace Residencia.Controllers
{
    [ApiController]
    [Route("api")]
    [EnableCors("AllowAll")]

    public class ApiController : Controller
    {

        private readonly IHttpClientFactory _httpClientFactory;

        public ApiController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet("data")]
        public async Task<IActionResult> GetData()
        {
            try
            {
                // Crea un cliente HTTP
                var client = _httpClientFactory.CreateClient();

                // Realiza la solicitud al servicio externo
                var response = await client.GetAsync("https://www.inegi.org.mx/app/api/indicadores/desarrolladores/jsonxml/INDICATOR/1002000001/es/0700/true/BISE/2.0/f0e26edb-55dd-c0b3-5822-55f75d0351ff?type=json");

                // Verifica si la solicitud fue exitosa
                if (response.IsSuccessStatusCode)
                {
                    // Devuelve los datos al cliente
                    var data = await response.Content.ReadAsStringAsync();
                    return Content(data, "application/json");
                }
                else
                {
                    // Maneja errores de la solicitud al servicio externo
                    return StatusCode((int)response.StatusCode, "Error al obtener datos de la API externa");
                }
            }
            catch (Exception ex)
            {
                // Maneja otros errores
                return StatusCode(500, $"Error interno: {ex.Message}");
            }
        }


        //public IActionResult Index()
        //{
        //    return View();
        //}
    }
}
