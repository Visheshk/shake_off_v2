# Shake Off

## Introduction @unplugged
<!-- ![Two @boardname@ connected via radio](/static/mb/projects/a9-radio.png) -->
Use the **shake sensor** to make your own shake-off.

## Adding a score variable

The first thing to do is to make a variable that will record your score ``||variables:score||``. Using ``||Variables||`` on the left, **Make a Variable** called score.

```blocks
let score = 0
score = 0
```

## Add a timer

Add code to store the ``||input:running time||`` (look in more in the ``||Input||`` section) in a ``||variables:start||`` variable.  This will remember when button A is pressed.

```blocks
let start = 0
input.onButtonPressed(Button.A, function () {
    start = input.runningTime()
})
```

## Starting the game

Add a variable to record when the game is running ``||variables:running||``. This will help us make sure our shakes are only counted when the game is running. Assign it the value false from the ``||logic:Logic||`` category on start, and change it to True when button A is pressed.

```blocks
let running = false
running = false
input.onButtonPressed(Button.A, function () {
    start = input.runningTime()
    score = 0
    running = true
})

```

## Announcing the game start

We will also wait half a second using ``||basic:pause(500)||``, and using the ``||music:Music||`` category, play a ``||music:play tone High C for 1 beat||``  to announce the start of the game.

```blocks
input.onButtonPressed(Button.A, function () {
    //@highlight
    basic.pause(500)
    //@highlight
    music.playTone(523, music.beat(BeatFraction.Whole))
    start = input.runningTime()
    score = 0
    running = true
})
```

##Counting Shakes

We can use the ``||input:on shake||`` event to detect a shake. Increment the shakes ``||variables:score||`` by `1` when the game is running, using an ``||Logic:if||`` condition block.

```blocks
input.onGesture(Gesture.Shake, function () {
    if (running) {
        score += 1
    }
})
```

## End the game in 10 seconds

Using the ``||basic:forever||`` block, we can create a check for passing 10 seconds since we started the game, using an ``||logic:if||`` block. Check that ``||Variables:running||`` is true, and ``||input: running time||`` - ``||Variables:start||`` is ``||Logic: >||`` 10000 (since our timer is in milliseconds). Play a sound to indicate the end, and show the score at the end!

```blocks
basic.forever(function () {
    if (running &&  input.runningTime() - start > 10000) {
        running = false
        basic.showNumber(score)
        music.playTone(330, music.beat(BeatFraction.Whole))
    }
})
```

## Strength of shakes

Look at ``||input: acceleration (mg) strength||`` in the ``||input: Input||`` category to figure out if you can add the strength of shakes to players' score.

```blocks
input.onGesture(Gesture.Shake, function () {
    if (running) {
        score += input.acceleration(Dimension.Strength)
    }
})

```
