/* eslint-disable @typescript-eslint/no-namespace */
import { interfaces } from 'inversify';

import { ToDo } from 'types/ToDo';

export interface CreateValues {
  title: string;
}

export interface UpdateValues {
  isDone: boolean;
}

export interface ToDoService {
  fetchAll(): Promise<ToDo[]>;
  create(values: CreateValues): Promise<ToDo>;
  update(toDoId: string, values: UpdateValues): Promise<ToDo>;
  delete(toDoId: string): Promise<void>;
}

export namespace ToDoService {
  export const $: interfaces.ServiceIdentifier<ToDoService> =
    Symbol('ToDoService');
}
