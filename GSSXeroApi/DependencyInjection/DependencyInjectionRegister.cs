using GSSXeroApi.Services;
using GSSXeroApi.Services.Interfaces;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSSXeroApi.DependencyInjection
{
    public static class DependencyInjectionRegister
    {
        public static IServiceCollection RegisterServices(this IServiceCollection services)
        {
            services.AddScoped<ITimesheetService, TimesheetService>();
            services.AddScoped<IClientService, ClientService>();

            return services;
        }
    }
}
