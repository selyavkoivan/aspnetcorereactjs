using System.Text.Json;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using DistanceLearningSystem.Context;
using DistanceLearningSystem.Models;
using DistanceLearningSystem.Models.User;
using DistanceLearningSystem.Models.User.UserDto;

namespace DistanceLearningSystem.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public TestController(ApplicationContext context, UserManager<User> userManager,
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
}
