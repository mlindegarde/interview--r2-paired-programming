using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hearthstone.ApiClient;
using Microsoft.AspNetCore.Mvc;

namespace Hearthstone.Web.Controllers
{
    public class HearthstoneCardsController : Controller
    {
        public async Task<IActionResult> Index()
        {
            HearthstoneClient client = new HearthstoneClient();

            return View(await client.GetCards());
        }
    }
}