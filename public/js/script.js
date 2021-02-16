document.addEventListener(
  "DOMContentLoaded",
  () => {
    console.log("DoggoConnect JS imported successfully!");
  },
  false
);

function selectOnlyThis(id) {
  for (var i = 1;i <= 2; i++){
      if ("contactChoice" + i === id && document.getElementById("contactChoice" + i).checked === true){
          document.getElementById("contactChoice" + i).checked = true;
          } else {
            document.getElementById("contactChoice" + i).checked = false;
          }
  }  
}