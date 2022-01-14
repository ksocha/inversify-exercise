import { inject, injectable } from 'inversify';
import { filter, find } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { Logger } from 'types/Logger';
import { ToDo } from 'types/ToDo';
import { CreateValues, ToDoService, UpdateValues } from 'types/ToDoService';

let todos: ToDo[] = [];

@injectable()
export default class TodoMemoryService implements ToDoService {
  private logger: Logger;

  public constructor(@inject(Logger.$) logger: Logger) {
    this.logger = logger;
  }

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
    this.logger.log('created');
    return newToDo;
  }

  public async update(toDoId: string, values: UpdateValues): Promise<ToDo> {
    const todo = find(todos, (todo) => todo.id === toDoId);

    if (todo) {
      todo.isDone = values.isDone;
    } else {
      throw new Error('ToDo not found.');
    }
    this.logger.log('updated');

    return todo;
  }

  public async delete(toDoId: string): Promise<void> {
    this.logger.log('deleted');

    todos = filter(todos, (todo) => todo.id !== toDoId);
  }
}
