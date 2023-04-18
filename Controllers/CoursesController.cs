using DistanceLearningSystem.Context;
using DistanceLearningSystem.Models.DistanceLearning;
using DistanceLearningSystem.Models.DistanceLearning.UserManagement;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DistanceLearningSystem.Controllers;

[ApiController]
[Route("api/courses")]
public class CoursesController : ControllerBase
{
    private readonly ApplicationContext _context;
    private readonly UserManager<User> _userManager;

    public CoursesController(ApplicationContext context, UserManager<User> userManager)
    {
        _userManager = userManager;
        _context = context;
    }

    [HttpPost("course")]
    public async Task<IActionResult> CreateCourse(Course course)
    {
        await _context.Courses.AddAsync(course);
        await _context.SaveChangesAsync();
        return Ok();
    }
    
    [HttpPut("course")]
    public async Task<IActionResult> EditCourse(Course course)
    {
        _context.Courses.Update(course);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpGet("")]
    public async Task<IActionResult> GetCourses() =>
        Ok(await _context.Courses.Include(cr => cr.Tags).ToListAsync());

    [HttpGet("search/{searchTerm}")]
    public async Task<IActionResult> SearchCourses(string searchTerm)
    {
        return Ok(await _context.Courses.Include(cr => cr.Tags)
            .Where(cr => cr.CourseName.Contains(searchTerm) || cr.CourseDescription.Contains(searchTerm))
            .ToListAsync());
    }
    
    [HttpGet("{id}")]
    public async Task<IActionResult> SearchCourses(int id)
    {
        return Ok(await _context.Courses.Include(cr => cr.Tags)
            .FirstOrDefaultAsync(cr => cr.CourseId == id));
    }
}