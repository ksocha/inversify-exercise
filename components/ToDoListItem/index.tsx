import { FC } from 'react';

import { Checkbox, ListItem } from '@chakra-ui/react';

const ToDoListItem: FC = ({ children }) => {
  return (
    <ListItem>
      <Checkbox>{children}</Checkbox>
    </ListItem>
  );
};

export default ToDoListItem;
