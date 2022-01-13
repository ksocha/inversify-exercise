import { DeleteIcon } from '@chakra-ui/icons';
import { Checkbox, IconButton, ListItem, Spacer } from '@chakra-ui/react';

import { ToDo } from 'types/ToDo';

type Props = {
  item: ToDo;
  onChange: (item: ToDo) => void;
  onRemove: (item: ToDo) => void;
};

const ToDoListItem = ({ item, onChange, onRemove }: Props) => {
  return (
    <ListItem display='flex'>
      <Checkbox
        onChange={(event) =>
          onChange({ ...item, isDone: event.target.checked })
        }
        defaultChecked={item.isDone}
      >
        {item.title}
      </Checkbox>

      <Spacer />

      <IconButton
        colorScheme='red'
        aria-label='Remove ToDo'
        icon={<DeleteIcon />}
        size='xs'
        onClick={() => onRemove(item)}
      />
    </ListItem>
  );
};

export default ToDoListItem;
