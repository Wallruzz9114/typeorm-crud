import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../entities/user';

export const getUsers = async (_: Request, res: Response): Promise<Response> => {
  const results = await getRepository(User).find();
  return res.json(results);
};
