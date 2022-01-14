import { injectable } from 'inversify';

import { Logger } from 'types/Logger';

@injectable()
export default class FileLogger implements Logger {
  public log(message: string): void {
    fetch('/api/logs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
  }
}
