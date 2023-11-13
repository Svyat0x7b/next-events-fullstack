import { useState } from 'react';
import CommentsList from './CommentsList';
import NewComment from './NewComment';
import classes from './Comments.module.css';

const Comments = (props) => {
    const { eventId } = props;
    const [showComments, setShowComments] = useState(false);

    const toggleCommentsHandler = () => {
        setShowComments((prevValue) => !prevValue);
    };
    const addCommentHandler = (commentData) => {};
    return (
        <section className={classes.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </button>
            {showComments && <NewComment onAddComment={addCommentHandler} />}
            {showComments && <CommentsList />}
        </section>
    );
};

export default Comments;
