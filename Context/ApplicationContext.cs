using CloudinaryDotNet;
using DistanceLearningSystem.Models.Chat;
using DistanceLearningSystem.Models.Cloudinary;
using DistanceLearningSystem.Models.DistanceLearning;
using DistanceLearningSystem.Models.DistanceLearning.UserManagement;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DistanceLearningSystem.Context
{
    public sealed class ApplicationContext : IdentityDbContext<User>
    {
        public override DbSet<User> Users => Set<User>();
        public DbSet<Student> Students => Set<Student>();
        public DbSet<Course> Courses => Set<Course>();
        public DbSet<Tag> Tags => Set<Tag>();
        public DbSet<Section> Sections => Set<Section>();
        public DbSet<Lesson> Lessons => Set<Lesson>();
        public DbSet<Teacher> Teachers => Set<Teacher>();
        public DbSet<Answer> Answers => Set<Answer>();
        public DbSet<Message> Messages => Set<Message>();
        
        public DbSet<AttachedFile> AttachedFiles => Set<AttachedFile>();

        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options) => Database.EnsureCreated();

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<User>()
                .Property(u => u.AvatarUrl)
                .HasDefaultValue(CloudinaryValues.DefaultAvatarUrl);
        }
    }
}