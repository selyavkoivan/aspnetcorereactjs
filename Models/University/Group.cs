namespace DistanceLearningSystem.Models.University;

public class Group
{
    public int GroupId { get; set; }
    public int GroupNumber { get; set; }
    public Speciality Speciality { get; set; }
    public List<Student> Students { get; set; }
}