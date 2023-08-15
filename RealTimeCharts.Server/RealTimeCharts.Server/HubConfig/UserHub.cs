using Microsoft.AspNetCore.SignalR;

namespace RealTimeCharts.Server.HubConfig;

public class UserHub : Hub<IHubCLient>
{
    private readonly ILogger<UserHub> logger;

    public UserHub( ILogger<UserHub> logger)
    {
        this.logger = logger;

        logger.LogDebug($"VoteHub created. {DateTime.UtcNow.ToLongTimeString()}");
    }
    public static int TotalActiveUser { get; set; } = 0;
    public async Task ActiveUsers() =>
        await Clients.All.ActiveUsers(TotalActiveUser);

    public async override Task OnConnectedAsync()
    {
        TotalActiveUser++;
        await ActiveUsers();
        await base.OnConnectedAsync();
    }
    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        TotalActiveUser--;
        await ActiveUsers();
        await base.OnDisconnectedAsync(exception);
    }
}

//Strongly Typed Hubs
public interface IHubCLient
{
    Task ActiveUsers(int user);
}

/*
* why instance 2 time
* 1st create hub context
* 2nd for get current state (here ActiveUsers() )
*/
/*
* Connection id GUID -> change if refresh
* user identifier -> dot net identity, claim.nameidentifier
* user ->
* items -> dictionary
* connection Aborted -> cancellaion token when can be passed to any methods that can use it
*/

/*
* clients 
* 1. ALL  
* 2.Group
* 3.Specific client  [client.caller]
* 4.all other exclude caller [client.others]
* 5.client. client(id)
* 6. client.clients(id,id,id)
* 7.client.user
*/

/*
* AddToGroupAsync
* RemoveFromGroupAsync
*/

/*
 * if you have multiple server for scaling
 * you need to use Redis / Azure SignalR service for Backplane
 */

//https://github.com/1kevgriff/SignalR-Mastery