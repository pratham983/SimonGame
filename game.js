var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var  level=0;
var started=false;


  
    $(document).keypress(function () {
        if(!started){
        $("h1").text("level " +level);
        started=true;
        nextSequence();
        }

        // console.log(event.key);
    });

    $(".btn").click(function () {
        var userChosenColour = $(this).attr('id');
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        console.log("userclicledpattern   " + userClickedPattern);
        var currentLevel=userClickedPattern.length-1;
        checkAnswer(currentLevel);
    });
    
function nextSequence() {

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    userClickedPattern = [];
    
    playSound(randomChosenColour);
    level++;
    $("h1").text("level " +level);
   
console.log("gamepattern     " + gamePattern);

}

function playSound(name) {
    var address = "sounds/" + name + ".mp3";
    var audio = new Audio(address);
    audio.play();
    animatePress(name);
}

function animatePress(currentColour) {
    var temp = $("#" + currentColour);
    temp.addClass("pressed");
    setTimeout(function () {
        temp.removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
    if(currentLevel===level-1){
    console.log("success");
    setTimeout(() => {
        // currentLevel=0;
        nextSequence();

    }, 1000);
}
else{
    // currentLevel++;
    setTimeout(() => {
        // currentLevel=0;
        // handler();

    }, 1000);
}
}
else{
    wrongAnswer();
}
}
function wrongAnswer(){
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver()
}
function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}


