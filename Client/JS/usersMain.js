import { User } from "./user.js";

const heroUser=document.createElement("div");//flex-row
heroUser.classList.add("heroUser");
document.body.appendChild(heroUser);

const heroUsersLeft=document.createElement("div");//flex-column
heroUsersLeft.classList.add("heroUsersLeft");
heroUser.appendChild(heroUsersLeft);

const heroUsersRight=document.createElement("div");//flex-row
heroUsersRight.classList.add("heroUsersRight");
heroUser.appendChild(heroUsersRight); 

const heroTopTen=document.createElement("div");
heroTopTen.classList.add("heroTopTen");
document.body.appendChild(heroTopTen);

const formCritic=document.createElement("form");
formCritic.action="users.html";
formCritic.className="formCritic";
heroUsersLeft.appendChild(formCritic);

let buttonCriticHero=document.createElement("input");
buttonCriticHero.type="submit";
buttonCriticHero.value="Critics";
buttonCriticHero.onclick=(ev)=>
{
    localStorage.setItem("typeUser","critic");
}
formCritic.appendChild(buttonCriticHero);

const formRegular=document.createElement("form");
formRegular.action="users.html";
formRegular.className="formRegular";
heroUsersLeft.appendChild(formRegular);

let buttonRegularHero=document.createElement("input");
buttonRegularHero.type="submit";
buttonRegularHero.value="Regulars";
buttonRegularHero.onclick=(ev)=>
{
    localStorage.setItem("typeUser","regular");
}
formRegular.appendChild(buttonRegularHero);

let formSearch=document.createElement("form");
formSearch.action="users.html";
formSearch.className="formSearch";
heroUsersLeft.appendChild(formSearch);

let textSearch=document.createElement("input");
textSearch.type="text";
textSearch.placeholder="...search user";
formSearch.appendChild(textSearch);

let buttonSearch=document.createElement("input");
buttonSearch.type="submit";
buttonSearch.value="🔍";
buttonSearch.onclick=(ev)=>
{
    var search=textSearch.value;
    console.log(search);
    localStorage.setItem("typeUser","search");
    localStorage.setItem("usersSearch",search);
}
formSearch.appendChild(buttonSearch);

let addUserButton=document.createElement("button");
addUserButton.className="addUserButton";
addUserButton.innerHTML="ADD USER";
heroUsersLeft.appendChild(addUserButton);

const addUser=document.createElement("div");
addUser.classList.add("addUser");
heroUsersRight.appendChild(addUser);

addUserForm(addUser);

fetch("https://localhost:5001/User/GetTopTenUsers", 
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
                        newUser.drawUserShort(heroTopTen);
                    });
                })
        })

