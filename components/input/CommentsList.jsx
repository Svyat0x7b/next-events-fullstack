import classes from './CommentsList.module.css';

const CommentsList = ({ comments }) => {
    if (!comments || comments.length === 0) {
        return <p>There is no comments!</p>;
    }

    return (
        <ul className={classes.comments}>
            {comments.map((item) => (
                <li key={item._id}>
                    <p>{item.comment}</p>
                    <div>
                        By <address>{item.username}</address>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default CommentsList;
