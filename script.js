// DOM
const recipeForm = document.getElementById("recipeForm");
const recipeForm_sec = document.querySelector(".recipeForm-sec");
const uploadImage = document.getElementById("uploadImage");
const fileInput = document.getElementById("fileInput");
const ingredientElems = document.querySelector(".ingredientElems");
const main_boxes = document.querySelector(".main_boxes");
const main_empty = document.querySelector(".main_empty");
const main_content = document.querySelector(".main_content");
// inputs
let recipeName = document.getElementById("recipeName");
let shortDecs = document.getElementById("shortDecs");
let categroies = document.getElementById("categroies");
let difficulty = document.getElementById("difficulty");
let approxTime = document.getElementById("approxTime");
const recipe_IngPlus = document.querySelector(".recipe_formSub-con svg");
let ingredientName = document.querySelectorAll(".ingName");
let quantityName = document.querySelectorAll(".quanPercs");
const SaveRecipe = document.querySelector(".recipe_form-cta button")

// others
let recipeVal;
let shortDescVal;
let categoryVal;
let difficultVal;
let approxVal;
let thumnail = uploadImage;

// recipeForm
const openRecipeForm = () =>{
    recipeForm.style.visibility = "visible";
    recipeForm.style.opacity = 1;
    setTimeout(()=>{
        recipeForm_sec.style.transform = "translateY(0px)"
    }, 200)
};
const closeRecipeForm = () =>{
        recipeForm_sec.style.transform = "translateY(1000px)";
    setTimeout(()=>{    
        recipeForm.style.visibility = "hidden";
        recipeForm.style.opacity = 0;
    }, 200)
};
uploadImage.addEventListener("click", () =>{
    fileInput.click();
});
fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        uploadImage.src = e.target.result; // Set the new image source
      };

      reader.readAsDataURL(file);
    }
});
recipe_IngPlus.addEventListener("click", ()=>{
    let html = `<input type="text" class="ingName" placeholder="Ingredeint Name">
                            <input type="text" class="quanPercs" placeholder="Quanitity">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd"></path>
                              </svg>`;
    let newElem = document.createElement("div");
    newElem.classList.add("recipe_formSub-gp", "dp_flex");
    newElem.innerHTML = `${html}`;
    ingredientElems.appendChild(newElem);
    delIngInp(newElem.lastChild);
});
// delete ingredents inputs
const delIngInp = (elem) =>{
    elem.addEventListener("click", ()=>{
        if(ingredientElems.childElementCount > 2){
            elem.parentElement.remove();
        }
        else{
            elem.value = "";
        }
    });
};

SaveRecipe.addEventListener("click", ()=>{
    ingredientName = document.querySelectorAll(".ingName");
    quantityName = document.querySelectorAll(".quanPercs");
    recipeVal = recipeName.value;
    shortDescVal = shortDecs.value;
    categoryVal = categroies.value;
    difficultVal = difficulty.value;
    approxVal = approxTime.value;
    closeRecipeForm();
    updateDisplay();
    onLoadCheck();
});

// append Card on hompage
const updateDisplay = () =>{
    let cardHtml = `<img src="${thumnail.src}" alt="thumbnail">
                            <div class="title_gp dp_flex">
                             <h3>${recipeVal}</h3>
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                              </svg>                              
                            </div>
                            <p>${shortDescVal}</p>
                            <div class="main_card-cta">
                                <a href="#">View Details</a>
                                <a href="#">Delete</a>
                            </div>`;
    let newCard = document.createElement("div");
    newCard.classList.add("main_card");
    newCard.innerHTML = `${cardHtml}`;
    main_boxes.appendChild(newCard);
    recipeName.value = "";
    shortDecs.value = "";
    categroies.value = "breakfast";
    difficulty.value = "easy";
    approxTime.value = "less then 30 mins";
    thumnail.src = "assets/placeholder.png";
    ingredientName.forEach((e)=>{
        if(ingredientElems.childElementCount > 2){
            e.parentElement.remove();
        }
        else{
            e.value = "";
            e.parentElement.childNodes[2].value = "";
        }
    });
};
// onload Check
const onLoadCheck = () =>{
    if(main_boxes.childElementCount < 1){
        main_empty.style.display = "flex";
        main_content.style.display = "none";
        main_boxes.style.display = "none";
    }else{
        main_empty.style.display = "none";
        main_content.style.display = "flex";
        main_boxes.style.display = "flex";
    }
}
window.addEventListener("DOMContentLoaded", onLoadCheck);