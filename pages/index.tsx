import { useCallback, useEffect, useState } from 'react';

import type { NextPage } from 'next';
import Head from 'next/head';

import { Box, Container, Divider, Heading, Text } from '@chakra-ui/react';
import { useInjection } from 'inversify-react';
import { isEmpty } from 'lodash';

import ToDoForm, { Props as FormProps } from 'components/ToDoForm';
import ToDoList, { Props as ListProps } from 'components/ToDoList';
import { ToDo } from 'types/ToDo';
import { ToDoService } from 'types/ToDoService';

const Home: NextPage = () => {
  const service = useInjection(ToDoService.$);

  const [items, setItems] = useState<ToDo[]>([]);

  const fetchData = useCallback(() => {
    service.fetchAll().then((data) => setItems(data));
  }, [service]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const createToDo = useCallback<FormProps['onSubmit']>(
    (newItemValues) => service.create(newItemValues).then(() => fetchData()),
    [fetchData, service],
  );

  const changeToDoStatus = useCallback<ListProps['onItemChange']>(
    (changedItem) =>
      service.update(changedItem.id, changedItem).then(() => fetchData()),
    [fetchData, service],
  );

  const removeToDo = useCallback<ListProps['onItemRemove']>(
    (itemToRemove) => service.delete(itemToRemove.id).then(() => fetchData()),
    [fetchData, service],
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
