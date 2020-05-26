// Name local storage
const nameInput = document.querySelector(".name-local-storage > input");
const nameBtn = document.querySelector(".name-local-storage > button");
const user = document.querySelector(".user-name");
const appFirstTime = document.querySelector(".app-first-time");
const appDesktop = document.querySelector(".app-desktop");
const mainApp = document.querySelector(".main-app-section-content");
const tableAppSection = document.querySelector(".table-app-section");
const newScheduleContainer = document.querySelector(".new-schedule-container");
const buttonAddRecipe = document.querySelector(".button-add-recipe");
const buttonAddSchedule = document.querySelector(".button-add-schedule");
const newRecipeSection = document.querySelector(".new-recipe-section");
var allRecipes = [];

if (localStorage.savedName == null) {
  user.innerText = "Imię";
  appFirstTime.style.display = "flex";
  appDesktop.style.display = "none";
  mainApp.style.border = "1px dashed $light-grey-color";
  mainApp.style.backgroundColor = "$white-color";
  mainApp.style.alignItems = "center";
  tableAppSection.style.display = "none";
} else {
  user.innerText = localStorage.savedName;
  appFirstTime.style.display = "none";
  appDesktop.style.display = "flex";
  mainApp.style.border = "none";
  mainApp.style.background = "none";
  mainApp.style.alignItems = "flex-start";
}

newScheduleContainer.style.display = "none";
newRecipeSection.style.display = "none";

nameBtn.addEventListener("click", function (e) {
  let name = nameInput.value;
  if (name.trim() && !Number(name) && name.length > 1) {
    let userName = name;
    localStorage.setItem("savedName", userName);
  } else {
    alert("Podaj poprawnie swoję imię :)");
  }
});

buttonAddRecipe.addEventListener("click", function (e) {
  mainApp.style.display = "none";
  tableAppSection.style.display = "none";
  newRecipeSection.style.display = "flex";
  newRecipeSection.style.flexDirection = "column";
});

buttonAddSchedule.addEventListener("click", function (e) {
  mainApp.style.display = "none";
  tableAppSection.style.display = "none";
  newScheduleContainer.style.display = "flex";
  newScheduleContainer.style.flexDirection = "column";
});




// Schedule
function Schedule(id, weekNumber, title, description) {
  this.id = id; // id przepisu
  this.title = title; // nazwa planu
  this.description = description; // opis planu
  this.weekNumber = weekNumber; // numer tygodnia do którego przypisany jest plan
  this.monday = []; // plan na poniedzialek
  this.tuesday = []; // plan na wtorek
  this.wednesday = []; // plan na środę
  this.thursday = []; // plan na czwartek
  this.friday = []; // plan na piątek
  this.saturday = []; // plan na sobotę
  this.sunday = []; // plan na niedzielę
}

Schedule.prototype.showInfo = function () {
  console.warn("ID: ", this.id, "TYTUŁ: ", this.title); // wyświetl id oraz tytuł
  console.warn("OPIS: ", this.description); // wyświetl opis

  console.warn("Poniedziałek:");
  this.monday.forEach(function (elem, i) {
    console.warn(i, elem); // wyświetl każdy poskiłek z poniedziałku
  });
};

Schedule.prototype.saveToLocalStorage = function () {
  /* if(){
        // uzupełnij
      }else{
        // uzupełnij
      } */
};

let allPlanns = [];
let newPlan = new Schedule(
  allPlanns.length + 1,
  1,
  "Mięsny Tydzień",
  "W tym tygodniu dieta jest wyjątkowo mięsna"
);
newPlan.monday = [
  "kiełbaska na gorąco",
  "surowy boczek",
  "zupa",
  "schabowy",
  "kiełbaska na gorąco"
];
newPlan.tuesday = [
  "baba wielkanocna",
  "barszcz czerwony",
  "żurek",
  "barszcz biały",
  "zalewajka"
];
newPlan.wednesday = [
  "kapuśniak",
  "kasza gryczana",
  "kaszanka",
  "pyzy",
  "kompot"
];
newPlan.thursday = [
  "bigos",
  "chłodnik litewski",
  "czernina",
  "faworki",
  "grochówka"
];
newPlan.friday = ["pączki", "piernik", "pierogi", "racuchy", "rolada"];
newPlan.saturday = [
  "galareta drobiowa lub wieprzowa",
  "jarzyny",
  "karp",
  "sandacz po polsku",
  "węgorz"
];
newPlan.sunday = [
  "kutia",
  "wątroba siekana smażona",
  "zupa grzybowa",
  "zupa ogórkowa",
  "zupa szczawiowa"
];
allPlanns.push(newPlan);

