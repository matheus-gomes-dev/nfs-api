const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key'; // Use environment variable in production

const login = (req, res) => {
  console.log(req.body);
  const { user, password } = req.body;
  if (!user || !password) {
    return res.status(400).json({ error: 'User and password are required' });
  }
  // Simple authentication (replace with real user database)
  if (user === 'admin' && password === 'password') {
    const token = jwt.sign({ user }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

module.exports = {
  login
};