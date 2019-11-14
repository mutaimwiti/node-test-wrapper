import { Router } from 'express';
import { findUser, generateAuthToken, renderUnAuthorized } from '../utils';

const router = Router();

router.post('/login', (req, res) => {
  const data = req.body;

  if (findUser(data)) {
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
