# timeouts

trying to make it easier to clean up timeouts

### Install

```bash
npm install timeouts
```

### Usage

```js
var Timeouts = require('timeouts')

var timeouts = Timeouts()

var tid1 = timeouts.timeout(function() {
  console.log('yo')
}, 1000)

var tid2 = timeouts.timeout(function() {
  console.log('not yo')
}, 1000)

timeouts.clear(tid1) // clear one timeout
timeouts.clearAll() // clear all timeouts created by this instance
```