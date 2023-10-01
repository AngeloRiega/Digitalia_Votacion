using System;
using System.Collections.Generic;

namespace webapi.Models;

public partial class OpcionRespuesta
{
    public int Id { get; set; }

    public string Texto { get; set; } = null!;

    public int Activo { get; set; }

    public DateTime? FechaModificacion { get; set; }

    public virtual ICollection<Voto> Votos { get; set; } = new List<Voto>();
}
