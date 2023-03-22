namespace DistanceLearningSystem.Models.University;

public class Student: User.User
{
    public int StudentId { get; set; }
    public virtual Group Group { get; set; }
}