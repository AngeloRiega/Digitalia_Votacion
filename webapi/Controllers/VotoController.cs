using System;
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
    public class VotoController : ControllerBase
    {
        private readonly DigitaliaVotacionContext _context;

        public VotoController(DigitaliaVotacionContext context)
        {
            _context = context;
        }

        // GET: api/Voto/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Voto>> GetVoto(int id)
        {
          if (_context.Votos == null)
          {
              return NotFound();
          }
            var voto = await _context.Votos.FindAsync(id);

            if (voto == null)
            {
                return NotFound();
            }

            return voto;
        }

        // POST: api/Voto (Registro un voto en una encuesta)
        [HttpPost]
        public async Task<ActionResult<Voto>> PostVoto(Voto voto)
        {
            if (_context.Votos == null)
            {
                return Problem("Entity set 'DigitaliaVotacionContext.Votos' is null.");
            }

            // Crea una instancia de Voto con los valores proporcionados
            var nuevoVoto = new Voto
            {
                EncuestaId = voto.EncuestaId,
                OpcionRespuestaId = voto.OpcionRespuestaId
            };

            _context.Votos.Add(nuevoVoto);
            await _context.SaveChangesAsync();

            //Seteo fecha de voto, esto deberia traerse de la db, no van a coincidir las horas
            voto.FechaVoto = DateTime.Now;

            return CreatedAtAction("GetVoto", new { id = voto.Id }, voto);
        }
    }
}
