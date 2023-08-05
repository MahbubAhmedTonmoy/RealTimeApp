namespace RealTimeAPI.Model;

public class Chart
{
    public List<int> Data { get; set; } = new List<int>();
    public string? Label { get; set; }
    public string? BackgroundColor { get; set; }
}
