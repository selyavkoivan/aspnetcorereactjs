using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using mIndeleev.Context;
using mIndeleev.Models.User;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<ApplicationContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddIdentity<User, IdentityRole>(o =>
    {
        o.SignIn.RequireConfirmedPhoneNumber = false;
        o.SignIn.RequireConfirmedEmail = true;
    })
    .AddDefaultTokenProviders()
    .AddEntityFrameworkStores<ApplicationContext>();

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
