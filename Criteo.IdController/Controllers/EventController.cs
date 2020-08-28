using System;
using Microsoft.AspNetCore.Mvc;
using Criteo.UserAgent;
using Criteo.Services.Glup;
using static Criteo.Glup.IdController.Types;
using IdControllerGlup = Criteo.Glup.IdController;

namespace Criteo.IdController.Controllers
{
    [Route("api/[controller]")]
    public class EventController : Controller
    {
        private readonly IGlupService _glupService;
        private readonly IAgentSource _agentSource;

        public EventController(IGlupService glupService, IAgentSource agentSource)
        {
            _glupService = glupService;
            _agentSource = agentSource;
        }

        [HttpPost]
        public IActionResult SaveEvent(
            EventType eventType,
            string originHost,
            string localwebid,
            string uid,
            string ifa)
        {
            // the controller tries to parse the EventType from the integer received
            // EventType.Unknown is either unsuccessful or indeed a evenType = 0, invalid in both cases
            if (eventType == EventType.Unknown || string.IsNullOrEmpty(originHost))
                return BadRequest();

            var userAgentString = HttpContext?.Request?.Headers?["User-Agent"];
            var uidForUAlib = ifa ?? uid ?? localwebid;
            var parsedUserAgent = GetUserAgent(userAgentString, uidForUAlib);

            EmitGlup(eventType, originHost, parsedUserAgent, localwebid, uid, ifa);

            return Ok(); // 200 OK - empty response
        }

        #region Helpers
        private IAgent GetUserAgent(string userAgentString, string uid)
        {
            var agentKey = new AgentKey { UserAgentHeader = userAgentString };

            Guid? uidForUAlib = null;

            if (!string.IsNullOrEmpty(uid) && Guid.TryParse(uid, out var parsedGuid))
                uidForUAlib = parsedGuid;

            var result = _agentSource.Get(agentKey, uidForUAlib);

            return result.Agent;
        }

        private void EmitGlup(
            EventType eventType,
            string originHost,
            IAgent userAgent,
            string localwebid,
            string uid,
            string ifa)
        {
            // Create glup event with required fields
            var glup = new IdControllerGlup()
            {
                Event = eventType,
                OriginHost = originHost
            };

            // User Agent
            if (userAgent?.UserAgentHash != null)
                glup.Uahashfull = userAgent.UserAgentHash;
            if (userAgent?.BrowserName != null)
                glup.UaBrowserFamily = userAgent.BrowserName;
            if (userAgent?.BrowserMajorVersion != null)
                glup.UaBrowserMajor = userAgent.BrowserMajorVersion;
            if (userAgent?.BrowserMinorVersion != null)
                glup.UaBrowserMinor = userAgent.BrowserMinorVersion;
            if (userAgent?.FormFactor != null)
                glup.UaFormFactor = userAgent.FormFactor;
            if (userAgent?.OperatingSystemName != null)
                glup.UaOsFamily = userAgent.OperatingSystemName;
            if (userAgent?.OperatingSystemMajorVersion != null)
                glup.UaOsMajor = userAgent.OperatingSystemMajorVersion;
            if (userAgent?.OperatingSystemMinorVersion != null)
                glup.UaOsMinor = userAgent.OperatingSystemMinorVersion;

            // Optional
            if (localwebid != null)
                glup.LocalWebId = localwebid;
            if (uid != null)
                glup.Uid = uid;
            if (ifa != null)
                glup.Ifa = ifa;

            // Go!
            _glupService.Emit(glup);
        }
        #endregion
    }
}
