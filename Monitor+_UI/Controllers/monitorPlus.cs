using Microsoft.AspNetCore.Mvc;
using Monitor__UI.Models;
using System;
using System.Linq;

namespace Monitor__UI.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class monitorPlus : Controller
    {
        private readonly DB_Context _context;

        public monitorPlus(DB_Context context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult checkVideo(string user)
        {
            var media = _context.Media.FirstOrDefault(a => a.FromDate < DateTime.Now && a.ToDate >= DateTime.Now && a.Users.Contains(user));
            return Json(media);
        }

        [HttpGet]
        public ActionResult checkmarquee(string user)
        {
            var marquee = _context.Marquees.FirstOrDefault(a => a.FromDate < DateTime.Now && a.ToDate >= DateTime.Now && a.Users.Contains(user));
            return Json(marquee);
        }
    }
}
