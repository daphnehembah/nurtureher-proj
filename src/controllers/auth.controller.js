const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Temporary in-memory store — replace with DB later
const users = [];

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: 'All fields required' });

    const exists = users.find(u => u.email === email);
    if (exists)
      return res.status(409).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { id: Date.now().toString(), name, email, password: hashedPassword };
    users.push(user);

    const token = generateToken(user);
    res.status(201).json({ token, user: { id: user.id, name, email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = users.find(u => u.email === email);
    if (!user)
      return res.status(401).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = generateToken(user);
    res.status(200).json({ token, user: { id: user.id, name: user.name, email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.logout = (req, res) => {
  // JWT is stateless — logout is handled client-side by discarding the token
  res.status(200).json({ message: 'Logged out successfully' });
};