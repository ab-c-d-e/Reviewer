import { Review } from "./review.js";

export class User
{
    constructor(id, jmbg,name, lastName, dateBirth, imageUrl, gender, age, critic, count)
    {
        this.id=id;
        this.jmbg=jmbg;
        this.name=name;
        this.lastName=lastName;
        this.dateBirth=dateBirth;
        this.imageUrl=imageUrl;
        this.gender=gender;
        this.age=age;
        this.critic=critic;
        this.count=count;
        this.containerUser=null;
        this.containerStatistic=null;
    }

    drawUser(host)
    {
        if(!host)
        {
            throw new Error("Parent Element Does Not Exist!");
        }

        this.containerUser = document.createElement("div");
        this.containerUser.className="containerUser";
        host.appendChild(this.containerUser );

        let imageUser=document.createElement("img");
        imageUser.className="imageUser";
        console.log(this.imageUrl);
        imageUser.src="..\\..\\Images\\Useres\\"+this.imageUrl;
        imageUser.alt="Image of "+this.name+" "+this.lastName;
        this.containerUser.appendChild(imageUser);

        const divContainerRight=document.createElement("div");
        divContainerRight.className="divContainerRight";
        this.containerUser.appendChild(divContainerRight);

        let nameUser=document.createElement("h3");
        nameUser.className="nameUser";
        nameUser.innerHTML=this.name+" "+this.lastName+" ";
        divContainerRight.appendChild(nameUser);

        if(this.critic)
        {
            nameUser.innerHTML+="⭐";
        }

        const ageUser=document.createElement("p");
        ageUser.className="ageUser";
        ageUser.innerHTML="AGE: "+this.age;
        divContainerRight.appendChild(ageUser);

        if(this.count!=undefined)
        {
            const numReviewsUser=document.createElement("p");
            numReviewsUser.className="numReviewsUser";
            numReviewsUser.innerHTML="NUMBER OF REVIEWS: "+this.count;
            divContainerRight.appendChild(numReviewsUser);
        }

        const gradeStatistic=document.createElement("div");
        gradeStatistic.className="gradeStatistic";
        this.containerUser.appendChild(gradeStatistic);

        this.drawStatistic(gradeStatistic);

    }

    drawUserShort(host)
    {
        if(!host)
        {
            throw new Error("Parent Element Does Not Exist!");
        }

        this.containerUser = document.createElement("div");
        this.containerUser.className="containerUser";
        host.prepend(this.containerUser );

        let imageUser=document.createElement("img");
        imageUser.className="imageUser";
        imageUser.src="..\\..\\Images\\Useres\\"+this.imageUrl;
        imageUser.alt="Image of "+this.name+" "+this.lastName;
        this.containerUser.appendChild(imageUser);

        const divContainerRight=document.createElement("div");
        divContainerRight.className="divContainerRight";
        this.containerUser.appendChild(divContainerRight);

        let nameUser=document.createElement("h3");
        nameUser.className="nameUser";
        nameUser.innerHTML=this.name+" "+this.lastName+" ";
        divContainerRight.appendChild(nameUser);

        if(this.critic)
        {
            nameUser.innerHTML+="⭐";
        }

        const ageUser=document.createElement("p");
        ageUser.className="ageUser";
        ageUser.innerHTML="AGE: "+this.age;
        divContainerRight.appendChild(ageUser);

        if(this.count!=undefined)
        {
            const numReviewsUser=document.createElement("p");
            numReviewsUser.className="numReviewsUser";
            numReviewsUser.innerHTML="NUMBER OF REVIEWS: "+this.count;
            divContainerRight.appendChild(numReviewsUser);
        }

        nameUser.onclick=(ev)=>
        {
            localStorage.setItem("idUser",this.id);
            window.open("user.html", '_self');
        }
        imageUser.onclick=(ev)=>
        {
            localStorage.setItem("idUser",this.id);
            window.open("user.html", '_self');
        }
        
        const deleteUser=document.createElement("button");
        deleteUser.className="deleteUser"
        deleteUser.innerHTML="❌";
        this.containerUser.appendChild(deleteUser);
        deleteUser.onclick=(ev)=>
        {
            this.deleteUser(host);
        }

        const updateUser=document.createElement("button");
        updateUser.className="updateUser"
        updateUser.innerHTML="✏️";
        updateUser.value=1;
        this.containerUser.appendChild(updateUser);

        const formEditUser=document.createElement("form");
        formEditUser.className="formEditUser";
        this.containerUser.appendChild(formEditUser);
 
        
        updateUser.onclick=(ev)=>
        {
            if(updateUser.value==1)
            {
            updateUser.value=0;
            this.formEditUser(formEditUser);
            }
            else if(updateUser.value==0)
            {
                formEditUser.innerHTML="";
                updateUser.value=1;
            }
        }

    }

