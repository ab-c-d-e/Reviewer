import { User } from "./user.js";

import { Review } from "./review.js";

const heroUser=document.createElement("div");
heroUser.classList.add("heroUser");
document.body.appendChild(heroUser);

const heroFilterReviews=document.createElement("div");
heroFilterReviews.className="heroFilterReviews";
document.body.appendChild(heroFilterReviews);

const heroReviews=document.createElement("div");
heroReviews.className="heroReviews";
document.body.appendChild(heroReviews);

var id=localStorage.getItem("idUser"); 
console.log(id);

localStorage.setItem("fromWhere","user");


fetch("https://localhost:5001/User/GetUser/"+id, 
{method: "GET"})
.then
    (
        pUser=>
        {
            pUser.json()
            .then
            (
                users=>
                {
                    users.forEach(user =>
                    {
                        let newUser = new User(user.id,user.jmbg,user.name, user.lastName, user.dateBirth, user.url,user.gender, user.age, user.critic, user.count);
                        newUser.drawUser(heroUser);
                        newUser.filterReviews(heroFilterReviews);
                    });
                })
        })

fetch("https://localhost:5001/User/GetUserReviews/"+id, 
{method: "GET"})
.then
    (
        pReview=>
        {
            pReview.json()
            .then
            (
                reviews=>
                {
                    reviews.forEach(review =>
                    {
                        console.log(review.objectTitle);
                        let newReview = new Review(review.id, review.text, review.grade, review.date, review.spoiler, review.objectTitle, review.objectUrl, review.userName, review.userUrl);
                        newReview.drawReview(heroReviews);
                    });
                })
        })

      