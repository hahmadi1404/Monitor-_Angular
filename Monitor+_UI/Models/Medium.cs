using System;
using System.Collections.Generic;

#nullable disable

namespace Monitor__UI.Models
{
    public partial class Medium
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? CreateDatetime { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string FileName { get; set; }
        public string Type { get; set; }
        public string Users { get; set; }
        public int CreateUser { get; set; }
        public bool? IsActive { get; set; }
    }
}
