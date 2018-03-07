# CAMOVE
CAMOVE are two Javascript frameworks that help you to recognize user context and act on it.
The walking.js framework detects if you are walking or not (static) and hand.js detect 
what hand is touching the screen (left or right) and in which segment (top, middle, bottom) the touches occure.

# Support
Currently, both CAMOVE frameworks are only tested on a Google Chrome for Android v64 browser on a OnePlus 5t.

# Installation
The framework is dependant on jQuery, therefore first include jQuery 
and than one and/or both of the CAMOVE frameworks.
```javascript
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="path/to/hand.js" type="text/javascript"></script>
<script src="path/to/walking.js" type="text/javascript"></script>
```

# Example Usage
## for hand.js
```javascript
var h = new Hand({
    defaultHand: "hand-left",
    swipesNeeded: 5
});

// you can also set options after the object has been created with set
h.set({
    onLeft: function() {
        alert("welcome back to the left side");
    }
});
```

## for walking.js
```javascript
var w = new Walking();

w.set({
    WINDOW_S_W: 30000,
    WINDOW_W_S: 15000
});
```

## use context in CSS
You can change your layout based on CSS rules by enabling the CSS flag. This adds the current context as a class to all HTML tags. Here an example:
```javascript
var w = new Walking();
```
```HTML
<p id="hide">I get hidden when you stop walking</p>
```
```CSS
#hide.static {display:none}
#hide.walking {display:inline}
```


# Options

## Table explaining parameters for hand.js

| __Option Name__  | __Description__ | __Default Value__ | __Possible Values__ |
| -------------  | :------------ | :-------------: | :---------------- |
| __DEFAULT_HAND__      | the hand the system gets initialized with | hand-right | hand-{right, left} |
| __NUM_SWIPES_NEEDED__ | number of touches needed to determin section hand is in | 2 | whole number greater 0 |
| __MIN_SWIPE_DIST__ | minimal length of swipe path length in pixels to count as swipe | 30 | whole number greater 1 |
| __onLeft__ | function that gets invoked when hand touching the screen changes to left hand | undefined | function |
| __onRight__ | function that gets invoked when hand touching the screen changes to right hand | undefined | function |
| __CW_CC_TOL__ | tolerance relative to touch path length needed to be CW or CC (otherwise neutral) | 0 | [0,1] |
| __CW_CC_RATIO__ | percentage of one clock direction triplets (CW or CC) need realtive to total number of triplets to register as corresponding hand | 0.6 | [0,1] |
| __DEFAULT_HAND_SECTION__ | initial section hand is in | hand-bottom | hand-{bottom, middle, top} |
| __TOP_SECTION_RATIO__ | ratio of height of screen that counts as top | 0.3 | [0,1] |
| __MIDDLE_SECTION_RATIO__ | ratio of height of screen that counts as middle | 0 | [0,1] |
| __BOTTOM_SECTION_RATIO__ | ratio of height of screen that counts as bottom | 0.7 | [0,1] |
| __NUM_TOUCHES_NEEDED__ | number of consecutive touches on in same section needed to change to to this section | 5 | whole number greater 0 |
| __onTop__ | function that gets invoked when hand touching the screen changes section to top | undefined | function | 
| __onMiddle__ | function that gets invoked when hand touching the screen changes section to middle | undefined | function | 
| __onBottom__ | function that gets invoked when hand touching the screen changes section to bottom | undefined | function | 
| __CSS__ | flag for using context to enable css classes  | true | false, true |


## Table explaining parameters for walking.js

| __Option Name__  | __Description__ | __Default Value__ | __Possible Values__ |
| __STEP_SENSITIVITY__ | y-acceleration (axis towards ground) threshold for up/down movement of step in [m/s^2] | 0.8 | [0,Inf] |
| __SPEED_S_W__ | min. average speed [steps/s] during last WINDOW_S_W [ms] needed to change from static to walking state |||
| __WINDOW_S_W__ | time window in ms considered for chaning from static into walking state |||
| __SPEED_W_S__ | min. average speed [steps/s] during last WINDOW_W_S [ms] needed to change from walking to static state |||
| __WINDOW_W_S__ | time window in ms considered for chaning from walking into static state |||
| __MAX_STD_OVER_AVG_S_W__ ||||
| __MIN_DELAY_START_NEXT_STEP__ | min. delay for next step to start after finishing a step |||
| __onWalking__ | function that gets invoked when changing from static into walking state |||
| __onStatic__ | function that gets invoked when changing from walking into static state |||
| __onStep__ | function that gets invoked when one step is performed |||

