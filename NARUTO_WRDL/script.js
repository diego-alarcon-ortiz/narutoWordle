var words = ["KUNAI", "CHOJI", "GENIN", "JONIN", "OBITO", "GAARA", "IRUKA", "JUTSU", "DARUI", "BIJUU", "HYUGA", "DANZO", "ZETSU", "RAMEN", "HIDAN", "ASUMA", "KONAN", "KARIN", "KIRIN", "SHINO", "CHIYO", "KARUI", "ONOKI", "KATON", "SHIBA", "KYUBI", "NINJA", "ASURA", "MANDA", "HANZO", "ITAMA", "SENJU", "SANIN", "FUTON", "DOTON", "HITON", "DANGO", "SANBI", "YONBI", "INDRA"]
var qwerty = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "⌫", "Z", "X", "C", "V", "B", "N", "M", "ENTER"];
var col = 0
var row = 0
var gameover = false
var existingLetters = []
var correctLetters = []
var wrongLetters = []
var correctWord = words[Math.floor(Math.random() * words.length)]
var animation = false

window.onload = () => {
    //Random NARUTO word generation
    generateGame()
    console.log(correctWord);
    //Key events
    window.addEventListener("keyup", (e) => {
        let boxes = document.getElementsByClassName("box")
        if (gameover == false) {
            //Erase
            if (e.code == "Backspace") {
                for (let i = boxes.length - 1; i >= 0; i--) {
                    boxes[i].style.animation = ""
                    if (boxes[i].textContent != "" && col > 0) {
                        boxes[i].textContent = ""
                        boxes[i].setAttribute("id", "currentBox")
                        if (i + 1 != boxes.length) boxes[i + 1].removeAttribute("id")
                        col--
                        i = -1
                    }
                }
            }
            //Write
            else if ("KeyA" <= e.code && e.code <= "KeyZ") {
                for (let i = 0; i < boxes.length; i++) {
                    if (boxes[i].textContent == "" && col < 5) {
                        boxes[i].textContent = e.key.toUpperCase()
                        boxes[i].style.animation = "firstJump 0.1s"
                        boxes[i].removeAttribute("id")
                        if (col < 4) boxes[i + 1].setAttribute("id", "currentBox")
                        col++
                        i = boxes.length
                    }
                }
            }
            //Check
            else if (e.code == "Enter" && animation == false) {
                checkWord(boxes, correctWord)
            }
        }
    })

    let keyboardbox = document.querySelectorAll(".keyboard div")

    for (let i = 0; i < keyboardbox.length; i++) {
        keyboardbox[i].onclick = () => {
            if (gameover == false) {
                let boxes = document.getElementsByClassName("box")
                //Erase
                if (keyboardbox[i].id == "⌫") {
                    for (let j = keyboardbox.length + 1; j >= 0; j--) {
                        boxes[j].style.animation = ""
                        if (boxes[j].textContent != "" && col > 0) {
                            boxes[j].textContent = ""
                            boxes[j].setAttribute("id", "currentBox")
                            if (j + 1 != boxes.length) boxes[j + 1].removeAttribute("id")
                            col--
                            j = -1
                        }
                    }
                }
                //Check
                else if (keyboardbox[i].className == "enterbox") {
                    checkWord(boxes, correctWord)
                }
                //Write
                else {
                    for (let j = 0; j < boxes.length; j++) {
                        if (boxes[j].textContent == "" && col < 5) {
                            boxes[j].textContent = keyboardbox[i].id.toUpperCase()
                            boxes[j].style.animation = "firstJump 0.1s"
                            boxes[j].removeAttribute("id")
                            if (col < 4) boxes[j + 1].setAttribute("id", "currentBox")
                            col++
                            j = boxes.length
                        }
                    }
                }
            }
        }
    }
}

// - - - FUNCTIONS USED - - -

function generateGame() {
    //This for generates the boxes in HTML
    for (let i = 0; i < 6; i++) {
        let wordBox = document.createElement("div")
        wordBox.setAttribute("class", "wordBox")
        for (let j = 0; j < 5; j++) {
            let box = document.createElement("div")
            box.setAttribute("class", "box")
            if (i == 0 && j == 0) box.setAttribute("id", "currentBox")
            wordBox.appendChild(box)
        }
        document.getElementsByClassName("boxesContainer")[0].appendChild(wordBox)
    }

    //This for generates the keyboard in HTML
    for (let i = 0; i < qwerty.length; i++) {
        let keyboard = document.getElementsByClassName("keyboard")
        let keyboardbox = document.createElement("div")
        if (qwerty[i] == "ENTER") {
            keyboardbox.setAttribute("class", "enterbox")
        } else {
            keyboardbox.setAttribute("class", "keyboardboxes")
        }
        let txt = document.createTextNode(qwerty[i])
        keyboardbox.appendChild(txt)
        if (keyboardbox.textContent !== "ENTER") {
            keyboardbox.setAttribute("id", keyboardbox.textContent)
        }
        if (i > 9 && i <= 19) {
            keyboard[1].appendChild(keyboardbox)
        } else if (i > 19) {
            keyboard[2].appendChild(keyboardbox)
        } else {
            keyboard[0].appendChild(keyboardbox)
        }
    }
}

