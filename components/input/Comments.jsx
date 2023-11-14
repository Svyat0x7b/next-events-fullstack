import { useState, useEffect } from 'react';
import CommentsList from './CommentsList';
import NewComment from './NewComment';
import classes from './Comments.module.css';

const Comments = (props) => {
    const { eventId } = props;
    const [fetchedComments, setFetchedComments] = useState([]);
    const [showComments, setShowComments] = useState(false);

    useEffect(() => {
        if (showComments) {
            fetch(`/api/events/${eventId}/comment`)
                .then((res) => res.json())
                .then((data) => setFetchedComments(data.comments));
        }
    }, [showComments]);

    const toggleCommentsHandler = () => {
        setShowComments((prevValue) => !prevValue);
    };
    const addCommentHandler = (commentData) => {
        fetch(`/api/events/${eventId}/comment`, {
            method: 'POST',
            body: JSON.stringify(commentData),
            headers: {
                'Content-Type': 'json/application',
            },
        })
            .then((res) => res.json())
            .then((data) => console.log(data));
    };
    return (
        <section className={classes.comments}>
            <button onClick={toggleCommentsHandler}>
                {showComments ? 'Hide' : 'Show'} Comments
            </button>
            {showComments && <NewComment onAddComment={addCommentHandler} />}
            {showComments && <CommentsList comments={fetchedComments} />}
        </section>
    );
};

export default Comments;
