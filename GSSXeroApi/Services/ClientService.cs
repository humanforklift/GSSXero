using GSSXeroApi.Models;
using GSSXeroApi.Models.DTOs.Responses;
using GSSXeroApi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSSXeroApi.Services
{
    public class ClientService : IClientService
    {
        private readonly GSSXeroDbContext _context;

        public ClientService(GSSXeroDbContext context)
        {
            _context = context;
        }

        public async Task<List<ClientResponse>> GetClientsAsync()
        {
            var clients = await _context.Clients.Select(c => new ClientResponse
            {
                ClientId = c.ClientId,
                Name = c.Name
            }).ToListAsync();

            return clients;
        }
    }
}
