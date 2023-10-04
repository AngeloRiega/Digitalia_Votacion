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

        // GET: api/Voto
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Voto>>> GetVotos()
        {
          if (_context.Votos == null)
          {
              return NotFound();
          }
            return await _context.Votos.ToListAsync();
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

        // PUT: api/Voto/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutVoto(int id, Voto voto)
        {
            if (id != voto.Id)
            {
                return BadRequest();
            }

            _context.Entry(voto).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VotoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Voto
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

        // DELETE: api/Voto/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVoto(int id)
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

            _context.Votos.Remove(voto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VotoExists(int id)
        {
            return (_context.Votos?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
