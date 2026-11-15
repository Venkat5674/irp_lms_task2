"use strict";

// ============================================================================
// PART 1: Types & Coercion
// ============================================================================

/**
 * Validates a raw user input and returns a valid positive number or throws an Error.
 * 
 * Rules:
 * 1. If input is null or undefined, throw an Error saying amount is required.
 * 2. If input is not a string or number, throw an Error indicating invalid type.
 * 3. If input is a string, remove outer spaces using .trim().
 * 4. If trimmed string is empty (""), throw an Error (Number("") evaluates to 0).
 * 5. Convert with Number(). If result is NaN, throw an Error.
 * 6. If number is <= 0, throw an Error (amount must be greater than zero).
 * 7. Otherwise, return the verified number.
 */
function parseAmount(input) {
  // Check 1: Ensure input is provided and not null/undefined
  if (input === null || input === undefined) {
    throw new Error("Amount is required. Please provide a valid numerical value.");
  }

  // Check 2: Ensure input is either a primitive string or number
  if (typeof input !== "string" && typeof input !== "number") {
    throw new Error("Invalid type: amount must be provided as a string or number.");
  }

  // Check 3 & 4: Trim string and guard against empty string zero coercion
  let processedInput = input;
  if (typeof input === "string") {
    processedInput = input.trim();
    if (processedInput === "") {
      throw new Error("Amount cannot be empty. Number('') coerces to 0 and is invalid.");
    }
  }

  // Check 5: Explicitly convert to number and verify it is not NaN
  const numericValue = Number(processedInput);
  if (Number.isNaN(numericValue)) {
    throw new Error(`Invalid numeric amount: '${input}' cannot be converted to a valid number.`);
  }

  // Check 6: Enforce business rule that amounts must be strictly positive (> 0)
  if (numericValue <= 0) {
    throw new Error(`Amount must be greater than zero. Received: ${numericValue}.`);
  }

  // Check 7: Return verified number
  return numericValue;
}

// ----------------------------------------------------------------------------
// MANDATORY EXPLANATORY COMMENTS:
//
// 1. Why "5" + 2 === "52" while "5" - 2 === 3:
// The binary '+' operator is overloaded: if either operand is a string, JavaScript
// coerces the other operand to a string and performs string concatenation ("5" + "2" = "52").
// In contrast, the '-' operator is strictly numeric: JavaScript coerces string "5" to number 5
// and computes numeric subtraction (5 - 2 = 3).
//
// 2. Why typeof null === "object":
// In JavaScript's first implementation, values were stored with a type tag in their lowest bits;
// the type tag 0 was designated for object references, and null was represented as a NULL pointer (all zeros),
// causing typeof null to erroneously evaluate to "object" (a permanent legacy quirk).
// ----------------------------------------------------------------------------

console.log("--- Testing Part 1: parseAmount(input) ---");

const testInputs = [
  "500",      // Expected: Returns number 500
  " 250 ",    // Expected: Returns number 250
  "",         // Expected: Throws Error
  "abc",      // Expected: Throws Error
  null,       // Expected: Throws Error
  undefined,  // Expected: Throws Error
  "12.5.3"    // Expected: Throws Error
];

testInputs.forEach((testCase) => {
  try {
    const result = parseAmount(testCase);
    console.log(`Input: ${JSON.stringify(testCase)} => Success: ${result} (type: ${typeof result})`);
  } catch (error) {
    console.log(`Input: ${JSON.stringify(testCase)} => Caught Error: ${error.message}`);
  }
});


// ============================================================================
// PART 2: Scoping & Hoisting
// ============================================================================

// ----------------------------------------------------------------------------
// Step 1: Main Declarations
// ----------------------------------------------------------------------------
// We declare BANK_NAME with const because the bank's brand identifier is immutable and must never be reassigned.
// We declare transactionCounter with let because its state is mutable and increments with each processed transaction.
const BANK_NAME = "JS National Bank";
let transactionCounter = 0;

console.log(`\nBank: ${BANK_NAME}, Initial Transaction Count: ${transactionCounter}`);


// ----------------------------------------------------------------------------
// Step 2: Hoisting Demo
// // HOISTING DEMO
// ----------------------------------------------------------------------------
// Explanation: In the execution context creation phase, memory is allocated for variables and functions.
// 'var' declarations are initialized with 'undefined', while function declarations are hoisted completely.
// In contrast, 'let' and 'const' declarations remain uninitialized in the Temporal Dead Zone (TDZ)
// until code execution reaches their explicit declaration statements.

console.log("\n--- Step 2: Hoisting Demo ---");

// 1. var hoisting: accessing before declaration yields undefined
console.log("1. var before declaration:", hoistedVar); // prints: undefined
var hoistedVar = "Standard Bank Account Tier";
console.log("   var after declaration:", hoistedVar);

// 2. let hoisting & Temporal Dead Zone (TDZ): accessing before declaration throws ReferenceError
try {
  // Entering block scope where hoistedLet is hoisted but uninitialized
  console.log(hoistedLet);
  let hoistedLet = "Premium Account Tier";
} catch (err) {
  console.log("2. Caught ReferenceError in TDZ for let:", err.name + " - " + err.message);
}

// 3. Function Declaration: fully hoisted into memory during creation phase; callable before definition
announce(); // succeeds via hoisting
function announce() {
  console.log("3. Function declaration announce(): 'Welcome to JS National Bank branch!' (succeeded before definition)");
}

// 4. Function Expression: assigned to a var variable; variable is hoisted as undefined during creation phase,
// so attempting to invoke undefined() throws a TypeError
try {
  notify();
} catch (err) {
  console.log("4. Caught TypeError for var function expression notify():", err.name + " - " + err.message);
}
var notify = function () {
  console.log("Notification: Daily transaction summary ready.");
};


// ----------------------------------------------------------------------------
// Step 3: The Asynchronous Loop Bug
// ----------------------------------------------------------------------------
// Explanation: 'var' is function/globally scoped, sharing a single variable instance across all loop iterations.
// By the time the asynchronous setTimeout callbacks fire in the event loop, the loop has already completed
// and the shared variable 'i' equals 3.
// In contrast, 'let' is block-scoped, binding a fresh lexical variable instance with its own snapshot
// for each iteration closure.

console.log("\n--- Step 3: The Asynchronous Loop Bug ---");

// Buggy loop using var
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log("var loop:", i);
  }, 100);
}

// Fixed loop using let
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log("let loop:", i);
  }, 200);
}
