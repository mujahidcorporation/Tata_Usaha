function showMenu(id){

  document.querySelectorAll(".menu")
    .forEach(menu=>{
      menu.classList.remove("active");
    });

  document
    .getElementById(id)
    .classList.add("active");

}

function searchTable(inputId, frameId){

  let input = document.getElementById(inputId).value.toLowerCase();

  let iframe = document.getElementById(frameId);

  try{

    let innerDoc = iframe.contentWindow.document;

    let rows = innerDoc.querySelectorAll("table tr");

    rows.forEach((row,index)=>{

      if(index === 0) return;

      let text = row.innerText.toLowerCase();

      if(text.includes(input)){
        row.style.display = "";
      }else{
        row.style.display = "none";
      }

    });

  }catch(err){

    console.log("Pencarian iframe dibatasi browser");

  }

}