function checkWord(boxes, correctWord) {
    let wordBox = document.getElementsByClassName("wordBox")[row]
    let concat = ""
    if (animation == false) {
        //Concat the letters to an unique String and check for empty spaces
        for (let i = row * 5; i < (row * 5 + 5); i++) {
            if (boxes[i].textContent == "") {
                wordBox.setAttribute("class", "wordBoxAnimation")
                animation = true
                notificate("empty")
                setTimeout(() => {
                    wordBox.setAttribute("class", "wordBox")
                    animation = false
                }, 400)
                return
            }
            concat += boxes[i].textContent
        }

        for (let i = 0; i < wordList.length; i++) {
            //Correct word
            if (concat.toUpperCase() == correctWord.toUpperCase()) {
                fillBoxes(boxes, correctWord)
                notificate("win")
                gameover = true
                return
            }
            //Available but incorrect word
            else if (wordList[i].toUpperCase() == concat.toUpperCase()) {
                if (row > 4) {
                    fillBoxes(boxes, correctWord)
                    notificate("lose")
                    gameover = true
                    row++
                    col = 0
                    boxes[col+(row*5)].setAttribute("id", "currentBox")
                    return
                } else {
                    fillBoxes(boxes, correctWord)
                    row++
                    col = 0
                    boxes[col+(row*5)].setAttribute("id", "currentBox")
                    return
                }
            }
            //Non available word
            else if (i == wordList.length - 1) {
                document.getElementsByClassName("enterbox")[0].disabled = true
                wordBox.setAttribute("class", "wordBoxAnimation")
                animation = true
                notificate("absent")
                setTimeout(() => {
                    wordBox.setAttribute("class", "wordBox")
                    animation = false
                    document.getElementsByClassName("enterbox")[0].disabled = false
                }, 400)
                return
            }
        }
    }
}

function fillBoxes(boxes, correctWord) {
    let pos = [0, 0, 0, 0, 0]
    let keyboardboxes = document.getElementsByClassName("keyboardboxes")
    let secs = 0
    for (let i = row * 5; i < (row * 5 + 5); i++) {
        for (let j = 0; j < correctWord.length; j++) {
            let exit = false
            while (!exit) {
                boxes[i].removeAttribute("id", "boxAnimation")
                if (correctWord[j] == boxes[i].textContent && pos[j] == 0) {
                    pos[j] = 1
                    j = correctWord.length
                    exit = true
                    existingLetters.push(boxes[i].textContent)
                    boxes[i].style.animation = ""
                    boxes[i].setAttribute("id", "boxAnimation")
                    boxes[i].style.animationDelay = secs + "ms"
                    secs += 25
                    if (correctWord[i - (row * 5)].toUpperCase() == boxes[i].textContent) {
                        setTimeout(() => {
                            boxes[i].style.backgroundColor = "#43A047"
                            boxes[i].style.color = "white"
                            boxes[i].style.border = "2px solid #43A047"
                        }, (300 + secs));
                        correctLetters.push(boxes[i].textContent)
                    } else {
                        setTimeout(() => {
                            boxes[i].style.backgroundColor = "#E4A81D"
                            boxes[i].style.color = "white"
                            boxes[i].style.border = "2px solid #E4A81D"
                        }, (300 + secs));
                    }
                } else {
                    wrongLetters.push(boxes[i].textContent)
                    exit = true
                    boxes[i].style.animation = ""
                    boxes[i].setAttribute("id", "boxAnimation")
                    boxes[i].style.animationDelay = secs + "ms"
                    secs += 25
                    setTimeout(() => {
                        boxes[i].style.backgroundColor = "#757575"
                        boxes[i].style.color = "white"
                        boxes[i].style.border = "2px solid #757575"
                    }, (300 + secs));
                }
            }
        }
        //Fill keyboard
        for (let j = 0; j < keyboardboxes.length; j++) {
            keyboardboxes[j].style.color = "white"
            if (wrongLetters.includes(keyboardboxes[j].textContent) && !existingLetters.includes(keyboardboxes[j].textContent)) {
                keyboardboxes[j].style.backgroundColor = "#757575"
            } else if (correctLetters.includes(keyboardboxes[j].textContent)) {
                keyboardboxes[j].style.backgroundColor = "#43A047"
            } else if (existingLetters.includes(keyboardboxes[j].textContent)) {
                keyboardboxes[j].style.backgroundColor = "#E4A81D"
            } else {
                keyboardboxes[j].style.color = "rgb(47, 47, 47)"
            }
        }
    }
}

function notificate(parameter) {
    let notDiv = document.getElementsByClassName("notification")[0]
    if (parameter == "empty") {
        notDiv.textContent = "There are empty spaces!!"
        notDiv.style.backgroundColor = "#757575"
    } else if (parameter == "win") {
        notDiv.textContent = "You guessed the word!!"
        notDiv.style.backgroundColor = "#43A047"
    } else if (parameter == "lose") {
        notDiv.textContent = "You lost... the word was " + correctWord
        notDiv.style.backgroundColor = "red"
    } else {
        notDiv.textContent = "The word is not available"
        notDiv.style.backgroundColor = "#757575"
    }
    notDiv.style.animation = "show 2s"
    setTimeout(() => {
        notDiv.style.animation = "hide 2s"
    }, 1950);
}
