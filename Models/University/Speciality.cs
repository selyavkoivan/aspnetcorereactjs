namespace DistanceLearningSystem.Models.University;

public class Speciality
{
    public int SpecialityId { get; set; }
    public string SpecialityName { get; set; }
    public int SpecialityCode { get; set; }
    public Faculty Faculty { get; set; }
    public List<Group> Groups { get; set; }
}