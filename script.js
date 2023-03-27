let randomNum = Math.floor(Math.random() * validWords.length);
let correctWord = validWords[0]; // change back to random

// check input length

let maxLen = correctWord.length;
console.log("correct answer: ", correctWord);

// this is the trigger to turn the game on/off
let play = 1;
// total 6 tries allowed, set a counter
let round = 6;
while (play) {
  // at the start of every round ask player for input word
  let inputWord = "AALII"; // convert to upper *** CHANGE LATER
  console.log("input word: ", inputWord, "\n\n");

  for (let inputLetterId = 0; inputLetterId < maxLen; inputLetterId++) {
    for (let correctLetterId = 0; correctLetterId < maxLen; correctLetterId++) {
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
  // after every try, count down the round, player loses after use up 6 rounds
  round -= 1;
  if (round === 0) {
    console.log("You lose. Try again!");
    play = 0;
  }
}
