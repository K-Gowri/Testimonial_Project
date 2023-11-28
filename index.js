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

<<<<<<< HEAD



=======
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
>>>>>>> a4f9c7d6dc384cb1f62fc555f0b215ad923a8bc7
