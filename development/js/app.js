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

newScheduleContainer.style.display = 'none';
newRecipeSection.style.display = 'none';

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
    newRecipeSection.style.display = 'flex';
    newRecipeSection.style.flexDirection = 'column';

});

buttonAddSchedule.addEventListener("click", function (e) {
    mainApp.style.display = "none";
    tableAppSection.style.display = "none";
    newScheduleContainer.style.display = 'flex';
    newScheduleContainer.style.flexDirection = 'column';
});

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

const dashboardMonday = document.querySelectorAll('.schedules tr td:nth-of-type(1)');
const dashboardTuesday = document.querySelectorAll('.schedules tr td:nth-of-type(2)');
const dashboardWednesday = document.querySelectorAll('.schedules tr td:nth-of-type(3)');
const dashboardThursday = document.querySelectorAll('.schedules tr td:nth-of-type(4)');
const dashboardFriday = document.querySelectorAll('.schedules tr td:nth-of-type(5)');
const dashboardSaturday = document.querySelectorAll('.schedules tr td:nth-of-type(6)');
const dashboardSunday = document.querySelectorAll('.schedules tr td:nth-of-type(7)');


const scheduleLeft = document.querySelector(".schedule-click-left");
const scheduleRight = document.querySelector(".schedule-click-right");
const tableTitle = document.querySelector('.schedule-view h3');

let sorted = Object.entries(localStorage).filter(elem => {
    return elem[0].substring(0, 4) == "plan"
}).sort((a, b) => {
    return parseInt(a[0].substring(5, 10)) - parseInt(b[0].substring(5, 10))
});

let plan;
let page = 0;

function update_dashboard_table(plan) {
    dashboardMonday.forEach(function (element, index) {
        element.innerText = plan.monday[index]
    });
    dashboardTuesday.forEach(function (element, index) {
        element.innerText = plan.tuesday[index];
    });
    dashboardWednesday.forEach(function (element, index) {
        element.innerText = plan.wednesday[index];
    });
    dashboardThursday.forEach(function (element, index) {
        element.innerText = plan.thursday[index];
    });
    dashboardFriday.forEach(function (element, index) {
        element.innerText = plan.friday[index];
    });
    dashboardSaturday.forEach(function (element, index) {
        element.innerText = plan.saturday[index];
    });
    dashboardSunday.forEach(function (element, index) {
        element.innerText = plan.sunday[index];
    });
    tableTitle.innerText = `Twój plan na ${plan.weekNumber} tydzień:`
}

window.addEventListener('load', function () {
    plan = JSON.parse(sorted[0][1]);
    update_dashboard_table(plan);
});


scheduleRight.addEventListener('click', function () {
    page += 1;
    if (page < sorted.length){
        plan = JSON.parse(sorted[page][1]);
        update_dashboard_table(plan);
    }
});

scheduleLeft.addEventListener('click', function () {
    page -= 1;
    if (page >= 0){
        plan = JSON.parse(sorted[page][1]);
        update_dashboard_table(plan);
    }
});

const saveButton = document.querySelector('.title-new-schedule a');
saveButton.addEventListener('click', function () {
    const planNumber = parseInt(document.querySelector('.nr-new-schedule input').value);
    const planDesc = document.querySelector('.dsc-new-schedule textarea').value;
    const planName = document.querySelector('.name-new-schedule input').value;
    let newPlan = new Schedule(
        Object.entries(localStorage).filter(elem => {
          return elem[0].substring(0, 4) == "plan"
        }).length + 1,
        planNumber,
        planName,
        planDesc
    );
    const monday = document.querySelectorAll('.monday td select option');
    const tuesday = document.querySelectorAll('.tuesday td select option');
    const wednesday = document.querySelectorAll('.wednesday td select option');
    const thursday = document.querySelectorAll('.thursday td select option');
    const friday = document.querySelectorAll('.friday td select option');
    const saturday = document.querySelectorAll('.saturday td select option');
    const sunday = document.querySelectorAll('.sunday td select option');

    monday.forEach(function (element) {
        newPlan.monday.push(element.value);
    });
    tuesday.forEach(function (element) {
        newPlan.tuesday.push(element.value);
    });
    wednesday.forEach(function (element) {
        newPlan.wednesday.push(element.value);
    });
    thursday.forEach(function (element) {
        newPlan.thursday.push(element.value);
    });
    friday.forEach(function (element) {
        newPlan.friday.push(element.value);
    });
    saturday.forEach(function (element) {
        newPlan.saturday.push(element.value);
    });
    sunday.forEach(function (element) {
        newPlan.sunday.push(element.value);
    });
    localStorage.setItem('plan_' + newPlan.id, JSON.stringify(newPlan))

});

let deleteWidget = document.querySelectorAll(".delete-widgets");
for (let i = 0; i < deleteWidget.length; i++) {
    deleteWidget[i].addEventListener("click", () => {
        deleteWidget[i].parentElement.style.display = "none";
    });
}
