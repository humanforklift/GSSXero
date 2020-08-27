using GssXeroMVC.Models.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GssXeroMVC.Models
{
    public class GSSXeroDbContext : DbContext
    {
        public GSSXeroDbContext(DbContextOptions<GSSXeroDbContext> options) : base(options)
        {

        }

        internal DbSet<Client> Clients { get; set; }
        internal DbSet<Employee> Employees { get; set; }
        internal DbSet<Timesheet> Timesheets { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

    }
}
