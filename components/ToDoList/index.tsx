import { UnorderedList } from '@chakra-ui/react';
import { map } from 'lodash';

import ToDoListItem from 'components/ToDoListItem';
import { ToDo } from 'types/toDo';

export type Props = {
  items: ToDo[];
  onItemChange: (item: ToDo) => void;
  onItemRemove: (item: ToDo) => void;
};

const ToDoList = ({ items, onItemChange, onItemRemove }: Props) => {
  return (
    <UnorderedList spacing='3' styleType='none'>
      {map(items, (item) => (
        <ToDoListItem
          key={item.id}
          onChange={() => onItemChange(item)}
          onRemove={() => onItemRemove(item)}
        >
          {item.title}
        </ToDoListItem>
      ))}
    </UnorderedList>
  );
};

export default ToDoList;
