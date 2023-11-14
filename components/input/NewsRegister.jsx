import { useState, useRef } from 'react';
import classes from './NewsRegister.module.css';

const NewsRegister = () => {
    const [isSignedUp, setIsSignedUp] = useState(false);
    const emailRef = useRef();
    function registrationHandler(event) {
        event.preventDefault();

        const enteredEmail = emailRef.current.value;

        fetch('/api/newsletter', {
            method: 'POST',
            body: JSON.stringify({ email: enteredEmail }),
            headers: {
                'Content-Type': 'json/application',
            },
        })
            .then((res) => {
                if (res.status == 422) {
                    //setError
                    console.log('422');
                }
                if (res.status == 201) {
                    setIsSignedUp(true);
                }
                return res.json();
            })
            .then((data) => console.log(data));

        emailRef.current.value = '';
    }
    return (
        <section className={classes.newsletter}>
            <h2>Sign up to stay updated!</h2>
            <form onSubmit={registrationHandler}>
                <div className={classes.control}>
                    <input
                        type="email"
                        id="email"
                        ref={emailRef}
                        placeholder="Your email"
                        aria-label="Your email"
                    />
                    <button>Register</button>
                </div>
            </form>
            {isSignedUp && <p>You are signed up successfully!</p>}
        </section>
    );
};

export default NewsRegister;
