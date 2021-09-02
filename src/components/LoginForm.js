import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faLock } from '@fortawesome/free-solid-svg-icons';
import BgSrc from '../images/rapptr_logo.png';


function LoginForm({Login}) {
    const [details, setDetails] = useState({email: '', password: ''});
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');
    const [loading, setLoading] = useState(false);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("submitting form");
        setLoading(true);
        
        let formdata = new FormData();
        formdata.append("email", details.email);
        formdata.append("password", details.password);
        
        let requestOptions = {
          method: 'POST',
          body: formdata
        };

        const url = "http://dev.rapptrlabs.com/Tests/scripts/user-login.php";
        
        try{
            const res = await fetch(url, requestOptions)
            if(res.status === 200){
                const data = await res.json()
                Login(data);
            } else {
                setLoginError('Incorrect Email/Password')
            }
            setLoading(false);
        } catch(error) {
            setLoginError('The server could not be reached. Please try again later');
            console.log('error', error);
            setLoading(false);
        }
    }

    return (
        <Form onSubmit={(e) => handleSubmit(e)}>
            <Title><span>Rapptr</span> Labs</Title>
            <FormGroup>
                <Label>Email</Label>
                <TextboxWrapper className={emailError ? "inputError" : null}>
                    <Icon icon={faUserAlt}/>
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
                    <Icon icon={faLock}/>
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
                className={loading ? "loading" : null}
                disabled={(
                            details.email && 
                            details.password &&
                            !emailError &&
                            !passwordError &&
                            !loading ?
                            false : true)
                        }
                type="submit" 
                value="Login" />
            <Error>{loginError}</Error>
        </Form>
    )
}

const loadingAnimation = keyframes `
    0% {background-position: 0% 50%}
    100% {background-position: 100% 50%}
`;

const Form = styled.form`
    padding: 1rem;
    background-image: url(${BgSrc});
    background-size: contain;
    background-position: 50% 50%;
    background-repeat: no-repeat;

    & > small{
        display: block;
        text-align:center;
    }

    & .inputError {
        border: 1px solid red;
    }

    & .loading {
        background: linear-gradient(90deg, #dde7e9, var(--btn-normal), #dde7e9, var(--btn-normal), #dde7e9, #3ae9b7);
        background-size: 500% 500%;
        animation: ${loadingAnimation} 1s linear infinite;
    }
`;

const Title = styled.h1`
    font-size: 5rem;
    text-align: center;
    & span {
        color: var(--blue-accent);
    }

    @media screen and (max-width: 500px) {
        font-size: 4rem;
    }
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5em;    
`;

const Label = styled.label`
    font-size: 1.5rem;
    margin-bottom: 0.25rem;
`;

const TextboxWrapper = styled.div`
    align-items: center;
    padding-left: 0.75em;
    display: flex;
    border: 1px solid black;
    border-radius: 20px;
    box-sizing: border-box;
    background-color: white;
    box-shadow: 3px 3px 4px black;
`;

const Icon = styled(FontAwesomeIcon)`
    color: var(--bg-color);
`;

const Textbox = styled.input`
    margin-left: 0.5em;
    border: none;
    border-radius: inherit;
    outline:none;
    flex-grow: 2;
    padding: 0.75em;
`;

const Error = styled.small`
    color: red;
    height: 10px;
`;

const Button = styled.input`
    width: 100%;
    padding: 0.5em;
    border: 2px solid transparent;
    margin-top: 1.5em;
    font-weight: bold;
    position: relative;
    background-color: var(--btn-normal);
    box-sizing: border-box;
    &:hover {
        border: 2px solid var(--btn-hover);
    }

    &:active {
        background-color: var(--btn-active);
    }

    &:disabled {
        opacity: 0.5;
    }
`;

export default LoginForm;