import { injectable } from 'inversify';

import { Logger } from 'types/Logger';

@injectable()
export default class ConsoleLogger implements Logger {
  public log(message: string): void {
    console.log(message);
  }
}
