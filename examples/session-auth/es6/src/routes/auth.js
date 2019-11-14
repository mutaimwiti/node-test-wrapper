import { Router } from 'express';
import { mockUsers } from '../__mock__';

const router = Router();

router.post('/login', (req, res) => {
  if (!req.session.user) {
    const data = {
      name: req.body.username,
      pass: req.body.password,
    };

    const found = mockUsers.find(
      (user) => user.username === data.name && user.password === data.pass,
    );

    if (found) {
      req.session.user = data;
      return res.status(201).json({ message: 'Logged in successfully' });
    }

    return res.status(401).json({ message: 'Unauthorized' });
  }

  return res.status(200).json({ message: 'You are already logged in' });
});

router.post('/logout', (req, res) => {
  req.session.destroy(() =>
    res.status(200).json({ message: 'Logged out successfully' }),
  );
});

export default router;
