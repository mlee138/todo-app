import { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import TodoList from './components/TodoList';
import styled from 'styled-components';

function App() {
  const [user, setUser] = useState({name:'', email:''});

  const Login = (details) => {
    setUser({email: details.email, password: details.password});
  }

  const Logout = () => {
    setUser({name:'', email: ''});
  }

  return (
    <Container>
      {
        user.email === '' ?
        <LoginForm Login={Login}></LoginForm> 
        :
        <TodoList Logout={Logout}></TodoList>
      }
      
    </Container>
  );
}

const Container = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  height: 100vh;
`;

export default App;
