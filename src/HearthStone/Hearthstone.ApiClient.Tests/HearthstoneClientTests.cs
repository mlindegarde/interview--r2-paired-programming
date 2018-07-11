using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentAssertions;
using Hearthstone.Model;
using Xunit;

namespace Hearthstone.ApiClient.Tests
{
    public class HearthstoneClientTests
    {
        #region Member Variables

        private HearthstoneClient _client;
        #endregion

        #region Setup
        public HearthstoneClientTests()
        {
            _client = new HearthstoneClient();
        }
        #endregion

        #region Tests
        [Fact]
        public async Task should_get_all_cards()
        {
            // arrange
            List<Card> cards = null;

            // act
            cards = await _client.GetCards();

            // assert
            cards.Should().NotBeNullOrEmpty();
        }

        [Fact]
        public async Task should_filter_by_set()
        {
            // arrange
            List<Card> cards = null;
            string setName = "loe";

            CardFilters filters =
                new CardFilters
                {
                    set = setName
                };

            // act
            cards = await _client.GetCards((filters));

            // assert
            cards.Should().NotBeNullOrEmpty();
            cards.Any(c => c.Set.ToLowerInvariant() != setName).Should().BeFalse();
        }
        #endregion
    }
}
