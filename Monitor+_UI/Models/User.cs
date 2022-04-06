using System;
using System.Collections.Generic;

#nullable disable

namespace Monitor__UI.Models
{
    public partial class User
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public DateTime? CreateDatetime { get; set; }
        public int CreateUser { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsAdmin { get; set; }
    }
}
