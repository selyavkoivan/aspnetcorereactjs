namespace DistanceLearningSystem.Models.DistanceLearning.UserManagement;

public class Student: User.User
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public virtual List<Course> Courses { get; set; }
}