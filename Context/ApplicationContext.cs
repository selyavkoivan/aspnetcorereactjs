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
        
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options) => Database.EnsureCreated();

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            /*builder.Entity<User>().HasOne(u => u.UserInfo)
                .WithOne(ui => ui.User)
                .HasForeignKey<User>(u => u.userInfoId)
                .IsRequired(false);
            builder.Entity<UserInfo>(uib =>
                uib.Property(ui => ui.AvatarUrl)
                    .HasDefaultValue(
                        "https://res.cloudinary.com/fanfictionteamoff/image/upload/v1669894168/ekrama/%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5_2022-12-01_142927792_vx67r0.png"));
        */
        }
    }
}