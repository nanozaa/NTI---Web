let pin = 1234;
let balance = 5000;
let wrongAttempts = 0;
let accountLocked = false;

function validatePin(enteredPin) {
  return enteredPin === pin;
}

function loginAttempt(enteredPin) {
  if (accountLocked) {
    console.log("Account locked. Please try again later.");
    return false;
  }

  if (validatePin(enteredPin)) {
    wrongAttempts = 0;
    console.log("PIN correct. Access granted.");
    return true;
  }

  wrongAttempts += 1;

  if (wrongAttempts >= 3) {
    accountLocked = true;
    console.log("Too many wrong attempts. Account locked.");
  } else {
    console.log("Incorrect PIN. Please try again.");
    console.log("Attempts left: " + (3 - wrongAttempts));
  }

  return false;
}

function deposit(amount) {
  if (amount <= 0) {
    console.log("Deposit failed: amount must be greater than zero.");
    return balance;
  }

  balance += amount;
  console.log("Deposit successful. New balance: " + balance);
  return balance;
}

function withdraw(amount) {
  if (amount <= 0) {
    console.log("Withdrawal failed: amount must be greater than zero.");
    return balance;
  }

  if (amount > balance) {
    console.log("Withdrawal failed: insufficient balance.");
    return balance;
  }

  balance -= amount;
  console.log("Withdrawal successful. New balance: " + balance);
  return balance;
}

function checkBalance() {
  console.log("Current balance: " + balance);
  return balance;
}

function changePin(newPin) {
  if (!/^\d{4}$/.test(String(newPin))) {
    console.log("PIN change failed: PIN must contain exactly 4 digits.");
    return false;
  }

  pin = Number(newPin);
  console.log("PIN changed successfully.");
  return true;
}

console.log("--- ATM Demo ---");
console.log("Login test 1:");
loginAttempt(1234);

deposit(300);
withdraw(2000);
checkBalance();
changePin(5678);
console.log("Login test 2:");
loginAttempt(5678);

console.log("Wrong PIN attempts:");
loginAttempt(1111);
loginAttempt(2222);
loginAttempt(3333);
