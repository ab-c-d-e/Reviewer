using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Reviewer.Models
{
    public class Reviewers
    {
        [Key]
        public int ID { get; set; }

        [Required]
        public string Type { get; set; }

        public string Description { get; set; }

        public List<Genre> Genre { get; set; }
        [JsonIgnore]
        public List<Author>  Authors { get;set; }
    }
}