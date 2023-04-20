using DistanceLearningSystem.Context;
using DistanceLearningSystem.Models.DistanceLearning;
using DistanceLearningSystem.Models.DistanceLearning.UserManagement;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DistanceLearningSystem.Controllers;

[ApiController]
[Route("api/sections/{sectionId}/lessons")]
public class LessonsController : ControllerBase
{
    private readonly ApplicationContext _context;
    private readonly UserManager<User> _userManager;

    public LessonsController(ApplicationContext context, UserManager<User> userManager)
    {
        _userManager = userManager;
        _context = context;
    }

    [HttpGet("")]
    public async Task<IActionResult> GetSectionLessons(int sectionId) =>
        Ok(await _context.Lessons.Include(ls => ls.Section)
            .Where(ls => ls.Section.SectionId == sectionId).ToListAsync());

    [HttpPost("")]
    public async Task<IActionResult> AddLessonToSection(Lesson lesson, int sectionId)
    {
        var section = await _context.Sections.Include(sc => sc.Lessons)
            .FirstOrDefaultAsync(sc => sc.SectionId == sectionId);

        section.Lessons.Add(lesson);
        _context.Update(section);
        await _context.SaveChangesAsync();
        
        return Ok(section);
    }
    
    [HttpPut("")]
    public async Task<IActionResult> EditLesson(Lesson lesson)
    {
        
        _context.Update(lesson);
        await _context.SaveChangesAsync();
        
        return Ok();
    }
    
    [HttpDelete("")]
    public async Task<IActionResult> DeleteLesson(Lesson lesson)
    {
        _context.Lessons.Remove(lesson);
        await _context.SaveChangesAsync();
        return Ok();
    }
}