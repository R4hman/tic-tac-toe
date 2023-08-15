const selectBox = document.querySelector(".select-box");
const gameContainer = document.querySelector(".game-container");

const selectBtns = document.querySelectorAll(".select-btn");
const switchs = document.querySelectorAll(".switch");

const column = document.querySelectorAll(".column");
const columns = document.querySelector(".columns");
const msgContainer = document.querySelector(".result-msg");
const msgTitle = document.querySelector(".result-msg h1");
const reloadBtn = document.querySelector(".result-msg button");

let player;
let computer;
let activePlayer = player;
let isPlayerClicked = false;
let emptyArrList = [...column].map((clm, i) => i);

console.log(emptyArrList);

let playerArr = [];
let computerArr = [];
let winnerIsKnown = false;
const winnerArr = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

selectBtns.forEach((btn) =>
  btn.addEventListener("click", () => {
    if (btn.dataset.value) {
      selectBox.style.display = "none";
      gameContainer.style.display = "block";
      player = btn.dataset.value;
      computer = player === "X" ? "O" : "X";
      switchs.forEach(
        (sw) => sw.dataset.value === player && sw.classList.add("player-active")
      );
    }

    console.log("player", player, "computer", computer);
  })
);

columns.addEventListener("click", function (e) {
  if (e.target.dataset.num && !isPlayerClicked && !winnerIsKnown) {
    emptyArrList = emptyArrList.filter(
      (arr) => arr !== Number(e.target.dataset.num)
    );

    document.querySelector(".player-active")?.classList.remove("player-active");
    switchs.forEach(
      (sw) => sw.dataset.value === computer && sw.classList.add("player-active")
    );
    e.target.textContent = player;
    e.target.style.pointerEvents = "none";
    playerArr.push(Number(e.target.dataset.num));
    checkWinner(playerArr, "Player");
    console.log("playerArr: " + playerArr);
    isPlayerClicked = true;
    computerTurn();
  }
});

function computerTurn() {
  if (isPlayerClicked && !winnerIsKnown) {
    setTimeout(() => {
      let randomNum = Math.floor(Math.random() * emptyArrList.length);
      randomNum = emptyArrList[randomNum];
      console.log(randomNum);
      emptyArrList = emptyArrList.filter((arr) => arr !== randomNum);
      document
        .querySelector(".player-active")
        ?.classList.remove("player-active");
      switchs.forEach(
        (sw) => sw.dataset.value === player && sw.classList.add("player-active")
      );
      [...column][randomNum].textContent = computer;
      [...column][randomNum].style.pointerEvents = "none";
      isPlayerClicked = false;
      computerArr.push(randomNum);
      checkWinner(computerArr, "Computer");
      console.log("computerArr", computerArr);
    }, 1000);
  }
}

function checkWinner(arr, side) {
  console.log(Array.isArray(arr));
  console.log("arr", arr);
  if (arr.length > 2) {
    const matchItem = winnerArr.filter((ar) =>
      ar.every((v) => arr.includes(v))
    );

    console.log("matchItem", matchItem);

    if (matchItem.length > 0) {
      winnerIsKnown = true;
      let txt = `${side} is winner`;
      msgTitle.textContent = txt;
      setTimeout(() => {
        msgContainer.style.display = "block";
        gameContainer.style.display = "none";
      }, 1000);
    }
  }
}

reloadBtn.addEventListener("click", () => {
  window.location.reload();
});