function addUserForm(host)
{
    let formForAdding=document.createElement("form");
    formForAdding.className="fromForAdding";
    host.appendChild(formForAdding);

    let JMBGAddUser=document.createElement("input");
    JMBGAddUser.className="JMBGAddUser";
    formForAdding.appendChild(JMBGAddUser);
    JMBGAddUser.placeholder="JMBG?";

    let nameAddUser=document.createElement("input");
    nameAddUser.className="nameAddUser";
    formForAdding.appendChild(nameAddUser);
    nameAddUser.placeholder="Name?";

    let lastNameAddUser=document.createElement("input");
    lastNameAddUser.className="lastNameAddUser";
    formForAdding.appendChild(lastNameAddUser);
    lastNameAddUser.placeholder="Last Name?";

    let dateAddUser=document.createElement("input");
    dateAddUser.type="date";
    dateAddUser.className="dateAddUser";
    formForAdding.appendChild(dateAddUser);
    
    let pictureUser=document.createElement("input");
    pictureUser.type="file";
    formForAdding.appendChild(pictureUser);

    const divCritic=document.createElement("div");
    divCritic.className="divCritic";
    formForAdding.appendChild(divCritic);

    var labelCritic=document.createElement("label");
    labelCritic.className="labelCritic";
    labelCritic.innerHTML="Critic";
    divCritic.appendChild(labelCritic);

    let criticUser=document.createElement("input");
    criticUser.type="checkbox";
    divCritic.appendChild(criticUser);

    const divFemale=document.createElement("div");
    divFemale.className="divFemale";
    formForAdding.appendChild(divFemale);

    var labelRadioFemale=document.createElement("label");
    labelRadioFemale.className="labelRadioFemale";
    labelRadioFemale.innerHTML="F";
    divFemale.appendChild(labelRadioFemale);

    var radioFemale=document.createElement("input");
    radioFemale.type="radio";
    radioFemale.name="gender";
    radioFemale.value="f";
    radioFemale.className="radioFemale";
    divFemale.appendChild(radioFemale);

    const divMale=document.createElement("div");
    divMale.className="divMale";
    formForAdding.appendChild(divMale);

    var labelRadioMale=document.createElement("label");
    labelRadioMale.className="labelRadioMale";
    labelRadioMale.innerHTML="M";
    divMale.appendChild(labelRadioMale);

    var radioMale=document.createElement("input");
    radioMale.type="radio";
    radioMale.name="gender";
    radioMale.value="m";
    radioMale.className="radioMale";
    divMale.appendChild(radioMale);

    var addButtonFinal=document.querySelector(".addUserButton")

    addButtonFinal.onclick=(ev)=>
    {
    let ok=true;
    const jmbgAddUservalue=JMBGAddUser.value;
    if(jmbgAddUservalue!=null&&jmbgAddUservalue.length!=0&&jmbgAddUservalue.length==13)
    {
        console.log(jmbgAddUservalue);
        JMBGAddUser.value="";
    }
    else if(jmbgAddUservalue.length!=13)
    {
        alert("JMBG is 13 number digit!");
        ok=false;
    }
    else if(ok)
    {
        alert("Add JMBG!");
        ok=false;
    }
    
    const nameAddUservalue=nameAddUser.value;
    if(nameAddUservalue!=null&&ok&&nameAddUservalue.length!=0)
    {
        console.log(nameAddUservalue);
        nameAddUser.value="";
    }
    else if(ok)
    {
        alert("Add Name!");
        ok=false;
    }
    const lastNameAddUservalue=lastNameAddUser.value;
    if(lastNameAddUservalue!=null&&ok&&lastNameAddUservalue.length!=0)
    {
        console.log(lastNameAddUservalue);
        lastNameAddUser.value="";
    }
    else if(ok)
    {
        alert("Add Last Name!");
        ok=false;
    }
    const dateAddUservalue=dateAddUser.value;
    if(dateAddUservalue!=null&&ok&&dateAddUservalue.length!=0)
    {
        console.log(dateAddUservalue);
        dateAddUser.value="";
    }
    else if(ok)
    {
        alert("Add Date of birth!");
        ok=false;
    }

    const pictureUserUrl=pictureUser.value.split("\\");
    let pictureUrl=pictureUserUrl[2];
    if(pictureUrl!=undefined&&pictureUser!=null)
    {
        console.log(pictureUrl);
    }
    else
    {
        pictureUrl="placeholder.png";
    }

    let gender;
    if(radioFemale.checked)
    {
        gender="F";
        console.log(gender);
        radioFemale.checked=false;
    }
    else if(radioMale.checked)
    {
        gender="M";
        console.log(gender);
        radioMale.checked=false;
    }
    else if(ok)
    {
        ok=false;
        alert("Please Select Gender!");
    }
    let critic=criticUser.checked;
    criticUser.checked=false;

    if(ok)
    {
        fetch("https://localhost:5001/User/AddNewUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "jmbg": jmbgAddUservalue,
                    "dateBirth": dateAddUservalue,
                    "name": nameAddUservalue,
                    "lastName": lastNameAddUservalue,
                    "imageUrl": pictureUrl,
                    "critic":critic,
                    "gender": gender
                })
            }).then(u => 
                {
                    console.log(u);
                    if (u.ok) 
                    {
                        alert("User Succesfully Added!");
                    }
                    else
                    {
                    u.text().then
                    (
                        user=>
                        {
                            alert(user);
                        }
                    )
                    }
                });

    }
}
}