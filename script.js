// *************************** Check winning condition ***************************

// we need to pass rowId into this function to help locate the specific letter box,
// then apply CSS class to it after checking the letter it contains.
function checkResult(row, inputWord) {
  // rowId starts from 0, the Enter key will add 1 to rowId before this function is called,
  // therefore need to subtract 1 from it.
  console.log("input word:", inputWord);
  console.log("correct answer:", correctWord, "\n\n");

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
        // boxId start from 1, however the for-loop index starts from 0,
        // Therefore add 1 to index before pass it into querySelector.
        let box = document.querySelector(
          `.row-${row} div:nth-child(${inputLetterId + 1})`
        );
        console.log("row:", row, "box:", inputLetterId);
        console.log(box);
        if (inputWord[inputLetterId] === correctWord[inputLetterId]) {
          console.log("correct letter, correct position");
          box.classList.add("letter-correct");
          break;
        } else if (correctWord.includes(inputWord[inputLetterId])) {
          console.log("correct letter, wrong position");
          box.classList.add("letter-incorrect-position");
          break;
        } else {
          console.log("wrong letter");
          box.classList.add("letter-wrong");
          break;
        }
      }
    }

    // Check winning condition
    if (inputWord === correctWord) {
      console.log("Congrets! You win!");
      play = false;
    }
  }
  // after every try, count down the round, player loses after use up 6 rounds
  round += 1;
  console.log("round: ", round);
  if (round === 6) {
    console.log("You lose. Try again!");
    play = false;
    // return;
  }

  console.log("\n\n");
}
// checkResult("AARTI");

// ******************************** Create keyboard ********************************

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
// use rowId to move to next row, use boxId to move to next box.
// boxId & rowId start from 0.
// add 1 to the BoxId BEFORE entering a letter.
// subdtract 1 from the BoxId AFTER a letter is deleted.
// in the event handler function, use queryselector() and :nth-child() to access the box!
// rowId = 0;

function displayLetter(rowId) {
  let boxId = 0;
  // the letter pressed will be returned from this function
  let curLetter = "";
  let outputBox;
  let output;
  // add eventlistoner to all keys on the keyboard
  let keys = document.getElementsByClassName("key");
  for (let keyElement of keys) {
    let key = keyElement.textContent;
    keyElement.addEventListener("click", function handleClick() {
      switch (key) {
        case "Enter":
          // click Enter increases the rowId by 1, which moves the cursor to the next line;
          // also need to reset the boxId to 0, so it start from 1st box again in the next row.
          // the Enter btn only functional when user have input 5 letters.
          // apply bundry to the row (0-5)
          console.log("play:", play);
          if (rowId < 6 && play) {
            if (boxId === 5) {
              inputWord = curLetter;
              boxId = 0;
              // console.log(rowId);
              // console.log(curLetter);
              // take the word and check winning condition here!!!
              checkResult(rowId, inputWord);
              // move to next row
              rowId++;
              // reset the user input for the next round
              curLetter = "";
            } else {
              console.log("Must enter all 5 letters");
            }
          } else {
            // when user has played 6 rounds or have won the game.
            console.log("Please start a new game!");
          }
        // break;
        case "Backspace":
          // apply bundry to the row (0-5)
          if (rowId < 6) {
            // if don't specify this condition, Backspace will be triggered when press Enter
            if (key !== "Enter") {
              if (boxId === 0 || (boxId > 5 && boxId % 5 === 0)) {
                console.log("nothing to delete");
                console.log(boxId);
              } else {
                // select the box using :nth-child()
                output = document.querySelector(
                  `.row-${rowId} div:nth-child(${boxId}) span`
                );
                // console.log(output);
                // console.log(boxId);
                output.textContent = "";
                curLetter = curLetter.slice(0, curLetter.length - 1);
                console.log(curLetter);
                // console.log(boxId);
                // add css class to the letter box when letter deleted
                outputBox = document.querySelector(
                  `.row-${rowId} div:nth-child(${boxId})`
                );
                outputBox.classList.remove("letter-uncheck");
                // update cursor
                boxId--;
                break;
              }
            }
          } else {
            // when user has played 6 rounds or have won the game.
            console.log("Please start a new game!");
          }
        default:
          if (rowId < 6 && play) {
            // if don't specify this condition, Backspace & Enter will also be triggered when press any key
            if (key !== "Backspace" && key !== "Enter") {
              if (boxId !== 0 && boxId % 5 === 0) {
                console.log("exceed maximun letter");
              } else {
                // update cursor
                boxId++;
                // console.log(boxId);
                // select the box using :nth-child()
                output = document.querySelector(
                  `.row-${rowId} div:nth-child(${boxId}) span`
                );
                // console.log(output);
                output.textContent = key;
                // console.log(key);
                curLetter += key;
                console.log(curLetter);
                // add css class to the letter box when letter entered
                outputBox = document.querySelector(
                  `.row-${rowId} div:nth-child(${boxId})`
                );
                outputBox.classList.add("letter-uncheck");
              }
            }
          } else {
            // when user has played 6 rounds or have won the game.
            console.log("Please start a new game!");
          }
      }
    });
  }
}

// *************************** Main Logic of the Game *************************

let randomNum = Math.floor(Math.random() * validWords.length);
let correctWord = validWords[0]; // change back to random

// check input length

let maxLen = correctWord.length;

// this is the trigger to turn the game on/off
let play = true;
// total 6 tries allowed, set a counter
let round = 0;
let rowId = 0;

// initiate the game
displayLetter(rowId);
