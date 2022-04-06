using System;
using System.Collections.Generic;

#nullable disable

namespace Monitor__UI.Models
{
    public partial class Marquee
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? CreateDatetime { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string Text { get; set; }
        public string Users { get; set; }
        public int CreateUser { get; set; }
        public bool? IsActive { get; set; }
    }
}
