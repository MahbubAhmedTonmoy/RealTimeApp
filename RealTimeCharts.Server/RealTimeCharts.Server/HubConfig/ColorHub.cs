using Microsoft.AspNetCore.SignalR;

namespace RealTimeCharts.Server.HubConfig;

public class ColorHub : Hub
{
    public async Task JoinGroup(string groupName)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
    }
    public Task TriggerGroup(string groupName)
    {
        return Clients.Group(groupName).SendAsync("TriggerColor", groupName);
    }
}