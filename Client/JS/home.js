const containerHero=document.createElement("div");
containerHero.classList.add("hero");
document.body.appendChild(containerHero);

const containerButtonHero=document.createElement("div");
containerButtonHero.classList.add("buttonHero");
containerHero.appendChild(containerButtonHero);

fetch("https://localhost:5001/Reviewer/GetAllReviewers", {
    method: "GET"
    })
.then
(
    pReviewer=>
    {
        pReviewer.json()
        .then
        (
            reviewers=>
            {
                reviewers.forEach(reviewer => {
                    var buttonReviewer=document.createElement("input");
                    buttonReviewer.className="buttonReviewer";
                    buttonReviewer.type="submit";
                    buttonReviewer.value=reviewer.type;
                    buttonReviewer.onclick=(ev)=>
                    {
                        window.open("reviewer.html", '_self');
                        localStorage.setItem("idReviewer",reviewer.id);
                    }
                    containerButtonHero.appendChild(buttonReviewer);
                });
            })
    })

let buttonUsersHero=document.createElement("input");
buttonUsersHero.onclick=(ev)=>
{
    window.open("usersMain.html", '_self');
}
buttonUsersHero.type="submit";
buttonUsersHero.value="Users";
buttonUsersHero.className="buttonUsersHero";
containerButtonHero.appendChild(buttonUsersHero);