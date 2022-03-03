import { Genre } from "./genres.js";

const titleGenres=document.createElement("h1");
titleGenres.classList.add("titleGenres");
titleGenres.innerHTML="GENRES:";
document.body.appendChild(titleGenres);

const addGenres=document.createElement("button");
addGenres.classList.add("addGenres");
addGenres.innerHTML="Add Genre";
document.body.appendChild(addGenres);

const addGenreForm=document.createElement("div");
addGenreForm.classList.add("addGenreForm");
document.body.appendChild(addGenreForm);

addGenres.onclick=(ev)=>
{
    AddGenre(addGenreForm);
}

const heroGenres=document.createElement("div");
heroGenres.classList.add("heroGenres");
document.body.appendChild(heroGenres);


var id=localStorage.getItem("idReviewer"); 
console.log(id);

fetch("https://localhost:5001/Genre/GetAllGenres/"+id, 
{method: "GET"})
.then
    (
        pGenre=>
        {
            pGenre.json()
            .then
            (
                genres=>
                {
                    genres.forEach(genre =>
                    {
                        let newGenre = new Genre(genre.id,genre.title,genre.url);
                        newGenre.drawGenre(heroGenres);
                    });
                })
        })

function AddGenre(host)
{
    var titleAdd=document.createElement("input");
    titleAdd.className="titleAdd";
    host.appendChild(titleAdd);

    var imgAdd=document.createElement("input");
    imgAdd.type="file";
    imgAdd.className="imgAdd";
    host.appendChild(imgAdd);

    var btnAdd=document.createElement("button");
    btnAdd.className="buttonAdd";
    btnAdd.innerHTML="ADD";
    host.appendChild(btnAdd);

    btnAdd.onclick=(ev)=>
    {
        var titleAddValue=titleAdd.value;
        var ok=true;
        if(titleAddValue!=null&&titleAddValue.length!=0)
        {
            console.log(titleAddValue);
        }
        else if(ok)
        {
            alert("Add Title!");
            ok=false;
        }

        const pictureGenreUrl=imgAdd.value.split("\\");
        let pictureUrl=pictureGenreUrl[2];
        if(pictureUrl!=undefined&&pictureUrl!=null)
        {
            console.log(pictureUrl);
        }
        else
        {
            pictureUrl="placeholder.png";
        }
        console.log(titleAddValue+" "+pictureUrl);
        if(ok)
        {
            fetch("https://localhost:5001/Genre/AddNewGenre/"+id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "title":titleAddValue,
                    "url":pictureUrl
                })
            }).then(g => 
                {
                    if (g.ok) 
                    {
                        g.json()
                        .then
                        (
                            genre=>
                            {
                                    alert("Succesfully Added Genre!");
                                    let newGenre = new Genre(genre.id,genre.title,genre.url);
                                    newGenre.drawGenre(heroGenres);
                            })

                    }
                    else
                    {
                    g.text().then
                    (
                        genre=>
                        {
                            alert(genre);
                        }
                    )
                    }
                });
        }
       
    }
}