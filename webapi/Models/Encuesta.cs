using System;
using System.Collections.Generic;

namespace webapi.Models;

public partial class Encuesta
{
    public int Id { get; set; }

    public string Titulo { get; set; } = null!;

    public DateTime? FechaCreacion { get; set; }

    public DateTime? FechaModificacion { get; set; }

    public virtual ICollection<Voto> Votos { get; set; } = new List<Voto>();

    public virtual ICollection<OpcionRespuesta> OpcionesRespuesta { get; set; } = new List<OpcionRespuesta>();
}
