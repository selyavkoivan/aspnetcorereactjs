namespace DistanceLearningSystem.Models.University;

public class Teacher: User.User
{
   public int TeacherId { get; set; } 
   public virtual Department Department { get; set; }
   public virtual List<Course> Courses { get; set; }
}