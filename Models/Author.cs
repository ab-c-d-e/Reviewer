using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;

namespace Reviewer.Models
{
    public class Author
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string LastName { get; set; }

        public string Url { get; set; }
        
        public string About { get; set; }
    [JsonIgnore]
        public Reviewers Reviewer { get; set; }
        public List<ReviewedObject> Object { get; set; }
    }
}