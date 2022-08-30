let startContainer = document.getElementsByClassName("exam-start")[0];
let examContainer = document.getElementsByClassName("ques-cont")[0];
let headQuestion = document.getElementsByClassName("head-question")[0];
let examImg = document.getElementsByClassName("exam-img")[0];
let markedQ = document.querySelector(".addMarked");
let mark = document.querySelector(".markedQ");
let startBtn = document
  .getElementById("start-btn")
  .addEventListener("input", login);

let nextBtn = document.getElementById("next-btn");
let markBtn = document.getElementById("marki");
let timeCounter = examContainer.querySelector(".timeCount");
let timeEnded = document.querySelector("#timerEnd");
let resultContainer = document.getElementsByClassName("resut-container")[0];
let optContainer = document.getElementsByClassName("opt-container")[0];

let count = 0;
let Counter;
let A = [];
let arr = [];
let arr2 = [];
let newCounter;
timeVal = 15;

let x = () => {
  for (let index = 0; index < 4; index++) {
    optContainer.onclick = () => {
      console.log(optContainer.children[index].textContent);
    };
  }
};

function markQuestion() {
  mark.style.display = "block";
  markBtn.style.color = "#e95116";
  markedQ.innerHTML += `${headQuestion.innerHTML} <br/>`;
  arr2.push(headQuestion.innerHTML);

  //markedQ.innerHTML = `${arr2} <br/>`;
  if (x()) {
    arr2 = arr2.pop();
    markedQ.innerHTML = `${arr2} <br/>`;
  }
}
function startExam() {
  examContainer.style.display = "flex";
  startContainer.style.display = "none";
  //count = Math.floor(Math.random() * 5
  showQuestion(count);
  Timerr(15);
}

function nextQuestion(val) {
  if (count <= 3) {
    count++;
    showQuestion(count);
    clearInterval(Counter);
    Timerr(timeVal);
  } else {
    count = 0;
    console.log("ended");
    showQuestion(count);
  }
  if (count == 4) {
    val.classList.add("sbt-btn");
    val.textContent = "Submit";
    showResult();
  }
}
function Exit() {
  window.location.reload();
}
function Retray() {
  count = 0;
  arr = [];
  nextBtn.textContent = "OK";
  clearInterval(Counter);
  startExam();

  resultContainer.style.display = "none";
}
function showResult() {
  let score = document.querySelector("#score");
  nextBtn.onclick = () => {
    examContainer.style.display = "none";
    resultContainer.style.display = "block";
    clearInterval(Counter);
    score.innerHTML = `${arr.length}`;
    console.log("show result");
  };
}

function getNext() {
  nextQuestion();
}

function getPrev() {
  if (count > 0) {
    count--;
    showQuestion(count);
  } else {
    count = 4;
    console.log("ended");
    showQuestion(count);
    count--;
  }
}
function showQuestion(count) {
  fetch("./question.json")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      for (const key in data) {
        A = data[key][count];
        headQuestion.innerHTML = `${A.numb} ${A.ques}`;
        optContainer.innerHTML = `<div class="op1" onclick="selectQuestion(this)"><span>${A.spn[0]}</span>${A.options[0]}</div>
                                <div class="op1" onclick="selectQuestion(this)"><span>${A.spn[1]}</span>${A.options[1]}</div>
                                <div class="op1" onclick="selectQuestion(this)"><span>${A.spn[2]}</span>${A.options[2]}</div>
                                <div class="op1" onclick="selectQuestion(this)"><span>${A.spn[3]}</span>${A.options[3]}</div>`;
        examImg.src = `${A.img}`;
        var selectQ = optContainer.querySelectorAll(".op1");
        for (let index = 0; index < selectQ.length; index++) {
          selectQ[index].setAttribute("onclick", "selectQuestion(this)");
        }
      }
    });
}

function selectQuestion(val) {
  if (A.answer == val.textContent) {
    arr.push(val.textContent);

    console.log(arr);
  }
}
function Timerr(time) {
  Counter = setInterval(mtimer, 1000);
  function mtimer() {
    if (time) {
      timeCounter.textContent = time;
      time--;
    } else {
      console.log(timeEnded);

      timeEnded.style.display = "flex";
      setTimeout(clearAlert, 2000);
      function clearAlert() {
        timeEnded.style.display = "none";
      }
      nextQuestion();
    }
  }
}
function login() {
  event.preventDefault();
}
