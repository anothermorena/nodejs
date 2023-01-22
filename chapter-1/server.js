//How NodeJS differs from Vanilla JS
//1) Node runs on a server - not in a browser(backend not frontend)
//2) The console is the terminal window not dev tools like when usng JS for the frontend
console.log('Hello World');

//3) Global Object
/* 
Another difference between node and vanilla js is that there is a global object instead of instead of a window object.
The window object reffers to the browser where we can do window.innerheight and other different properties. The global object 
is much smaller but it does have some of the propertities  as the window object.
*/

console.log(global);

/* 
4.) Has common core modules that vanilla js does not have
5.) Common Js modules instead of ES6 modules. We use require instead of import statements to load modules
6.) Node js is missing some JS API's like fetch but we can always pull in packages into node to achieve the same results so we wont miss it that much.
*/

//common core modules
const os = require('os'); //This is just a different syntax than we are used to seing with import
const path = require('path');

console.log(os.type());
console.log(os.version());
console.log(os.homedir());

console.log(__dirname); // returns the entire directory name
console.log(__filename); // returns the entire filename and it location

console.log(path.dirname(__filename));
console.log(path.basename(__filename)); //pulls the file name only
console.log(path.extname(__filename)); //gives us just the extention of the file
console.log(path.parse(__filename)); // returns an object with all of the values above i.e. the root,directoey,extension and name

//importing packages from custom js modules
const math = require('./math'); // we do not need the js extention

console.log(math.add(2, 2));
console.log(math.subtract(2, 2));
console.log(math.multiply(2, 2));
console.log(math.divide(2, 2));

//we can also use destructing to import the functions like below
const { add, subtract, multiply, divide } = require('./math');

//then we do not need to use the functions by calling them using the math module
console.log(add(2, 2));
console.log(subtract(2, 2));
console.log(multiply(2, 2));
console.log(divide(2, 2));
