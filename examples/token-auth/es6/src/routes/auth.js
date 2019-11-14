import { Router } from 'express';
import { mockUsers } from '../__mock__';
import { generateAuthToken, renderUnAuthorized } from '../utils';

const router = Router();

router.post('/login', (req, res) => {
  const data = {
    name: req.body.username,
    pass: req.body.password,
  };

  const found = mockUsers.find(
    (user) => user.username === data.name && user.password === data.pass,
  );

  if (found) {
    try {
      const token = generateAuthToken(data);

      return res.status(201).json({ message: 'Logged in successfully', token });
    } catch (e) {
      return renderUnAuthorized(res);
    }
  }

  return renderUnAuthorized(res);
});

export default router;
