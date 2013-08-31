window.onload = function(){

  // globals
  var c = document.getElementById('canvas');
      c.width  = 600;
      c.height = 400;
  var ctx = c.getContext('2d');
	var fps = 60;
	var step = 1/fps;
	var now, last = timestamp();
	var players = 1;
	var initialMeter = 100;
	var effortMeters = createMeters(players);
	var keyDown = 0;

	var COMMA = 188;
			FULLSTOP = 190;
			Z = 90;
			X = 88;

	var currentKey = [Z, COMMA];
	var playerKeys = [[Z, X],[COMMA, FULLSTOP]];
  // game vars

  // wnat to know what the key your pressing is? uncomment this code and comment out the following one
  // document.onkeydown=function(e){
  //   e=e?e:typeof event!='undefined'?event:null;
  //   if(!e)return 0;
  //   alert(e.keyCode)
  // }

  document.onkeydown=function(e){
  // comma
    keyDown = e.keyCode;
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
		var playerIndex = player - 1;
    if (effortMeters[playerIndex] <= 0){
      effortMeters[playerIndex] = 0;
    } else {
      effortMeters[playerIndex] -= dt/c.height;
    }
	}

	function increaseMeter(player, dt) {
		var playerIndex = player - 1;
    var currentKeyDown = keyDown; // to prevent race conditions
		if (currentKeyDown == currentKey[playerIndex]) {
			effortMeters[playerIndex] += dt/10 ;
			for(i=0; i<= 1; i++){
				if(currentKeyDown != playerKeys[playerIndex][i]) {
					var nextKey = playerKeys[playerIndex][i];
					console.log(nextKey);
				}
			}

			currentKey[playerIndex] = nextKey;
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
		increaseMeter(1, dt);
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
    drawMeters((c.width - 25), 5, 20, (c.height - 10), '#000000');
    drawMeters((c.width - 25), (c.height - 5) - effortMeters[0], 20, effortMeters[0], '#ff0000');
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
