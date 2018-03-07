# CAMOVE
CAMOVE are two JavaScript frameworks that help you to recognize user context and act on it.
The walking.js framework detects if you are walking or not and hand.js helps you detect 
what hand is touching the screen and in which segment (top, middle, bottom) the touches occure.

# Support
Currently, both CAMOVE frameworks are only tested on a chrome 63 browser on a OnePlus 5t.

# Installation
The framework is dependant on jQuery, therefore first include jQuery 
and than one or both of the CAMOVE frameworks.
```javascript
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script src="path/to/hand.js" type="text/javascript"></script>
<script src="path/to/walking.js" type="text/javascript"></script>
```

# Example Usage
## hand.js
```javascript
var h = new Hand({
    defaultHand: "hand-left",
    swipesNeeded: 5
});

h.set({
    onLeft: function() {
        alert("welcome back to the left side");
    }
});
```

## walking.js
```javascript
var w = new Walking();

w.set({
    TIME_TILL_WALKING: 30000,
    TIME_TILL_STATIC: 15000
});
```

# Options

## hand.js options

| __Option Name__  | __Description__ | __Default Value__ | __Possible Values__ |
| -------------  | :------------ | :-------------: | :---------------- |
| __defaultHand__      | the hand the system gets initialized with | hand-right | hand-{right, left} |
| __swipesNeeded__ | number of touches needed to determin hand level | 1 | whole number greater 0 |
| __distTol__ | minimal length of swipe in pixels to count as swipe | 30 | whole number greater 1 |
| __onLeft__ | function that gets invoked when hand touching the screen changes to left hand | undefined | function |
| __onRight__ | function that gets invoked when hand touching the screen changes to right hand | undefined | function |
| __tol__ | REMOVE? | 0 | [0,1] |
| __lrTol__ | percentage of clockwise triplets needed relative to total number of triplets | 0.6 | [0,1] |
| __defaultHandLevel__ | initial hand level | hand-bottom | hand-{bottom, middle, top} |
| __top_part__ | percentage of height of screen starting from top that counts as top | 0.3 | [0,1] |
| __middle_part__ | percentage of height of screen starting from end of top part that counts as middle | 0 | [0,1] |
| __bottom_part__ | percentage of height of screen starting from end of middle part that counts as bottom | 0.7 | [0,1] |
| __touchesNeededLevel__ | number of consecutive touches on same level needed to change to that level | 5 | whole number greater 0 |
| __onTop__ | function that gets invoked when hand touching the screen changes level to top | undefined | function | 
| __onMiddle__ | function that gets invoked when hand touching the screen changes level to middle | undefined | function | 
| __onBottom__ | function that gets invoked when hand touching the screen changes level to bottom | undefined | function | 
| __css__ | flag for using context to enable css classes  | true | false, true |


## walking.js options

| __Option Name__  | __Description__ | __Default Value__ | __Possible Values__ |
