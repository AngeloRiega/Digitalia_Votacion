using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace webapi.Models;

public partial class Voto
{
    public int Id { get; set; }

    public int EncuestaId { get; set; }

    public int OpcionRespuestaId { get; set; }

    // Utiliza DatabaseGeneratedOption.Computed para la columna fechavoto
    [DatabaseGenerated(DatabaseGeneratedOption.Computed)]
    public DateTime FechaVoto { get; set; }

    //public virtual Encuesta Encuesta { get; set; } = null!;

    //public virtual OpcionRespuesta OpcionRespuesta { get; set; } = null!;
}
