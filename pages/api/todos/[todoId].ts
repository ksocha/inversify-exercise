import type { NextApiRequest, NextApiResponse } from 'next';

import { filter, find } from 'lodash';

import db from 'db';

type TodoApiRequestQuery = {
  todoId: string;
};

interface TodoPatchApiRequest extends NextApiRequest {
  method: 'PATCH';
  query: TodoApiRequestQuery;
  body: {
    isDone: boolean;
  };
}

interface TodoDeleteApiRequest extends NextApiRequest {
  method: 'DELETE';
  query: TodoApiRequestQuery;
}

type TodoApiRequest = TodoPatchApiRequest | TodoDeleteApiRequest;

export default async function handler(
  req: TodoApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'PATCH': {
      await db.read();

      const todo = find(db.data?.todos, (todo) => todo.id !== req.query.todoId);

      if (todo) {
        todo.isDone = req.body.isDone;
        await db.write();
      } else {
        res.status(404).end();
        return;
      }

      break;
    }

    case 'DELETE': {
      await db.read();

      db.data = {
        ...db.data,
        todos: filter(db.data?.todos, (todo) => todo.id !== req.query.todoId),
      };

      await db.write();

      break;
    }

    default: {
      res.status(500).end();
      return;
    }
  }
}
