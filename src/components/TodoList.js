import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';

function TodoList({ user, Logout }){
    const [items, setItems] = useState([]);
    const [search, setSearch ] = useState('');

    useEffect(()=>{
        const storageList = localStorage.getItem("todo");
        if( storageList !== null){
            setItems(JSON.parse(storageList));
        }
    },[])
    
    const updateTask = (prevTask, newTask) => {
        //console.log(`edit ${prevTask} => ${newTask}`);
        const index = items.indexOf(prevTask);
        let newArr = [...items]
        newArr[index] = newTask;
        //console.log(newArr);
        localStorage.setItem("todo", JSON.stringify(newArr));
        setItems(newArr);
    }

    const deleteTask = (taskName) => {
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
            <LogoutBtn onClick={Logout}>Logout</LogoutBtn>

            <Title><span>{`${user.user_username}'s`}</span> To-Do List</Title>
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
    color: var(--bg-color);
    margin-bottom: 4rem;

    & button {
        border: 2px solid transparent;
        box-sizing: border-box;
        font-weight: bold;
        background-color: var(--btn-normal);
       
        &:hover {
            border: 2px solid var(--btn-hover);
        }

        &:active {
            background-color: var(--btn-active);
        }
    }

    @media screen and (max-width: 500px) {
        margin-top: 50px;
        margin-bottom: 1rem;
    }
`;

const LogoutBtn = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    padding: 0.5rem 1rem;


`;

const Title = styled.h1`
    font-size: 4rem;
    text-align: center;
    color: var(--font-color);
    & span {
        color: var(--blue-accent);
    }

    @media screen and (max-width: 500px) {
        font-size: 2rem;
    }
`;

const ControlGroup = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 1em;
`;

const SearchWrapper = styled.div`
    display: flex;
    align-items: center;
    border: 2px solid black;
    border-radius: 20px;
    padding-left: 0.5rem;
    background-color: white;
    opacity: 0.85;
`;

const Search = styled.input`
    padding: 0.5rem;
    margin-left: 0.5rem;
    flex-grow: 2;
    border: none;
    border-radius: inherit;
    outline:none;
    background-color: transparent;

`;

const NewButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: var(--btn-normal);
    border: 2px solid transparent;
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 1rem;
    
    background: linear-gradient(315deg, rgba(9,9,121,1) 26%, rgba(0,212,255,1) 92%);

`;

export default TodoList;