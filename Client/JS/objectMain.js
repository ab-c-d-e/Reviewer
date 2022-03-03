import { Object } from "./object.js";

import { Review } from "./review.js";

const heroObject=document.createElement("div");
heroObject.classList.add("heroObject");
document.body.appendChild(heroObject);

const addReview=document.createElement("div");
addReview.className="addReview";
document.body.appendChild(addReview);

const heroFilterReviews=document.createElement("div");
heroFilterReviews.className="heroFilterReviews";
document.body.appendChild(heroFilterReviews);

const heroReviews=document.createElement("div");
heroReviews.className="heroReviews";
document.body.appendChild(heroReviews);

var id=localStorage.getItem("idObject"); 
console.log(id);

localStorage.setItem("fromWhere","object");

var textReview=document.createElement("textarea");
textReview.className="textReview";
textReview.placeholder="...enter Review?"
addReview.appendChild(textReview);

const addReviewRight=document.createElement("div");
addReviewRight.className="addReviewRight";
addReview.appendChild(addReviewRight);

var gradeReview=document.createElement("input");
gradeReview.type="number";
gradeReview.min=1;
gradeReview.max=5;
gradeReview.className="gradeReview";
addReviewRight.appendChild(gradeReview);

const divSpoiler=document.createElement("div");
divSpoiler.className="divSpoiler";
addReviewRight.appendChild(divSpoiler);

var labelAddSpoiler=document.createElement("label");
labelAddSpoiler.className="labelAddSpoiler";
labelAddSpoiler.innerHTML="SPOILER";
divSpoiler.appendChild(labelAddSpoiler);

var checkAddSpoiler=document.createElement("input");
checkAddSpoiler.type="checkbox";
checkAddSpoiler.className="checkAddSpoiler";
divSpoiler.appendChild(checkAddSpoiler);

const divCritic=document.createElement("div");
divCritic.className="divCritic";
addReviewRight.appendChild(divCritic);

var labelRadioCritics=document.createElement("label");
labelRadioCritics.className="labelRadioCritics";
labelRadioCritics.innerHTML="CRITICS";
divCritic.appendChild(labelRadioCritics);

var radioCritics=document.createElement("input");
radioCritics.type="radio";
radioCritics.name="usersRadio";
radioCritics.value="critics";
radioCritics.className="radioCritics";
divCritic.appendChild(radioCritics);

const divRegular=document.createElement("div");
divRegular.className="divRegular";
addReviewRight.appendChild(divRegular);

var labelRadioRegular=document.createElement("label");
labelRadioRegular.className="labelRadioRegular";
labelRadioRegular.innerHTML="REGULAR";
divRegular.appendChild(labelRadioRegular);

var radioRegular=document.createElement("input");
radioRegular.type="radio";
radioRegular.name="usersRadio";
radioRegular.value="regular";
radioRegular.className="radioRegular";
divRegular.appendChild(radioRegular);

const divSearch=document.createElement("div");
divSearch.className="divSearch";
addReviewRight.appendChild(divSearch);

var labelRadioSearch=document.createElement("label");
labelRadioSearch.className="labelRadioSearch";
labelRadioSearch.innerHTML="SEARCH";
divSearch.appendChild(labelRadioSearch);

var radioSearch=document.createElement("input");
radioSearch.type="radio";
radioSearch.name="usersRadio";
radioSearch.value="search";
radioSearch.className="radioSearch";
divSearch.appendChild(radioSearch);

var dropDownUsers=document.createElement("select");
dropDownUsers.className="dropDownUsers";
addReviewRight.appendChild(dropDownUsers);

radioCritics.onchange=(ev)=>
{
if(radioCritics.checked)
{
    
    dropDownUsers.innerHTML="";
    let textForSearching=addReview.querySelector(".textForSearching");
    if(textForSearching)
    {
        divSearch.removeChild(textForSearching);
    }
    fetch("https://localhost:5001/User/GetAllCritics/", 
    {method: "GET"})
    .then
    (
        pUsers=>
        {
            pUsers.json()
            .then
            (
                users=>
                {
                    users.forEach(user =>
                        {
                            var dropDownUser=document.createElement("option");
                            dropDownUser.className="dropDownUser";
                            dropDownUser.innerHTML=user.name+" "+user.lastName;
                            dropDownUser.value=user.id;
                            dropDownUsers.appendChild(dropDownUser);
                        });
                })
        })
}

}

