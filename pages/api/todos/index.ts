import type { NextApiRequest, NextApiResponse } from 'next';

import { isEmpty } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import db from 'db';
import { ToDo } from 'types/ToDo';

interface TodosGetApiRequest extends NextApiRequest {
  method: 'GET';
}

interface TodosPostApiRequest extends NextApiRequest {
  method: 'POST';
  body: {
    title: string;
  };
}

type TodosApiRequest = TodosGetApiRequest | TodosPostApiRequest;

export default async function handler(
  req: TodosApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'GET': {
      await db.read();

      res.status(200).json(db.data?.todos || []);
      return;
    }

    case 'POST': {
      if (isEmpty(req.body.title)) {
        res.status(400).end();
        return;
      }

      const newToDo: ToDo = {
        id: uuidv4(),
        title: req.body.title,
        isDone: false,
      };

      await db.read();

      db.data?.todos.push(newToDo);

      await db.write();
      res.status(201).json(newToDo);
      return;
    }

    default: {
      res.status(500).end();
      return;
    }
  }
}
