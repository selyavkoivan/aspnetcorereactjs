namespace DistanceLearningSystem.Models.University;

public class Teacher: User.User
{
   public int TeacherId { get; set; } 
   public Department Department { get; set; }
   public List<Course> Courses { get; set; }
}