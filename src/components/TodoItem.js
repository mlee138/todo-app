import React, {useState, useRef, useEffect} from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function TodoItem({ name, updateTask, deleteTask }){
    const [task, setTask] = useState(name);
    const [taskBackup, setTaskBackup] = useState('');
    const [editMode, setEditMode ] = useState(name.length!==0 ? false : true);
    const inputRef = useRef(null);
    let correctLength = task.length <= 25 && task.length >= 1 ;

    useEffect(()=>{
        inputRef.current.focus();
    },[])

    const editItem =()=> {
        setEditMode(true);
        setTaskBackup(task);
        inputRef.current.disabled = false;
        inputRef.current.focus();
    }

    const saveTask =(e)=> {
        e.preventDefault();
        updateTask(taskBackup, task);
        setEditMode(false);
    }

    return(
        <Item>
            <Input 
                onChange={(e)=>setTask(e.target.value)} 
                ref={inputRef} disabled={editMode ? false : true} 
                value={task}
                placeholder="Must be 1-25 characters"
                className={correctLength ? null : "error"}/>
            
            {
                editMode ?
                <Save 
                    type="submit" 
                    onClick={(e)=>saveTask(e)} 
                    value="Save"
                    disabled={correctLength ? false : true}/> :
                <div>
                    <Icon onClick={editItem} icon={faPencilAlt}/>
                    <Icon  onClick={()=>deleteTask(task)} icon={faTrashAlt} />
                </div>
            }
        </Item>
    );

}

const Item = styled.form`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #025e71;
    box-sizing: border-box;
    padding: 1rem;
    width: 100%;
    height: 75px;
    background-color: var(--font-color);

    & .error {
        outline-color: red;
    }
`;

const Input = styled.input`
    border: 1px solid grey;
    border-radius: 5px;
    background: none;
    color: black;
    font-size: 1rem;
    padding: 0.5rem 1rem;

    &:disabled {
        border: none;
    }
`;

const Save = styled.input`
    padding: 0.5rem 1rem;
    background-color: var(--btn-active);
    border-radius: 20px;
    border: none;
    box-shadow: 1px 1px 2px #909090;;
    cursor: pointer;

    &:active {
        box-shadow: 1px 1px 0px #5a5a5a;
    }
`;


const Icon = styled(FontAwesomeIcon)`
    margin: 0 0.25em; 
    padding: 8px;
    cursor: pointer;
`;

export default TodoItem;