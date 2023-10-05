using System;
using System.Collections.Generic;

namespace webapi.Models;

public partial class OpcionRespuesta
{
    public int Id { get; set; }

    public int EncuestaId { get; set; }

    public string Texto { get; set; } = null!;

    public int Activo { get; set; }

    public DateTime? FechaModificacion { get; set; }
}
