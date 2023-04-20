using DistanceLearningSystem.Context;
using DistanceLearningSystem.Models.DistanceLearning;
using DistanceLearningSystem.Models.DistanceLearning.UserManagement;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DistanceLearningSystem.Controllers;

[ApiController]
[Route("api/courses/{courseId}/sections/")]
public class SectionsController : ControllerBase
{
    private readonly ApplicationContext _context;
    private readonly UserManager<User> _userManager;

    public SectionsController(ApplicationContext context, UserManager<User> userManager)
    {
        _userManager = userManager;
        _context = context;
    }

    [HttpGet("")]
    public async Task<IActionResult> GetCourseSections(int courseId)
    {
        var sections = await _context.Sections.Include(sc => sc.Course)
            .Where(sc => sc.Course.CourseId == courseId).ToListAsync();
        return Ok(sections);
    }
    
    [HttpPost("")]
    public async Task<IActionResult> AddSectionToCourse(Section section, int courseId)
    {
        var course = await _context.Courses.Include(cr => cr.Sections)
            .FirstOrDefaultAsync(cr => cr.CourseId == courseId);

        course.Sections.Add(section);
        _context.Update(course);
        await _context.SaveChangesAsync();
        
        return Ok(course);
    }
    
    [HttpPut("")]
    public async Task<IActionResult> EditSection(Section section)
    {
        
        _context.Update(section);
        await _context.SaveChangesAsync();
        
        return Ok();
    }
    
    [HttpDelete("")]
    public async Task<IActionResult> DeleteSection(Section section)
    {
        _context.Sections.Remove(section);
        await _context.SaveChangesAsync();
        return Ok();
    }
}