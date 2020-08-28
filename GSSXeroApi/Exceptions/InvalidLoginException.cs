using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GSSXeroApi.Exceptions
{
    public class InvalidLoginException : Exception
    {
        public InvalidLoginException(string message) : base(message)
        {

        }
    }
}
