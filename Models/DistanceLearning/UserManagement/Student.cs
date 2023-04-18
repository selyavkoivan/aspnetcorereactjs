namespace DistanceLearningSystem.Models.DistanceLearning.UserManagement;

public class Student
{
    public int StudentId { get; set; }
    public virtual User StudentInfo { get; set; }
    public string StudentInfoId { get; set; }
    public virtual List<Course>? Courses { get; set; }
}