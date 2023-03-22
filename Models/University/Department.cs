namespace DistanceLearningSystem.Models.University;

public class Department
{
    public int DepartmentId { get; set; }
    public string DepartmentName { get; set; }
    public virtual List<Teacher> Teachers { get; set; }

}