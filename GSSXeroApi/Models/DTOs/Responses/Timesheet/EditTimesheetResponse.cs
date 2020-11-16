using GSSXeroApi.Models.DTOs.Requests.Timesheet;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSSXeroApi.Models.DTOs.Responses.Timesheet
{
    public class EditTimesheetResponse
    {
        public int TimesheetId { get; set; }
        public DateTime Date { get; set; }
        public int EmployeeId { get; set; }
        public List<TimesheetRowResponse> TimesheetRows { get; set; }
    }
}
