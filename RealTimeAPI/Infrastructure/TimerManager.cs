﻿using RealTimeAPI.Model;

namespace RealTimeAPI.Infrastructure;

public class TimerManager
{
    private Timer? _timer;
    private AutoResetEvent? _autoResetEvent;
    private Action? _action;
    public DateTime TimerStarted { get; set; }
    public bool IsTimerStarted { get; set; }
    public void PrepareTimer(Action action)
    {
        _action = action;
        _autoResetEvent = new AutoResetEvent(false);
        _timer = new Timer(Execute, _autoResetEvent, 1000, 2000);
        TimerStarted = DateTime.Now;
        IsTimerStarted = true;
    }
    public void Execute(object? stateInfo)
    {
        _action();
        if ((DateTime.Now - TimerStarted).TotalSeconds > 60)
        {
            IsTimerStarted = false;
            _timer.Dispose();
        }
    }
}
public class DataManager
{
    public static List<Chart> GetData()
    {
        var r = new Random();
        return new List<Chart>()
        {
            new Chart { Data = new List<int> { r.Next(1, 40) }, Label = "Data1", BackgroundColor = "#5491DA" },
            new Chart { Data = new List<int> { r.Next(1, 40) }, Label = "Data2", BackgroundColor = "#E74C3C" },
            new Chart { Data = new List<int> { r.Next(1, 40) }, Label = "Data3", BackgroundColor = "#82E0AA" },
            new Chart { Data = new List<int> { r.Next(1, 40) }, Label = "Data4", BackgroundColor = "#E5E7E9" }
        };
    }
}