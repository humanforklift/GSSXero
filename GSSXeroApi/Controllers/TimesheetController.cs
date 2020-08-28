using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    }
}