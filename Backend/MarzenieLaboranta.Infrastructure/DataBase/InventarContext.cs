using MarzenieLaboranta.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace MarzenieLaboranta.Infrastructure.DataBase
{
    public class InventarContext : DbContext
    {
        public InventarContext(DbContextOptions<InventarContext> options) : base(options)
        { }
        
        public DbSet<Localization> Localizations { get; set; }
        public DbSet<Resource> Resources { get; set; }
        public DbSet<FailureReport> FailureReports { get; set; }
        
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
             .HasKey(u => u.Id);

            modelBuilder.Entity<Resource>()
                .HasMany(r => r.FailureReports)
                .WithOne(f => f.Resource)
                .HasForeignKey(f => f.ResourceId);

            modelBuilder.Entity<Resource>()
                .HasOne(r => r.Localization)
                .WithMany(l => l.Resources)
                .HasForeignKey(r => r.LocalizationId);

            modelBuilder.Entity<Localization>()
             .HasKey(l => l.Id);

            modelBuilder.Entity<FailureReport>()
                .HasKey(f => f.Id);

        }
    }
}
