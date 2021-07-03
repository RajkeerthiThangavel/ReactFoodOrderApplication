import React, {
    useState,
    useEffect,
    useReducer,
    useContext,
    useRef,
} from 'react';
import AuthContext from '../../store/auth-context';
import "./LoginForm.css";


const emailReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return { value: action.val, isValid: action.val.includes('@') };
    }
    if (action.type === 'INPUT_BLUR') {
        return { value: state.value, isValid: state.value.includes('@') };
    }
    return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
    if (action.type === 'USER_INPUT') {
        return { value: action.val, isValid: action.val.trim().length > 6 };
    }
    if (action.type === 'INPUT_BLUR') {
        return { value: state.value, isValid: state.value.trim().length > 6 };
    }
    return { value: '', isValid: false };
};

const LoginForm = (props) => {
    const [formIsValid, setFormIsValid] = useState(false);

    const [emailState, dispatchEmail] = useReducer(emailReducer, {
        value: '',
        isValid: null,
    });
    const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
        value: '',
        isValid: null,
    });

    const authCtx = useContext(AuthContext);
    const emailInputRef = useRef();
    const passwordInputRef = useRef();

    const { isValid: emailIsValid } = emailState;
    const { isValid: passwordIsValid } = passwordState;

    useEffect(() => {
        const identifier = setTimeout(() => {
            setFormIsValid(emailIsValid && passwordIsValid);
        }, 500);

        return () => {
            console.log('CLEANUP');
            clearTimeout(identifier);
        };
    }, [emailIsValid, passwordIsValid]);

    //EmailChange Handler
    const emailChangeHandler = (event) => {
        dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
    };

    //Password Handler
    const passwordChangeHandler = (event) => {
        dispatchPassword({ type: 'USER_INPUT', val: event.target.value });
    };

    const validateEmailHandler = () => {
        dispatchEmail({ type: 'INPUT_BLUR' });
    };

    const validatePasswordHandler = () => {
        dispatchPassword({ type: 'INPUT_BLUR' });
    };

    //Onsubmit handler
    const submitHandler = (event) => {
        event.preventDefault();
        if (formIsValid) {
            authCtx.onLogin(emailState.value, passwordState.value, "mainLogin");
        } else if (!emailIsValid) {
            emailInputRef.current.focus();
        } else {
            passwordInputRef.current.focus();
        }
    };
    
    //demo Login handler
    const demoLoginHandler = (event) => {
        event.preventDefault();
        authCtx.onLogin(emailState.value, passwordState.value, "demoLogin");
    };

    return (
        <>
            <section className="LoginSection">
                <form className="LoginFormbox" onSubmit={submitHandler}>
                    <div className="LoginTextBox">UserName : <input type="text" onChange={emailChangeHandler} ref={emailInputRef} onBlur={validateEmailHandler} name="username" />
                        {!emailIsValid && emailIsValid != null ? <div className="emailError">Please Enter Valid Email!</div> : ""}</div>
                    <div className="LoginTextBoxPass">Password : <input type="password" ref={passwordInputRef} onChange={passwordChangeHandler} onBlur={validatePasswordHandler} name="password" />
                        {!passwordIsValid && passwordIsValid != null ? <div className="emailError">Password length should be more than 6 characters!</div> : ""}</div>
                    <div className="SigninBox">
                        <button className="signinBtn" type="submit">Login</button>
                        <button className="demoSigninBtn" onClick={demoLoginHandler} type="submit">Demo Login</button>
                        {authCtx.errorMsg != null && <div className="mainLoginError">{authCtx.errorMsg}</div>}
                        <div className="signUpbox">
                            <div>Don't have an account?</div>
                            <button className="signupBtn" type="button">Signup</button>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
};

export default LoginForm;

