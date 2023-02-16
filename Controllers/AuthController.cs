using System.Text.Json;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using mIndeleev.Context;
using mIndeleev.Models;
using mIndeleev.Models.User;
using mIndeleev.Models.User.UserDto;

namespace mIndeleev.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly ApplicationContext _context;
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;

    public AuthController(ApplicationContext context, UserManager<User> userManager,
        SignInManager<User> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _context = context;
    }

    [HttpPost("signup")]
    public IActionResult SignUp(UserDto userDto)
    {
        
        return BadRequest(new
        {
            error = "email", 
            error_description = "The username or password is invalid."
        });
    }
}
