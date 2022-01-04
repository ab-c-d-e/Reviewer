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
    public class UserController : ControllerBase
    {
        public ReviewerContext Context { get; set; }

        public UserController(ReviewerContext context)
        {
            Context = context;
        }

        [Route("AddNewUser")]
        [HttpPost]
        public async Task<ActionResult> addNewUser([FromBody] User user)
        {
            if (string.IsNullOrEmpty(user.UserName) || string.IsNullOrEmpty(user.JMBG))
            {
                return BadRequest("UserName and JMBG must be added!");
            }
            if (user.JMBG.Length != 13)
            {
                return BadRequest("JMBG must be a 13 digit number!");
            }

            try
            {
                user.DateOfAdding = DateTime.Now;
                var users = await Context.Users.Where(pUser => pUser.JMBG == user.JMBG).FirstOrDefaultAsync();
                if (users != null)
                {
                    return BadRequest("User alredy exists!");
                }
                Context.Users.Add(user);
                await Context.SaveChangesAsync();
                return Ok($"New User Successfully Added: {user.DateOfAdding}!");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("DeleteUser/{JMBG}")]
        [HttpDelete]
        public async Task<ActionResult> deleteUser(string JMBG)
        {
            if (JMBG.Length != 13)
            {
                return BadRequest("JMBG must be a 13 digit number!");
            }
            try
            {
                var user = await Context.Users.Where(pUser => pUser.JMBG == JMBG).FirstOrDefaultAsync();
                if (user == null)
                {
                    return BadRequest("This user doesn't exist!");
                }
                var reviews = await Context.Reviews.Where(pReview => pReview.User.ID == user.ID).ToListAsync();
                reviews.ForEach(pReview =>
                {
                    Context.Reviews.Remove(pReview);
                });
                if (user != null)
                {
                    Context.Users.Remove(user);
                    await Context.SaveChangesAsync();
                    return Ok("User and all it's reviews are successfully deleted");
                }
                else
                {
                    return BadRequest("User Not Found!");
                }

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("GetUser/{ID}")]
        [HttpGet]
        public async Task<ActionResult> getUser(int ID)
        {
            try
            {
                var allAboutUser = Context.Users.Where(pUser => pUser.ID == ID)
                    .Include(pUser => pUser.Reviews)
                    .ThenInclude(pReview => pReview.Object);

                var user = await allAboutUser.ToListAsync();

                return Ok
                (
                    user.Select(pUser =>
                    new
                    {
                        JMBG = pUser.JMBG,
                        Name = pUser.Name,
                        LastName = pUser.LastName,
                        DateOfAdding = pUser.DateOfAdding,
                        Reviews = pUser.Reviews
                            .Select(pReview =>
                            new
                            {
                                Grade = pReview.Grade,
                                DateOfAdding = pReview.DateOfAdding,
                                BodyOfReview = pReview.BodyOfReview,
                                ObjectName = pReview.Object.Title
                            })
                    }).ToList()
                );
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("GetAllUsers")]
        [HttpGet]
        public async Task<ActionResult> getAllUsers()
        {
            try
            {
                var users = await Context.Users.ToListAsync();
                return Ok(users);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }

}