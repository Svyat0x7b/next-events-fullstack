import { useRef, useState } from 'react';
import classes from './NewComment.module.css';

const NewComment = (props) => {
    const [isInvalid, setIsInvalid] = useState(false);

    const emailRef = useRef();
    const nameRef = useRef();
    const commentRef = useRef();

    const sendCommandHandler = (e) => {
        e.preventDefault();

        const enteredEmail = emailRef.current.value;
        const enteredName = nameRef.current.value;
        const enteredComment = commentRef.current.value;

        if (
            !enteredEmail ||
            enteredEmail.trim() === '' ||
            !enteredEmail.includes('@') ||
            !enteredName ||
            !enteredName.trim() === '' ||
            !enteredComment ||
            !enteredComment.trim() === ''
        ) {
            setIsInvalid(true);
            return;
        }

        props.onAddComment({
            email: enteredEmail,
            name: enteredName,
            comment: enteredComment,
        });
    };

    return (
        <form className={classes.form}>
            <div className={classes.row}>
                <div className={classes.control}>
                    <label htmlFor="email">Your email</label>
                    <input type="email" id="email" ref={emailRef} />
                </div>
                <div className={classes.control}>
                    <label htmlFor="name">Your name</label>
                    <input type="text" id="name" ref={nameRef} />
                </div>
            </div>
            <div className={classes.control}>
                <label htmlFor="comment">Your comment</label>
                <textarea id="comment" rows="5" ref={commentRef}></textarea>
            </div>
            {isInvalid && <p>Please enter a valid email address and comment!</p>}
            <button>Submit</button>
        </form>
    );
};

export default NewComment;
