// *************************** Main Logic of the Game *************************

let randomNum = Math.floor(Math.random() * validWords.length);
let correctWord = validWords[0]; // change back to random

// check input length

let maxLen = correctWord.length;

// this is the trigger to turn the game on/off
let play = 1;
// total 6 tries allowed, set a counter
let round = 0;
while (play) {
  // at the start of every round ask player for input word
  let inputWord = "ABACA"; // convert to upper *** CHANGE LATER

  // FOR LOOP I=5
  // 1 LETTER ENTERRED
  // inputWord += LETTER

  console.log("input word: ", inputWord);
  console.log("correct answer: ", correctWord, "\n\n");

  // Check if the word is valid, invalid word won't get processed, must re-enter.
  if (!validWords.includes(inputWord)) {
    console.log("Invalid word! Try another one!");
    // round += 1;
    for (let inputLetterId = 0; inputLetterId < maxLen; inputLetterId++) {
      console.log("Invalid letter!");
    }
  } else {
    // if the word is valid, check every letter against the choosen word
    for (let inputLetterId = 0; inputLetterId < maxLen; inputLetterId++) {
      for (
        let correctLetterId = 0;
        correctLetterId < maxLen;
        correctLetterId++
      ) {
        if (inputWord[inputLetterId] === correctWord[inputLetterId]) {
          console.log("correct letter, correct position");
          break;
        } else if (correctWord.includes(inputWord[inputLetterId])) {
          console.log("correct letter, wrong position");
          break;
        } else {
          console.log("wrong letter");
          break;
        }
      }
    }

    // Check winning condition
    if (inputWord === correctWord) {
      console.log("Congrets! You win!");
      play = 0;
    }
  }
  // after every try, count down the round, player loses after use up 6 rounds
  round += 1;
  if (round === 6) {
    console.log("You lose. Try again!");
    play = 0;
  }

  console.log("\n\n");
}

// ******************************** Keyboard ********************************

const keySet = {
  0: ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  1: ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  2: ["Enter", "Z", "X", "C", "V", "B", "N", "M", "Backspace"],
};

let keyboard = document.querySelector(".keyboard");
function generateKeyboard(obj_keys) {
  for (k in obj_keys) {
    // outer for-in loop creates rows and append to the keyboard container
    let currentRow = document.createElement("div");
    // currentRow.id = `row-${k}`;
    currentRow.className = "flex-container";
    keyboard.appendChild(currentRow);

    // inner for-of loop creates keys and append to the row
    for (let item of obj_keys[k]) {
      let currentKey = document.createElement("button");
      // assign id and class for the keys, for selecting them in css
      currentKey.className = "key";
      currentKey.id = item;

      currentKey.textContent = item;

      currentRow.appendChild(currentKey);
    }
  }
}

generateKeyboard(keySet);

// *************** Display & store input letter in variable ****************

// IMPORTANT!
// use ROW ID to move to next row, use BOX ID to move to next box.
// the 1st box to start with is actually index 1, not 0.
// however to make the logic work, we add 1 to the index BEFORE entering a letter.
// we also subdtract 1 from the index AFTER a letter is deleted.
// in the event handler function, use queryselector() and :nth-child() to access the box!
rowId = 0;

function getLetter(rowId) {
  let boxId = 0;
  // the letter pressed will be returned from this function
  let curLetter = "";
  let output;
  // add eventlistoner to all keys on the keyboard
  let keys = document.getElementsByClassName("key");
  for (let keyElement of keys) {
    let key = keyElement.textContent;
    keyElement.addEventListener("click", function () {
      switch (key) {
        case "Enter":
          // click Enter will increase the ROW ID by 1, which will move the cursor to the next line;
          // also need to reset the BOX ID to 0, so it start from 1st box again.
          inputWord = curLetter;
          rowId++;
          boxId = 0;
          console.log(rowId);
        // break;
        case "Backspace":
          if (boxId === 0 || (boxId > 5 && boxId % 5 === 0)) {
            console.log("no letter to delete");
            console.log(boxId);
          } else {
            // select the ID of the box that the cursor is currently on
            output = document.querySelector(
              `.row-${rowId} div:nth-child(${boxId}) span`
            );
            console.log(output);
            console.log(boxId);
            output.textContent = "";
            curLetter -= key;
            // update cursor
            boxId--;
            console.log(boxId);
            break;
          }
        default:
          if (key !== "Backspace" && key !== "Enter") {
            if (boxId !== 0 && boxId % 5 === 0) {
              console.log("exceed maximun letter");
            } else {
              boxId++;
              console.log(boxId);
              // select the ID of the box that the cursor is currently on
              output = document.querySelector(
                `.row-${rowId} div:nth-child(${boxId}) span`
              );
              console.log(output);
              output.textContent = key;
              console.log(key);
              curLetter += key;
            }
          }
      }
    });
  }
}

getLetter(rowId);

// let x = document.querySelector(`.row-${0} div:nth-child(${1}) span`);
// console.log(x);
