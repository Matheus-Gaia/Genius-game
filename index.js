let randomOrder = [];
let playerOrder = [];
let points = 0
let bestPoints = 0

// 0 = green
// 1 = yellow
// 2 = blue
// 3 = red

const green = document.querySelector('.green');
const s_green = document.getElementById('s_green')
const yellow = document.querySelector('.yellow');
const s_yellow = document.getElementById('s_yellow')
const blue = document.querySelector('.blue');
const s_blue = document.getElementById('s_blue')
const red = document.querySelector('.red');
const s_red = document.getElementById('s_red')


const round = document.querySelector('.round');
const score = document.querySelector('.score');

const button = document.querySelector('.start')

round.innerHTML = `Round: ${randomOrder.length}`

const shuffler = () => {
    let colorNumber = Math.floor(Math.random() * 4)
    randomOrder.push(colorNumber)
    playerOrder = []
    round.innerHTML = `Round: ${randomOrder.length}`

    for (let i in randomOrder) {
        const element = colorGenerator(randomOrder[i])
        const s_element = soundGenerator(randomOrder[i])
        reader(i, element, s_element)
    }
}

const colorGenerator = (number) => {
    if(number === 0) {
        return green
    } else if(number === 1) {
        return yellow
    } else if(number === 2) {
        return blue
    } else if(number === 3) {
        return red
    }
}
const soundGenerator = (number) => {
    if(number === 0) {
        return s_green
    } else if(number === 1) {
        return s_yellow
    } else if(number === 2) {
        return s_blue
    } else if(number === 3) {
        return s_red
    }
}

const reader = (timer, element, s_element) => {
    timer *= 1000 
        setTimeout(() => {
            element.classList.add("blink")
            s_element.play()
        },timer)
        setTimeout(() => {
            element.classList.remove("blink")
        }, timer + 350)
}

const playerClick = (color, colorNumber, sound) => {
    color.classList.add("blink")
    playerOrder.push(colorNumber)
    sound.play()
    setTimeout(() => {
        color.classList.remove("blink")
    }, 350)

    for (let i in playerOrder) {
        if (playerOrder[i] !== randomOrder[i]) {
            bestScore(randomOrder.length);
            gameOver();
            break
        }
    }
    if (playerOrder.length === randomOrder.length) {
        setTimeout(() => {
            shuffler();
        }, 1000)
    }
}

const gameOver = () => {
    alert(`POINTS: ${points}`)
    randomOrder = []
    round.innerHTML = `Round: ${randomOrder.length}`
}

const bestScore = (length) => {
    points = length - 1
    if(points > bestPoints) {
        bestPoints = points 
        score.innerHTML = `Best Score: ${bestPoints}`
    }   
}

const startGame = () => {
    randomOrder = []
    round.innerHTML = `Round: ${randomOrder.length}`
    setTimeout(() => {
        shuffler()
    }, 1000)
}

button.addEventListener('click', () => {
    startGame()
})

green.onclick = () => playerClick(green, 0, s_green)
yellow.onclick = () => playerClick(yellow, 1, s_yellow)
blue.onclick = () => playerClick(blue, 2, s_blue)
red.onclick = () => playerClick(red, 3, s_red)
