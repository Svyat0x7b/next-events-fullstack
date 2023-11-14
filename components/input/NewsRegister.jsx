import { useState, useRef, useContext } from 'react';
import NotificationContext from '@/store/notificationContext';
import classes from './NewsRegister.module.css';

const NewsRegister = () => {
    const emailRef = useRef();
    const notificationCtx = useContext(NotificationContext);

    function registrationHandler(event) {
        event.preventDefault();

        const enteredEmail = emailRef.current.value;

        notificationCtx.showNotification({
            title: 'Signing Up...',
            message: 'Registering for a newsletter',
            status: 'pending',
        });

        fetch('/api/newsletter', {
            method: 'POST',
            body: JSON.stringify({ email: enteredEmail }),
            headers: {
                'Content-Type': 'json/application',
            },
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                res.json()
                    .then((data) => {
                        throw new Error(data.message || 'Something went wrong!');
                    })
                    .catch((err) =>
                        notificationCtx.showNotification({
                            title: 'Error',
                            message: err.message || 'Something went wrong!',
                            status: 'error',
                        }),
                    );
            })
            .then((data) =>
                notificationCtx.showNotification({
                    title: 'Success!',
                    message: 'Registered for a newsletter',
                    status: 'success',
                }),
            )
            .catch((err) =>
                notificationCtx.showNotification({
                    title: 'Error',
                    message: err.message || 'Something went wrong!',
                    status: 'error',
                }),
            );

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
        </section>
    );
};

export default NewsRegister;
