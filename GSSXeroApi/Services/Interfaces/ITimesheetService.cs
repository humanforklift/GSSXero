using GSSXeroApi.Models.DTOs.Requests.Timesheet;
using GSSXeroApi.Models.DTOs.Responses.Timesheet;
using GSSXeroApi.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSSXeroApi.Services.Interfaces
{
    public interface ITimesheetService
    {
        List<Timesheet> GetTimesheets();
        Task SaveTimesheetAsync(TimesheetRequest timesheet);
        Task<List<TimesheetResponse>> GetOpenTimesheets(int employeeId);
        Task<EditTimesheetResponse> GetTimesheetById(int timesheetId);
        Task UpdateTimesheetAsync(TimesheetRequest timesheet);
    }
}
