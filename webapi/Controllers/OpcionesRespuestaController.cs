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
    public class OpcionesRespuestaController : ControllerBase
    {
        private readonly DigitaliaVotacionContext _context;

        public OpcionesRespuestaController(DigitaliaVotacionContext context)
        {
            _context = context;
        }

        // GET: api/OpcionesRespuestas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OpcionRespuesta>>> GetOpcionesRespuesta()
        {
          if (_context.OpcionesRespuesta == null)
          {
              return NotFound();
          }
            return await _context.OpcionesRespuesta.ToListAsync();
        }

        // GET: api/OpcionesRespuestas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<OpcionRespuesta>> GetOpcionesRespuesta(int id)
        {
            if (_context.OpcionesRespuesta == null)
            {
                return NotFound();
            }
            var opcionesRespuesta = await _context.OpcionesRespuesta.FindAsync(id);

            if (opcionesRespuesta == null)
            {
                return NotFound();
            }

            return opcionesRespuesta;
        }

        // GET: api/OpcionesRespuestas/5 (opcionesrespuesta activas por idencuesta)
        [HttpGet("/api/OpcionesRespuestas/Encuesta/{id}")]
        public async Task<ActionResult<IEnumerable<OpcionRespuesta>>> GetOpcionesRespuestaPorIdEncuesta(int id)
        {
            var encuesta = await _context.Encuestas
                .Include(e => e.OpcionesRespuesta)
                .FirstOrDefaultAsync(e => e.Id == id);

            if (encuesta == null)
            {
                return NotFound();
            }

            //Filtro por activas
            var opcionesActivas = encuesta.OpcionesRespuesta.Where(opcion => opcion.Activo == 1).ToList();

            return opcionesActivas;
        }

        // PUT: api/OpcionesRespuestas/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutOpcionesRespuesta(int id, OpcionRespuesta opcionesRespuesta)
        {
            if (id != opcionesRespuesta.Id)
            {
                return BadRequest();
            }

            _context.Entry(opcionesRespuesta).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OpcionesRespuestaExists(id))
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

        // POST: api/OpcionesRespuestas
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<OpcionRespuesta>> PostOpcionesRespuesta(OpcionRespuesta opcionesRespuesta)
        {
          if (_context.OpcionesRespuesta == null)
          {
              return Problem("Entity set 'DigitaliaVotacionContext.OpcionesRespuesta'  is null.");
          }
            _context.OpcionesRespuesta.Add(opcionesRespuesta);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOpcionesRespuesta", new { id = opcionesRespuesta.Id }, opcionesRespuesta);
        }

        // DELETE: api/OpcionesRespuestas/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOpcionesRespuesta(int id)
        {
            if (_context.OpcionesRespuesta == null)
            {
                return NotFound();
            }
            var opcionesRespuesta = await _context.OpcionesRespuesta.FindAsync(id);
            if (opcionesRespuesta == null)
            {
                return NotFound();
            }

            _context.OpcionesRespuesta.Remove(opcionesRespuesta);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OpcionesRespuestaExists(int id)
        {
            return (_context.OpcionesRespuesta?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
