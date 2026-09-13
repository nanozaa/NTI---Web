// JavaScript Practice Tasks

// 1. Synchronous Execution
console.log("\n--- 1. Synchronous Execution ---");

console.log("Start");
console.log("Middle");
console.log("End");

function firstStep() {
  console.log("First function");
  secondStep();
}

function secondStep() {
  console.log("Second function");
}

firstStep();

const firstNumber = 8;
const secondNumber = 4;
const sum = firstNumber + secondNumber;
const product = sum * 2;
console.log("Sum:", sum);
console.log("Product of the sum:", product);

function calculateArea(width, height) {
  return width * height;
}

function describeArea(area) {
  return `The area is ${area} square units.`;
}

const area = calculateArea(5, 3);
console.log(describeArea(area));

// 2. Asynchronous Basics (setTimeout)
console.log("\n--- 2. Asynchronous Basics ---");

console.log("Hello");
setTimeout(() => console.log("World"), 2000);

function printNumbersWithDelay() {
  for (let number = 1; number <= 5; number += 1) {
    setTimeout(() => console.log("Delayed number:", number), number * 1000);
  }
}

printNumbersWithDelay();

console.log("Loading...");
setTimeout(() => console.log("Done"), 3000);

function sendDelayedMessage(message, delay) {
  setTimeout(() => console.log("Message:", message), delay);
}

sendDelayedMessage("This message arrived later.", 1500);

// 3. JavaScript Runtime and Event Loop
console.log("\n--- 3. Runtime and Event Loop ---");

// Predicted output: Runtime start, Runtime end, then Timer callback.
console.log("Runtime start");
setTimeout(() => console.log("Timer callback"), 0);
console.log("Runtime end");

// The synchronous logs finish before the zero-delay timer callback.
console.log("Line 1: synchronous");
setTimeout(() => console.log("Line 3: asynchronous callback"), 0);
console.log("Line 2: synchronous");

console.log("Call stack is busy");
setTimeout(() => console.log("The async task runs after the call stack is empty"), 0);
console.log("Call stack is now clear");

// 4. Callback Functions
console.log("\n--- 4. Callback Functions ---");

function greet(name, callback) {
  console.log(`Hello, ${name}!`);
  callback();
}

greet("Sara", () => console.log("Greeting callback executed."));

function calculator(numberOne, numberTwo, operationCallback) {
  const result = operationCallback(numberOne, numberTwo);
  console.log("Calculator result:", result);
}

calculator(10, 5, (a, b) => a + b);
calculator(10, 5, (a, b) => a - b);
calculator(10, 5, (a, b) => a * b);

function loadData(callback) {
  console.log("Loading data...");
  setTimeout(() => {
    const data = { id: 1, name: "Practice data" };
    callback(data);
  }, 1000);
}

loadData((data) => console.log("Data loaded:", data));

function login(username, password, callback) {
  const isValid = username === "student" && password === "1234";

  setTimeout(() => {
    if (isValid) {
      callback(null, username);
    } else {
      callback(new Error("Invalid username or password"));
    }
  }, 500);
}

function showWelcomeMessage(username, callback) {
  console.log(`Login successful. Welcome, ${username}!`);
  callback();
}

function openNextStep() {
  console.log("Next authentication step opened.");
}

login("student", "1234", (error, username) => {
  if (error) {
    console.error("Login failed:", error.message);
    return;
  }

  showWelcomeMessage(username, openNextStep);
});
