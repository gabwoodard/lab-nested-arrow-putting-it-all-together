function createLoginTracker(correctPassword) {
  let wrongAttempts = 0;      // counts wrong attempts
  const MAX = 3;              // lock on the 3rd wrong attempt

  return function (passwordAttempt) {
    // if already locked, stay locked
    if (wrongAttempts >= MAX) {
      return "Account locked due to too many failed login attempts";
    }

    // correct login allowed any time before lock; also resets counter
    if (passwordAttempt === correctPassword) {
      wrongAttempts = 0;
      return "Login successful";
    }

    // wrong login: increment and report or lock
    wrongAttempts += 1;
    if (wrongAttempts >= MAX) {
      return "Account locked due to too many failed login attempts";
    }
    return `Attempt ${wrongAttempts}: Login failed`;
  };
}

module.exports = { createLoginTracker };
