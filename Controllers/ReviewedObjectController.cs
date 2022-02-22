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
    public class ReviewedObjectController : ControllerBase
    {
        public ReviewerContext Context { get; set; }

        public ReviewedObjectController(ReviewerContext context)
        {
            Context = context;
        }

        [Route("AddNewObject/{IDAuthor}")]
        [HttpPost]
        public async Task<ActionResult> addNewObject(int IDAuthor, [FromQuery] int[] idGenre, string Title, string Description , string Url)
        {
            if (Title.Length > 50 || string.IsNullOrEmpty(Title))
            {
                return BadRequest("Not a Valid Title!");
            }
            try
            {
                var author = Context.Authors.Where(pAuthor => pAuthor.ID == IDAuthor).FirstOrDefault();
                if (author == null)
                {
                    return BadRequest("Author does not exist!");
                }
                var objectR= new ReviewedObject
                {
                    Date=DateTime.Now,
                    Url=Url,
                    Title=Title,
                    Description=Description,
                    Avrage=0,
                    AvrageCritic=0,
                    AvrageRegular=0,
                    Author=author
                };
                Context.Objects.Add(objectR);
                foreach(int gen in idGenre)
                {
                    GenreObject go=new GenreObject
                    {
                        Object=objectR,
                        Genre=await Context.Genres.FindAsync(gen)
                    };
                    Context.GenreObjects.Add(go);
                }
                await Context.SaveChangesAsync();
                return Ok($"New Object Successfully Added: {objectR.ID}!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("DeleteObject/{ID}")]
        [HttpDelete]
        public async Task<ActionResult> deleteObject(int ID)
        {
            try
            {
                var objectForDelete = await Context.Objects.FindAsync(ID);
                if (objectForDelete == null)
                {
                    return BadRequest("Object Does Not Exist");
                }
                var reviews =Context.Reviews.Where(pReview => pReview.Object.ID == ID);
                if(reviews.Count()>0)
                Context.Reviews.RemoveRange(reviews);
                var objectGenre =Context.GenreObjects.Where(pGenObj => pGenObj.Object.ID == ID)
                .Include(pGenreObject=>pGenreObject.Object)
                .Include(pGenreObject=>pGenreObject.Genre);
                if(objectGenre.Count()>0)
                Context.GenreObjects.RemoveRange(objectGenre);
                Context.Objects.Remove(objectForDelete);
                await Context.SaveChangesAsync();
                return Ok("Object and all it's reviews are successfully deleted");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("GetObject/{ID}")]
        [HttpGet]
        public async Task<ActionResult> getObject(int ID)
        {
            try
            {
                var objectGet = Context.Objects
                .Include(pObject=>pObject.Author)
                .Where(pObject=>pObject.ID==ID);
                if(objectGet==null)
                {
                    return BadRequest("Object Does Not Exist!");
                }
                return Ok
                (
                    await objectGet.Select(pObject =>
                    new
                    {
                        ID = pObject.ID,
                        Title = pObject.Title,
                        Url = pObject.Url,
                        Date=pObject.Date,
                        Description = pObject.Description,
                        Avrage = pObject.Avrage,
                        AvrageRegular=pObject.AvrageRegular,
                        AvrageCritic=pObject.AvrageCritic,
                        Author=new
                                {
                                    ID = pObject.Author.ID,
                                    Name= pObject.Author.Name,
                                    LastName = pObject.Author.LastName,
                                    Url= pObject.Author.Url
                                }
                    }).ToListAsync()
                );
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("GetObjectStats/{ID}")]
        [HttpGet]
        public async Task<ActionResult> getObjectStats(int ID)
        {
               try
            {
                if(!Context.Objects.Any(o => o.ID == ID))
                {
                    return BadRequest("Object Does Not Exist!");
                }
                var objectStat=await Context.Objects
                    .Where(pObject=>pObject.ID==ID)
                    .Include(pObject=>pObject.Reviews)
                    .ThenInclude(pReviews=>pReviews.User)
                    .ToListAsync();
                return Ok
                (
                    
                    objectStat.Select(pObject =>
                    new
                    {
                        One=pObject.Reviews.Count(r=>r.Grade==1),
                        Two=pObject.Reviews.Count(r=>r.Grade==2),
                        Three=pObject.Reviews.Count(r=>r.Grade==3),
                        Four=pObject.Reviews.Count(r=>r.Grade==4),
                        Five=pObject.Reviews.Count(r=>r.Grade==5),
                        Female=pObject.Reviews.Count(r=>r.User.Gender=='F'),
                        Male=pObject.Reviews.Count(r=>r.User.Gender=='M'),
                        Less20=pObject.Reviews.Count(r=>r.User.Age<=20),
                        Between2040=pObject.Reviews.Count(r=>r.User.Age>20 && r.User.Age<=40),
                        Between4060=pObject.Reviews.Count(r=>r.User.Age>40 && r.User.Age<=60),
                        More60=pObject.Reviews.Count(r=>r.User.Age>60)
                    }).ToList()
                );
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("GetObjectReviews/{ID}")]
        [HttpGet]
        public async Task<ActionResult> getObjectReviews(int ID)
        {
            try
            {
                if(!Context.Objects.Any(o => o.ID == ID))
                {
                    return BadRequest("Object Does Not Exist!");
                }
                return Ok
                (
                    await Context.Reviews
                    .Where(pReview=>pReview.Object.ID==ID)
                    .Select(pReview =>
                    new
                    {
                        ID=pReview.ID,
                        Spoiler=pReview.Spoiler,
                        Text=pReview.Text,
                        Grade=pReview.Grade,
                        Date=pReview.Date

                    }).ToListAsync()
                );
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("GetObjectGenres/{ID}")]
        [HttpGet]
        public async Task<ActionResult> getObjectGenres(int ID)
        {
            try
            {
                if(!Context.Objects.Any(o => o.ID == ID))
                {
                    return BadRequest("Object Does Not Exist!");
                }
                return Ok
                (
                   await  Context.GenreObjects
                    .Where(pGenres=>pGenres.Object.ID==ID)
                    .Select(pGenres =>
                    new
                    {
                        ID=pGenres.Genre.ID,
                        UrlGenre=pGenres.Genre.Url,
                        TitleGenre=pGenres.Genre.Title
                    }).ToListAsync()
                );
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("GetObjectSearch/{ID}")]
        [HttpGet]
        public async Task<ActionResult> getAllObjects(int ID, string search)
        {
            try
            {
                var objects = await Context.Objects.Where(pObj=>pObj.Author.Reviewer.ID==ID).Where(pObject=>pObject.Title.Contains(search)||search==null).ToListAsync();
                return Ok(objects);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("GetAllObjects/{ID}")]
        [HttpGet]
        public async Task<ActionResult> getAllObjects(int ID)
        {
            try
            {
                var objects = await Context.Objects.Where(pObj=>pObj.Author.Reviewer.ID==ID).ToListAsync();
                return Ok(objects);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("AddGenras/{ID}")]
        [HttpPut]
        public async Task<ActionResult> addGenras(int ID, [FromQuery] int []idGenre)
        {
            try
            {
                var objects = await Context.Objects
                .Where(pObj=>pObj.ID==ID)
                .Include(pObj=>pObj.Genres)
                .ThenInclude(pGen=>pGen.Genre)
                .FirstAsync();

                foreach(int gen in idGenre)
                {
                    if(objects.Genres.Count(pGen=>pGen.Genre.ID==gen)==0)
                    {
                    GenreObject go=new GenreObject
                    {
                        Object=objects,
                        Genre=await Context.Genres.FindAsync(gen)
                    };
                    Context.GenreObjects.Add(go);
                    }
                    
                }
                await Context.SaveChangesAsync();
                return Ok("New Genres Added");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("DeleteGenras/{ID}")]
        [HttpPut]
        public async Task<ActionResult> deleteGenras(int ID, [FromQuery] int []idGenre)
        {
            try
            {
                var objects = await Context.Objects
                .Where(pObj=>pObj.ID==ID)
                .Include(pObj=>pObj.Genres)
                .ThenInclude(pGen=>pGen.Genre)
                .FirstAsync();

                foreach(int gen in idGenre)
                {
                    var go=Context.GenreObjects.Where(pGenObj=>pGenObj.Genre.ID==gen);
                    if(go!=null)
                    Context.GenreObjects.RemoveRange(go);
                }
                await Context.SaveChangesAsync();
                return Ok("Genres Deleted");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}