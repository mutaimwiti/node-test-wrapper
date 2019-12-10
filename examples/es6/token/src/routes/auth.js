import { Router } from 'express';
import { User } from '../models';
import { generateAuthToken, renderUnAuthorized } from '../utils';

const router = Router();

router.post('/login', async (req, res) => {
  const data = req.body;

  if (await User.findOne(data)) {
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