    filterReviews(host)
    {
        if(!host)
        {
            throw new Error("Parent Element Does Not Exist!");
        }
        var selectSort=document.createElement("select");
        selectSort.name="selectReviewSort";
        selectSort.className="selectReviewSort";
        host.appendChild(selectSort);

        var selectGrade=document.createElement("select");
        selectGrade.name="selectReviewGrade";
        selectGrade.className="selectReviewGrade";
        host.appendChild(selectGrade);

        selectSort.onchange=(ev)=>
        {
            selectGrade.value="all";
            var heroReviews=document.querySelector(".heroReviews");
            heroReviews.innerHTML="";
            if(selectSort.value==="newest")
            {
                fetch("https://localhost:5001/User/SortedReviewsDate/"+this.id+"/true", 
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
            }
            else if(selectSort.value==="oldest")
            {
                fetch("https://localhost:5001/User/SortedReviewsDate/"+this.id+"/false", 
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
            }
            else if(selectSort.value==="smallest")
            {
                fetch("https://localhost:5001/User/SortedReviewsGrade/"+this.id+"/false", 
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
            }
            else if(selectSort.value==="largest")
            {
                fetch("https://localhost:5001/User/SortedReviewsGrade/"+this.id+"/true", 
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
            }
        }

        var optionTitle=document.createElement("option");
        optionTitle.selected="true";
        optionTitle.disabled="true";
        optionTitle.innerHTML="Sort by";
        selectSort.appendChild(optionTitle);

        var optionOldest=document.createElement("option");
        optionOldest.value="oldest";
        optionOldest.innerHTML="Date Added(Newest)";
        selectSort.appendChild(optionOldest);

        var optionNewest=document.createElement("option");
        optionNewest.value="newest";
        optionNewest.innerHTML="Date Added(Oldest)";
        selectSort.appendChild(optionNewest);

        var optionSmallest=document.createElement("option");
        optionSmallest.value="smallest";
        optionSmallest.innerHTML="Grade ⬇";
        selectSort.appendChild(optionSmallest);

        var optionLargerst=document.createElement("option");
        optionLargerst.value="largest";
        optionLargerst.innerHTML="Grade ⬆";
        selectSort.appendChild(optionLargerst);

        selectGrade.onchange=(ev)=>
        {
            var heroReviews=document.querySelector(".heroReviews");
            heroReviews.innerHTML="";
            if(selectGrade.value==="all")
            {
                fetch("https://localhost:5001/User/SortedReviewsDate/"+this.id+"/true", 
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
            }
            else
            {
                fetch("https://localhost:5001/User/GetUserReviewsGrade/"+this.id+"/"+selectGrade.value, 
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
            }
        }

        var optionAll=document.createElement("option");
        optionAll.value="all";
        optionAll.selected=true;
        optionAll.innerHTML="All Grades";
        selectGrade.appendChild(optionAll);

        var option1=document.createElement("option");
        option1.value="1";
        option1.innerHTML="Grade 1";
        selectGrade.appendChild(option1);

        var option2=document.createElement("option");
        option2.value="2";
        option2.innerHTML="Grade 2";
        selectGrade.appendChild(option2);

        var option3=document.createElement("option");
        option3.value="3";
        option3.innerHTML="Grade 3";
        selectGrade.appendChild(option3);

        var option4=document.createElement("option");
        option4.value="4";
        option4.innerHTML="Grade 4";
        selectGrade.appendChild(option4);

        var option5=document.createElement("option");
        option5.value="5";
        option5.innerHTML="Grade 5";
        selectGrade.appendChild(option5);
    }

    deleteUser(host)
    {
        fetch("https://localhost:5001/User/DeleteUser/" + this.id, {
            method: "DELETE"
        }).then(pUser => {
            if (pUser.ok) {
                alert("User Succesfully Deleted!");
                host.removeChild(this.containerUser);
            }
            else
                alert("Mistake Ocurred!");
        })
    }

    formEditUser(host)
    {
        host.innerHTML="";
    
        let nameAddUser=document.createElement("input");
        nameAddUser.className="nameAddUser";
        host.appendChild(nameAddUser);
        nameAddUser.value=this.name;
    
        let lastNameAddUser=document.createElement("input");
        lastNameAddUser.className="lastNameAddUser";
        host.appendChild(lastNameAddUser);
        lastNameAddUser.value=this.lastName;
    
        let dateAddUser=document.createElement("input");
        dateAddUser.type="date";
        dateAddUser.className="dateAddUser";
        dateAddUser.value=this.dateBirth;
        host.appendChild(dateAddUser);
        
        let pictureUser=document.createElement("input");
        pictureUser.type="file";
        host.appendChild(pictureUser);
    
        const divCritic=document.createElement("div");
        divCritic.className="divCritic";
        host.appendChild(divCritic);
    
        var labelCritic=document.createElement("label");
        labelCritic.className="labelCritic";
        labelCritic.innerHTML="Critic";
        divCritic.appendChild(labelCritic);
    
        let criticUser=document.createElement("input");
        criticUser.type="checkbox";
        divCritic.appendChild(criticUser);
    
        const divFemale=document.createElement("div");
        divFemale.className="divFemale";
        host.appendChild(divFemale);
    
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
        host.appendChild(divMale);
    
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
    
        let updateButtonFinal=document.createElement("button");
        updateButtonFinal.className="updateButtonFinal";
        updateButtonFinal.innerHTML="UPDATE";
        host.appendChild(updateButtonFinal);
    
        updateButtonFinal.onclick=(ev)=>
        {
        host.innerHTML="";
        let ok=true;
        const jmbgAddUservalue=this.jmbg;
        
        const nameAddUservalue=nameAddUser.value;
        if(nameAddUservalue!=null&&ok&&nameAddUservalue.length!=0)
        {
            console.log(nameAddUservalue);
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
    
        let gender
        if(radioFemale.checked)
        {
            gender="F";
            console.log(gender);
        }
        else if(radioMale.checked)
        {
            gender="M";
            console.log(gender);
        }
        else if(ok)
        {
            ok=false;
            alert("Please Select Gender!");
        }
        let critic=criticUser.checked;
    
        if(ok)
        {
            fetch("https://localhost:5001/User/ChangeUser", {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "id":this.id,
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
                            alert("User Succesfully Updated!");
                            fetch("https://localhost:5001/User/GetUser/"+this.id, 
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
                                                        
                                                        console.log(user.imageUrl);
                                                    let newUser = new User(user.id,user.jmbg,user.name, user.lastName, user.dateBirth, user.url,user.gender, user.age, user.critic, user.count);
                                                    //(id, jmbg,name, lastName, dateBirth, imageUrl, gender, age, critic, count)
                                                    const parentUser=this.containerUser.parentElement;
                                                    parentUser.removeChild(this.containerUser);
                                                    newUser.drawUserShort(parentUser);
                                                });
                                            })
                                    })
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

    drawStatistic(host)
    {
        var a1;
        var a2;
        var a3;
        var a4;
        var a5;

        fetch("https://localhost:5001/User/GetUserStats/"+this.id, 
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
                        console.log(user.one+' '+user.two+' '+user.three+' '+user.four+' '+user.five);
                        a1=user.one;
                        a2=user.two;
                        a3=user.three;
                        a4=user.four;
                        a5=user.five; 

                        this.containerStatistic=document.createElement("div");
                        this.containerStatistic.className="containerStatistic";
                        host.appendChild(this.containerStatistic);
                
                        var one=document.createElement("div");
                        one.className="gradeContainer";
                        if(this.count!=0)
                        var precent=(parseInt(a1)*100)/this.count;
                        else
                        precent=0;
                        console.log(parseInt(a1));
                        
                        this.containerStatistic.appendChild(one);
                
                        var oneFilled=document.createElement("div");
                        oneFilled.className="filled";
                        oneFilled.innerHTML=precent+"%";
                        oneFilled.style.setProperty("--d",precent+"%");
                        one.appendChild(oneFilled);
                        
                        var two=document.createElement("div");
                        two.className="gradeContainer";
                        if(this.count!=0)
                        precent=(a2/this.count)*100;
                        else
                        precent=0;
                        this.containerStatistic.appendChild(two);
                
                        var twoFilled=document.createElement("div");
                        twoFilled.className="filled";
                        twoFilled.innerHTML=precent+"%";
                        twoFilled.style.setProperty("--d",precent+"%");
                        two.appendChild(twoFilled);
                
                        var three=document.createElement("div");
                        if(this.count!=0)
                        precent=(a3/this.count)*100;
                        else 
                        precent=0;
                        three.className="gradeContainer";
                        this.containerStatistic.appendChild(three);
                
                        var threeFilled=document.createElement("div");
                        threeFilled.className="filled";
                        threeFilled.innerHTML=precent+"%";
                        threeFilled.style.setProperty("--d",precent+"%");
                        three.appendChild(threeFilled);
                
                        var four=document.createElement("div");
                        four.className="gradeContainer";
                        if(this.count!=0)
                        precent=(a4/this.count)*100;
                        else
                        precent=0;
                        this.containerStatistic.appendChild(four);
                
                        var fourFilled=document.createElement("div");
                        fourFilled.className="filled";
                        fourFilled.innerHTML=precent+"%";
                        fourFilled.style.setProperty("--d",precent+"%");
                        four.appendChild(fourFilled);
                
                        var five=document.createElement("div");
                        five.className="gradeContainer";
                        if(this.count!=0)
                        precent=(a5/this.count)*100;
                        else
                        precent=0;
                        this.containerStatistic.appendChild(five);
                
                        var fiveFilled=document.createElement("div");
                        fiveFilled.className="filled";
                        fiveFilled.innerHTML=precent+"%";
                        fiveFilled.style.setProperty("--d",precent+"%");
                        five.appendChild(fiveFilled);
                    });
                })
        })

       
        
    }
}