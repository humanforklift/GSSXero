using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSSXeroApi.Models.Entities
{
    public class Timesheet
    {
        public int TimesheetId { get; set; }
        public DateTime Date { get; set; }
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public double Duration { get; set; }
        public string Notes { get; set; }

        // EF relationship definition
        public int EmployeeId { get; set; }
        public int ClientId { get; set; }
    }
}
