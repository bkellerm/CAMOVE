var Hand = function () {
  //keywords
  var _KEYLEFT = "hand-left";
  var _KEYRIGHT = "hand-right";
  var _KEYTOP = "hand-top";
  var _KEYMIDDLE = "hand-middle";
  var _KEYBOTTOM = "hand-bottom"

  var defaults = {
    DEFAULT_HAND: _KEYRIGHT,
    
    NUM_SWIPES_NEEDED: 2,
   
    CW_CC_TOL: 0,
    CW_CC_RATIO: 0.6,
    MIN_SWIPE_DIST: 30,
    onLeft: undefined,
    onRight: undefined,

    DEFAULT_HAND_SECTION: _KEYMIDDLE,
    TOP_SECTION_RATIO: 0.3,
    MIDDLE_SECTION_RATIO: 0,
    BOTTOM_SECTION_RATIO: 0.7,
    NUM_TOUCHES_NEEDED: 5,
    onBottom: undefined,
    onMiddle: undefined,
    onTop: undefined,

    CSS: false
  }

  var _lastSwipe = "";
  var _numLastSwipe = 0;
  var _touchTrace = [];
  var _hand = defaults.DEFAULT_HAND;
  var _section = defaults.DEFAULT_HAND_SECTION;
  var _topCount = 0;
  var _middleCount = 0;
  var _bottomCount = 0;



  var _onBottom = function(){
    if(defaults.CSS){apply(_KEYBOTTOM);}
    if(defaults.onBottom !== undefined){
      try{defaults.onBottom();}catch(err){console.log("Your onBottom function has following error:\n"+err);}
    }
  };
  var _onMiddle = function(){
    if(defaults.CSS){apply(_KEYMIDDLE);}
    if(defaults.onMiddle !== undefined){
      try{defaults.onMiddle();}catch(err){console.log("Your onBottom function has following error:\n"+err);}
    }
  };
  var _onTop = function(){
    if(defaults.CSS){apply(_KEYTOP);}
    if(defaults.onTop !== undefined){
      try{defaults.onTop();}catch(err){console.log("Your onBottom function has following error:\n"+err);}
    }
  };
  var _onLeft = function(){
    if(defaults.CSS){apply(_KEYLEFT);}
    if(defaults.onLeft !== undefined){
      try{defaults.onLeft();}catch(err){console.log("Your onBottom function has following error:\n"+err);}
    }
  };
  var _onRight = function(){
    if(defaults.CSS){apply(_KEYRIGHT);}
    if(defaults.onRight !== undefined){
      try{defaults.onRight();}catch(err){console.log("Your onBottom function has following error:\n"+err);}
    }
  };

  // Create options by extending defaults with the passed arguments 
  // https://scotch.io/tutorials/building-your-own-javascript-modal-plugin
	if (arguments[0] && typeof arguments[0] === "object") {
    extendDefaults(arguments[0]);
	}
  
  // initialize class to default for handedness and hand section
  $("*").addClass(defaults.DEFAULT_HAND);
  $("*").addClass(defaults.DEFAULT_HAND_SECTION);

  //simple but not exhaustive test if browser supports TouchEvents (works on chrome v63)
  if('ontouchstart' in document.documentElement){
    var body = $('body')[0];
    body.addEventListener('touchstart', handleStart, false);
    body.addEventListener('touchmove', handleMove, false);
    body.addEventListener('touchend', handleEnd, false);
  }

  //setter function
	this.set = function() {
		if (arguments[0] && typeof arguments[0] === "object") {
			extendDefaults(arguments[0]);
    }
	}

	//getter functions
	// this.get = function(arg){return defaults[arg]};
	// this.getAll = function(){return defaults};

  function handleStart(evt) {
    _touchTrace.push(copyTouch(evt.changedTouches[0]));
  }
  
  function handleMove(evt) {
    _touchTrace.push(copyTouch(evt.changedTouches[0]));
  }

  function handleEnd(evt) {
    handednessDetection();
    handSectionDetection();

    //clean touch Trace for next
    _touchTrace = [];

    function handednessDetection() {
      //tranform into diffrent coordinate system
      var tPan = _touchTrace.map(function(k){ return { x: -k.clientY, y: -k.clientX }; });

      //describes clock direction of path a,b,c (positive clockwise, negative counterclockwise, 0 straight)
      var f = function(a, b, c){ return c.y - (a.y + (b.y - a.y) / (b.x - a.x) * (c.x - a.x)); };

      //calc distance between point a and point b
      var dist = function(a, b){ return Math.sqrt(Math.pow((b.x - a.x), 2) + Math.pow((b.y - a.y), 2)); }; //euclidean distance

      //calc distance of path specified by an array of points
      var pathDist = function(path){
        var sum = 0;
        for (var i = 1; i < path.length; i++) {
          sum += dist(path[i - 1], path[i]);
        }
        return sum;
      }

      //DEBUG
      // $('.circle').remove();
      // var circle = "<div class='circle remove' style='left:"+(_touchTrace[0].clientX-10)+"px;top:"+(_touchTrace[0].clientY-10)+"px;border-color:black;'></div>";
      // $(document).ready(()=>{
      //   $('body').append(circle);
      // });
      //END DEBUG

      // count clockwise, counterclockwise and neutral triplets in touch path
      var cc = 0;//counterclock-clockwise
      var cw = 0;
      var neutral = 0;
      for (var i = 2; i < tPan.length; i++) {
        if ((tPan[i - 1].x - tPan[i - 2].x) != 0) {
          if (f(tPan[i - 2], tPan[i - 1], tPan[i]) > defaults.CW_CC_TOL * dist(tPan[i - 2], tPan[i - 1])) {
            cc += 1;
            //DEBUG
            // var circle = "<div class='circle remove' style='left:"+(_touchTrace[i-1].clientX-10)+"px;top:"+(_touchTrace[i-1].clientY-10)+"px;border-color:yellow;'></div>";
            // $(document).ready(()=>{
            //   $('body').append(circle);
            // });
            //END DEBUG
          } else if (f(tPan[i - 2], tPan[i - 1], tPan[i]) < -defaults.CW_CC_TOL * dist(tPan[i - 2], tPan[i - 1])) {
            cw += 1;
            //DEBUG
            // var circle = "<div class='circle remove' style='left:"+(_touchTrace[i-1].clientX-10)+"px;top:"+(_touchTrace[i-1].clientY-10)+"px;border-color:red;'></div>";
            // $(document).ready(()=>{
            //   $('body').append(circle);
            // });
            //END DEBUG
          } else {
            neutral += 1;
            //DEBUG
            // var circle = "<div class='circle remove' style='left:"+(_touchTrace[i-1].clientX-10)+"px;top:"+(_touchTrace[i-1].clientY-10)+"px;border-color:orange;'></div>";
            // $(document).ready(()=>{
            //   $('body').append(circle);
            // });
            //END DEBUG
          }
        }
      }
      //DEBUG
      // console.log("touch trace marks: "+_touchTrace.length);
      // console.log("path distance: "+pathDist(tPan));
      // console.log("hand: "+hand);
      // var circle2 = "<div class='circle remove' style='left:"+(_touchTrace[_touchTrace.length-1].clientX-10)+"px;top:"+(_touchTrace[_touchTrace.length-1].clientY-10)+"px;border-color:black;'></div>";
      // $(document).ready(()=>{
      //   $('body').append(circle2);
      // });

      var thisSwipe;
      var oldHand = _hand;
      if (pathDist(tPan) > defaults.MIN_SWIPE_DIST) { //check if trace has minimal length
        if (cc / (cc + cw + neutral + Number.EPSILON) > defaults.CW_CC_RATIO) {
          thisSwipe = _KEYLEFT;
          if (_lastSwipe === _KEYLEFT) {
            _numLastSwipe += 1;
          } else {
            _lastSwipe = _KEYLEFT;
            _numLastSwipe = 1;
          }
          if (_numLastSwipe >= defaults.NUM_SWIPES_NEEDED) {
            _hand = _KEYLEFT;
          }
        } else if (cw / (cc + cw + neutral + Number.EPSILON) > defaults.CW_CC_RATIO) {
          thisSwipe = _KEYRIGHT;
          if (_lastSwipe === _KEYRIGHT) {
            _numLastSwipe += 1;
          } else {
            _lastSwipe = _KEYRIGHT;
            _numLastSwipe = 1;
          }

          if (_numLastSwipe >= defaults.NUM_SWIPES_NEEDED) {
            _hand = _KEYRIGHT;
          }
        }
      }

      if (_hand === _KEYLEFT && oldHand !== _KEYLEFT) {
        _onLeft();
      } else if (_hand === _KEYRIGHT && oldHand !== _KEYRIGHT) {
        _onRight();
      }
    }

    function handSectionDetection(){
      var avgSection = _touchTrace.reduce(function(acc,curr){return acc+curr.clientY;},0) / _touchTrace.length; //avg section of touch trace
      var height = $(window).height(); //height of screen
      var sumRatios = defaults.TOP_SECTION_RATIO+defaults.MIDDLE_SECTION_RATIO+defaults.BOTTOM_SECTION_RATIO;

      //determin section of current touch
      if(avgSection <= height*defaults.TOP_SECTION_RATIO/sumRatios && _section!==_KEYTOP){
        _topCount++;
        _middleCount = 0;
        _bottomCount = 0;
      }else if(avgSection <= height*(defaults.TOP_SECTION_RATIO+defaults.MIDDLE_SECTION_RATIO)/sumRatios && _section!==_KEYMIDDLE){
        _topCount = 0;
        _middleCount++;
        _bottomCount = 0;
      }else if(_section!==_KEYBOTTOM){
        _topCount = 0;
        _middleCount = 0;
        _bottomCount++;
      }


      if(_topCount>=defaults.NUM_TOUCHES_NEEDED && _section!==_KEYTOP){
        _onTop();
        _section = _KEYTOP;
        _topCount = 0;
      }else if(_middleCount>=defaults.NUM_TOUCHES_NEEDED && _section!==_KEYMIDDLE){
        _section = _KEYMIDDLE;
        _onMiddle();
        _middleCount = 0;
      }else if(_bottomCount>=defaults.NUM_TOUCHES_NEEDED && _section!==_KEYBOTTOM){
        _section = _KEYBOTTOM;
        _onBottom();
        _bottomCount = 0;
      }
    }
  }

  function copyTouch(touch) {
    return { clientX: touch.clientX, clientY: touch.clientY };
  }

  // Utility method to extend defaults with user options (see: https://scotch.io/tutorials/building-your-own-javascript-modal-plugin)
	function extendDefaults(properties) {
		for (property in properties) {
			if (properties.hasOwnProperty(property)) {
				defaults[property] = properties[property];
			}
		}
  }

  //apply all CSS rules according to current hand and hand section
  function apply(status, count) {
    if(status===_KEYLEFT || status===_KEYRIGHT){
        $("*").removeClass(_KEYLEFT+" "+_KEYRIGHT);
        $("*").addClass(status);
    }else if(status===_KEYBOTTOM || status===_KEYMIDDLE || status===_KEYTOP){
        $("*").removeClass(_KEYBOTTOM+" "+_KEYMIDDLE+" "+_KEYTOP);
        $("*").addClass(status);
    }
  }
}