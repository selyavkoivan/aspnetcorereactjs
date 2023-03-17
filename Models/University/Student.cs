namespace DistanceLearningSystem.Models.University;

public class Student: User.User
{
    public int StudentId { get; set; }
    public Group Group { get; set; }
}