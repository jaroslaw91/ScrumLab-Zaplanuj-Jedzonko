//Name local storage
const user = document.querySelector(".user-name");

if (localStorage.savedName == null) {
    user.innerText = "Imię";
} else {
    user.innerText = localStorage.savedName;
}




//Recipes list local storage
const tBodyRecipe = document.querySelector(".recipes-table-tbody");
const recipesLocalStorage = localStorage.getItem("recipe_");
const recipesListLocalStorage = JSON.parse(recipesLocalStorage);

if (localStorage.recipe_ == null || localStorage.recipe_ == "[]") {
    let h2 = document.createElement("h2");
    h2.innerText = "Twoja lista przepisów jest pusta :(";
    tBodyRecipe.appendChild(h2);
    tBodyRecipe.style.display = "flex";
    tBodyRecipe.style.alignItems = "center";
    tBodyRecipe.style.justifyContent = "center";
}
else {
    recipesListLocalStorage.forEach(e => {
        const trRecipe = document.createElement("tr");
        const tdRecipeId = document.createElement("td");
        const tdRecipeName = document.createElement("td");
        const tdRecipeDes = document.createElement("td");
        const tdRecipeIco = document.createElement("td");

        const editBtn = document.createElement("i");
        const deleteBtn = document.createElement("i");

        editBtn.className = "fas fa-edit";
        deleteBtn.className = "fas fa-trash-alt";

        trRecipe.appendChild(tdRecipeId);
        trRecipe.appendChild(tdRecipeName);
        trRecipe.appendChild(tdRecipeDes);
        trRecipe.appendChild(tdRecipeIco);

        tdRecipeId.innerText = e.id;
        tdRecipeName.innerText = e.title;
        tdRecipeDes.innerText = e.description;
        tdRecipeIco.appendChild(editBtn);
        tdRecipeIco.appendChild(deleteBtn);
        tBodyRecipe.appendChild(trRecipe);

        deleteBtn.addEventListener("click", () => {
            recipesListLocalStorage.splice(this.data, 1);
            localStorage.setItem("recipe_", JSON.stringify(recipesListLocalStorage));
            window.location.reload(false);
        });
    });
}