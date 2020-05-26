//Recipes list local storage
const tBodyRecipe = document.querySelector(".recipes-table-tbody");
const recipesLocalStorage = localStorage.getItem("recipe_");
const recipesListLocalStorage = JSON.parse(recipesLocalStorage);

recipesListLocalStorage.forEach(e => {
    const trRecipe = document.createElement("tr");
    const tdRecipeId = document.createElement("td");
    const tdRecipeName = document.createElement("td");
    const tdRecipeDes = document.createElement("td");
    const tdRecipeIco = document.createElement("td");

    trRecipe.appendChild(tdRecipeId);
    trRecipe.appendChild(tdRecipeName);
    trRecipe.appendChild(tdRecipeDes);
    trRecipe.appendChild(tdRecipeIco);

    tdRecipeId.innerText = e.id;
    tdRecipeName.innerText = e.title;
    tdRecipeDes.innerText = e.description;
    tdRecipeIco.innerHTML = `<i class="fas fa-edit"></i
    ><i class="fas fa-trash-alt"></i>`;

    tBodyRecipe.appendChild(trRecipe);
});