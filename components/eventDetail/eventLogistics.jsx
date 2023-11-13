import Image from 'next/image';
import AddressIcon from '../icons/AddressIcon';
import DateIcon from '../icons/DateIcon';
import LogisticsItem from './logisticsItem';
import classes from './eventLogistics.module.css';

function EventLogistics(props) {
    const { date, address, image, imageAlt } = props;
    const readableDate = new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
    const readableAddress = address?.replace(', ', '\n');
    return (
        <section className={classes.logistics}>
            <div className={classes.image}>
                <Image src={`/${image}`} alt={imageAlt} width={160} height={160} />
            </div>
            <ul className={classes.list}>
                <LogisticsItem icon={DateIcon}>
                    <time>{readableDate}</time>
                </LogisticsItem>
                <LogisticsItem icon={AddressIcon}>
                    <address>{readableAddress || address}</address>
                </LogisticsItem>
            </ul>
        </section>
    );
}

export default EventLogistics;
