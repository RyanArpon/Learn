using Microsoft.EntityFrameworkCore;
using Learn.API.Models.Domain;

namespace Learn.API.Data {
    public class LearnDbContext : DbContext {
        public LearnDbContext(DbContextOptions<LearnDbContext> dbContextOptions) : base(dbContextOptions) {

        }

        public DbSet<Topic> Topics { get; set; }
        public DbSet<Question> Questions { get; set; }
        public DbSet<Answer> Answers { get; set; }
    }
}