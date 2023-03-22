namespace DistanceLearningSystem.Models.University;

public class Speciality
{
    public int SpecialityId { get; set; }
    public string SpecialityName { get; set; }
    public int SpecialityCode { get; set; }
    public virtual Faculty Faculty { get; set; }
    public virtual List<Group> Groups { get; set; }
}