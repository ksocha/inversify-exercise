import { render, screen } from '@testing-library/react';
import { Container, injectable } from 'inversify';
import { Provider as InversifyProvider } from 'inversify-react';

import HomePage from 'pages/index';
import { ToDo } from 'types/ToDo';
import { CreateValues, ToDoService, UpdateValues } from 'types/ToDoService';

describe('Home Page', () => {
  type MethodMocks = {
    onFetchAll?: () => void;
  };

  const renderPage = ({ onFetchAll }: MethodMocks = {}) => {
    @injectable()
    class TestToDoService implements ToDoService {
      fetchAll(): Promise<ToDo[]> {
        onFetchAll?.();

        return Promise.resolve([{ id: '1', title: 'test', isDone: false }]);
      }
      create(_values: CreateValues): Promise<ToDo> {
        throw new Error('Method not implemented.');
      }
      update(_toDoId: string, _values: UpdateValues): Promise<ToDo> {
        throw new Error('Method not implemented.');
      }
      delete(_toDoId: string): Promise<void> {
        throw new Error('Method not implemented.');
      }
    }

    const container = new Container();
    container.bind(ToDoService.$).to(TestToDoService);

    return render(
      <InversifyProvider container={container}>
        <HomePage />
      </InversifyProvider>,
    );
  };

  it('should call fetchAll service method', async () => {
    const onFetchAll = jest.fn();

    renderPage({ onFetchAll });

    expect(onFetchAll).toHaveBeenCalled();

    expect(await screen.findAllByRole('listitem')).toHaveLength(1);
  });
});
