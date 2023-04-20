using System.Text.Json.Serialization;

namespace DistanceLearningSystem.Models.DistanceLearning;

public class Section
{
    public int SectionId { get; set; }
    
    public string SectionName { get; set; }
    public string SectionDescription { get; set; }
    
    [JsonIgnore]
    public Course? Course { get; set; }
}