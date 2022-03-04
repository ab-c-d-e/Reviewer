import { Author } from "./authors.js";


const titleAuthor=document.createElement("h1");
titleAuthor.classList.add("titleAuthor");
titleAuthor.innerHTML="AUTHORS:";
document.body.appendChild(titleAuthor);

const addAuthorContainer=document.createElement("div");
addAuthorContainer.className="addAuthorContainer";
document.body.appendChild(addAuthorContainer);

const addAuthor=document.createElement("button");
addAuthor.classList.add("addAuthor");
addAuthor.innerHTML="Add Author";
addAuthorContainer.appendChild(addAuthor);

const addAuthorForm=document.createElement("div");
addAuthorForm.classList.add("addAuthorForm");
addAuthorContainer.appendChild(addAuthorForm);

addAuthor.value="notSelected";
addAuthor.onclick=(ev)=>
{
    if(addAuthor.value=="notSelected")
    {
        addAuthor.value="selected";
        AddAuthor(addAuthorForm);
    }
    else if(addAuthor.value=="selected")
    {
        addAuthorForm.innerHTML="";
        addAuthor.value="notSelected"
    }
}

const heroAuthors=document.createElement("div");
heroAuthors.classList.add("heroAuthors");
document.body.appendChild(heroAuthors);


var id=localStorage.getItem("idReviewer"); 
console.log(id);

fetch("https://localhost:5001/Author/GetAllAuthors/"+id, 
{method: "GET"})
.then
    (
        pauthor=>
        {
            pauthor.json()
            .then
            (
                authors=>
                {
                    authors.forEach(author =>
                    {
                        let newAuthor = new Author(author.id,author.name,author.lastName,author.url,author.about);
                        newAuthor.drawAuthor(heroAuthors);
                    });
                })
        })

function AddAuthor(host)
{
    var nameAdd=document.createElement("input");
    nameAdd.className="nameAdd";
    nameAdd.placeholder="...name?"
    host.appendChild(nameAdd);

    var lastNameAdd=document.createElement("input");
    lastNameAdd.className="lastNameAdd";
    lastNameAdd.placeholder="...last name?"
    host.appendChild(lastNameAdd);

    var aboutAdd=document.createElement("textarea");
    aboutAdd.className="aboutAdd";
    aboutAdd.placeholder="...about author?";
    host.appendChild(aboutAdd);

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
        var nameAddValue=nameAdd.value;
        var ok=true;
        if(nameAddValue!=null&&nameAddValue.length!=0)
        {
            console.log(nameAddValue);
        }
        else if(ok)
        {
            alert("Add Name!");
            ok=false;
        }

        var lastNameAddValue=lastNameAdd.value;
        var ok=true;
        if(lastNameAddValue!=null&&lastNameAddValue.length!=0)
        {
            console.log(lastNameAddValue);
        }
        else if(ok)
        {
            alert("Add Last Name!");
            ok=false;
        }

        var aboutAddValue=aboutAdd.value;
        var ok=true;
        if(aboutAddValue!=null&&aboutAddValue.length!=0)
        {
            console.log(aboutAddValue);
        }
        else if(ok)
        {
            aboutAddValue=" ";
            ok=false;
        }

        const pictureAuthorUrl=imgAdd.value.split("\\");
        let pictureUrl=pictureAuthorUrl[2];
        if(pictureUrl!=undefined&&pictureUrl!=null)
        {
            console.log(pictureUrl);
        }
        else
        {
            pictureUrl="placeholder.png";
        }

        if(ok)
        {
            fetch("https://localhost:5001/Author/AddNewAuthor/"+id, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        "name": nameAddValue,
                        "lastName": lastNameAddValue,
                        "url": pictureUrl,
                        "about": aboutAddValue
                    })
            }).then(a => 
                {
                    if (a.ok) 
                    {
                        a.json()
                        .then
                        (
                            author=>
                            {
                                    alert("Succesfully Added Author!");
                                    let newAuthor = new Author(author.id,author.name,author.lastName,author.url,author.about);
                                    newAuthor.drawAuthor(heroAuthors);
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