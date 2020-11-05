using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSSXeroApi.Models.DTOs.Requests.Timesheet
{
    public class TimesheetRowRequest
    {
        public int? TimesheetRowId { get; set; }
        public string Date { get; set; }
        public int ClientId { get; set; }
        public string ClientName { get; set; }
        public double Duration { get; set; }
        public string Notes { get; set; }

        // EF relationship definition
        public int TimesheetId { get; set; }
    }
}
