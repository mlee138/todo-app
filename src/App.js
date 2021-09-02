import './App.css';
import Login from './components/Login';
import TodoList from './components/TodoList';
import styled from 'styled-components';

function App() {
  return (
    <Container>
      <TodoList></TodoList>
    </Container>
  );
}

const Container = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default App;
