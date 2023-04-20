using System.Text.Json.Serialization;
using DistanceLearningSystem.Models.DistanceLearning.UserManagement;

namespace DistanceLearningSystem.Models.DistanceLearning;

public class Course
{
    public int CourseId { get; set; }
    public string CourseName { get; set; }
    public string CourseDescription { get; set; }
    
    [JsonIgnore]
    public virtual List<Student>? Students { get; set; }
    
    
    public virtual List<Tag>? Tags { get; set; }
    public virtual List<Section>? Sections { get; set; }
}