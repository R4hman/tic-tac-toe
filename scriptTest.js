const selectBox = document.querySelector(".select-box");
const gameContainer = document.querySelector(".game-container");

const selectBtns = document.querySelectorAll(".select-btn");
const switchs = document.querySelectorAll(".switch");

const column = document.querySelectorAll(".column");

let player;
let computer;
let activePlayer = player;
let isPlayerClicked = false;
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

function chooseToPlay() {
  if (isPlayerClicked) {
    setTimeout(computerChoose, 1000);
  }
}

function clickColumn() {
  const empty = [...column].filter((clm) => clm.textContent === "");
  console.log("empty", empty);
  if (empty.length === 0) {
    return alert("game finished");
  }
  if (!isPlayerClicked) {
    this.textContent = player;
    this.style.pointerEvents = "none";

    chooseWinner(playerArr, +this.dataset.num - 1, "player");
    // playerArr.push(+this.dataset.num - 1);
    // console.log("playerArr: " + Array.isArray(playerArr), playerArr);
    // const item = winnerArr.filter((arr) =>
    //   arr.every((ai) => playerArr.includes(ai))
    // );
    // console.log(item && item.length > 0);
    // if (item && item.length > 0) {
    //   return alert("you won!");
    // }

    // this.textContent = activePlayer;
    activePlayer = activePlayer === player ? computer : player;
    isPlayerClicked = true;
    console.log("winnerIsKnown", winnerIsKnown);
    if (!winnerIsKnown) {
      chooseToPlay();
    }
    document.querySelector(".player-active")?.classList.remove("player-active");
    switchs.forEach(
      (s) => s.dataset.value === computer && s.classList.add("player-active")
    );
  }
}

function computerChoose() {
  console.log("computerChoose");
  // const randomNum = randomNumChoose();
  const randomNum = Math.floor(Math.random() * 9);
  const empty = [...column].filter((clm) => clm.textContent === "");
  console.log("empty", empty);
  if (empty.length === 0) {
    return alert("game finished");
  }
  if (!([...column][randomNum].textContent === "")) {
    computerChoose();
  }
  console.log(randomNum);
  console.log(player);
  console.log(computer);
  if ([...column][randomNum].textContent === "") {
    [...column][randomNum].textContent = computer;
    [...column][randomNum].style.pointerEvents = "none";
  }

  chooseWinner(computerArr, randomNum, "computer");

  document.querySelector(".player-active")?.classList.remove("player-active");
  switchs.forEach(
    (s) => s.dataset.value === player && s.classList.add("player-active")
  );
  isPlayerClicked = false;
}

column.forEach((cl) => cl.addEventListener("click", clickColumn));

function chooseWinner(arr, num, player) {
  console.log(player, num);
  arr.push(num);
  // console.log("playerArr: " + Array.isArray(playerArr), playerArr);
  const item = winnerArr.filter((ar) =>
    ar.every((ai) => playerArr.includes(ai))
  );
  // console.log(item && item.length > 0);
  if (item && item.length > 0) {
    winnerIsKnown = true;
    return alert(`${player} you won`);
  }
}

function randomNumChoose() {
  return Math.floor(Math.random() * 9);
}
