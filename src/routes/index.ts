import { Router, Request, Response } from 'express';
import { capitalize } from 'utils';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.status(204);
});

router.post('/capitalize', (req: Request, res: Response) => {
  const { str } = req.body;
  res.json({ result: capitalize(str) });
});

export default router;
