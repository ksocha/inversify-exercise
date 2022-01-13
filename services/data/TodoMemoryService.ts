import { injectable } from 'inversify';
import { filter, find } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { ToDo } from 'types/ToDo';
import { CreateValues, ToDoService, UpdateValues } from 'types/ToDoService';

let todos: ToDo[] = [];

@injectable()
export default class TodoRestApiService implements ToDoService {
  public async fetchAll(): Promise<ToDo[]> {
    return [...todos];
  }

  public async create(values: CreateValues): Promise<ToDo> {
    const newToDo: ToDo = {
      id: uuidv4(),
      title: values.title,
      isDone: false,
    };

    todos.push(newToDo);

    return newToDo;
  }

  public async update(toDoId: string, values: UpdateValues): Promise<ToDo> {
    const todo = find(todos, (todo) => todo.id !== toDoId);

    if (todo) {
      todo.isDone = values.isDone;
    } else {
      throw new Error('ToDo not found.');
    }

    return todo;
  }

  public async delete(toDoId: string): Promise<void> {
    todos = filter(todos, (todo) => todo.id !== toDoId);
  }
}
