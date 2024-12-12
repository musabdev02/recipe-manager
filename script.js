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
const SaveRecipe = document.querySelector(".recipe_form-cta button");
// detailPage
const detailPage = document.getElementById("detailPage");
const closeDetail = document.querySelector(".detailPage_sec .close_icon");
const detailImg = document.getElementById("detailImg");
const detailTag = document.querySelector(".tag");
const detailTitle = document.getElementById("detailTitle");
const detailDesc = document.getElementById("detailDesc");
const detailDiffi = document.getElementById("detailDiffi");
const detailApproxTIme = document.getElementById("detailApproxTIme");
const detailCategory = document.getElementById("detailCategory");
const ingredient_portion = document.querySelector(".ingredient_portion");

// others
let recipeVal;
let shortDescVal;
let categoryVal;
let difficultVal;
let approxVal;
let thumnail = uploadImage;
let parsedData;
let totalRecipes = 0;

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
// detailPage
closeDetail.addEventListener("click", ()=>{detailPage.style.visibility = "hidden"; detailPage.style.opacity = 0;})
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

SaveRecipe.addEventListener("click", () => {
    ingredientName = document.querySelectorAll(".ingName");
    quantityName = document.querySelectorAll(".quanPercs");
    recipeVal = recipeName.value.trim();
    shortDescVal = shortDecs.value.trim();
    categoryVal = categroies.value;
    difficultVal = difficulty.value;
    approxVal = approxTime.value;

    if (!recipeVal || !shortDescVal) {
        alert("Please enter recipe name & description!");
        return;
    }

    closeRecipeForm();
    saveLocalStorage();
    onLoadCheck();
});

// Save to LocalStorage
const saveLocalStorage = () => {
    let getIngredientsVal = [];
    let getQuantityVal = [];
    const recipeCard = {
        image: thumnail.src || "assets/placeholder.png", // Fallback for missing image
        title: recipeVal,
        desc: shortDescVal,
        category: categoryVal,
        difficulty: difficultVal,
        takenTime: approxVal,
        allIngredients: getIngredientsVal,
        allQuantities: getQuantityVal
    };

    Array.from(ingredientName).forEach((e)=>{
        getIngredientsVal.push(e.value);
    });
    Array.from(quantityName).forEach((e)=>{
        getQuantityVal.push(e.value);
    });
    // Get existing recipes or create an empty array
    const savedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    savedRecipes.push(recipeCard);

    // Save updated recipes to localStorage
    localStorage.setItem("recipes", JSON.stringify(savedRecipes));

    // Append the new card to the homepage
    appendCard(recipeCard);
    clearForm();
};

// Append Card to Homepage
const appendCard = (recipeCard) => {
    let cardHtml = `<img src="${recipeCard.image}" alt="thumbnail">
                    <div class="title_gp dp_flex">
                        <h3>${recipeCard.title}</h3>
                    </div>
                    <p>${recipeCard.desc}</p>
                    <div class="main_card-cta">
                        <a>View Details</a>
                        <a>Delete</a>
                    </div>`;
    let newCard = document.createElement("div");
    newCard.classList.add("main_card");
    newCard.innerHTML = cardHtml;
    main_boxes.appendChild(newCard);
    getFullDetails(newCard);
    deleteRecipeCard(newCard);
};
// delete card from localstorage & dom
const deleteRecipeCard = (theTarget) =>{
    let searchItem = JSON.parse(localStorage.getItem("recipes"));
    theTarget.addEventListener("click", (elem) => {
        if (elem.target.innerText === "Delete") { // Check if the clicked element is the delete link
            const cardIndex = Array.from(main_boxes.children).indexOf(theTarget); // Find the index of the clicked card
            if (cardIndex !== -1) {
                if(confirm("Wanna delete recipe?")){
                    searchItem.splice(cardIndex, 1);
                    localStorage.setItem("recipes", JSON.stringify(searchItem));
                    theTarget.remove();
                    onLoadCheck();
                }
            }
        }
    });
};
const getFullDetails = (theTarget) =>{
    let searchItem = JSON.parse(localStorage.getItem("recipes"));
    theTarget.addEventListener("click", (e)=>{
        let searchTitle = e.target.parentElement.parentElement.childNodes[2].childNodes[1].textContent;
        searchItem.forEach((e)=>{
            if(searchTitle === e.title){
                detailImg.src = e.image;
                detailTag.textContent = e.category
                detailTitle.textContent = e.title;
                detailDesc.textContent = e.desc;
                detailDiffi.textContent = e.difficulty;
                detailApproxTIme.textContent = e.takenTime;
                detailCategory.textContent = e.category;
                
                // 
                let getVal;
                let ingDel_gp = `<p>${getVal}</p> <span>250mg</span>`;
                let newInDel_card = document.createElement("div");
                newInDel_card.classList.add("ing_portion-gp");
                newInDel_card.innerHTML = ingDel_gp;
                e.allIngredients.forEach((e)=>{
                    getVal = e;
                    console.log(getVal)
                    ingredient_portion.appendChild(newInDel_card);
                });

                // const addIng_quantities = (theTarget) =>{
                //     theTarget.forEach((e)=>{
                //      let ingDel_gp = `<p>${e}</p> <span>250mg</span>`;
                //     });
                // }
            };
        });
        if(e.target.innerText === "View Details"){
            detailPage.style.visibility = "visible";
            detailPage.style.opacity = 1;
        }
    });
}
// Load Recipes from LocalStorage on Page Load
const loadRecipes = () => {
    const savedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    savedRecipes.forEach(recipe => {
        appendCard(recipe);
    });
};

// Call loadRecipes on page load
window.addEventListener("DOMContentLoaded", () => {
    loadRecipes();
    onLoadCheck();
});

// clearForm
const clearForm = () => {
    recipeName.value = "";
    shortDecs.value = "";
    categroies.value = "breakfast";
    difficulty.value = "easy";
    approxTime.value = "less than 30 mins";
    thumnail.src = "assets/placeholder.png";

    // Reset ingredients fields
    ingredientName.forEach((e, index) => {
        e.value = "";
        quantityName[index].value = "";

        // Remove extra fields if more than the default count
        if (index >= 1) {
            e.parentElement.remove();
        }
    });
};

// onLoad Check
const onLoadCheck = () => {
    if (main_boxes.childElementCount > 0) {
        main_empty.style.display = "none";
        main_content.style.display = "flex";
        main_boxes.style.display = "flex";
    } else {
        main_empty.style.display = "flex";
        main_content.style.display = "none";
        main_boxes.style.display = "none";
    }
};
