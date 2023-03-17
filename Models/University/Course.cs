namespace DistanceLearningSystem.Models.University;

public class Course
{
    public int CourseId { get; set; }
    public string Name { get; set; }
    public Teacher Teacher { get; set; }
    public Department Department { get; set; }
}