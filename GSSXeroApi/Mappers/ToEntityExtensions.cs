using GSSXeroApi.Models;
using GSSXeroApi.Models.DTOs.Requests.Timesheet;
using GSSXeroApi.Models.Entities;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace GSSXeroApi.Mappers
{
    internal static class ToEntityExtensions
    {
        public static Timesheet ToEntity(this TimesheetRequest timesheetDto, GSSXeroDbContext context)
        {
            return new Timesheet
            {
                Date = timesheetDto.Date,
                EmployeeId = timesheetDto.EmployeeId,
                Status = TimesheetStatus.Open,
                TimesheetRows = timesheetDto.TimesheetRows.Select(t => t.ToEntity(context)).ToList()
            };
        }

        public static TimesheetRow ToEntity(this TimesheetRowRequest timesheetRowDto, GSSXeroDbContext context)
        {
            if (context is null) throw new ArgumentNullException(nameof(context));
            
            return new TimesheetRow
            { 
                Id = timesheetRowDto.TimesheetRowId ?? 0,
                Date = DateTime.Parse(timesheetRowDto.Date, new CultureInfo("en-NZ")),
                ClientId = timesheetRowDto.ClientName == "" ? null : (int?) context.Clients.First(c => c.Name == timesheetRowDto.ClientName).ClientId,
                Duration = timesheetRowDto.Duration,
                Notes = timesheetRowDto.Notes,
                TimesheetId = timesheetRowDto.TimesheetId
            };
        }
    }
}
