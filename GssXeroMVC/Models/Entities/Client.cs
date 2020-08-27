﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GssXeroMVC.Models.Entities
{
    public class Client
    {
        public int ClientId { get; set; }
        public string Name { get; set; }

        // EF relationship definition
        public ICollection<Timesheet> Timesheets { get; set; }
    }
}
