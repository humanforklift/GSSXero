using GSSXeroApi.Mappers;
using GSSXeroApi.Models;
using GSSXeroApi.Models.DTOs.Requests.Timesheet;
using GSSXeroApi.Models.DTOs.Responses.Timesheet;
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

        public async Task<List<TimesheetResponse>> GetOpenTimesheets(int employeeId)
        {
            return await _context.Timesheets
                .Where(t => t.Status == TimesheetStatus.Open && t.EmployeeId == employeeId)
                .Select(t => t.ToDto())
                .ToListAsync();
        }

        public async Task<EditTimesheetResponse> GetTimesheetById(int timesheetId)
        {
            var clients = await _context.Clients.ToListAsync();

            return await _context.Timesheets
                .Where(t => t.TimesheetId == timesheetId)
                .Include(t => t.TimesheetRows)
                .Select(t => t.ToDto(clients))
                .SingleOrDefaultAsync();
        }

        public async Task UpdateTimesheetAsync(TimesheetRequest timesheet)
        {
            var entity = await _context.Timesheets
                .Include(t => t.TimesheetRows)
                .SingleOrDefaultAsync(t => t.TimesheetId == timesheet.TimesheetId);

            entity.TimesheetRows = timesheet.TimesheetRows
                .Select(t => t.ToEntity(_context)).ToList();

            await _context.SaveChangesAsync();
        }
    }
}
