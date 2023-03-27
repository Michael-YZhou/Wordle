// *************************** Main Logic of the Game *************************

let randomNum = Math.floor(Math.random() * validWords.length);
let correctWord = validWords[0]; // change back to random

// check input length

let maxLen = correctWord.length;

// this is the trigger to turn the game on/off
let play = 1;
// total 6 tries allowed, set a counter
let round = 6;
while (play) {
  // at the start of every round ask player for input word
  let inputWord = "AAIII"; // convert to upper *** CHANGE LATER
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
  round -= 1;
  if (round === 0) {
    console.log("You lose. Try again!");
    play = 0;
  }

  console.log("\n\n");
}
