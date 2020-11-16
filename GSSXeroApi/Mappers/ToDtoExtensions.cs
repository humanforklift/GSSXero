using GSSXeroApi.Models.DTOs.Requests.Timesheet;
using GSSXeroApi.Models.DTOs.Responses.Timesheet;
using GSSXeroApi.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSSXeroApi.Mappers
{
    public static class ToDtoExtensions
    {
        public static TimesheetResponse ToDto(this Timesheet timesheet/*, List<Client> clients*/)
        {
            return new TimesheetResponse
            {
                TimesheetId = timesheet.TimesheetId,
                Date = timesheet.Date            };
        }        
        
        public static EditTimesheetResponse ToDto(this Timesheet timesheet, List<Client> clients)
        {
            return new EditTimesheetResponse
            {
                TimesheetId = timesheet.TimesheetId,
                Date = timesheet.Date,
                TimesheetRows = timesheet.TimesheetRows.ToDto(clients)
            };
        }

        private static List<TimesheetRowResponse> ToDto(this List<TimesheetRow> timesheetRows, List<Client> clients)
        {
            var list = new List<TimesheetRowResponse>();

            if (timesheetRows != null)
            {
                return timesheetRows.Select(x => new TimesheetRowResponse
                {
                    TimesheetRowId = x.Id,
                    ClientId = x.ClientId ?? 0,
                    ClientName = clients.FirstOrDefault(c => c.ClientId == x.ClientId)?.Name ?? "",
                    Date = x.Date.ToString("MMMM dd, yyyy"),
                    Duration = x.Duration,
                    Notes = x.Notes
                })
                .OrderBy(x => x.Date)
                .ToList();
            }

            return list;
        }
    }
}
