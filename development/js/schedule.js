//Name localstorage
const user = document.querySelector(".user-name");

if (localStorage.savedName == null) {
    user.innerText = "Imię";
} else {
    user.innerText = localStorage.savedName;
}




// Add schedule
const buttonAddSchedule = document.querySelector(".button-add-schedule");

buttonAddSchedule.addEventListener("click", function (e) {
    if (localStorage.savedName == null) {
        alert("Najpierw podaj swoję imię");
    }
    else {
        localStorage.setItem("addSchedule", "dodaj plan");
        location.href = "./app.html";
    }
});




//Schedules list localstorage
const tBodySchedule = document.querySelector(".schedule-table-tbody");

let sorted = Object.entries(localStorage).filter(elem => {
    return elem[0].substring(0, 4) == "plan"
}).sort((a, b) => {
    return parseInt(a[0].substring(5, 10)) - parseInt(b[0].substring(5, 10))
});

if (sorted.length == 0) {
    let h2 = document.createElement("h2");
    h2.innerText = "Twoja lista planów jest pusta :(";
    tBodySchedule.appendChild(h2);
    tBodySchedule.style.display = "flex";
    tBodySchedule.style.alignItems = "center";
    tBodySchedule.style.justifyContent = "center";
}
else {
    sorted.forEach(e => {
        const scheduleListLocalStorage = JSON.parse(e[1]);
        const trSchedule = document.createElement("tr");
        const tdScheduleId = document.createElement("td");
        const tdScheduleName = document.createElement("td");
        const tdScheduleDes = document.createElement("td");
        const tdScheduleWeek = document.createElement("td");
        const tdScheduleIco = document.createElement("td");
        const editBtn = document.createElement("i");
        const deleteBtn = document.createElement("i");

        editBtn.className = "fas fa-edit";
        deleteBtn.className = "fas fa-trash-alt";

        trSchedule.appendChild(tdScheduleId);
        trSchedule.appendChild(tdScheduleName);
        trSchedule.appendChild(tdScheduleDes);
        trSchedule.appendChild(tdScheduleWeek);
        trSchedule.appendChild(tdScheduleIco);

        tdScheduleId.innerText = scheduleListLocalStorage.id;
        tdScheduleName.innerText = scheduleListLocalStorage.title;
        tdScheduleDes.innerText = scheduleListLocalStorage.description;
        tdScheduleWeek.innerText = scheduleListLocalStorage.weekNumber;
        tdScheduleIco.appendChild(editBtn);
        tdScheduleIco.appendChild(deleteBtn);
        tBodySchedule.appendChild(trSchedule);

        deleteBtn.addEventListener("click", () => {
            localStorage.removeItem(e[0]);
            window.location.reload(false);
        })
    })
}