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

var form = document.getElementById("#myForm"),
  imgInput = document.querySelector(".img"),
  file = document.getElementById("imgInput"),
  name = document.getElementById("name"),
  email = document.getElementById("email"),
  phone = document.getElementById("phone"),
  sDate = document.getElementById("sDate"),
  submitBtn = document.querySelector(".submit"),
  userInfo = document.getElementById("data")



  let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

  let isData = false, editId

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


  form.addEventListener('submit' , (e)=>{
    e.preventDefault()
    const information = {
        picture:  imgInput.src == undefined ? "Images/user-1.jpg" : imgInput.src,
    }
  })