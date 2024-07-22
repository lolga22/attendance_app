using Microsoft.EntityFrameworkCore;
using AttendanceApp.Models;

namespace AttendanceApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Employee> Employees { get; set; }
        public DbSet<Timesheet> Timesheets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Timesheet>()
                .HasOne<Employee>()
                .WithMany() // Укажите соответствующие параметры связи, если нужно
                .HasForeignKey(t => t.Employee);

            base.OnModelCreating(modelBuilder);
        }
    }
}
