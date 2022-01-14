import { inject, injectable } from 'inversify';

import { Logger } from 'types/Logger';
import { ToDo } from 'types/ToDo';
import { CreateValues, ToDoService, UpdateValues } from 'types/ToDoService';

@injectable()
export default class TodoRestApiService implements ToDoService {
  private logger: Logger;

  public constructor(@inject(Logger.$) logger: Logger) {
    this.logger = logger;
  }

  public async fetchAll(): Promise<ToDo[]> {
    const response = await fetch('/api/todos', {
      method: 'GET',
    });

    return response.json();
  }

  public async create(values: CreateValues): Promise<ToDo> {
    const response = await fetch('/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    this.logger.log('created item');

    return response.json();
  }

  public async update(toDoId: string, values: UpdateValues): Promise<ToDo> {
    const response = await fetch(`/api/todos/${toDoId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    this.logger.log('updated item');

    return response.json();
  }

  public async delete(toDoId: string): Promise<void> {
    await fetch(`/api/todos/${toDoId}`, {
      method: 'DELETE',
    });

    this.logger.log('deleted item');
  }
}
