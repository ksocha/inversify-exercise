/* eslint-disable @typescript-eslint/no-namespace */
import { interfaces } from 'inversify';

export interface Logger {
  log(message: string): void;
}

export namespace Logger {
  export const $: interfaces.ServiceIdentifier<Logger> = Symbol('Logger');
}
