import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faLock } from '@fortawesome/free-solid-svg-icons';


function Login() {
    const [details, setDetails] = useState({email: '', password: ''});
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");

    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(email.length === 0){
            setEmailError('');
        } else if(!emailRegex.test(email)){
            setEmailError("Not a valid email");
        } else if(email.length > 50){
            setEmailError("Email must be less than 50 characters");
        } else {
            setEmailError('');
        }
    }

    const validatePassword = (password) => {
        if (password.length === 0){
            setPasswordError('');
        } else if (password.length < 4){
            setPasswordError("Must be at least 4 characters");
        } else if (password.length > 16){
            setPasswordError("Must be less than 16 characters");
        } else {
            setPasswordError('');
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name === "email"){
            setDetails({...details, email: value});
            validateEmail(value);
            
        } else if(name === "password"){
            setDetails({...details, password: value});
            validatePassword(value);
        }
    }

    const handleSubmit = (e) => {
        console.log("submitting form");
        e.preventDefault();
    }

    return (
        <Form onSubmit={(e) => handleSubmit(e)}>
            <Title>Rapptr Labs</Title>
            <FormGroup>
                <Label>Email</Label>
                <TextboxWrapper className={emailError ? "inputError" : null}>
                    <FontAwesomeIcon icon={faUserAlt}/>
                    <Textbox 
                        name="email"
                        type="email"
                        placeholder="user@rapptrlabs.com"
                        onChange={(e)=>handleChange(e)}
                        value={details.email}
                        autoFocus/>
                </TextboxWrapper>
                <Error>{emailError}</Error>
            </FormGroup>
            <FormGroup>
                <Label>Password</Label>
                <TextboxWrapper className={passwordError ? "inputError" : null}>
                    <FontAwesomeIcon icon={faLock}/>
                    <Textbox 
                        name="password"
                        type="password" 
                        placeholder="Must be at least 4 characters"
                        onChange={(e)=>handleChange(e)}
                        value={details.password}/>
                </TextboxWrapper>
                <Error>{passwordError}</Error>
            </FormGroup>
            <Button
                disabled={(
                            details.email && 
                            details.password &&
                            !emailError &&
                            !passwordError ?
                            false : true)
                        }
                type="submit" 
                value="Login" />
        </Form>
    )
}

const Form = styled.form`
`;

const Title = styled.h1`
    font-size: 5rem;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5em;

    & .inputError {
        border: 2px solid red;
    }

    
`;

const Label = styled.label`
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
`;

const TextboxWrapper = styled.div`
    display: flex;
    border: 1px solid black;
    box-sizing: border-box;
    padding: 0.5em;
`;

const Textbox = styled.input`
    margin-left: 0.5em;
    border: none;
    outline:none;
    flex-grow: 2;
`;

const Error = styled.small`
    color: red;
    height: 10px;
`;

const Button = styled.input`
    width: 100%;
    padding: 0.5em;
    margin-top: 1.5em;
    font-weight: bold;
`;

export default Login;