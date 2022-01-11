import type { NextPage } from 'next';
import Head from 'next/head';

import { Container, Heading } from '@chakra-ui/react';

import ToDoList from 'components/ToDoList';

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

          <ToDoList items={items} />
        </Container>
      </main>
    </>
  );
};

export default Home;