radioRegular.onchange=(ev)=>
{
if(radioRegular.checked)
{
    dropDownUsers.innerHTML="";
    let textForSearching=addReview.querySelector(".textForSearching");
    if(textForSearching)
    {
        divSearch.removeChild(textForSearching);
    }
    fetch("https://localhost:5001/User/GetAllRegular/", 
    {method: "GET"})
    .then
    (
        pUsers=>
        {
            pUsers.json()
            .then
            (
                users=>
                {
                    users.forEach(user =>
                        {
                            var dropDownUser=document.createElement("option");
                            dropDownUser.className="dropDownUser";
                            dropDownUser.innerHTML=user.name+" "+user.lastName;
                            dropDownUser.value=user.id;
                            dropDownUsers.appendChild(dropDownUser);
                        });
                })
        })
}
}

radioSearch.onchange=(ev)=>
{
    let textForSearching=addReview.querySelector(".textForSearching");
    if(textForSearching)
    {
        addReview.removeChild(textForSearching);
    }
if(radioSearch.checked)
{
    let textForSearching=document.createElement("input");
    textForSearching.className="textForSearching";
    textForSearching.placeholder="...search?";
    divSearch.appendChild(textForSearching);
    textForSearching.oninput=(ev)=>
    {
        dropDownUsers.innerHTML="";
        let text=textForSearching.value;
        if(text.length!=0)
        {
            fetch("https://localhost:5001/User/GetUsersSearch/"+text, 
        {method: "GET"})
        .then
        (
            pUsers=>
            {
                pUsers.json()
                .then
                (
                    users=>
                    {
                        users.forEach(user =>
                            {
                                var dropDownUser=document.createElement("option");
                                dropDownUser.className="dropDownUser";
                                dropDownUser.innerHTML=user.name+" "+user.lastName;
                                dropDownUser.value=user.id;
                                dropDownUsers.appendChild(dropDownUser);
                            });
                    })
            })
        }
        
    }
    
}
}

var buttonAddReview=document.createElement("button");
buttonAddReview.className="buttonAddReview";
buttonAddReview.innerHTML="ADD REVIEW";
addReview.appendChild(buttonAddReview);

buttonAddReview.onclick=(ev)=>
{
var textReviewValue=addReview.querySelector(".textReview").value;
if(!textReviewValue || textReviewValue.length === 0)
textReviewValue="review not added";
var gradeReviewValue=addReview.querySelector(".gradeReview").value;
var spoilerValue=addReview.querySelector(".checkAddSpoiler").checked;
var userid=dropDownUsers.value;

fetch("https://localhost:5001/Review/AddNewReview/"+id+"/"+userid+"/"+textReviewValue+"/"+gradeReviewValue+"/"+spoilerValue, 
{
    method: "POST" 
}).then
    (
        pReview=>
        {
            if(pReview.ok)
            {
            pReview.json()
            .then
            (
                reviews=>
                {
                    reviews.forEach(review =>
                    {
                        alert("Succesfully added Review!");
                        var id=localStorage.getItem("idObject");
                        var heroObject=document.querySelector(".heroObject");
                        heroObject.innerHTML="";
                    fetch("https://localhost:5001/ReviewedObject/GetObject/"+id, 
                    {method: "GET"})
                    .then
                        (
                            pObject=>
                            { 
                                pObject.json()
                                .then
                                (
                                    objects=>
                                    {
                                        objects.forEach(object =>
                                        {
                                            let newObject = new Object(object.id, object.title, object.description, object.avrage, object.avrageCritic, object.avrageRegular, object.url, object.author);
                                            newObject.drawObject(heroObject);
                                        });
                                    })
                            })
                        let newReview = new Review(review.id, review.text, review.grade, review.date, review.spoiler, review.objectTitle, review.objectUrl, review.userName, review.userUrl);
                        textReview.value="";
                        gradeReview.value="";
                        dropDownUsers.innerHTML="";
                        checkAddSpoiler.checked=false;
                        radioCritics.checked=false;
                        radioRegular.checked=false;
                        newReview.drawReview(heroReviews);
                    });
            })
            }
            else
            {
                pReview.text().then
                (
                    review=>
                    {
                        alert(review);
                    }
                )
            }
            
        })
}

fetch("https://localhost:5001/ReviewedObject/GetObject/"+id, 
{method: "GET"})
.then
    (
        pObject=>
        {
            pObject.json()
            .then
            (
                objects=>
                {
                    objects.forEach(object =>
                    {
                        let newObject = new Object(object.id, object.title, object.description, object.avrage, object.avrageCritic, object.avrageRegular, object.url,object.author);
                        newObject.drawObject(heroObject);
                        newObject.filterReviews(heroFilterReviews);
                    });
                })
        })

heroReviews.innerHTML="";
fetch("https://localhost:5001/ReviewedObject/GetObjectReviews/"+id, 
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
                        let newReview = new Review(review.id, review.text, review.grade, review.date, review.spoiler, review.objectTitle, review.objectUrl, review.userName, review.userUrl);
                        newReview.drawReview(heroReviews);
                    });
                })
        })