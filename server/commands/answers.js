function eightball() {
  return wisdom[randomInteger(0, size)]
}

  var wisdom = [
    // Yes
    "It is certain",
    "It is decidedly so",
    "Without a doubt",
    "Yes, definitely",
    "You may rely on it",
    "As I see it, yes",
    "Most likely",
    "Outlook good",
    "Yes",
    "Signs point to yes",
    // Maybe
    "Reply hazy try again",
    "Ask again later",
    "Better not tell you now",
    "Cannot predict now",
    "Concentrate and ask again",
    // No
    "Don't count on it",
    "My reply is no",
    "My sources say no",
    "Outlook not so good",
    "Very doubtful"
  ]

var size = wisdom.length

// this function returns a random integer in the range [low..high)

function randomInteger(low, high) {
 return Math.floor(low + Math.random() * (high - low))
}

module.exports = eightball
