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
        public ActionResult<IEnumerable<Timesheet>> GetTimesheets()
        {
            return _timesheetService.GetTimesheets();
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