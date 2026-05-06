import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useEffect, useState } from 'react';
import { useAppDispatch } from './app/hooks';
import { setTodos } from './features/todos';
import { useAppSelector } from './app/hooks';
import { Todo } from './types/Todo';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';

export const App = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then((data: Todo[]) => {
        dispatch(setTodos(data.slice(0, 5)));
        setLoading(false);
      });
  }, [dispatch]);

  const selectedTodo = useAppSelector(state => state.currentTodo.selectedTodo);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">{loading ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>

      {selectedTodo && <TodoModal />}
    </>
  );
};
