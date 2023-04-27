namespace DistanceLearningSystem.Models.DistanceLearning.UserManagement;

public class Teacher
{
    public int TeacherId { get; set; }
    public virtual User TeacherInfo { get; set; }
    public string TeacherInfoId { get; set; }
    public virtual List<Course>? Courses { get; set; }
}