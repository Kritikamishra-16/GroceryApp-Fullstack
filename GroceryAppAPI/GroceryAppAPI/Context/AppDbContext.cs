using GroceryAppAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace GroceryAppAPI.Context
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options):base(options)
        {
            
        }

        //to communicate with database
        public DbSet<User> Users { get; set; }
        
        public DbSet<Product> Products { get; set; }

        public DbSet<Cart> Cart { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<Rating> Ratings { get; set; }




        //ModelBuilder=send this record or entity from .net core to the table in sql
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<User>().ToTable("users");
        }
    }
}
