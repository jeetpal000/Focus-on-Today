const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll('input[type="text"]');
const error = document.querySelector(".alert");
const processBar = document.querySelector(".process-bar");
const processValue = document.querySelector(".process-value");
const slogan = document.querySelector(".goal-slogan");

const quotes = [
  "Raise the bar by completing your goals!",
  "Well began is half done!",
  "Just a step away, keep going!",
  "Whoa! You just completed all the goals, time for chill 🥳",
];

//  Load goals safely
let allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};

//  Initialize UI from saved goals
inputFields.forEach((input) => {
  const goal = allGoals[input.id];
  if (goal && goal.name) {
    input.value = goal.name;
  } else {
    input.value = "";
  }

  if (goal && goal.completed) {
    input.parentElement.classList.add("completed");
  }

  input.addEventListener("focus", () => {
    processBar.classList.remove("show-alert");
  });

  input.addEventListener("input", () => {
    if (allGoals[input.id]?.completed) {
      input.value = allGoals[input.id].name;
      return;
    }

    allGoals[input.id] = {
      name: input.value,
      completed: false,
    };

    localStorage.setItem("allGoals", JSON.stringify(allGoals));
    updateProgress();
  });
});

//  Checkbox logic
checkBoxList.forEach((checkBox) => {
  checkBox.addEventListener("click", () => {
    const allInputFilled = [...inputFields].every((input) => input.value.trim());

    if (allInputFilled) {
      checkBox.parentElement.classList.toggle("completed");

      const inputId = checkBox.nextElementSibling.id;
      if (!allGoals[inputId]) {
        allGoals[inputId] = { name: checkBox.nextElementSibling.value, completed: false };
      }

      allGoals[inputId].completed = !allGoals[inputId].completed;
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
      updateProgress();
    } else {
      processBar.classList.add("show-alert");
    }
  });
});

//  Progress bar updater
function updateProgress() {
  const completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length;
  processValue.style.width = `${(completedGoalsCount / 3) * 100}%`;
  processValue.querySelector("span").textContent = `${completedGoalsCount}/3 completed`;
  slogan.innerText = quotes[completedGoalsCount];
}

//  Initial progress update
updateProgress();


// function updateProgress() {
//   const completed = document.querySelectorAll(".goal.completed").length;
//   processValue.style.width = `${(completed / 3) * 100}%`;
//   processValue.querySelector("span").textContent = `${completed}/3 completed`;
// }
