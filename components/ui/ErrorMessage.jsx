const ErrorMessage = (props) => {
    return (
        <p
            style={{
                textAlign: 'center',
                margin: '0 30px',
                marginTop: '200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px',
                fontWeight: '700',
                backgroundColor: '#bb70f8',
                padding: '20px',
            }}>
            {props.children}
        </p>
    );
};

export default ErrorMessage;