let breakfastRow = document.querySelector(".breakfast").children;
let secondMealRow = document.querySelector(".second-meal").children;
let soupRow = document.querySelector(".soup").children;
let mainCourse = document.querySelector(".main-course").children;
let supperCourse = document.querySelector(".supper").children;

let scheduleLeft = document.querySelector(".schedule-click-left");
let scheduleRight = document.querySelector(".schedule-click-right");

let deleteWidget = document.querySelectorAll(".delete-widgets");
for (let i = 0; i < deleteWidget.length; i++) {
  deleteWidget[i].addEventListener("click", () => {
    deleteWidget[i].parentElement.style.display = "none";
  });
}




// Add recipe
let recipe_name = document.querySelector("#recipe_name");
let recipe_desc = document.querySelector("#recipe_desc");
let instruction_butt = document.querySelector("#instruction_butt");
let ingredient_butt = document.querySelector("#ingredient_butt");
let instruction_list = document.getElementById("instruction_list");
let ingredient_list = document.getElementById("ingredient_list");
const save = document.getElementById("saveAndClose");

instruction_butt.addEventListener("click", function () {
  let value_instruction = document.getElementById("value_instruction");
  if (!value_instruction.value) {
    alert("Wpisz jakąś instrukcję :)");
  }
  else {
    let newLi = document.createElement("li");
    newLi.innerHTML =
      value_instruction.value +
      ` <i class="fas fa-edit"></i
  ><i class="fas fa-trash-alt"></i>`;
    instruction_list.appendChild(newLi);
    value_instruction.value = "";
  }
});

ingredient_butt.addEventListener("click", function () {
  let value_ingredient = document.getElementById("value_ingredient");
  if (!value_ingredient.value) {
    alert("Wpisz jakiś składnik :)");
  }
  else {
    let newLi = document.createElement("li");
    newLi.innerHTML =
      value_ingredient.value +
      ` <i class="fas fa-edit"></i
  ><i class="fas fa-trash-alt"></i>`;
    ingredient_list.appendChild(newLi);
    value_ingredient.value = "";
  }
});

function Recipe(id, title, description) {
  this.id = id; // id przepisu
  this.title = title; // nazwa przepisu
  this.description = description; // opis przepisu
  this.ingredients = []; // składniki przepisu
  this.instructions = []; // instrukcje przepisu
}

const recipesCounterList = document.querySelector(".recipes-counter-list");
const recipesLocalStorage = localStorage.getItem("recipe_");
const recipesListLocalStorage = JSON.parse(recipesLocalStorage);

let recipesIdList = 0;

if (localStorage.recipe_ == null) {
  recipesIdList = 0;
  recipesCounterList.innerText = 0;
}
else {
  recipesIdList = recipesListLocalStorage.length;
  recipesCounterList.innerText = recipesListLocalStorage.length;
}

function addRecipe(e) {
  e.preventDefault();
  if (recipe_name.value && recipe_desc.value) {
    let newRecipe = new Recipe(
      recipesIdList + 1,
      recipe_name.value,
      recipe_desc.value
    );
    let allInstructions = instruction_list.querySelectorAll("li");
    let allIngredients = ingredient_list.querySelectorAll("li");
    allInstructions.forEach(function (element) {
      newRecipe.instructions.push(element.innerText);
    });
    allIngredients.forEach(function (element) {
      newRecipe.ingredients.push(element.innerText);
    });
    allRecipes.push(newRecipe);
    recipe_name.value = "";
    recipe_desc.value = "";
    addRecipesToLocalStorage(newRecipe);
    allInstructions.forEach(function (element) {
      instruction_list.removeChild(element);
    });
    allIngredients.forEach(function (element) {
      ingredient_list.removeChild(element);
    });
  } else if (recipe_name.value.length <= 0 || recipe_desc.value.length <= 0) {
    alert("Dodaj nazwę i opis!");
  }
}
save.addEventListener("click", addRecipe);
function addRecipesToLocalStorage(newRecipe) {
  var dataFromLocalStorage = [];
  if (localStorage.getItem("recipe_") != null) {
    dataFromLocalStorage = JSON.parse(localStorage.getItem("recipe_"));
    dataFromLocalStorage.push(newRecipe);
    localStorage.setItem("recipe_", JSON.stringify(dataFromLocalStorage));
  } else {
    dataFromLocalStorage.push(newRecipe);
    localStorage.setItem("recipe_", JSON.stringify(dataFromLocalStorage));
  }
  alert("Przepis zapisany do localStorage");
}