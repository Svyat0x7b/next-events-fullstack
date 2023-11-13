import classes from './CommentsList.module.css';

const CommentsList = () => {
    return (
        <ul className={classes.comments}>
            {/* Render list of comments - fetched from API */}
            <li>
                <p>The event is amazing!</p>
                <div>
                    By <address>Nick</address>
                </div>
            </li>
            <li>
                <p>That`s pretty good!</p>
                <div>
                    By <address>Max</address>
                </div>
            </li>
        </ul>
    );
};

export default CommentsList;
