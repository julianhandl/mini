# mini
A very small javascript library for the modern web inspired by jquery

```js
// new instance with an id
const element = m("#myelement");

// new instance with a selector
const element = m(".myclass");
const element = m(".myclass h2");
```

## EventListeners

### ```.on("click", () => {})```
Adds an event listener to the instance.

### ```.off("click")```
Removes all event listeners by event.

### ```.off(myFunction)```
Removes all event listeners by  function recerence.

### ```.off("click", myFunction)```
Removes all event listeners by event and function recerence.