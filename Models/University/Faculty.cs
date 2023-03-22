namespace DistanceLearningSystem.Models.University;

public class Faculty
{
    public int FacultyId { get; set; }
    public string FacultyName { get; set; }
    public int FacultyCode { get; set; }
    public virtual List<Speciality> Specialities { get; set; }
}