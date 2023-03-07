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
let running = false;
let timer;

startButton.addEventListener("click", function () {
  if (!running) {
    timer = setInterval(remainingTime, 300);
  } else {
    resume();
  }
});

let remainingTime = function startTimer() {
  running = true;
  start_p.innerHTML = "Stop";
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
        sessionCounter++;
      }
    }
    seconds = 60;
  }
};

function resume() {
  clearInterval(timer);
  start_p.innerHTML = "Start";
  running = false;
}
