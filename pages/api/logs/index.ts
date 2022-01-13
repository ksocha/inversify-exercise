import type { NextApiRequest, NextApiResponse } from 'next';

import { isEmpty } from 'lodash';
import { Low, TextFile } from 'lowdb';

const adapter = new TextFile('logs.txt');
const logs = new Low(adapter);

interface LogsPostApiRequest extends NextApiRequest {
  method: 'POST';
  body: {
    message: string;
  };
}

type LogsApiRequest = LogsPostApiRequest;

export default async function handler(
  req: LogsApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'POST': {
      if (isEmpty(req.body.message)) {
        res.status(400).end();
        return;
      }

      await logs.read();
      logs.data ||= '';
      logs.data += `\n${new Date().toISOString()}: ${req.body.message}`;
      await logs.write();

      res.status(201).end();
      return;
    }

    default: {
      res.status(500).end();
      return;
    }
  }
}
