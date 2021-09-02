import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';

function TodoList(){
    const [items, setItems] = useState([]);
    const [search, setSearch ] = useState('');

    useEffect(()=>{
        const storageList = localStorage.getItem("todo");
        if( storageList !== null){
            setItems(JSON.parse(storageList));
        }
    },[])
    
    const updateTask = (prevTask, newTask) => {
        console.log(`edit ${prevTask} => ${newTask}`);
        const index = items.indexOf(prevTask);
        let newArr = [...items]
        newArr[index] = newTask;
        console.log(newArr);
        localStorage.setItem("todo", JSON.stringify(newArr));
        setItems(newArr);
    }

    const deleteTask = (taskName) => {
        // let tasks = items;
        // tasks.splice(tasks.indexOf(taskName), 1);
        // console.log(tasks);
        console.log(`delete ${taskName}`)
        const newArr = items.filter(item => item !== taskName);
        localStorage.setItem("todo", JSON.stringify(newArr));
        setItems(newArr);
    }

    const addItem = () => {
        if(!items.includes('')){
            const newArr = ['', ...items];
            setItems(newArr);
        }
    }

    const generateKey = (pre) => {
        return `${ pre }_${ new Date().getTime() }`;
    }

    return (
        <Container>
            <LogoutBtn>Logout</LogoutBtn>
            <Title>My To-Do List</Title>
            <List>
                <ControlGroup>
                    <SearchWrapper>
                        <FontAwesomeIcon icon={faSearch}/>
                        <Search 
                            type="text" 
                            placeholder="search"
                            onChange={(e)=>setSearch(e.target.value)}
                            value={search}/>
                    </SearchWrapper>
                    <NewButton onClick={addItem}>New</NewButton>
                </ControlGroup>
                {
                    items.filter(item => item.toLowerCase().includes(search.toLowerCase())).map((task) => 
                    <TodoItem 
                        key={generateKey(task)} 
                        name={task} 
                        updateTask={updateTask} 
                        deleteTask={deleteTask}/>)
                }
            </List>
        </Container>
    )
}

const Container = styled.div`
    min-width: 400px;
`;

const LogoutBtn = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.5rem 1rem;
    font-weight: bold;
`;

const Title = styled.h1`
    font-size: 4rem;
    text-align: center;
`;

const ControlGroup = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1em;
    border-bottom: 2px solid black;
`;

const SearchWrapper = styled.div`
    display: flex;
    align-items: center;
    border: 2px solid black;
    border-radius: 20px;
    padding-left: 0.5rem;
`;

const Search = styled.input`
    padding: 0.5rem;
    flex-grow: 2;
    border: none;
    border-radius: inherit;
    outline:none;
`;

const NewButton = styled.button`
    padding: 0.5rem 1rem;
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    border: 2px solid black;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 0;
`;

export default TodoList;