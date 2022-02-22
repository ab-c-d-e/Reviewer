using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;

namespace Reviewer.Models
{
    public class GenreObject
    {
        [Key]
        public int ID { get; set; }
        public ReviewedObject Object { get; set; }
        public Genre Genre { get; set; }
    }
}