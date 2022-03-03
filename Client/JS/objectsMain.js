import { Object } from "./object.js";
import { Genre } from "./genres.js";
import { Author } from "./authors.js";

const heroFilter=document.createElement("div");
heroFilter.classList.add("heroFilter");
document.body.appendChild(heroFilter);

const heroObjects=document.createElement("div");
heroObjects.classList.add("heroObjects");
document.body.appendChild(heroObjects);

var type=localStorage.getItem("objectsType"); 
console.log(type);
var fetchObj=localStorage.getItem("objects");

var id=localStorage.getItem("idReviewer"); 

if(type==="search")
{
    fetch("https://localhost:5001/ReviewedObject/GetObjectSearch/"+id+"/"+fetchObj, 
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
                            let newObject = new Object(object.id, object.title, object.description, object.avrage, object.avrageCritic, object.avrageRegular, object.url);
                            newObject.drawObjectShorter(heroObjects);
                        });
                    })
            })
}

else if(type==="genres")
{    
    fetch("https://localhost:5001/Genre/GetGenre/"+fetchObj, 
    {method: "GET"})
    .then
        (
            pGenre=>
            {
                pGenre.json()
                .then
                (
                    genre=>
                    {
                        let newGenre = new Genre(genre.id,genre.title,genre.url);
                        newGenre.filterObject(heroFilter,heroObjects);
                })
        })

    fetch("https://localhost:5001/Genre/GetGenreObjects/"+fetchObj, 
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
                        let newObject = new Object(object.id, object.title, object.description, object.avrage, object.avrageCritic, object.avrageRegular, object.url);
                        newObject.drawObjectShorter(heroObjects);
                    });
                })
        })
}

else if(type==="authors")
{
fetch("https://localhost:5001/Author/GetAuthor/"+fetchObj, 
{method: "GET"})
.then
    (
        pAuthor=>
        {
            pAuthor.json()
            .then
            (
                author=>
                {
                    let newAuthor = new Author(author.id,author.title,author.url, author.about);
                    newAuthor.filterObject(heroFilter,heroObjects);
            })
    })
    fetch("https://localhost:5001/Author/GetAuthorObjects/"+fetchObj, 
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
                        let newObject = new Object(object.id, object.title, object.description, object.avrage, object.avrageCritic, object.avrageRegular, object.url);
                        newObject.drawObjectShorter(heroObjects);
                    });
                })
        })
}