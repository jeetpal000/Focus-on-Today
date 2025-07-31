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



const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {};

let completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length;
processValue.style.width = `${(completedGoalsCount / 3) * 100}%`;
processValue.querySelector("span").textContent = `${completedGoalsCount}/3 completed`;
slogan.innerText = quotes[completedGoalsCount];
 3

checkBoxList.forEach((checkBox) => {
  checkBox.addEventListener("click", () => {
    const allInputAdd = [...inputFields].every(function (input) {return input.value;});

    if(allInputAdd) {
      checkBox.parentElement.classList.toggle("completed");
      // updateProgress();
      const inputId = checkBox.nextElementSibling.id;

      allGoals[inputId].completed = !allGoals[inputId].completed;
      completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length;
      processValue.style.width = `${(completedGoalsCount / 3) * 100}%`;
      processValue.querySelector("span").textContent = `${completedGoalsCount}/3 completed`;
      slogan.innerText = quotes[completedGoalsCount];
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      processBar.classList.add("show-alert");
    }
  });
});

inputFields.forEach((input) => {
  input.value = allGoals[input.id].name;
  if (allGoals[input.id].completed) {
    input.parentElement.classList.add("completed");
  }

  input.addEventListener("focus", () => {
    processBar.classList.remove("show-alert");
  });

  input.addEventListener("input", (e) => {
    if (allGoals[input.id].completed) {
      input.value = allGoals[input.id].name;
      return; 
    }
    allGoals[input.id] = {
      name: input.value,
      completed: false,
    };

    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});

// function updateProgress() {
//   const completed = document.querySelectorAll(".goal.completed").length;
//   processValue.style.width = `${(completed / 3) * 100}%`;
//   processValue.querySelector("span").textContent = `${completed}/3 completed`;
// }
