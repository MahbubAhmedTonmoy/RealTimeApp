using Microsoft.AspNetCore.SignalR;

namespace RealTimeCharts.Server.HubConfig
{
    public class UserHub : Hub
    {
        public static int TotalActiveUser { get; set; } = 0;
        public async Task ActiveUsers() =>
            await Clients.All.SendAsync("activeusers", TotalActiveUser++);
        
    }
}
