using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace GSSXeroApi.Models.Entities
{
    public class TimesheetRow
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int? ClientId { get; set; }
        public double Duration { get; set; }
        public string Notes { get; set; }

        // EF relationship definition
        public int TimesheetId { get; set; }
    }
}
