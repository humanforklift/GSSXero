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
    }
}
