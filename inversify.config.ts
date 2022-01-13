import { Container } from 'inversify';

import TodoMemoryService from 'services/data/TodoMemoryService';
import ConsoleLogger from 'services/loggers/ConsoleLogger';
import { Logger } from 'types/Logger';
import { ToDoService } from 'types/ToDoService';

const container = new Container();

container.bind(Logger.$).to(ConsoleLogger);
container.bind(ToDoService.$).to(TodoMemoryService);

export default container;
