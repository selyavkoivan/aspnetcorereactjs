namespace DistanceLearningSystem.Models.University;

public class Group
{
    public int GroupId { get; set; }
    public int GroupNumber { get; set; }
    public virtual Speciality Speciality { get; set; }
    public virtual List<Student> Students { get; set; }
}