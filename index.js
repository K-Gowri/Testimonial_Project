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
  modalTitle = document.querySelector("#userForm .modal-title")



  let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

  let isEdit = false, editId
  showInfo()

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
        let createElement = `<tr class="employeeDetails">
         <td>${index+1}</td>
         <td><img src="${element.picture}" alt="" width="50" height="50"></td>
         <td>${element.employeeName}</td>
         <td>${element.employeeEmail}</td>
         <td>${element.employeeMobile}</td>
         <td>${element.startDate}</td>

         <td>
         <button class="btn btn-success" onclick="readInfo('${element.picture}','${element.employeeName}','${element.employeeEmail}', '${element.employeeMobile}','${element.startDate}' )" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>
         <button class="btn btn-primary" onclick="editInfo(${index}, '${element.picture}','${element.employeeName}','${element.employeeEmail}', '${element.employeeMobile}','${element.startDate}' )" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>
         <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
     
         </td>


       </tr>`

       userInfo.innerHTML += createElement
    })
  }
showInfo()


function  readInfo(pic,name,email,phone,sDate){
    document.querySelector('.showImg').src= pic,
    document.querySelector('#showName').value = name,
    document.querySelector("#showEmail").value = email,
    document.querySelector("#showMobile").value = phone,
    document.querySelector("#showsDate").value = sDate

}

function editInfo(index,pic,name,Email,Phone,Sdate){
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



  function deleteInfo(index){
    if(confirm("Are you sure want to delete?")){
        getData.splice(index, 1)
        localStorage.setItem("userProfile", JSON.stringify(getData))
        showInfo()
    }
  }

  form.addEventListener('submit', (e)=> {
    e.preventDefault()
    const information = {
        picture:  imgInput.src == undefined ? "Images/user-1.jpg" : imgInput.src,
        employeeName: userName.value,
        employeeEmail: email.value,
        employeeMobile: phone.value,
        startDate: sDate.value


    }
    if(!isEdit){
             getData.push(information)
    }
    else{
        isEdit = false
        getData[editId] = information
    }
    localStorage.setItem('userProfile', JSON.stringify(getData))
      
    
     submitBtn.innerText = "Submit"
     modalTitle.innerHTML = "Fill The Form"

     showInfo()
     form.reset()

     imgInput.src = "Images/user-1.jpg"
     modal.style.display = "none"
     document.querySelector(".modal-backdrop").remove()
})


















