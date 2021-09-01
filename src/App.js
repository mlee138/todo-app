import './App.css';
import Login from './components/Login';
import styled from 'styled-components';

function App() {
  return (
    <Container>
      <Login></Login>
    </Container>
  );
}

const Container = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default App;
