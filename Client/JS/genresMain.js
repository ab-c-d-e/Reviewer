import { Genre } from "./genres.js";

const titleGenres=document.createElement("h1");
titleGenres.classList.add("titleGenres");
titleGenres.innerHTML="GENRES:";
document.body.appendChild(titleGenres);

const addGenreContainer=document.createElement("div");
addGenreContainer.className="addGenreContainer";
document.body.appendChild(addGenreContainer);


const addGenres=document.createElement("button");
addGenres.classList.add("addGenres");
addGenres.innerHTML="Add Genre";
addGenreContainer.appendChild(addGenres);

const addGenreForm=document.createElement("div");
addGenreForm.classList.add("addGenreForm");
addGenreContainer.appendChild(addGenreForm);

addGenres.value="notSelected";
addGenres.onclick=(ev)=>
{
    if(addGenres.value=="notSelected")
    {
        addGenres.value="selected";
       AddGenre(addGenreForm);
    }
    else if(addGenres.value=="selected")
    {
        addGenreForm.innerHTML="";
        addGenres.value="notSelected"
    }
}

const heroGenres=document.createElement("div");
heroGenres.classList.add("heroGenres");
document.body.appendChild(heroGenres);

const column1=document.createElement("div");
column1.className="columnGenres";
heroGenres.appendChild(column1);

const column2=document.createElement("div");
column2.className="columnGenres";
heroGenres.appendChild(column2);

const column3=document.createElement("div");
column3.className="columnGenres";
heroGenres.appendChild(column3);

var i=1;

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
                        if(i%3==0)
                        {
                            let newGenre = new Genre(genre.id,genre.title,genre.url);
                            newGenre.drawGenre(column1);
                        }
                        else if(i%3==1)
                        {
                            let newGenre = new Genre(genre.id,genre.title,genre.url);
                            newGenre.drawGenre(column2);
                        }
                        else if(i%3==2)
                        {
                            let newGenre = new Genre(genre.id,genre.title,genre.url);
                            newGenre.drawGenre(column3);
                        }
                        i++;
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
                                    var whereToAdd;
                                    if(column1.childElementCount<column2.childElementCount)
                                    whereToAdd=column1;
                                    else whereToAdd=column2;
                                    if(whereToAdd.childElementCount>column3.childElementCount)
                                    whereToAdd=column3;

                                    let newGenre = new Genre(genre.id,genre.title,genre.url);
                                    newGenre.drawGenre(whereToAdd);
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