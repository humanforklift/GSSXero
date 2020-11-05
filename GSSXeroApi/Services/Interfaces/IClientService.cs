using GSSXeroApi.Models.DTOs.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSSXeroApi.Services.Interfaces
{
    public interface IClientService
    {
        Task<List<ClientResponse>> GetClientsAsync();
    }
}
