﻿using System.Text.Json;
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
    [Route("users")]
    public class UsersController : ControllerBase
    {
        private readonly ApplicationContext _context;
        private readonly UserManager<User> _userManager;

        public UsersController(ApplicationContext context, UserManager<User> userManager)
        {
            _userManager = userManager;
            _context = context;
        }

        [HttpGet("search")]
        public async Task<IActionResult> GetUsers() => Ok(await _userManager.Users.ToListAsync());

        [HttpGet]
        [Route("profile/{userName}")]
        public async Task<IActionResult> FindUser(string userName) =>
            Ok(await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == userName));
    }
}