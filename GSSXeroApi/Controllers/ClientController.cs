using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GSSXeroApi.Models.DTOs.Responses;
using GSSXeroApi.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GSSXeroApi.Controllers
{
    [Route("api/Client")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        private readonly IClientService _clientService;
        public ClientController(IClientService clientService)
        {
            _clientService = clientService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClientResponse>>> GetClients()
        {
            return await _clientService.GetClientsAsync();
        }
    }
}