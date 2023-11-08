import Button from '@/components/ui/Button';

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '200px' }}>
            <h1>404</h1>
            <h5 style={{ marginBottom: '50px' }}>Not Found</h5>
            <Button link="/events">Go to all events</Button>
        </div>
    );
};

export default NotFound;
