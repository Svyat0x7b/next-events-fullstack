import { useState, useEffect, useContext } from 'react';
import CommentsList from './CommentsList';
import NewComment from './NewComment';
import NotificationContext from '@/store/notificationContext';
import classes from './Comments.module.css';

const Comments = (props) => {
    const { eventId } = props;
    const [fetchedComments, setFetchedComments] = useState();
    const [showComments, setShowComments] = useState(false);

    const notificationCtx = useContext(NotificationContext);

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
        notificationCtx.showNotification({
            title: 'Posting...',
            message: 'Posting your comment!',
            status: 'pending',
        });
        fetch(`/api/events/${eventId}/comment`, {
            method: 'POST',
            body: JSON.stringify(commentData),
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
            .then((data) => {
                notificationCtx.showNotification({
                    title: 'Success',
                    message: 'Your comment posted!',
                    status: 'success',
                });
            })
            .catch((err) =>
                notificationCtx.showNotification({
                    title: 'Error',
                    message: err.message || 'Something went wrong!',
                    status: 'error',
                }),
            );
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
