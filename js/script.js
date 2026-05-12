function showMenu(id){

  document.querySelectorAll(".menu")
    .forEach(menu=>{
      menu.classList.remove("active");
    });

  document
    .getElementById(id)
    .classList.add("active");

}