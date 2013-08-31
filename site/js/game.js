window.onload = function(){

  // globals
  var c = document.getElementById('canvas');
	var ctx = c.getContext('2d');
	var fps = 60;
	var step = 1/fps;
	var now, last = timestamp();
	var players = 1;
	var effortMeters = createMeters(players);
	console.log(effortMeters);

  // game vars

  // wnat to know what the key your pressing is? uncomment this code and comment out the following one
  // document.onkeydown=function(e){
  //   e=e?e:typeof event!='undefined'?event:null;
  //   if(!e)return 0;
  //   alert(e.keyCode)
  // }

  document.onkeydown=function(e){
  // comma
    if (e.keyCode == 188){
      console.log('is left');
  // full stop
    } else if (e.keyCode == 190) {
      console.log('is right');
  // z key
    } else if (e.keyCode == 90) {
      console.log('is comma');
  // x key
    } else if (e.keyCode == 88) {
      console.log('is fullstop');
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
		ctx.fillText(msg, x, y);
	}

	function clearScreen() {
		ctx.clearRect(0, 0, c.width, c.height);
	}

	function createMeters(num) {
		someArray = [];
		for (num; num > 0; num--) {
			someArray.push(0);
		}
		return someArray;
	}


  function update(dt){
		render(dt);
  }
  // usage:
  // instead of setInterval(render, 16) ....
	//
	function render(dt){
		clearScreen();
		printMsg(dt, 10, 25);
	};
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
