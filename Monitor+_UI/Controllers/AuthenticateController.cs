
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Security.Cryptography;
using Monitor__UI.Models;

namespace Monitor__UI.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    [Produces("application/json")]
    public class AuthenticateController : Controller
    {

        DB_Context dbcontext;
        public  AuthenticateController(DB_Context _Context)
        {
            dbcontext = _Context;
        }

        [HttpPost]
        public User Authenticate(AuthenticateModel model)
        {

            var usert=dbcontext.Users.FirstOrDefault(a => a.UserName == model.Username && a.Password == model.Password);
            if(usert == null)return null;
            User user = new User();
            user.UserName = usert.UserName;
            user.UserId= usert.UserId; 
            
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("Monitor+ auth key111111111111111111111111111111111111111111111111");
            var Subject = new ClaimsIdentity(new Claim[]
               {
                    new Claim(ClaimTypes.NameIdentifier, usert.UserId.ToString()),
                    new Claim(ClaimTypes.Name, usert.UserName)
               });
            var SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = Subject,
                Expires = DateTime.UtcNow.Add(new TimeSpan(20, 00, 10)),
                SigningCredentials = SigningCredentials,
                //Issuer = "Kavosh 3 HostGuest Issuer",
                //Audience = "Kavosh 3 HostGuest Audience",
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);

            string tokenString = tokenHandler.WriteToken(token);
            usert.Password = tokenString;
            //tokens.Add(new Tokens
            //{
            //    tokenString = tokenString,
            //    createDateTime = DateTime.Now,
            //});
            return usert;
        }

        [Authorize]
        [HttpGet]
        public bool AuthenticateCheck()
        {
            return true;
        }
    }
}
