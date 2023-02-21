using System.Collections;
using System.Text.Json;
using clotheshop.Models.Email;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using Microsoft.AspNetCore.Mvc.Razor;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Mvc.ViewFeatures;
using Microsoft.Extensions.Localization;
using mIndeleev.Context;
using mIndeleev.Controllers.Services.EmailServices;
using mIndeleev.Models;
using mIndeleev.Models.Email;
using mIndeleev.Models.User;
using mIndeleev.Models.User.UserDto;

namespace mIndeleev.Controllers;

[ApiController]
[Route("auth")]
public class AuthController : ControllerBase
{
    private readonly ApplicationContext _context;
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly EmailConfiguration _emailConfiguration;

    public AuthController(ApplicationContext context, UserManager<User> userManager,
        SignInManager<User> signInManager, EmailConfiguration emailConfiguration)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _context = context;
        _emailConfiguration = emailConfiguration;
    }

    [HttpPost("signup")]
    public async Task<IActionResult> SignUp(UserDto userDto)
    {
        var errors = new ArrayList();
        try
        {
            var user = new User(userDto);
            var answer = await _userManager.CreateAsync(user, userDto.Password!);
            if (answer.Succeeded)
            {
                SendEmail(user);
                return new RedirectResult("../email");
            }

            errors.AddRange(MakeMistakeText(answer));
        }
        catch (ArgumentNullException)
        {
            errors.Add(new
            {
                error = "repeat password",
                error_description = "Please repeat password"
            });
        }

        return BadRequest(errors);
    }
    
    public async void SendEmail(User user)
    {
        var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
        var callbackUrl = Url.Action(
            "ConfirmEmail",
            "Auth",
            new {userId = user.Id, code},
            protocol: HttpContext.Request.Scheme);
        //var text = await MakeConfirmEmailBody(callbackUrl);

        var message = new Message(new[] {user.Email}, "d", callbackUrl);
        new EmailSenderImpl(_emailConfiguration).SendEmail(message);
    }

    [HttpGet("signin")]
    public async Task<IActionResult> ConfirmEmail(string userId, string code)
    {
        try
        {
            var user = await _userManager.FindByIdAsync(userId);
            var result = await _userManager.ConfirmEmailAsync(user, code);
            if (result.Succeeded) return new RedirectResult("../signin");
            return  new RedirectResult("signin");
        }
        catch (ArgumentNullException)
        {
            return  new RedirectResult("signin");
        }
    }
    
    private ArrayList MakeMistakeText(IdentityResult answer)
    {
        var errors = new ArrayList();
        if (answer.Errors.Any(e => e.Code.ToLower().Contains("username")))
        {
            errors.Add(new
            {
                error = "username",
                error_description = "This username is taken"
            });
        }

        if (answer.Errors.Any(e => e.Code.ToLower().Contains("email")))
        {
            errors.Add(new
            {
                error = "email",
                error_description = "This email is taken"
            });
        }

        if (answer.Errors.Any(e => e.Code.ToLower().Contains("password")))
        {
            errors.Add(new
            {
                error = "password",
                error_description = "Password must have at least one non alphanumeric character and one uppercase."
            });
        }

        return errors;
    }
}