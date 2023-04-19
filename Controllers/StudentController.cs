using DistanceLearningSystem.Context;
using DistanceLearningSystem.Models.DistanceLearning;
using DistanceLearningSystem.Models.DistanceLearning.UserManagement;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DistanceLearningSystem.Controllers;

[ApiController]
[Route("api/students")]
public class StudentController : ControllerBase
{
    private readonly ApplicationContext _context;
    private readonly UserManager<User> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public StudentController(ApplicationContext context, UserManager<User> userManager,
        RoleManager<IdentityRole> roleManager)
    {
        _userManager = userManager;
        _roleManager = roleManager;
        _context = context;
    }

    [HttpPost("{userName}/register")]
    public async Task<IActionResult> RegisterStudent(string userName)
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == userName);
        var student = new Student {StudentInfo = user!};
        await _context.Students.AddAsync(student);
        await _context.SaveChangesAsync();
        return Ok();
    }

    [HttpGet("")]
    public async Task<IActionResult> GetStudents() =>
        Ok(await _context.Students.Include(st => st.Courses)
            .Include(st => st.StudentInfo).ToListAsync());

    [HttpGet("{userName}")]
    public async Task<IActionResult> GetStudent(string userName) =>
        Ok(await GetStudentWithRoles(userName));

    [HttpPost("{userName}/subscribe/{courseId}")]
    public async Task<IActionResult> SubscribeStudentToCourse(string userName, int courseId)
    {
        var course = await _context.Courses.FindAsync(courseId);
        var student = await GetStudentData(userName);
        student?.Courses.Add(course!);
        await _context.SaveChangesAsync();
        await AssignStudentRole(student.StudentInfo);
        return Ok(student);
    }
    
    [HttpPost("me/subscribe/{courseId}")]
    public async Task<IActionResult> SubscribeToCourse(int courseId)
    {
        var course = await _context.Courses.FindAsync(courseId);
        var student = await GetStudentData(_userManager.GetUserAsync(HttpContext.User).Result.UserName);
        student?.Courses.Add(course!);
        await _context.SaveChangesAsync();
        await AssignStudentRole(student.StudentInfo);
        return Ok(student);
    }
    
    [HttpPost("me/unsubscribe/{courseId}")]
    public async Task<IActionResult> UnubscribeFromCourse(int courseId)
    {
        var course = await _context.Courses.FindAsync(courseId);
        var student = await GetStudentData(_userManager.GetUserAsync(HttpContext.User).Result.UserName);
        
        student.Courses.Remove(course);
        await _context.SaveChangesAsync();
        
        return Ok(student);
    }
    
    [HttpGet("me/{courseId}/isCourse")]
    public async Task<IActionResult> GetIsCourseForMe(int courseId)
    {
        var student = await GetStudentData(_userManager.GetUserAsync(HttpContext.User).Result.UserName);
        return Ok(student.Courses.Any(cr => cr.CourseId == courseId));
    }

    [HttpPost("{userName}/assign")]
    public async Task<IActionResult> AssignStudentRole(string userName)
    {
        var user = await _userManager.Users.FirstOrDefaultAsync(u => u.UserName == userName);
        await AssignStudentRole(user!);
        return Ok(user);
    }
    
    [HttpGet("{userName}/isStudent")]
    public async Task<IActionResult> IsStudent(string userName) =>
        Ok(await _context.Students.Include(st => st.StudentInfo)
            .AnyAsync(st => st.StudentInfo.UserName == userName));

    private async Task<Student?> GetStudentData(string userName) => 
        await _context.Students.Include(st => st.Courses)
        .Include(st => st.StudentInfo)
        .FirstOrDefaultAsync(st => st.StudentInfo.UserName == userName);

    private async Task AssignStudentRole(User user)
    {
        var role = ConstUserData.Student;
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

    private async Task<object?> GetStudentWithRoles(string username) => await _context.Students
        .Include(st => st.Courses)!.ThenInclude(cr => cr.Tags)
        .Include(st => st.StudentInfo)
        .FirstOrDefaultAsync(ur => ur.StudentInfo.UserName == username);

    private async Task CreateRoleIfNotExist(string role) => await _roleManager.CreateAsync(new IdentityRole(role));
}