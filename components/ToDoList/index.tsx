import { UnorderedList } from '@chakra-ui/react';
import { map } from 'lodash';

import ToDoListItem from 'components/ToDoListItem';
import { ToDo } from 'types/toDo';

type Props = {
  items: ToDo[];
};

const ToDoList = ({ items }: Props) => {
  return (
    <UnorderedList
      boxShadow='base'
      p='6'
      rounded='md'
      bg='white'
      spacing='3'
      styleType='none'
    >
      {map(items, ({ id, title }) => (
        <ToDoListItem key={id}>{title}</ToDoListItem>
      ))}
    </UnorderedList>
  );
};

export default ToDoList;
