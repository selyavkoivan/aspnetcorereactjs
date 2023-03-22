using DistanceLearningSystem.Context;
using DistanceLearningSystem.Models.Email;
using DistanceLearningSystem.Models.User;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var emailConfig = builder.Configuration
    .GetSection("EmailConfiguration")
    .Get<EmailConfiguration>();
builder.Services.AddSingleton(emailConfig);


builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<ApplicationContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddIdentity<User, IdentityRole>(o =>
    {
        o.SignIn.RequireConfirmedPhoneNumber = false;
        o.SignIn.RequireConfirmedEmail = true;
    }).AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<ApplicationContext>()
    .AddDefaultTokenProviders();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{ 
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html");

app.Run();
