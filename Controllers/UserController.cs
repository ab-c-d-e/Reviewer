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
            if (string.IsNullOrEmpty(user.JMBG))
            {
                return BadRequest("JMBG must be added!");
            }
            if (user.JMBG.Length != 13)
            {
                return BadRequest("JMBG must be a 13 digit number!");
            }
            if(string.IsNullOrEmpty(user.Name)|| string.IsNullOrEmpty(user.LastName))
            {
                return BadRequest("Last And First Name must be added!");
            }
            if(user.Name.Length>50 || user.LastName.Length>50)
            {
                return BadRequest("Last and First Name can't be longer than 50 characters");
            }
            try
            {
                user.Age=DateTime.Now.Subtract(user.DateBirth).Days;
                user.Age/=365;
                int num=Context.Users.Where(pUser => pUser.JMBG == user.JMBG).Count();
                if (num>0)
                {
                    return BadRequest("User with this JMBG alredy exists!");
                }
                Context.Users.Add(user);
                await Context.SaveChangesAsync();
                return Ok($"New User Successfully Added");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("DeleteUser/{ID}")]
        [HttpDelete]
        public async Task<ActionResult> deleteUser(int ID)
        {
            try
            {
                var user = await Context.Users.FindAsync(ID);
                if (user != null)
                {
                    var Name=user.Name+" "+user.LastName;
                    var reviews =Context.Reviews.Where(pReview => pReview.User.ID == ID);
                    if(reviews.Count()>0)
                    Context.Reviews.RemoveRange(reviews);
                    Context.Users.Remove(user);
                    await Context.SaveChangesAsync();
                    return Ok($"User {Name} and all it's reviews are successfully deleted");
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

        [Route("ChangeUser")]
        [HttpPut]
        public async Task<ActionResult> changeUser([FromBody]User user)
        {
           if (string.IsNullOrEmpty(user.JMBG))
            {
                return BadRequest("JMBG must be added!");
            }
            if (user.JMBG.Length != 13)
            {
                return BadRequest("JMBG must be a 13 digit number!");
            }
            if(string.IsNullOrEmpty(user.Name)|| string.IsNullOrEmpty(user.LastName))
            {
                return BadRequest("Last And First Name must be added!");
            }
            if(user.Name.Length>50 || user.LastName.Length>50)
            {
                return BadRequest("Last and First Name can't be longer than 50 characters");
            }
            try
            {
                user.Age=DateTime.Now.Subtract(user.DateBirth).Days;
                user.Age/=365;
                Context.Users.Update(user);
                await Context.SaveChangesAsync();
                return Ok($"User Successfully Updated");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("GetUser{ID}")]
        [HttpGet]
        public async Task<ActionResult> getUser(int ID)
        {
            var user =Context.Users.Where(pUser=>pUser.ID==ID);
            try
            {
                if(!Context.Users.Any(u => u.ID == ID))
                {
                    return BadRequest("User Does Not Exist!");
                }
                return Ok
                ( 
                    await user.Select(pUser =>
                    new
                    {
                        ID = pUser.ID,
                        JMBG=pUser.JMBG,
                        DateBirth=pUser.DateBirth,
                        Name=pUser.Name,
                        LastName=pUser.LastName,
                        Url=pUser.ImageUrl,
                        Age=pUser.Age,
                        Critic=pUser.Critic,
                        Gender=pUser.Gender
                    }).ToListAsync()
                );
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("GetUserReviews/{ID}")]
        [HttpGet]
        public async Task<ActionResult> getUserReviews(int ID)
        {
            try
            {
                if(!Context.Users.Any(u => u.ID == ID))
                {
                    return BadRequest("User Does Not Exist!");
                }
                return Ok
                (
                    await Context.Reviews
                    .Where(pReview=>pReview.User.ID==ID)
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

        [Route("GetUserStats/{ID}")]
        [HttpGet]
        public async Task<ActionResult> getUserStats(int ID)
        {
            try
            {
                if(!Context.Users.Any(u => u.ID == ID))
                {
                    return BadRequest("User Does Not Exist!");
                }
                var reviews=await Context.Reviews
                    .Where(pReview=>pReview.User.ID==ID).ToListAsync();
                var user =Context.Users.Where(pUser=>pUser.ID==ID);
                return Ok
                (
                    
                    await user.Select(pUsers =>
                    new
                    {
                        One=pUsers.Reviews.Count(f=>f.Grade==1),
                        Two=pUsers.Reviews.Count(f=>f.Grade==2),
                        Three=pUsers.Reviews.Count(f=>f.Grade==3),
                        Four=pUsers.Reviews.Count(f=>f.Grade==4),
                        Five=pUsers.Reviews.Count(f=>f.Grade==5)
                    }).ToListAsync()
                    );
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


        [Route("GetUsersSearch")]
        [HttpGet]
        public async Task<ActionResult> getUsersSearch(string search)
        {
            try
            {
                
                var users =await Context.Users.Where(pUser=>pUser.Name.Contains(search)||pUser.LastName.Contains(search)||search==null).ToListAsync();
                return Ok(users);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("GetAllCritics")]
        [HttpGet]
        public async Task<ActionResult> getAllCritics()
        {
            try
            {
                
                var users = await (from u in Context.Users
                                  where u.Critic == true
                                  select u).ToListAsync();
                return Ok(users);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("GetAllRegular")]
        [HttpGet]
        public async Task<ActionResult> getAllRegular()
        {
            try
            {
                var users =await  (from u in Context.Users
                                  where u.Critic == false
                                  select u).ToListAsync();
                return Ok(users);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }


    }



}