using Microsoft.EntityFrameworkCore;

namespace Reviewer.Models
{
    public class ReviewerContext : DbContext
    {
        public DbSet<ReviewedObject> Objects { get; set; }

        public DbSet<User> Users { get; set; }

        public DbSet<Review> Reviews { get; set; }

        public DbSet<Reviewers> Reviewers { get; set; }

        public DbSet<Genre> Genres { get; set; }

        public DbSet<Author> Authors { get; set; }

        public DbSet<GenreObject> GenreObjects { get; set; }

        public ReviewerContext(DbContextOptions options) : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }

    }
}