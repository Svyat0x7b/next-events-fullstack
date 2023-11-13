import Image from 'next/image';
import Button from '../ui/Button';
import AddressIcon from '../icons/AddressIcon';
import DateIcon from '../icons/DateIcon';
import ArrowRight from '../icons/ArrowRight';
import classes from './EventItem.module.css';
const EventItem = (props) => {
    const { id, title, img, location, date } = props;
    const readableDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    const formattedAddress = location.replace(',', '\n');
    return (
        <li className={classes.listItem} key={id}>
            <div className={classes.image}>
                <Image src={`/${img}`} alt={title} width={250} height={160} />
            </div>
            <div className={classes.information}>
                <div>
                    <h2>{title}</h2>
                </div>
                <div>
                    <time>
                        <DateIcon />
                        {readableDate}
                    </time>
                </div>
                <div>
                    <address>
                        <AddressIcon />
                        {formattedAddress}
                    </address>
                </div>
                <div className={classes.eventItemBtn}>
                    <Button link={`/events/${id}`}>
                        <ArrowRight />
                        Explore Event
                    </Button>
                </div>
            </div>
        </li>
    );
};

export default EventItem;
