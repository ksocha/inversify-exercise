import { useCallback, useEffect, useState } from 'react';

import type { NextPage } from 'next';
import Head from 'next/head';

import { Box, Container, Divider, Heading, Text } from '@chakra-ui/react';
import { isEmpty } from 'lodash';

import ToDoForm, { Props as FormProps } from 'components/ToDoForm';
import ToDoList, { Props as ListProps } from 'components/ToDoList';
import { ToDo } from 'types/ToDo';

let data = [
  {
    id: '1',
    title: 'Groceries',
    isDone: false,
  },
  {
    id: '2',
    title: 'Clean the house',
    isDone: true,
  },
  {
    id: '3',
    title: 'Call mom',
    isDone: false,
  },
];

function fetchAll(): Promise<ToDo[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...data]);
    });
  });
}

const Home: NextPage = () => {
  const [items, setItems] = useState<ToDo[]>([]);

  const fetchData = useCallback(() => {
    fetchAll().then((data) => setItems(data));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const createToDo = useCallback<FormProps['onSubmit']>(
    async (newItemValues) => {
      // TODO: add BE call
      console.log('todo created', newItemValues);
    },
    [],
  );

  const changeToDoStatus = useCallback<ListProps['onItemChange']>(
    async (changedItem) => {
      // TODO: add BE call
      console.log('todo changed', changedItem);

      data = data.map((item) =>
        item.id === changedItem.id ? changedItem : item,
      );
    },
    [],
  );

  const removeToDo = useCallback<ListProps['onItemRemove']>(
    async (itemToRemove) => {
      // TODO: add BE call
      console.log('todo removed', itemToRemove);

      data = data.filter((item) => item.id !== itemToRemove.id);
      fetchData();
    },
    [fetchData],
  );

  return (
    <>
      <Head>
        <title>ToDo app</title>
        <meta name='description' content='The best ToDo app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Container>
          <Heading mt='8' mb='12' textAlign='center'>
            ToDo list
          </Heading>

          <Box boxShadow='base' p='6' rounded='md' bg='white'>
            {isEmpty(items) ? (
              <Text textAlign='center' fontSize='sm' color='grey'>
                No items added
              </Text>
            ) : (
              <ToDoList
                items={items}
                onItemChange={changeToDoStatus}
                onItemRemove={removeToDo}
              />
            )}

            <Divider my='4' />

            <ToDoForm onSubmit={createToDo} />
          </Box>
        </Container>
      </main>
    </>
  );
};

export default Home;
