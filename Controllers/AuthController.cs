using DistanceLearningSystem.Models.Email;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using DistanceLearningSystem.Context;
using DistanceLearningSystem.Controllers.Services.EmailServices;
using DistanceLearningSystem.Models.DistanceLearning;
using DistanceLearningSystem.Models.DistanceLearning.UserManagement;
using Microsoft.EntityFrameworkCore;

namespace DistanceLearningSystem.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly EmailConfiguration _emailConfiguration;

        public AuthController(ApplicationContext context, UserManager<User> userManager,
            SignInManager<User> signInManager, RoleManager<IdentityRole> roleManager,
            EmailConfiguration emailConfiguration)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _signInManager = signInManager;
            _context = context;
            _emailConfiguration = emailConfiguration;
        }

        [HttpGet("isLogin")]
        public IActionResult IsSignIn() => Ok(_signInManager.IsSignedIn(User));

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok();
        }

        [HttpPost("signup")]
        public async Task<IActionResult> SignUp(UserDto userDto)
        {
            _context.Students.AddAsync(new Student());
            _context.Tags.Remove(new Tag());
           var a = _context.Courses.Include(cr => cr.Students)
               .Where(cr => cr.CourseId == 2).ToList();

           
           try
            {
                var user = new User(userDto);
                var answer = await _userManager.CreateAsync(user, userDto.Password!);

                if (answer.Succeeded)
                {
                    try
                    {
                        await AddToRole(user);
                        SendEmail(user);

                        return Ok();
                    }
                    catch
                    {
                        await _userManager.DeleteAsync(user);
                        return BadRequest(new
                        {
                            error = "email",
                            error_description = "какая то херня"
                        });
                    }
                }

                return BadRequest(MakeMistakeText(answer));
            }
            catch (ArgumentNullException)
            {
                return BadRequest(new
                {
                    error = "repeat password",
                    error_description = "Please repeat password"
                });
            }
        }

        [HttpPost("signin")]
        public async Task<IActionResult> SignIn(UserDto userDto)
        {
            var user = await _userManager.FindByNameAsync(userDto.Username);
            var result = await _signInManager.PasswordSignInAsync(user.UserName, userDto.SignInPassword, false, false);
            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest(new
            {
                error = "SignInFailed",
                error_description = "какая то херня"
            });
        }

        private async Task AddToRole(User user)
        {
            var role = GetRole(user);
            try
            {
                await _userManager.AddToRoleAsync(user, role);
            }
            catch (InvalidOperationException)
            {
                await CreateRoleIfNotExist(role);
                await _userManager.AddToRoleAsync(user, role);
            }
        }

        private string GetRole(User user) => user.UserName == ConstUserData.MainAdminUserName
            ? ConstUserData.MainAdminRole
            : ConstUserData.UserRole;

        private async Task CreateRoleIfNotExist(string role) => await _roleManager.CreateAsync(new IdentityRole(role));

        private async void SendEmail(User user)
        {
            var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var callbackUrl = Url.Action(
                "ConfirmEmail",
                "auth",
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
                return new RedirectResult("signin");
            }
            catch (ArgumentNullException)
            {
                return new RedirectResult("signin");
            }
        }

        private object MakeMistakeText(IdentityResult answer)
        {
            object error = new();
            if (answer.Errors.Any(e => e.Code.ToLower().Contains("username")))
            {
                error = new
                {
                    error = "username",
                    error_description = "This username is taken"
                };
            }

            if (answer.Errors.Any(e => e.Code.ToLower().Contains("email")))
            {
                error = new
                {
                    error = "email",
                    error_description = "This email is taken"
                };
            }

            if (answer.Errors.Any(e => e.Code.ToLower().Contains("password")))
            {
                error = new
                {
                    error = "password",
                    error_description = "Password must have at least one non alphanumeric character and one uppercase."
                };
            }

            return error;
        }
    }
}