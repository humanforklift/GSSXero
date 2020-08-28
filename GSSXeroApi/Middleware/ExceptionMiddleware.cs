using GSSXeroApi.Exceptions;
using GSSXeroApi.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace GSSXeroApi.Middleware
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (InvalidLoginException invalidLoginEx)
            {
                await HandleExceptionAsync(httpContext, invalidLoginEx, true);
            }
            catch (BusinessRuleException ex)
            {
                /* log error with any injected LOGGER here */
                await HandleBusinessRuleExceptionAsync(httpContext, ex);
            }
            catch (Exception ex)
            {
                /* log error with any injected LOGGER here */
                await HandleExceptionAsync(httpContext, ex);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception exception, bool invalidLogin = false)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            var message = $"{exception.Message}";
            if (exception.InnerException != null)
                message += $"\n\n Inner exception: {exception.InnerException.Message}";

            return context.Response.WriteAsync(new ExceptionData()
            {
                StatusCode = context.Response.StatusCode,
                Message = message,
                InvalidLogin = invalidLogin,
            }.ToString());
        }

        private static Task HandleBusinessRuleExceptionAsync(HttpContext context, BusinessRuleException exception, bool invalidLogin = false)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            var message = $"{exception.Message}";
            if (exception.InnerException != null)
                message += $"\n\n Inner exception: {exception.InnerException.Message}";

            return context.Response.WriteAsync(new ExceptionData()
            {
                StatusCode = context.Response.StatusCode,
                Message = message,
                Title = exception.Title,
                InvalidLogin = invalidLogin,
            }.ToString());
        }
    }
}
