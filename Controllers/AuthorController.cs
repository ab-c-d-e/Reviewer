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
                return Ok(author);
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
                var author = await Context.Authors.FindAsync(ID);
                if(author==null)
                {
                    return BadRequest("Author Does Not Exist!");
                }
                return Ok
                (author);
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

        [Route("SortedObjectsDate/{ID}/{desc}")]
        [HttpGet]
        public async Task<ActionResult> sortedObjectsDate(int ID, bool desc)
        {
            try
            {
                if(!Context.Authors.Any(g => g.ID == ID))
                {
                    return BadRequest("Author Does Not Exist!");
                }
                var objects=await Context.Objects.Where(pObj=>pObj.Author.ID==ID).ToListAsync();

                var sorted=(from o in objects
                orderby o.Date descending
                select o).Take(objects.Count());

                if(desc==false)
                {
                sorted=(from o in objects
                orderby o.Date ascending
                select o).Take(objects.Count());
                }
                return Ok
                (
                   sorted.Select(pObject =>
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
                    }).ToList()
                );
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("SortedObjectsAvrage/{ID}/{desc}")]
        [HttpGet]
        public async Task<ActionResult> sortedObjectsAvrage(int ID, bool desc)
        {
            try
            {
                if(!Context.Authors.Any(g => g.ID == ID))
                {
                    return BadRequest("Author Does Not Exist!");
                }
                var objects=await Context.Objects.Where(pObj=>pObj.Author.ID==ID).ToListAsync();

                var sorted=(from o in objects
                orderby o.Avrage descending
                select o).Take(objects.Count());

                if(desc==false)
                {
                sorted=(from o in objects
                orderby o.Avrage ascending
                select o).Take(objects.Count());
                }
                return Ok
                (
                   sorted.Select(pObject =>
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
                    }).ToList()
                );
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}