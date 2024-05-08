$(".menu > ul > li").click(function (e){
    $(this).siblings().removeClass("active");
    $(this).toggleClass("active");
    $(this).find("ul").slideToggle();
    $(this).siblings().find("ul").slideUp();
    $(this).siblings().find("ul").find("li").removeClass("active");
});

$(".menu-btn").click(function(){
    $(".sidebar").toggleClass("active");
});


const links= document.querySelectorAll(".nav > div > ul > li");
const cards= document.querySelectorAll(".card");

[...links].map((link, index) => {
    link.addEventListener("click",() => onLinkClick(link, index), false);
});

const onLinkClick = (link, currentIndex) => {
    const selectedItem = link.getAttribute("name");
    cards.forEach((card) => {
        card.classList.remove("active");
    });
    const currentCard =[...cards].find((card) =>
        card.classList.contains(selectedItem)
    );
    currentCard.classList.add("active");
};

var form = document.getElementById("myForm"),
  imgInput = document.querySelector(".img"),
  file = document.getElementById("imgInput"),
  userName = document.getElementById("name"),
  email = document.getElementById("email"),
  phone = document.getElementById("mobile"),
  sDate = document.getElementById("sDate"),
  submitBtn = document.querySelector(".submit"),
  userInfo = document.getElementById("data"),
  modal = document.getElementById("userForm"),
  modalTitle = document.querySelector("#userForm .modal-title"),
   newUserBtn = document.querySelector('.newUser')

const sendEmail = document.getElementById('sendEmail')
const feedbackMails = []


let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

let isEdit = false
showInfo()

newUserBtn.addEventListener('click' ,()=> {
    submitBtn.innerText = 'Submit' ,
    modalTitle.innerText = "Fill the Form"
    isEdit = false
    imgInput.src = "Images/user-1.jpg"
    form.reset()
})

file.onchange = function(){
    if(file.files[0].size < 1000000){
        var fileReader = new FileReader();

        fileReader.onload = function(e){
            imgUrl = e.target.result
            imgInput.src = imgUrl
        }
        fileReader.readAsDataURL(file.files[0])
    }
    else {
        alert("This file is too large !")
    }
}


function showInfo(){
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove())
    getData.forEach((element, index) => {
            const handleFeedback = (mail) => {
            const mailSplit = mail
            
            const feedbackCheck = async (mailSplit) => {
                const feedbackResponse = await fetch("http://localhost:3001/feedback")
                const feedbackJson = await feedbackResponse.json()
                if(feedbackJson.length){
                    for(let feedback of feedbackJson)
                    {
                        if(feedback.email === mailSplit)
                        {
                            fstatus = true
                        
                            break
                        }
                        else
                        {
                            feedbackMails.push(mail)
                            fstatus = false
                        }
                    }

                    if(fstatus)
                    {
                        let createElement = `<tr class="employeeDetails">
                            <td>${index+1}</td>
                            <td><img src="${element.picture}" alt="" width="50" height="50"></td>
                            <td>${element.employeeName}</td>
                            <td>${element.employeeEmail}</td>
                            <td>${element.employeeMobile}</td>
                            <td>${element.startDate}</td>

                            <td>
                                <button class="btn btn-success" onclick="readInfo('${element.picture}','${element.employeeName}','${element.employeeEmail}', '${element.employeeMobile}','${element.startDate}' )" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>
                                <button class="btn btn-primary" onclick="editInfo(${index}, ${element.id}, '${element.picture}','${element.employeeName}','${element.employeeEmail}', '${element.employeeMobile}','${element.startDate}' )" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>
                                <button class="btn btn-danger" onclick="deleteInfo(${index},${element.id})"><i class="bi bi-trash"></i></button>
                            </td>
                            <td><p class = 'feedbackstatus'>Submitted</p></td>
                        </tr>`
                        userInfo.innerHTML += createElement
                    }
                    else
                    {
                        let createElement = `<tr class="employeeDetails">
                            <td>${index+1}</td>
                            <td><img src="${element.picture}" alt="" width="50" height="50"></td>
                            <td>${element.employeeName}</td>
                            <td>${element.employeeEmail}</td>
                            <td>${element.employeeMobile}</td>
                            <td>${element.startDate}</td>

                            <td>
                                <button class="btn btn-success" onclick="readInfo('${element.picture}','${element.employeeName}','${element.employeeEmail}', '${element.employeeMobile}','${element.startDate}' )" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>
                                <button class="btn btn-primary" onclick="editInfo(${index}, ${element.id}, '${element.picture}','${element.employeeName}','${element.employeeEmail}', '${element.employeeMobile}','${element.startDate}' )" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>
                                <button class="btn btn-danger" onclick="deleteInfo(${index},${element.id})"><i class="bi bi-trash"></i></button>
                            </td>
                            <td><p class = 'feedbackstatus'>Pending</p></td>
                        </tr>`
                        userInfo.innerHTML += createElement
                    }
                }
                else
                {
                    let createElement = `<tr class="employeeDetails">
                            <td>${index+1}</td>
                            <td><img src="${element.picture}" alt="" width="50" height="50"></td>
                            <td>${element.employeeName}</td>
                            <td>${element.employeeEmail}</td>
                            <td>${element.employeeMobile}</td>
                            <td>${element.startDate}</td>

                            <td>
                                <button class="btn btn-success" onclick="readInfo('${element.picture}','${element.employeeName}','${element.employeeEmail}', '${element.employeeMobile}','${element.startDate}' )" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>
                                <button class="btn btn-primary" onclick="editInfo(${index}, ${element.id}, '${element.picture}','${element.employeeName}','${element.employeeEmail}', '${element.employeeMobile}','${element.startDate}' )" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>
                                <button class="btn btn-danger" onclick="deleteInfo(${index},${element.id})"><i class="bi bi-trash"></i></button>
                            </td>
                            <td><p class = 'feedbackstatus'>Pending</p></td>
                        </tr>`
                        userInfo.innerHTML += createElement
                }
            }
        
            feedbackCheck(mailSplit)
        }
        handleFeedback(element.employeeEmail)
    })
}


