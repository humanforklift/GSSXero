using GSSXeroApi.Mappers;
using GSSXeroApi.Models.DTOs.Requests.Timesheet;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Permissions;
using System.Threading.Tasks;

namespace GSSXeroApi.Models.Entities
{
    public class Timesheet
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int TimesheetId { get; set; }
        public DateTime Date { get; set; }
        public TimesheetStatus Status { get; set; }
        public List<TimesheetRow> TimesheetRows { get; set; }

        // EF relationship definition
        public int EmployeeId { get; set; }

        public Timesheet()
        {
        }
    }

    public enum TimesheetStatus
    {
        Open,
        Submitted,
        Archived
    }
}
