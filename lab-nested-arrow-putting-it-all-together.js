cat > index.js <<'EOF'
const createLoginTracker = (correctPassword) => {
  let wrongAttempts = 0;
  const MAX = 3;

  return (passwordAttempt) => {
    if (wrongAttempts >= MAX) return false;
    if (passwordAttempt === correctPassword) {
      wrongAttempts = 0;
      return true;
    }
    wrongAttempts++;
    return false;
  };
};

module.exports = { createLoginTracker };
EOF
