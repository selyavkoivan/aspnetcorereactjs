namespace DistanceLearningSystem.Models.University;

public class Course
{
    public int CourseId { get; set; }
    public string Name { get; set; }
    public virtual Teacher Teacher { get; set; }
    public virtual Department Department { get; set; }
}