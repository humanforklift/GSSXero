using GSSXeroApi.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSSXeroApi.Models.DTOs.Requests.Timesheet
{
    public class TimesheetRequest
    {
        public int? TimesheetId { get; set; }
        public DateTime Date { get; set; }
        public int EmployeeId { get; set; }
        public List<TimesheetRowRequest> TimesheetRows { get; set; }
    }
}
