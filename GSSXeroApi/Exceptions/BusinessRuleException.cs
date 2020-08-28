using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSSXeroApi.Exceptions
{
    public class BusinessRuleException : Exception
    {
        public string Title { get; set; }
        public BusinessRuleException(string message, string title = null) : base(message)
        {
            Title = title;
        }
    }
}
