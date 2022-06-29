input.onButtonPressed(Button.A, function () {
    score = 0
    running = true
    start = input.runningTime()
    basic.pause(500)
    music.playTone(523, music.beat(BeatFraction.Whole))
})
input.onGesture(Gesture.Shake, function () {
    if (running) {
        score += input.acceleration(Dimension.Strength)
    }
})
let start = 0
let running = false
let score = 0
score = 0
running = false
basic.forever(function () {
    if (running && 2000 < input.runningTime() - start) {
        running = false
        music.playTone(330, music.beat(BeatFraction.Whole))
        basic.showNumber(score)
    }
})
