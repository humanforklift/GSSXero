using GSSXeroApi.Models;
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
            var list = new List<Timesheet>()
            {
                new Timesheet
                {
                    TimesheetId = 1,
                    ClientId = 3,
                    Date = DateTime.Now,
                    Duration = 5,
                    EmployeeId = 7,
                    Notes = "Worked on ESI stuff"
                }
            };
            
            return list;
        }
    }
}
