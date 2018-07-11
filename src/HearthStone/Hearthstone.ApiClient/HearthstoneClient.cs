using System.Collections.Generic;
using System.Threading.Tasks;
using Flurl;
using Flurl.Http;
using Hearthstone.Model;

namespace Hearthstone.ApiClient
{
    public class HearthstoneClient
    {
        public async Task<List<Card>> GetCards()
        {
            return await "http://localhost:3000"
                .AppendPathSegment("cards")
                .WithHeader("Accept", "application/json")
                .GetJsonAsync<List<Card>>();
        }

        public async Task<List<Card>> GetCards(CardFilters filters)
        {
            return await "http://localhost:3000"
                .AppendPathSegment("cards")
                .WithHeader("Accept", "application/json")
                .SetQueryParams(filters)
                .GetJsonAsync<List<Card>>();
        }
    }
}
