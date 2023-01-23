/* 

Event Emitter

Events and event emitters in Node.js are used to handle asynchronous programming and communication between different parts of an application.

An event is a signal that something has happened, such as a button being clicked or a file being loaded. An event emitter is an object that can listen for and emit events. It allows for the creation of custom events that can be used to trigger specific actions within the application.

The most important thing to know about events and event emitters in Node.js is that they rely on the observer pattern. This means that there are listeners that are waiting for specific events to be emitted, and when they are, they will perform a specific action.

To use events and event emitters in Node.js, you first need to import the events module. You can then create an event emitter object and attach event listeners to it. When an event is emitted, the attached listeners will be triggered.

It's important to note that events are emitted asynchronously, so it's important to handle errors and unexpected behavior properly. Additionally, events can be emitted with additional data, which can be passed to the listeners and used to perform specific actions.

In summary, events and event emitters in Node.js are a powerful tool for handling asynchronous programming and communication between different parts of an application. They rely on the observer pattern and allow for the creation of custom events that can be used to trigger specific actions within the application.


*/

const logEvents = require('./logEvents'); // remember that this is a custom module so we have to specify its directory when importing it inorder to use it

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

//initialize the object
const myEmitter = new MyEmitter();

//add listerner for the log event
myEmitter.on('log', (msg) => logEvents(msg));

setTimeout(() => {
  //emit the event
  myEmitter.emit('log', 'log event emitted');
}, 2000);
