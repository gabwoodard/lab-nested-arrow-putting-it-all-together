function createLoginTracker(correctPassword) {
  let wrongAttempts = 0;
  const MAX = 3;

  return function (passwordAttempt) {
    if (wrongAttempts >= MAX) {
      return "Account locked. Too many failed attempts.";
    }

    if (passwordAttempt === correctPassword) {
      wrongAttempts = 0; // reset counter on success
      return "Login successful!";
    }

    wrongAttempts++;
    if (wrongAttempts >= MAX) {
      return "Account locked. Too many failed attempts.";
    }

    return "Wrong password.";
  };
}

module.exports = { createLoginTracker };
