using System;
using System.Collections.Generic;

namespace webapi.Models;

public partial class Voto
{
    public int Id { get; set; }

    public int EncuestaId { get; set; }

    public int OpcionRespuestaId { get; set; }

    public DateTime? FechaVoto { get; set; }

    public virtual Encuesta Encuesta { get; set; } = null!;

    public virtual OpcionRespuesta OpcionRespuesta { get; set; } = null!;
}
