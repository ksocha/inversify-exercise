import { FC } from 'react';

import { DeleteIcon } from '@chakra-ui/icons';
import { Checkbox, IconButton, ListItem, Spacer } from '@chakra-ui/react';

type Props = {
  onChange: () => void;
  onRemove: () => void;
};

const ToDoListItem: FC<Props> = ({ children, onChange, onRemove }) => {
  return (
    <ListItem display='flex'>
      <Checkbox onChange={onChange}>{children}</Checkbox>
      <Spacer />
      <IconButton
        colorScheme='red'
        aria-label='Remove ToDo'
        icon={<DeleteIcon />}
        size='xs'
        onClick={onRemove}
      />
    </ListItem>
  );
};

export default ToDoListItem;
