import React, {useState, useRef} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function normalDisplay() {
    
}

function TodoItem({ name, updateTask, deleteTask , }){
    const [task, setTask] = useState(name);
    const [editMode, setEditMode ] = useState(name ? false : true);
    const inputRef = useRef(null);

    function editItem() {
        setEditMode(1);
        inputRef.current.focus();
        
    }

    return(
        <Item>
            
            <Input ref={inputRef} disabled={editMode ? false : true} value={task}/>
            <ButtonGroup>
                <Icon onClick={editItem} icon={faPencilAlt}/>
                <Icon  onClick={()=>deleteTask(task)} icon={faTrashAlt} />
            </ButtonGroup>

        </Item>
    );

}

const Item = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid black;
    box-sizing: border-box;
    padding: 0.5rem;
    width: 100%;
`;

const Input = styled.input`
    border: none;
    background: none;
    color: black;
`;


const ButtonGroup = styled.div`

`;

const Icon = styled(FontAwesomeIcon)`
    margin: 0.25em; 
    padding: 8px;
    cursor: pointer;
`;

export default TodoItem;