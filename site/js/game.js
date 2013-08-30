window.onload = function(){

  // globals
  var c = document.getElementById('canvas');
	var ctx = c.getContext('2d');
	var fps = 60;
	var step = 1/fps;
	var now, last = timestamp();

  // game vars


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
		render();
		last = now;
	}

};
