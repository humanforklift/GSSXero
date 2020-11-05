using GSSXeroApi.Models.DTOs.Requests.Timesheet;
using GSSXeroApi.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSSXeroApi.Mappers
{
    public static class ToDtoExtensions
    {
        public static TimesheetRequest ToDto(this Timesheet timesheet)
        {
            return new TimesheetRequest
            {
                Date = timesheet.Date
            };
        }
    }
}