function  readInfo(pic,name,email,phone,sDate){
    document.querySelector('.showImg').src= pic,
    document.querySelector('#showName').value = name,
    document.querySelector("#showEmail").value = email,
    document.querySelector("#showMobile").value = phone,
    document.querySelector("#showsDate").value = sDate

}

function editInfo(index,id,pic,name,Email,Phone,Sdate){

    jsonEditId = id
    isEdit = true
    editId = index
    imgInput.src = pic
    userName.value = name
    email.value = Email,
    phone.value = Phone,
    sDate.value = Sdate

    submitBtn.innerText = "Update"
    modalTitle.innerText = "Update The Form"

}
  function deleteInfo(index,id){
    if(confirm("Are you sure want to delete?")){
        getData.splice(index, 1)
        localStorage.setItem("userProfile", JSON.stringify(getData))
        showInfo()
        deleteUser(id)
    }
  }

submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    if(submitBtn.innerHTML === 'Submit'){
        const userList = JSON.parse(localStorage.getItem("userProfile"))

        const information = {
            id: userList.length ? userList[userList.length - 1].id + 1 : 1,
            picture:  imgInput.src == undefined ? "Images/user-1.jpg" : imgInput.src,
            employeeName: userName.value,
            employeeEmail: email.value,
            employeeMobile: phone.value,
            startDate: sDate.value,
        }
        console.log(information)
        getData.push(information)
        handleSubmit()
    }
    else if(submitBtn.innerHTML === 'Update'){
        const information = {
            id: jsonEditId,
            picture:  imgInput.src == undefined ? "Images/user-1.jpg" : imgInput.src,
            employeeName: userName.value,
            employeeEmail: email.value,
            employeeMobile: phone.value,
            startDate: sDate.value
        }
        getData[editId] = information
        handleEditUser(jsonEditId,information)
    }
    localStorage.setItem('userProfile', JSON.stringify(getData))
      
    
     submitBtn.innerText = "Submit"
     modalTitle.innerHTML = "Fill The Form"
     form.reset()

     imgInput.src = "Images/user-1.jpg"
     modal.style.display = "none"
     document.querySelector(".modal-backdrop").remove()

})


// JSON Coding

const API_URL = "http://localhost:3000/users"; // Local server JSON API

function handleSubmit() {
    const userList = JSON.parse(localStorage.getItem("userProfile"))
    const id = userList.length ? userList[userList.length - 1].id + 1 : "1"
    const user = {
        id : `${id}`,
        picture:  imgInput.src == undefined ? "Images/user-1.jpg" : imgInput.src,
        employeeName: `${userName.value}`,
        employeeEmail: `${email.value}`,
        employeeMobile: `${phone.value}`,
        startDate: `${sDate.value}`,
        feedback: 'Pending'
    }
   postData(API_URL, user)
}

const postData = async (API_URL, user) => {
    console.log(JSON.stringify(user))
    try
    {
        await fetch(API_URL, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(user)
        })
    }
    catch(err)
    {
        console.log(err)
    }
}

const deleteUser = async (id) => {
    try
    {
        await fetch(`${API_URL}/${id}`, {
            method : "DELETE",
        })
    }
    catch(err)
    {
        console.log(err)
    }
}

const handleEditUser = async (id, editUser) => {
    try
    {
        await fetch(`${API_URL}/${id}`, {
            method : "PUT",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify(editUser)
        })
    }
    catch(err)
    {
        console.log(err)
    }
}

sendEmail.addEventListener('click', () => {
    const mails = feedbackMails.join(',');
    console.log(mails);
    const formdata = new FormData();
    formdata.append("mails",`${mails}` );

    const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow"
    };

    fetch("http://localhost/testimonial/mailer.php", requestOptions)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));
})