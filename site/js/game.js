window.onload = function(){

  // globals
  var ctx = document.getElementById('canvas').getContext('2d');
	var fps = 60;
	var step = 1/fps;

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

  function update(dt){
  };
  // usage:
  // instead of setInterval(render, 16) ....
	
	function render(dt){
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
		var now = timestamp();
		var dt = now - last;

		update(dt);
		render(dt);
		last = now;
	};


};
