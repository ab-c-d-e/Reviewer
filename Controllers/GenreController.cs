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
    public class GenreController : ControllerBase
    {
        public ReviewerContext Context { get; set; }

        public GenreController(ReviewerContext context)
        {
            Context = context;
        }

        [Route("AddNewGenre/{ID}")]
        [HttpPost]
        public async Task<ActionResult> addNewGenre(int ID,[FromBody] Genre genre)
        {
            if(genre==null)
            {
                return BadRequest("Genre doesnt exist!");
            }
            if (string.IsNullOrEmpty(genre.Title))
            {
                return BadRequest("Title must be added!");
            }
            if (genre.Title.Length >50)
            {
                return BadRequest("Title Must be less than 50");
            }
            try
            {
                var reviewer = Context.Reviewers.Where(pReviewer=> pReviewer.ID == ID).FirstOrDefault();
                if (reviewer == null)
                {
                    return BadRequest("Reviewer does not exist!");
                }
                genre.Reviewer=reviewer;
                Context.Genres.Add(genre);
                await Context.SaveChangesAsync();
                return Ok(genre);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("GetGenre/{ID}")]
        [HttpGet]
        public async Task<ActionResult> getGenre(int ID)
        {
            try
            {
                var genre = await Context.Genres.Where(pGen=>pGen.ID==ID).ToArrayAsync();
                if(genre==null&&genre.Count()==0)
                {
                    return BadRequest("Genre Does Not Exist!");
                }
                return Ok(
                    genre.Select(pGen =>
                    new
                    {
                        ID = pGen.ID,
                        Title = pGen.Title,
                        Url = pGen.Url
                    }).ToList()
                    );
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("GetGenreObjects/{ID}")]
        [HttpGet]
        public async Task<ActionResult> getGenreObjects(int ID)
        {
            try
            {
                if(!Context.Genres.Any(g => g.ID == ID))
                {
                    return BadRequest("Genre Does Not Exist!");
                }
                return Ok
                (
                   await  Context.GenreObjects
                    .Where(pGenres=>pGenres.Genre.ID==ID)
                    .Select(pObject =>
                    new
                    {
                        ID = pObject.Object.ID,
                        Title = pObject.Object.Title,
                        Url = pObject.Object.Url,
                        Date=pObject.Object.Date,
                        Description = pObject.Object.Description,
                        Avrage = pObject.Object.Avrage,
                        AvrageRegular=pObject.Object.AvrageRegular,
                        AvrageCritic=pObject.Object.AvrageCritic
                    }).ToListAsync()
                );
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("GetAllGenres/{ID}")]
        [HttpGet]
        public async Task<ActionResult> getAllGenres(int ID)
        {
            try
            {
                var genres = await Context.Genres.Where(pGenre=>pGenre.Reviewer.ID==ID).ToListAsync();
                return Ok(genres);
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
                if(!Context.Genres.Any(g => g.ID == ID))
                {
                    return BadRequest("Genre Does Not Exist!");
                }
                var objects=await Context.GenreObjects.Where(pObj=>pObj.Genre.ID==ID)
                .Include(pGO=>pGO.Object)
                .ToListAsync();

                var sorted=(from o in objects
                orderby o.Object.Date descending
                select o).Take(objects.Count());

                if(desc==false)
                {
                sorted=(from o in objects
                orderby o.Object.Date ascending
                select o).Take(objects.Count());
                }
                return Ok
                (
                   sorted.Select(pObject =>
                    new
                    {
                        ID = pObject.Object.ID,
                        Title = pObject.Object.Title,
                        Url = pObject.Object.Url,
                        Date=pObject.Object.Date,
                        Description = pObject.Object.Description,
                        Avrage = pObject.Object.Avrage,
                        AvrageRegular=pObject.Object.AvrageRegular,
                        AvrageCritic=pObject.Object.AvrageCritic
                    }).ToList()
                );
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("SortedObjectsGrade/{ID}/{desc}")]
        [HttpGet]
        public async Task<ActionResult> sortedObjectsGrade(int ID, bool desc)
        {
            try
            {
                if(!Context.Genres.Any(g => g.ID == ID))
                {
                    return BadRequest("Genre Does Not Exist!");
                }
                var objects=await Context.GenreObjects.Where(pObj=>pObj.Genre.ID==ID)
                .Include(pObj=>pObj.Object)
                .ToListAsync();

                var sorted=(from o in objects
                orderby o.Object.Avrage descending
                select o).Take(objects.Count());

                if(desc==false)
                {
                sorted=(from o in objects
                orderby o.Object.Avrage ascending
                select o).Take(objects.Count());
                }
                return Ok
                (
                   sorted.Select(pObject =>
                    new
                    {
                        ID = pObject.Object.ID,
                        Title = pObject.Object.Title,
                        Url = pObject.Object.Url,
                        Date=pObject.Object.Date,
                        Description = pObject.Object.Description,
                        Avrage = pObject.Object.Avrage,
                        AvrageRegular=pObject.Object.AvrageRegular,
                        AvrageCritic=pObject.Object.AvrageCritic
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