const makeLogin = (checkPass, maxAttempts = 3, lockMinutes = 5) => {
 
  let tries = 0;
  let lockedUntil = 0;

  const now = () => Date.now();
  const isLocked = () => now() < lockedUntil;
  const lock = () => { lockedUntil = now() + lockMinutes * 60 * 1000; };
  const reset = () => { tries = 0; lockedUntil = 0; };

  const login = (user, pass) => {
    if (isLocked()) {
      return { ok: false, reason: "locked", unlockAt: new Date(lockedUntil) };
    }

    const ok = checkPass(user, pass);
    if (ok) {
      reset();
      return { ok: true, message: "login ok" };
    }

    tries += 1;
    if (tries >= maxAttempts) {
      lock();
      return { ok: false, reason: "locked", unlockAt: new Date(lockedUntil) };
    }
    return { ok: false, reason: "bad_credentials", remaining: maxAttempts - tries };
  };

  return {
    login,
    isLocked,              
    remaining: () => Math.max(0, maxAttempts - tries),
    unlockAt: () => (lockedUntil ? new Date(lockedUntil) : null),
    reset                    
  };
};
const users = { gabriella: "s3cret" };
const checkPass = (u, p) => users[u] === p;

const auth = makeLogin(checkPass, 3, 1);
console.log(auth.login("gabriella", "wrong"));        // bad_credentials
console.log(auth.login("gabriella", "still-wrong"));  // bad_credentials
console.log(auth.login("gabriella", "last-wrong"));   // locked

// try again after lock expires (your lock is 1 minute)
setTimeout(() => {
  console.log(auth.login("gabriella", "s3cret"));     // should be "login ok" after unlock
}, 61_000);
setTimeout(() => {
  console.log("Trying after unlock…");
  console.log(auth.login("gabriella", "s3cret")); // should be { ok: true, message: "login ok" }
}, 61_000);