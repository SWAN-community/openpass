using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using OpenPass.IdController.Helpers.Adapters;
using Swan.Client;

namespace OpenPass.IdController.Helpers
{
    public interface IIdentifierHelper
    {
        string GetOrCreateIfaToken(IRequestCookieCollection cookieContainer, string metricPrefix);

        Task<string> TryGetUid2TokenAsync(IResponseCookies cookieContainer, string email, string metricPrefix);
    }

    public class IdentifierHelper : IIdentifierHelper
    {
        private readonly ICookieHelper _cookieHelper;
        private readonly IMetricHelper _metricHelper;
        private readonly IIdentifierAdapter _uid2Adapter;
        private readonly ISwanConnection _swanConnection;

        public IdentifierHelper(
            IMetricHelper metricHelper,
            ICookieHelper cookieHelper,
            IIdentifierAdapter uid2Adapter,
            ISwanConnection swanConnection)
        {
            _metricHelper = metricHelper;
            _cookieHelper = cookieHelper;
            _uid2Adapter = uid2Adapter;
            _swanConnection = swanConnection;
        }

        public string GetOrCreateIfaToken(
            IRequestCookieCollection cookieContainer, 
            string metricPrefix)
        {
            if (_cookieHelper.TryGetIdentifierForAdvertisingCookie(cookieContainer, out var ifaToken))
            {
                _metricHelper.SendCounterMetric($"{metricPrefix}.reuse");
            }
            else
            {
                // Use SWAN to generate a SWID.
                ifaToken = _swanConnection.CreateSwid().Result.ToString();

                _metricHelper.SendCounterMetric($"{metricPrefix}.ok");
            }

            return ifaToken;
        }

        public async Task<string> TryGetUid2TokenAsync(IResponseCookies cookieContainer, string email, string metricPrefix)
        {
            var uid2Token = await _uid2Adapter.GetId(email);

            if (string.IsNullOrEmpty(uid2Token))
            {
                _metricHelper.SendCounterMetric($"{metricPrefix}.error.no_token");
            }
            else
            {
                _cookieHelper.SetUid2AdvertisingCookie(cookieContainer, uid2Token);

                _metricHelper.SendCounterMetric($"{metricPrefix}.ok");
            }

            return uid2Token;
        }
        private string GenerateRandomGuid() => Guid.NewGuid().ToString();
    }
}
