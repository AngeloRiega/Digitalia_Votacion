using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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
}

[Table("VotosEncuesta")]
public class VotosEncuesta
{
    [Key]
    [Column("IdOpcionRespuesta")]
    public int IdOpcionRespuesta { get; set; }

    [Column("IdEncuesta")]
    public int IdEncuesta { get; set; }

    [Column("TituloEncuesta")]
    public string TituloEncuesta { get; set; } = null!;

    [Column("TituloOpcionRespuesta")]
    public string TituloOpcionRespuesta { get; set; } = null!;

    [Column("CantidadVotos")]
    public int CantidadVotos { get; set; }
}
