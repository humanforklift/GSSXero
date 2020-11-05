using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GSSXeroApi.Models.DTOs.Requests.Timesheet;
using GSSXeroApi.Models.Entities;
using GSSXeroApi.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GSSXeroApi.Controllers
{
    [Route("api/Timesheet")]
    [ApiController]
    public class TimesheetController : ControllerBase
    {
        private readonly ITimesheetService _timesheetService;

        public TimesheetController(ITimesheetService timesheetService)
        {
            _timesheetService = timesheetService;
        }

        // GET: api/Timesheet
        [HttpGet]
        public async Task<IEnumerable<TimesheetRequest>> GetTimesheets(int employeeId)
        {
            return await _timesheetService.GetOpenTimesheets(employeeId);
        }

        // POST: api/Timesheet
        [HttpPost]
        public async Task<IActionResult> SaveTimesheetAsync([FromBody] TimesheetRequest timesheet)
        {
            try
            {
                await _timesheetService.SaveTimesheetAsync(timesheet);

                return Ok();
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }
    }
}