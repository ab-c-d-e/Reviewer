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

        [Route("AddNewObject/{IDReviewer}/{JMBGUser}")]
        [HttpPost]
        public async Task<ActionResult> addNewObject(int IDReviewer, string JMBGUser, [FromBody] ReviewedObject objectR)
        {

            var reviewer = await Context.Reviewers.FindAsync(IDReviewer);

            if (reviewer == null)
            {
                return BadRequest("Not A Good reviewer ID!");
            }
            if (JMBGUser.Length != 13)
            {
                return BadRequest("JMBG must be a 13 digit string!");
            }
            if (objectR.Title.Length > 50 || string.IsNullOrEmpty(objectR.Title))
            {
                return BadRequest("Not a Valid Title!");
            }
            if (IDReviewer < 0)
            {
                return BadRequest("Not a valid ID for Reviewer!");
            }
            try
            {
                var user = Context.Users.Where(pUser => pUser.JMBG == JMBGUser).FirstOrDefault();
                if (user == null)
                {
                    return BadRequest("User does not exist!");
                }
                var reviewers = Context.Reviewers.Where(pUser => pUser.ID == IDReviewer)
                .Include(pReview => pReview.SuperUser);

                var revMain = await reviewers.FirstAsync();

                var superUserMain = await Context.Users.Where(pUs => pUs.ID == revMain.SuperUser.ID).FirstAsync();

                if (superUserMain.ID != user.ID)
                {
                    return BadRequest($"Only a creator of Reviewer can add an Object!{superUserMain.UserName}");
                }
                objectR.Reviewer = reviewer;
                Context.Objects.Add(objectR);
                await Context.SaveChangesAsync();
                return Ok($"New Object Successfully Added: {objectR.ID}!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("DeleteObject/{JMBGUser}/{IDObj}")]
        [HttpDelete]
        public async Task<ActionResult> deleteObject(string JMBGUser, int IDObj)
        {
            if (JMBGUser.Length != 13)
            {
                return BadRequest("JMBG must be a 13 digit number!");
            }
            if (IDObj < 0)
            {
                return BadRequest("Not a Correct ID");
            }
            try
            {
                var user = await Context.Users.Where(pUser => pUser.JMBG == JMBGUser).FirstOrDefaultAsync();
                if (user == null)
                {
                    return BadRequest("This user doesn't exist!");
                }
                var objectForDelete = await Context.Objects.Where(pObj => pObj.ID == IDObj)
                                    .Include(pObject => pObject.Reviewer)
                                    .ThenInclude(pReviewer => pReviewer.SuperUser)
                                    .FirstOrDefaultAsync();
                if (objectForDelete == null)
                {
                    return BadRequest("Not Funny");
                }
                if (objectForDelete.Reviewer.SuperUser.ID != user.ID)
                {
                    return BadRequest("User not allowed to delete this Object");
                }
                var reviews = await Context.Reviews.Where(pReview => pReview.Object.ID == IDObj).ToListAsync();

                reviews.ForEach(pReview =>
                {
                    Context.Reviews.Remove(pReview);
                });
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
                var AllAboutObject = Context.Objects.Where(pObject => pObject.ID == ID)
                    .Include(pObj => pObj.Reviews)
                    .ThenInclude(pReview => pReview.User);

                var objects = await AllAboutObject.ToListAsync();

                return Ok
                (
                    objects.Select(pObject =>
                    new
                    {
                        ID = pObject.ID,
                        Title = pObject.Title,
                        Author = pObject.Author,
                        ImageUrl = pObject.ImageUrl,
                        Description = pObject.Description,
                        AvrageGrade = pObject.AvrageGrade,
                        Reviews = pObject.Reviews
                            .Select(pReview =>
                            new
                            {
                                Grade = pReview.Grade,
                                DateOfAdding = pReview.DateOfAdding,
                                BodyOfReview = pReview.BodyOfReview,
                                UserName = pReview.User.UserName
                            })
                    }).ToList()
                );
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("GetAllObjects")]
        [HttpGet]
        public async Task<ActionResult> getAllObjects()
        {
            try
            {
                var objects = await Context.Objects.ToListAsync();
                return Ok(objects);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}
