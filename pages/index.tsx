import { useCallback } from 'react';

import type { NextPage } from 'next';
import Head from 'next/head';

import { Box, Container, Divider, Heading } from '@chakra-ui/react';

import ToDoForm, { Props as FormProps } from 'components/ToDoForm';
import ToDoList, { Props as ListProps } from 'components/ToDoList';

const items = [
  {
    id: '1',
    title: 'Groceries',
  },
  {
    id: '2',
    title: 'Clean the house',
  },
  {
    id: '3',
    title: 'Call mom',
  },
];

const Home: NextPage = () => {
  const createToDo = useCallback<FormProps['onSubmit']>(async (values) => {
    // TODO: add BE call
    console.log('todo created', values);
  }, []);

  const changeToDoStatus = useCallback<ListProps['onItemChange']>(
    async (item) => {
      // TODO: add BE call
      console.log('todo changed', item);
    },
    [],
  );

  const removeToDo = useCallback<ListProps['onItemRemove']>(async (item) => {
    // TODO: add BE call
    console.log('todo removed', item);
  }, []);

  return (
    <>
      <Head>
        <title>ToDo app</title>
        <meta name='description' content='Best ToDo app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Container>
          <Heading mt='8' mb='12' textAlign='center'>
            ToDo list
          </Heading>

          <Box boxShadow='base' p='6' rounded='md' bg='white'>
            <ToDoList
              items={items}
              onItemChange={changeToDoStatus}
              onItemRemove={removeToDo}
            />

            <Divider my='4' />

            <ToDoForm onSubmit={createToDo} />
          </Box>
        </Container>
      </main>
    </>
  );
};

export default Home;
