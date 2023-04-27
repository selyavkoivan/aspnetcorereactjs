using DistanceLearningSystem.Models.DistanceLearning.UserManagement;
using Microsoft.EntityFrameworkCore;

namespace DistanceLearningSystem.Models.DistanceLearning;

public class Answer
{
    public int AnswerId { get; set; }
    public Student Student { get; set; }
    [DeleteBehavior(DeleteBehavior.NoAction)]
    public Teacher Teacher { get; set; }
    public Lesson Lesson { get; set; }
    public string StudentComment { get; set; }
    public List<AttachedFile>? AttachedFiles { get; set; }
    public DateTime Time { get; set; }
    
    public string TeacherComment { get; set; }
    public List<AttachedFile>? TeacherAttachedFiles { get; set; }
    public int Grade { get; set; }
}