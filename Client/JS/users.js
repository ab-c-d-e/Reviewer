import { User } from "./user.js";

const heroUsers=document.createElement("div");
heroUsers.classList.add("heroUsers");
document.body.appendChild(heroUsers);

let titleUsers=document.createElement("h1");
titleUsers.className="titleUsers";
heroUsers.appendChild(titleUsers);

var type=localStorage.getItem("typeUser");

var searchUser=localStorage.getItem("usersSearch");

console.log(type);

if(type==="critic")
{
    fetch("https://localhost:5001/User/GetAllCritics/", 
    {method: "GET"})
    .then
        (
            pCritic=>
            {
                pCritic.json()
                .then
                (
                    critics=>
                    {
                        critics.forEach(user =>
                        {
                            let newCritic = new User(user.id,user.jmbg, user.name, user.lastName, user.dateBirth, user.imageUrl, user.gender, user.age, user.critic, user.count);
                            newCritic.drawUserShort(heroUsers);
                        });
                    })
            })
}

else if(type==="regular")
{
    fetch("https://localhost:5001/User/GetAllRegular/", 
    {method: "GET"})
    .then
    (
        pRegular=>
        {
            pRegular.json()
            .then
            (
                regulars=>
                {
                    regulars.forEach(user =>
                        {
                            let newRegular = new User(user.id,user.jmbg, user.name, user.lastName, user.dateBirth, user.imageUrl, user.gender, user.age, user.critic, user.count);
                            newRegular.drawUserShort(heroUsers);
                        });
                })
        })
}

else if(type==="search")
{
    fetch("https://localhost:5001/User/GetUsersSearch/"+searchUser, 
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
                            let newUser =new User(user.id,user.jmbg, user.name, user.lastName, user.dateBirth, user.imageUrl, user.gender, user.age, user.critic, user.count);
                            newUser.drawUserShort(heroUsers);
                        });
                    })
            })
}