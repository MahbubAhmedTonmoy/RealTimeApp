using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using RealTimeCharts.Server.HubConfig;

namespace RealTimeCharts.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActiveUserController : ControllerBase
    {
        private readonly IHubContext<UserHub> _hub;
        public ActiveUserController(IHubContext<UserHub> hub)
        {
            _hub = hub;
        }

    }
}
