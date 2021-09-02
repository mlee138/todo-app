import { useState } from 'react';
import './App.css';
import LoginForm from './components/LoginForm';
import TodoList from './components/TodoList';
import styled from 'styled-components';

function App() {
  const [user, setUser] = useState({user_username:'', user_email:''});

  const Login = (data) => setUser({...data});
  const Logout = () => setUser({user_username:'', user_email: ''});

  return (
    <Container>
      {
        user.user_email === '' ?
        <LoginForm Login={Login}></LoginForm> 
        :
        <TodoList user={user} Logout={Logout}></TodoList>
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
