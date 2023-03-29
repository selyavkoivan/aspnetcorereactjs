using System.Text.Json;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using DistanceLearningSystem.Context;
using DistanceLearningSystem.Models;
using DistanceLearningSystem.Models.Chat.openai;
using DistanceLearningSystem.Models.User;
using Microsoft.EntityFrameworkCore;

namespace DistanceLearningSystem.Controllers
{
    [ApiController]
    [Route("chat")]
    public class ChatController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly UserManager<User> _userManager;

        public ChatController(ApplicationContext context, UserManager<User> userManager)
        {
            _userManager = userManager;
            _context = context;
        }
        
        [HttpGet("openai")]
        public async Task<string> GetOpenAiAnswer(string prompt) => await GPT3Api.GenerateText(prompt);
    }
}
