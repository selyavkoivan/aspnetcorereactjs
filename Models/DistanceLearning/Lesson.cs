using System.Text.Json.Serialization;

namespace DistanceLearningSystem.Models.DistanceLearning;

public class Lesson
{
    public int LessonId { get; set; }
    public string LessonName { get; set; }
    public string LessonDescription { get; set; }
    
    
    
    [JsonIgnore]
    public Section? Section { get; set; }
}
