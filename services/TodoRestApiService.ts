import { injectable } from 'inversify';

import {
  CreateValues,
  ToDoService,
  UpdateValues,
} from 'types/services/ToDoService';
import { ToDo } from 'types/ToDo';

@injectable()
export default class TodoRestApiService implements ToDoService {
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

    return response.json();
  }

  public async delete(toDoId: string): Promise<void> {
    await fetch(`/api/todos/${toDoId}`, {
      method: 'DELETE',
    });
  }
}
