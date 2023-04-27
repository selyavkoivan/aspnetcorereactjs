using DistanceLearningSystem.Context;
using DistanceLearningSystem.Models.DistanceLearning;
using DistanceLearningSystem.Models.DistanceLearning.UserManagement;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DistanceLearningSystem.Controllers;

[ApiController]
[Route("api/lessons")]
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
    public async Task<IActionResult> GetAllLessons()
    {
        var lessons = await _context.Lessons.ToListAsync();
        return Ok(lessons);
    }

    [HttpGet("{lessonId}")]
    public async Task<IActionResult> GetLessonById(int lessonId)
    {
        var lesson = await _context.Lessons.FindAsync(lessonId);
        return Ok(lesson);
    }

    [HttpPost("sections/{sectionId}")]
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

    [HttpDelete("{lessonId}")]
    public async Task<IActionResult> DeleteLesson(int lessonId)
    {
        var lesson = await _context.Lessons.FindAsync(lessonId);

        if (lesson == null)
        {
            return NotFound();
        }

        _context.Lessons.Remove(lesson);
        await _context.SaveChangesAsync();

        return Ok();
    }
    
    [HttpGet("sections/{sectionId}")]
    public async Task<IActionResult> GetSectionLessons(int sectionId)
    {
        var lessons = await _context.Lessons.Include(ls => ls.Section)
            .Where(ls => ls.Section.SectionId == sectionId).ToListAsync();
        return Ok(lessons);
    }
}
