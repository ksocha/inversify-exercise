import { UnorderedList } from '@chakra-ui/react';
import { map } from 'lodash';

import ToDoListItem from 'components/ToDoListItem';
import { ToDo } from 'types/ToDo';

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
          item={item}
          onChange={onItemChange}
          onRemove={onItemRemove}
        />
      ))}
    </UnorderedList>
  );
};

export default ToDoList;
