window.onload = function(){

  // globals
  var c = document.getElementById('canvas');
	var ctx = c.getContext('2d');
	var fps = 60;
	var step = 1/fps;
	var now, last = timestamp();
	var players = 1;
	var initialMeter = 100;
	var effortMeters = createMeters(players);

	var COMMA = 188;
			FULLSTOP = 190;
			Z = 90;
			X = 88;

  // game vars

  // wnat to know what the key your pressing is? uncomment this code and comment out the following one
  // document.onkeydown=function(e){
  //   e=e?e:typeof event!='undefined'?event:null;
  //   if(!e)return 0;
  //   alert(e.keyCode)
  // }

  document.onkeydown=function(e){
  // comma
    if (e.keyCode == COMMA){
      console.log('is comma');
  // full stop
    } else if (e.keyCode == FULLSTOP) {
      console.log('is fullstop');
  // z key
    } else if (e.keyCode == Z) {
      console.log('is z');
  // x key
    } else if (e.keyCode == X) {
      console.log('is x');
    }
  };

  // update function
  // shim layer with setTimeout fallback
  window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
              window.setTimeout(callback, 1000 / 60);
            };
  })();

  function timestamp() {
    if (window.performance && window.performance.now)
      return window.performance.now();
    else
      return new Date().getTime();
  }

	function printMsg(msg, x, y) {
		ctx.font = "12pt Calibri";
    ctx.fillStyle = "rgb(0, 0, 0)";
    ctx.fillText(msg, x, y);
    ctx.fill();
	}

	function clearScreen() {
		ctx.clearRect(0, 0, c.width, c.height);
	}

	function createMeters(num) {
		someArray = [];
		for (num; num > 0; num--) {
			someArray.push(initialMeter);
		}
		return someArray;
	}

	function decreaseMeter(player, dt) {
    if (effortMeters[player - 1] <= 0){
      effortMeters[player - 1] = 0;
    } else {
      effortMeters[player - 1] -= dt/100;
    }
	}

  // create rectangles
  var drawMeters = function(x, y, w, h, col){
    ctx.beginPath();
    ctx.fillStyle = col;
    ctx.fillRect(x, y, w, h);
    ctx.fill();
  };

  function update(dt){
		decreaseMeter(1, dt);
    drawMeters(275, 0, 25, 150);
		render(dt);
  }
  // usage:
  // instead of setInterval(render, 16) ....
	//
	function render(dt){
		clearScreen();
		printMsg("DT=" + dt, 10, 25);
		printMsg("eff=" + effortMeters[0], 10, 50);
    // height of convas is being reported as 150px!
    drawMeters(270, 5, 20, 140, '#000000');
    drawMeters(270, (145 - (effortMeters[0])), 20, effortMeters[0], '#ff0000');
	}
	// usage:
	// all render to screen

  (function animloop(){
    requestAnimFrame(animloop);
    main();
  })();
  // place the rAF *before* the render() to assure as close to
  // 60fps with the setTimeout fallback.

	function main(){
		now = timestamp();
		dt = now - last;

		update(dt);
		last = now;
	}

};
