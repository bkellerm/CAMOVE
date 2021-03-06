# CAMOVE
CAMOVE are two Javascript frameworks that help you to recognize the context of the user.
The walking.js framework detects if you are walking or not (static) and hand.js detects 
what hand is touching the screen (left or right) and in which segment (top, middle, bottom) the touches occure. This context can be used in two diffrent ways. You can provide a functions that get executed when you switch into the according state or you can enable the CSS flag and change your site by using the corresponding CSS classes. CAMOVE was implemented for a bachelor thesis and it is still a work in progress. If you want to make any interesting change, please feel free to do so!

# Motivation
The idea is to make websites that adapt to user preferences and actions. For example, it adapts the UI accordingly to there holding pattern or change the amount of information displayed at once when the user starts walking.

# Support
Currently, both CAMOVE frameworks were only tested on a OnePlus 5t. Hand.js works in Chrome 64/65 as well as in Edge 1.0 but not in Firefox 58. Walking.js works in Chrome 64, Firefox 58 and Edge 1.0 but no longer in Chrome 65.

# Installation
The framework is dependant on jQuery, therefore first include jQuery 
and then one and/or both of the CAMOVE frameworks.
```javascript
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="path/to/hand.js"></script>
<script src="path/to/walking.js"></script>
```

# Example Usage
## hand.js
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

## walking.js
Works analogous to hand.js. Here an example:
```javascript
var w = new Walking();
w.set({CSS: true});
```

## Enable CSS Flag
You can change your layout based on CSS rules by enabling the CSS flag. This adds the current context (e.g. walking or static) as a class to all DOM elements. You can now make use of this by including it into your CSS selector. Here an example:
```javascript
var w = new Walking();
```
```HTML
<p id="hide">I get hidden when you stop walking and displayed again when you start walking.</p>
```
```CSS
#hide.static {display:none}
#hide.walking {display:inline}
```

# Options
For both hand.js and walking.js are various parameters accessible which help you to costumize your site's behavior. You can set them at creation or afterwards with set.

## Table explaining parameters for hand.js

| __Option Name__  | __Description__ | __Default Value__ | __Possible Values__ |
| -------------  | :------------ | :-------------: | :---------------- |
| __DEFAULT_HAND__      | the hand the system gets initialized with | hand-right | hand-{right, left} |
| __NUM_SWIPES_NEEDED__ | number of touches needed to determine the section the hand is in | 2 | whole number >0 |
| __MIN_SWIPE_DIST__ | minimal length of swipe in pixels to count as swipe | 30 | whole number >0 |
| __CW_CC_RATIO__ | percentage of one clock direction triplets (CW or CC) need realtive to total number of triplets to register as corresponding hand | 0.6 | [0,1] |
| __CW_CC_TOL__ | tolerance relative to touch path length needed to be CW or CC (otherwise neutral) | 0 | [0,1] |
| __onLeft__ | function that gets invoked when hand touching the screen changes to left hand | undefined | function |
| __onRight__ | function that gets invoked when hand touching the screen changes to right hand | undefined | function |
| __DEFAULT_HAND_SECTION__ | initial section hand is in | hand-bottom | hand-{bottom, middle, top} |
| __TOP_SECTION_RATIO__ | ratio of height of screen that counts as top | 0.3 | [0,1] |
| __MIDDLE_SECTION_RATIO__ | ratio of height of screen that counts as middle | 0 | [0,1] |
| __BOTTOM_SECTION_RATIO__ | ratio of height of screen that counts as bottom | 0.7 | [0,1] |
| __NUM_TOUCHES_NEEDED__ | number of consecutive touches on in same section needed to change to to this section | 5 | whole number >0 |
| __onTop__ | function that gets invoked when hand touching the screen changes section to top | undefined | function | 
| __onMiddle__ | function that gets invoked when hand touching the screen changes section to middle | undefined | function | 
| __onBottom__ | function that gets invoked when hand touching the screen changes section to bottom | undefined | function | 
| __CSS__ | flag for using context to enable css classes  | false | boolean |


## Table explaining parameters for walking.js

| __Option Name__  | __Description__ | __Default Value__ | __Possible Values__ |
| -------------  | :------------ | :-------------: | :---------------- |
| __STEP_SENSITIVITY__ | y-acceleration (axis towards ground) threshold [m/s^2] for up/down movement of step in | 0.8 | [0,Inf] |
| __SPEED_S_W__ | min. average speed [steps/s] during last WINDOW_S_W needed to change from static to walking state | 1.0 | [0,Inf] |
| __WINDOW_S_W__ | time window [ms] considered for chaning from static into walking state | 10000 | [0,Inf] |
| __SPEED_W_S__ | max. average speed [steps/s] during last WINDOW_W_S needed to change from walking to static state | 0.8 | [0,Inf] |
| __WINDOW_W_S__ | time window [ms] considered for chaning from walking into static state | 10000 | whole number >=0 |
| __MIN_DELAY_START_NEXT_STEP__ | min. delay [ms] for next step to start after finishing a step | 90 | whole number >=0 |
| __onWalking__ | function that gets invoked when changing from static into walking state | undefined | function |
| __onStatic__ | function that gets invoked when changing from walking into static state | undefined | function |
| __onStep__ | function that gets invoked when one step is performed | undefined | function |
| __CSS__ | flag for using context to enable css classes  | false | boolean |

## Demo
Poems is a small example that changes the position of the menu according to you grip and shows you a message when you walk for 10s. [Try it](https://bkellerm.github.io/bkellerm/docs/demo/poems/)
