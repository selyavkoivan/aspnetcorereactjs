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
        return Ok(course.CourseId);
    }

    [HttpPut("course")]
    public async Task<IActionResult> EditCourse(Course course)
    {
        var existingCourse = await _context.Courses
            .Include(c => c.Tags)
            .AsNoTracking().FirstOrDefaultAsync(c => c.CourseId == course.CourseId);

        var tagsToDelete = existingCourse?.Tags?
            .Where(t => course.Tags!.All(ct => ct.TagId != t.TagId))
            .ToList();

        _context.Tags.RemoveRange(tagsToDelete);
        _context.Courses.Update(course);
        await _context.SaveChangesAsync();

        return Ok(course.CourseId);
    }

    [HttpDelete("course")]
    public async Task<IActionResult> DeleteCourse(Course course)
    {
        var existingCourse = await _context.Courses
            .Include(c => c.Tags)
            .AsNoTracking().FirstOrDefaultAsync(c => c.CourseId == course.CourseId);

        if (existingCourse?.Tags?.Count > 0)
        {
            _context.Tags.RemoveRange(existingCourse?.Tags!);
        }

        _context.Courses.Remove(course);
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
            .Include(cr => cr.Sections).ThenInclude(sc => sc.Lessons)
            .Where(cr => cr.CourseName.Contains(searchTerm) || cr.CourseDescription.Contains(searchTerm))
            .ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> SearchCourses(int id)
    {
        return Ok(await _context.Courses.Include(cr => cr.Tags)
            .Include(cr => cr.Sections).ThenInclude(sc => sc.Lessons)
            .FirstOrDefaultAsync(cr => cr.CourseId == id));
    }

    [HttpGet("tags")]
    public async Task<IActionResult> GetTags()
    {
        return Ok(await _context.Tags.SelectMany(t => t.TagName).Distinct().ToListAsync());
    }
}