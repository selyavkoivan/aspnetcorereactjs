using DistanceLearningSystem.Models.DistanceLearning.UserManagement;

namespace DistanceLearningSystem.Models.Chat;

public class Message
{
    public int MessageId { get; set; }
    public User From { get; set; }
    public User? To { get; set; }
    public DateTime Time { get; set; }
    public string MessageBody { get; set; }
}