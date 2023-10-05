using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using webapi.Models;

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EncuestasController : ControllerBase
    {
        private readonly DigitaliaVotacionContext _context;

        public EncuestasController(DigitaliaVotacionContext context)
        {
            _context = context;
        }

        // GET: api/Encuestas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Encuesta>>> GetEncuestas()
        {
            if (_context.Encuestas == null)
            {
                return NotFound();
            }
            return await _context.Encuestas.ToListAsync();
        }

        // GET: api/Encuestas/5/votos (votos por id encuesta)
        [HttpGet("{id}/votos")]
        public ActionResult<IEnumerable<VotosEncuesta>> GetVotosPorIdEncuesta(int id)
        {
            if (_context.VotosEncuesta == null)
            {
                return NotFound();
            }

            var resultados = _context.VotosEncuesta.FromSqlInterpolated($"CALL ObtenerVotosEncuesta({id})").ToList();

            if (resultados == null)
            {
                return NotFound();
            }

            return Ok(resultados);
        }

        // GET: api/Encuestas/5/opcionesrespuesta (opcionesrespuesta activas por id encuesta)
        [HttpGet("{id}/opcionesrespuesta")]
        public async Task<ActionResult<IEnumerable<OpcionRespuesta>>> GetOpcionesRespuestaPorIdEncuesta(int id)
        {
            if (_context.Encuestas == null)
            {
                return NotFound();
            }

            var encuesta = await _context.Encuestas
                .Include(e => e.OpcionesRespuesta)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (encuesta == null)
            {
                return NotFound();
            }

            //Filtro por activas
            var opcionesActivas = encuesta.OpcionesRespuesta.Where(opcion => opcion.Activo == 1).ToList();

            return Ok(opcionesActivas);
        }
    }
}
