using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using DistanceLearningSystem.Context;
using DistanceLearningSystem.Controllers.Services.EmailServices;
using DistanceLearningSystem.Models.DistanceLearning.UserManagement;
using DistanceLearningSystem.Models.Email;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace DistanceLearningSystem.Controllers;

[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
    private readonly ApplicationContext _context;
    private readonly UserManager<User> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly EmailConfiguration _emailConfiguration;

    public UsersController(ApplicationContext context, UserManager<User> userManager,
        RoleManager<IdentityRole> roleManager, EmailConfiguration emailConfiguration)
    {
        _userManager = userManager;
        _context = context;
        _roleManager = roleManager;
        _emailConfiguration = emailConfiguration;
    }

    [HttpGet("search")]
    public async Task<IActionResult> GetUsers() => Ok(await GetUsersWithRoles());
    
    [Authorize]
    [HttpGet("me")]
    public async Task<IActionResult> GetCurrentUser()
    {
        return Ok(await GetUserWithRoles(_userManager.GetUserAsync(HttpContext.User).Result!.UserName!));
    }

    [HttpGet]
    [Route("profile/{userName}")]
    public async Task<IActionResult> FindUser(string userName)
    {
        return Ok(await GetUserWithRoles(userName));
    }

    [HttpPut]
    [Route("profile/{userName}")]
    public async Task<IActionResult> EditUser(string userName, [FromBody] UserDto userDto)
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == userName);
        user?.UpdateFromDto(userDto);
        await _userManager.UpdateAsync(user!);
        return Ok(await GetUserWithRoles(user!.UserName!));
    }

    [HttpPut]
    [Route("profile/{userName}/email")]
    public async Task<IActionResult> EditEmail(string userName, [FromBody] UserDto userDto)
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == userName);
        user?.UpdateEmailFromDto(userDto);
        await _userManager.UpdateAsync(user!);

        SendEmail(user!);
        
        return Ok(await GetUserWithRoles(user!.UserName!));
    }

    [HttpPut]
    [Route("profile/{userName}/password")]
    public async Task<IActionResult> EditPassword(string userName, [FromBody] UserDto userDto)
    {
        try
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == userName);
            var result = await _userManager.ChangePasswordAsync(user!, userDto.SignInPassword!, userDto.Password!);
            return result.Succeeded
                ? Ok()
                : BadRequest();
        }
        catch (Exception e)
        {
            return BadRequest();
        }
    }
    
    private async void SendEmail(User user)
    {
        var code = await _userManager.GenerateChangeEmailTokenAsync(user, user.NewEmail);
        var callbackUrl = Url.Action(
            "ConfirmNewEmail",
            "Users",
            new {userId = user.Id, email = user.NewEmail, code},
            protocol: HttpContext.Request.Scheme);

        var message = new Message(new[] {user.NewEmail}, "Подтвердите новую почту", callbackUrl);
        new EmailSenderImpl(_emailConfiguration).SendEmail(message);
    }

    [HttpGet("ConfirmNewEmail")]
    public async Task<IActionResult> ConfirmNewEmail(string userId, string email, string code)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(userId);
            var result = await _userManager.ChangeEmailAsync(user, email, code);
            return new RedirectResult($"profile/{user.UserName}");
        }
        catch (ArgumentNullException)
        {
            return new RedirectResult("signin");
        }
    }

    private async Task<object> GetUsersWithRoles() => await _context.Users
        .Join(
            _context.UserRoles,
            user => user.Id,
            userRole => userRole.UserId,
            (user, userRole) => new {User = user, RoleId = userRole.RoleId})
        .Join(
            _context.Roles,
            userRole => userRole.RoleId,
            role => role.Id,
            (userRole, role) => new {User = userRole.User, Role = role})
        .GroupBy(
            userRole => userRole.User,
            userRole => userRole.Role.Name,
            (user, roles) => new {User = user, Roles = roles.ToList()})
        .ToListAsync();

    private async Task<object?> GetUserWithRoles(string userName) => await _context.Users
        .Join(
            _context.UserRoles,
            user => user.Id,
            userRole => userRole.UserId,
            (user, userRole) => new {User = user, RoleId = userRole.RoleId})
        .Join(
            _context.Roles,
            userRole => userRole.RoleId,
            role => role.Id,
            (userRole, role) => new {User = userRole.User, Role = role})
        .GroupBy(
            userRole => userRole.User,
            userRole => userRole.Role.Name,
            (user, roles) => new {User = user, Roles = roles.ToList()})
        .FirstOrDefaultAsync(ur => ur.User.UserName == userName);
}