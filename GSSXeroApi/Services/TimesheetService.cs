using GSSXeroApi.Mappers;
using GSSXeroApi.Models;
using GSSXeroApi.Models.DTOs.Requests.Timesheet;
using GSSXeroApi.Models.Entities;
using GSSXeroApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSSXeroApi.Services
{
    public class TimesheetService : ITimesheetService
    {
        private readonly GSSXeroDbContext _context;

        public TimesheetService(GSSXeroDbContext context)
        {
            _context = context;
        }

        public List<Timesheet> GetTimesheets()
        {
            var list = new List<Timesheet>();
            
            return list;
        }

        public async Task SaveTimesheetAsync(TimesheetRequest timesheet)
        {
            var entity = timesheet.ToEntity(_context);

            _context.Timesheets.Add(entity);
            _context.TimesheetRows.AddRange(entity.TimesheetRows);

            await _context.SaveChangesAsync();
        }

        public async Task<List<TimesheetRequest>> GetOpenTimesheets(int employeeId)
        {
            return await _context.Timesheets
                .Where(t => t.Status == TimesheetStatus.Open && t.EmployeeId == employeeId)
                .Select(t => t.ToDto())
                .ToListAsync();
        }
    }
}
