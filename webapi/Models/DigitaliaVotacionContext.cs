using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using webapi.Models;

namespace webapi.Models;

public partial class DigitaliaVotacionContext : DbContext
{
    public DigitaliaVotacionContext()
    {
    }

    public DigitaliaVotacionContext(DbContextOptions<DigitaliaVotacionContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Encuesta> Encuestas { get; set; }

    public virtual DbSet<OpcionRespuesta> OpcionesRespuesta { get; set; }

    public virtual DbSet<VotosEncuesta> VotosEncuesta { get; set; }

    public virtual DbSet<Voto> Votos { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        //Busco el connection string desde appsettings.json
        if (!optionsBuilder.IsConfigured)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
           .AddJsonFile("appsettings.json")
           .Build();

            var connectionString = configuration.GetConnectionString("DigitaliaVotacionCS");
            if (string.IsNullOrWhiteSpace(connectionString))
            {
                //Llenar connectionString en el appsettings.json
                throw new ArgumentNullException("mysql connectionString must not be null (Llenar connectionString en el appsettings.json)", connectionString);
            }

            optionsBuilder.UseMySQL(connectionString);
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Encuesta>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("encuestas");

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.FechaCreacion)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("datetime");
            entity.Property(e => e.FechaModificacion)
                .ValueGeneratedOnAddOrUpdate()
                .HasColumnType("datetime");
            entity.Property(e => e.Titulo).HasMaxLength(255);
        });

        modelBuilder.Entity<OpcionRespuesta>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("opcionesrespuesta");

            entity.HasIndex(e => e.EncuestaId, "EncuestaId");

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.Activo)
                .HasDefaultValueSql("'1'")
                .HasColumnType("int(11)");
            entity.Property(e => e.EncuestaId).HasColumnType("int(11)");
            entity.Property(e => e.FechaModificacion)
                .ValueGeneratedOnAddOrUpdate()
                .HasColumnType("datetime");
            entity.Property(e => e.Texto).HasMaxLength(255);
        });

        modelBuilder.Entity<Voto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("votos");

            entity.HasIndex(e => e.EncuestaId, "EncuestaId");

            entity.HasIndex(e => e.OpcionRespuestaId, "OpcionRespuestaId");

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.EncuestaId).HasColumnType("int(11)");
            entity.Property(e => e.FechaVoto)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("datetime");
            entity.Property(e => e.OpcionRespuestaId).HasColumnType("int(11)");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
