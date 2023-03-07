let workMinutes = 25;
let shortBreakMinutes = 5;
let shortBreakCounter = 0;
let sessionCounter = 0;
let longBreakMinutes = 15;
let seconds = 60;
let remainingWorkMinutes = workMinutes - 1;
let remainingShortBreakMinutes = shortBreakMinutes - 1;
let remainingLongBreakMinutes = longBreakMinutes - 1;
let pomodoroText = document.getElementById("timer__text");
let pomodoroMinutes_span = document.getElementById("minute-counter");
let pomodoroSeconds_span = document.getElementById("second-counter");
const startButton = document.getElementById("buttons__start");
const resetButton = document.getElementById("buttons__reset");
const start_p = document.getElementById("start");
const itemList = document.querySelector(".settings");
const workTimeMinutes_span = document.getElementById("work-time-minutes");
const shortBreakMinutes_span = document.getElementById("short-break-minutes");
const longBreakMinutes_span = document.getElementById("long-break-minutes");
let running = false;
let minusButtons = document.querySelectorAll(".minus-btn");
let plusButtons = document.querySelectorAll(".plus-btn");
let timer;

main();

function main() {
  startButton.addEventListener("click", function () {
    if (!running) {
      timer = setInterval(remainingTime, 100);
    } else {
      resume();
    }
  });

  resetButton.addEventListener("click", function () {
    clearInterval(timer);
    running = false;
    start_p.innerHTML = "Start";
    seconds = 60;
    pomodoroMinutes_span.innerHTML = workMinutes;
    pomodoroSeconds_span.innerHTML = "00";
  });

  for (let i = 0; i < minusButtons.length; i++) {
    minusButtons[i].addEventListener("click", function (event) {
      minusButtonClicked(event.target.parentElement.id);
    });
  }

  for (let i = 0; i < plusButtons.length; i++) {
    plusButtons[i].addEventListener("click", function (event) {
      plusButtonClicked(event.target.parentElement.id);
    });
  }
}

let remainingTime = function startTimer() {
  running = true;
  start_p.innerHTML = "Pause";
  seconds -= 1;
  pomodoroMinutes_span.innerHTML = remainingWorkMinutes;
  pomodoroSeconds_span.innerHTML = seconds;
  console.log(remainingWorkMinutes);
  console.log(seconds);

  if (seconds === 0) {
    remainingWorkMinutes = remainingWorkMinutes - 1;
    if (remainingWorkMinutes === -1) {
      if (sessionCounter % 2 === 0) {
        if (shortBreakCounter === 3) {
          remainingWorkMinutes = longBreakMinutes - 1;
          sessionCounter++;
          shortBreakCounter = 0;
        } else {
          remainingWorkMinutes = shortBreakMinutes - 1;
          sessionCounter++;
          shortBreakCounter++;
        }
      } else {
        remainingWorkMinutes = workMinutes - 1;
        pomodoroText.innerHTML = "Pomodoro " + (sessionCounter % 2) + 1;
        sessionCounter++;
      }
    }
    seconds = 60;
  }
};

function minusButtonClicked(id) {
  switch (id) {
    case "work-time":
      if (workMinutes > 1) {
        workMinutes -= 1;
        remainingWorkMinutes = workMinutes - 1;
        workTimeMinutes_span.innerHTML = workMinutes;
        pomodoroMinutes_span.innerHTML = workMinutes;
        console.log(workMinutes);
        break;
      } else {
        window.alert("You can't set your worktime under 1 minutes!");
      }
    case "short-break":
      if (shortBreakMinutes > 1) {
        shortBreakMinutes -= 1;
        remainingShortBreakMinutes = shortBreakMinutes - 1;
        shortBreakMinutes_span.innerHTML = shortBreakMinutes;
        break;
      } else {
        window.alert("You can't set your short break under 1 minutes!");
      }
    case "long-break":
      if (longBreakMinutes > 1) {
        longBreakMinutes -= 1;
        remainingLongBreakMinutes = longBreakMinutes - 1;
        longBreakMinutes_span.innerHTML = longBreakMinutes;
        break;
      } else {
        window.alert("You can't set your long break under 1 minutes!");
      }
  }
}

function plusButtonClicked(id) {
  console.log(workMinutes);
  switch (id) {
    case "work-time":
      workMinutes += 1;
      remainingWorkMinutes = workMinutes - 1;
      workTimeMinutes_span.innerHTML = workMinutes;
      pomodoroMinutes_span.innerHTML = workMinutes;
      break;
    case "short-break":
      shortBreakMinutes += 1;
      remainingShortBreakMinutes = shortBreakMinutes - 1;
      shortBreakMinutes_span.innerHTML = shortBreakMinutes;
      break;
    case "long-break":
      longBreakMinutes += 1;
      remainingLongBreakMinutes = longBreakMinutes - 1;
      longBreakMinutes_span.innerHTML = longBreakMinutes;
      break;
  }
}

function resume() {
  clearInterval(timer);
  start_p.innerHTML = "Start";
  running = false;
}
