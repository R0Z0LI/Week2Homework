let workMinutes = 1;
let totalSec = workMinutes * 60;
let shortBreakMinutes = 5;
let shortBreakCounter = 0;
let sessionCounter = 0;
let longBreakMinutes = 15;
let seconds = 60;
let remainingWorkMinutes = workMinutes - 1;
let remainingShortBreakMinutes = shortBreakMinutes - 1;
let remainingLongBreakMinutes = longBreakMinutes - 1;
let running = false;
let decreasingSeconds = totalSec;
let timer;
let perc;

const pomodoroText = document.getElementById("timer__text");
const pomodoroMinutes_span = document.getElementById("minute-counter");
const pomodoroSeconds_span = document.getElementById("second-counter");
const startButton = document.getElementById("buttons__start");
const resetButton = document.getElementById("buttons__reset");
const start_p = document.getElementById("start");
const itemList = document.querySelector(".settings");
const workTimeMinutes_span = document.getElementById("work-time-minutes");
const shortBreakMinutes_span = document.getElementById("short-break-minutes");
const longBreakMinutes_span = document.getElementById("long-break-minutes");
const minusButtons = document.querySelectorAll(".minus-btn");
const plusButtons = document.querySelectorAll(".plus-btn");
const circle = document.getElementById("circle");

const radius = circle.r.baseVal.value;
const circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = circumference;

main();

function main() {
  startButton.addEventListener("click", function () {
    for (let i = 0; i < minusButtons.length; i++) {
      minusButtons[i].disabled = true;
      plusButtons[i].disabled = true;
    }
    if (!running) {
      running = true;
      timer = setInterval(remainingTime, 1000);
    } else {
      resume();
    }
  });

  resetButton.addEventListener("click", function () {
    for (let i = 0; i < minusButtons.length; i++) {
      minusButtons[i].disabled = false;
      plusButtons[i].disabled = false;
    }
    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;
    clearInterval(timer);
    pomodoroText.innerHTML = "Pomodoro 1";
    running = false;
    start_p.innerHTML = "Start";
    shortBreakCounter = 0;
    sessionCounter = 0;
    seconds = 60;
    totalSec = workMinutes * 60;
    remainingWorkMinutes = workMinutes - 1;
    decreasingSeconds = totalSec;
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
  start_p.innerHTML = "Pause";
  seconds -= 1;
  perc = Math.ceil(
    100 - ((decreasingSeconds - (60 - seconds)) / totalSec) * 100
  );
  setProgress(perc);
  pomodoroMinutes_span.innerHTML = remainingWorkMinutes;
  if (seconds < 10) {
    pomodoroSeconds_span.innerHTML = "0" + seconds;
  } else {
    pomodoroSeconds_span.innerHTML = seconds;
  }
  if (seconds === 0) {
    remainingWorkMinutes = remainingWorkMinutes - 1;
    if (remainingWorkMinutes === -1) {
      if (sessionCounter % 2 === 0) {
        if (shortBreakCounter === 3) {
          remainingWorkMinutes = longBreakMinutes - 1;
          sessionCounter++;
          totalSec = longBreakMinutes * 60;
          decreasingSeconds = totalSec;
          pomodoroText.innerHTML = "Long Break";
          shortBreakCounter = 0;
        } else {
          totalSec = shortBreakMinutes * 60;
          decreasingSeconds = totalSec;
          remainingWorkMinutes = shortBreakMinutes - 1;
          sessionCounter++;
          shortBreakCounter++;
          pomodoroText.innerHTML = "Short Break ";
        }
      } else {
        totalSec = workMinutes * 60;
        decreasingSeconds = totalSec;
        remainingWorkMinutes = workMinutes - 1;
        let pomodoroCounter = shortBreakCounter + 1;
        pomodoroText.innerHTML = "Pomodoro " + pomodoroCounter;
        sessionCounter++;
      }
    } else {
      decreasingSeconds = decreasingSeconds - 60;
    }

    seconds = 60;
    beep();
  }
};

function minusButtonClicked(id) {
  switch (id) {
    case "work-time":
      if (workMinutes > 1) {
        workMinutes -= 1;
        totalSec = workMinutes * 60;
        decreasingSeconds = totalSec;
        remainingWorkMinutes = workMinutes - 1;
        workTimeMinutes_span.innerHTML = workMinutes;
        pomodoroMinutes_span.innerHTML = workMinutes;
        if (workMinutes == 1) {
          document.getElementById("work-time__minus-button").disabled = true;
        }
        break;
      } else {
        window.alert("You can't set your work time under 1 minutes!");
      }
    case "short-break":
      if (shortBreakMinutes > 1) {
        shortBreakMinutes -= 1;
        remainingShortBreakMinutes = shortBreakMinutes - 1;
        shortBreakMinutes_span.innerHTML = shortBreakMinutes;
        if (shortBreakMinutes == 1) {
          document.getElementById("short-break__minus-button").disabled = true;
        }
        break;
      } else {
        window.alert("You can't set your short break under 1 minutes!");
      }
    case "long-break":
      if (longBreakMinutes > 1) {
        longBreakMinutes -= 1;
        remainingLongBreakMinutes = longBreakMinutes - 1;
        longBreakMinutes_span.innerHTML = longBreakMinutes;
        if (longBreakMinutes == 1) {
          document.getElementById("long-break__minus-button").disabled = true;
        }
        break;
      } else {
        window.alert("You can't set your long break under 1 minutes!");
      }
  }
}

function plusButtonClicked(id) {
  switch (id) {
    case "work-time":
      document.getElementById("work-time__minus-button").disabled = false;
      workMinutes += 1;
      totalSec = workMinutes * 60;
      decreasingSeconds = totalSec;
      remainingWorkMinutes = workMinutes - 1;
      workTimeMinutes_span.innerHTML = workMinutes;
      pomodoroMinutes_span.innerHTML = workMinutes;
      break;
    case "short-break":
      document.getElementById("short-break__minus-button").disabled = false;
      shortBreakMinutes += 1;
      remainingShortBreakMinutes = shortBreakMinutes - 1;
      shortBreakMinutes_span.innerHTML = shortBreakMinutes;
      break;
    case "long-break":
      document.getElementById("long-break__minus-button").disabled = false;
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

function beep() {
  const sound = new Audio();
  sound.src = "beep.mp3";
  sound.play();
}

function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;
}
