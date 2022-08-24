$(document).ready( function(){
  var playing = false;
  var score = 0;
  var step;
  var lifes;
  var action;

  $('#strt-btn').click(function(){
    if(playing == true){
      location.reload();
    }
    else{
      playing = true;
      score = 0;
      $('#lifes').css("visibility","visible");
      $('#score').text(score);
      $('#game-stats').hide();
      
      lifes = 3;
      lifescount();

      $('#strt-btn').text("Reset Game");
      fallFruits();
      
    }
  });

  $('#fruits').mouseover(function(){
    score++;
    $('#score').text(score);
    $('#sliceAudio')[0].play();

    clearInterval(action);
    $('#fruits').fadeOut(500);

    setTimeout(fallFruits, 500);
  });



  function lifescount(){
    $('#life').empty();
    for(i=0; i<lifes; i++){
      $('#life').append('<img src ="assets/images/life.png"/>')
    }
  };

  function fallFruits(){

      $('#fruits').show();
      $('#fruits').attr("src", "assets/images/fruit"+(1+(Math.round(Math.random()*7)))+".png");
      $('#fruits').css({"left": (20+(Math.round(Math.random()*400))+"px"), "top": -120});

      step = 1+(Math.round(Math.random()*5));

      action = setInterval(function(){
        $('#fruits').show();
        $('#game-stats').hide();

        $('#fruits').css('top', $('#fruits').position().top + step);

        //fruits position
        if($('#fruits').position().top > $('.game-box').height()){
          if(lifes>1){
            $('#fruits').show();
            $('#fruits').attr("src", "assets/images/fruit"+(1+(Math.round(Math.random()*7)))+".png");
            $('#fruits').css({"left": (20+(Math.round(Math.random()*400))+"px"), "top": -120});
            $('#fruits').css('top', $('#fruits').position().top + step);

            //reduce lifes
            lifes--;
            lifescount();

          }
          else{
            playing = false;
            $('#strt-btn').text("Play Again");
            $('#game-stats').show();
            $('#game-stats').html('Game over! <br>Your score is: ' + score);
            $('#lifes').css("visibility","hidden");
            stopPlay();
          }
        }
      }, 10);

  };

  function stopPlay(){
    clearInterval(action);
    $('#fruits').hide();
  }


});