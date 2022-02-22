using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Reviewer.Models;

namespace Reviewer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthorController : ControllerBase
    {
        public ReviewerContext Context { get; set; }

        public AuthorController(ReviewerContext context)
        {
            Context = context;
        }

        [Route("AddNewAuthor/{ID}")]
        [HttpPost]
        public async Task<ActionResult> addNewAuthor(int ID,[FromBody] Author author)
        {
            if(author==null)
            {
                return BadRequest("Author doesnt exist!");
            }
            if (string.IsNullOrEmpty(author.Name) || string.IsNullOrEmpty(author.LastName))
            {
                return BadRequest("Name and Last Name must be added!");
            }
            if (author.Name.Length >50 || author.LastName.Length >50)
            {
                return BadRequest("Name and Last Name Must be less than 50");
            }
            try
            {
                var reviewer = Context.Reviewers.Where(pReviewer=> pReviewer.ID == ID).FirstOrDefault();
                if (reviewer == null)
                {
                    return BadRequest("Reviewer does not exist!");
                }
                author.Reviewer=reviewer;
                Context.Authors.Add(author);
                await Context.SaveChangesAsync();
                return Ok("New Author Successfully Added");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("GetAuthor/{ID}")]
        [HttpGet]
        public async Task<ActionResult> getAuthor(int ID)
        {
            try
            {
                var author = Context.Authors
                .Where(pAuthor=>pAuthor.ID==ID);
                if(author==null)
                {
                    return BadRequest("Author Does Not Exist!");
                }
                return Ok
                (
                    await author.Select(pAuthor =>
                    new
                    {
                        ID = pAuthor.ID,
                        Name = pAuthor.Name,
                        LastName=pAuthor.LastName,
                        Url = pAuthor.Url
                    }).ToListAsync()
                );
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("GetAuthorObjects/{ID}")]
        [HttpGet]
        public async Task<ActionResult> getAuthorObjects(int ID)
        {
            try
            {
                if(!Context.Authors.Any(a => a.ID == ID))
                {
                    return BadRequest("Author Does Not Exist!");
                }
                return Ok
                (
                   await  Context.Objects
                    .Where(pObject=>pObject.Author.ID==ID)
                    .Select(pObject =>
                    new
                    {
                        ID = pObject.ID,
                        Title = pObject.Title,
                        Url = pObject.Url,
                        Date=pObject.Date,
                        Description = pObject.Description,
                        Avrage = pObject.Avrage,
                        AvrageRegular=pObject.AvrageRegular,
                        AvrageCritic=pObject.AvrageCritic
                    }).ToListAsync()
                );
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("GetAllAuthors/{ID}")]
        [HttpGet]
        public async Task<ActionResult> getAllAuthors(int ID)
        {
            try
            {
                var authors = await Context.Authors.Where(pAuthor=>pAuthor.Reviewer.ID==ID).ToListAsync();
                return Ok(authors);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}