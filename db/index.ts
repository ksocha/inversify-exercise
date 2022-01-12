import { Low, JSONFile } from 'lowdb';

import { ToDo } from 'types/ToDo';

type Data = {
  todos: ToDo[];
};

const adapter = new JSONFile<Data>('dbFile.json');
const db = new Low<Data>(adapter);

// add default data
db.read().then(() => {
  db.data ||= {
    todos: [],
  };

  db.write();
});

export default db;
