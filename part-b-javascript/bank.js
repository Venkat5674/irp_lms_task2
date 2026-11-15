"use strict";

// PART 1: Types & Coercion

function parseAmount(input) {
  if (input === null || input === undefined) {
    throw new Error("Amount is required");
  }

  if (typeof input !== "string" && typeof input !== "number") {
    throw new Error("Invalid type: amount must be a string or number");
  }

  let sanitized = input;
  if (typeof input === "string") {
    sanitized = input.trim();
    // Guard against empty string because Number("") coerces to 0
    if (sanitized === "") {
      throw new Error("Amount cannot be empty");
    }
  }

  const amount = Number(sanitized);
  if (Number.isNaN(amount)) {
    throw new Error("Invalid number format");
  }

  if (amount <= 0) {
    throw new Error("Amount must be greater than zero");
  }

  return amount;
}

// "5" + 2 yields "52" because the + operator triggers string concatenation when an operand is a string.
// "5" - 2 yields 3 because the - operator strictly performs numeric conversion and arithmetic subtraction.
// typeof null === "object" due to a legacy bug in JS where null shared the 0x00 type tag for objects.

const testInputs = ["500", " 250 ", "", "abc", null, undefined, "12.5.3"];

testInputs.forEach((testCase) => {
  try {
    const result = parseAmount(testCase);
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
});

// PART 2: Scoping & Hoisting

// Step 1: Main Declarations
// const is used for BANK_NAME because the identifier is immutable and must not be reassigned;
// let is used for transactionCounter because its numeric value increments as transactions occur.
const BANK_NAME = "JS National Bank";
let transactionCounter = 0;

// Step 2: Hoisting Demo
// // HOISTING DEMO
// In the creation phase, memory is allocated: var is initialized to undefined and function declarations are hoisted,
// whereas in the execution phase, code runs line-by-line and let/const remain in the Temporal Dead Zone until initialized.

console.log(hoistedVar);
var hoistedVar = "Bank Account";

try {
  console.log(hoistedLet);
  let hoistedLet = "Savings Account";
} catch (error) {
  console.log(error.name + ": " + error.message);
}

announce();
function announce() {
  console.log("Announcement: JS National Bank is open!");
}

try {
  notify();
} catch (error) {
  console.log(error.name + ": " + error.message);
}
var notify = function () {
  console.log("Notification ready.");
};

// Step 3: The Asynchronous Loop Bug
// var is function-scoped so all iterations share one variable i whose final value is 3 when timeouts fire;
// let is block-scoped so each iteration receives a distinct lexical binding preserved in closure.

for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log("var loop:", i);
  }, 100);
}

for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log("let loop:", i);
  }, 200);
}
