var buttonColor = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern =[];
var level = 0;
var started = false;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }
 });
 $(".btn").click(function(){
  var userChosenColour =$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
      if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
          nextSequence();
        },1000)
      }
    }else{
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over!! Press any key to Restart");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
      startOver();
    }
}

 function nextSequence(){
  userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.round(Math.random()*3);
    var randomChoseColor =  buttonColor[randomNumber];
    gamePattern.push(randomChoseColor);
    $("#" + randomChoseColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoseColor);
  
 }


 function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
     audio.play();
 }
 function animatePress(currentColour){
     $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
      $("#"+currentColour).removeClass("pressed");
    },100);
 }

function startOver(){
  level=0;
  gamePattern=[];
  statred = false;
}
