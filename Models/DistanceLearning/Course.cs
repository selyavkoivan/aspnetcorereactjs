using DistanceLearningSystem.Models.DistanceLearning.UserManagement;
using DistanceLearningSystem.Models.User;

namespace DistanceLearningSystem.Models.DistanceLearning;

public class Course
{
    public int CourseId { get; set; }
    public string CourseName { get; set; }
    public string CourseDescription { get; set; }
    public virtual List<Student> Students { get; set; }
}