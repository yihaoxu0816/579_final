import styles from "./styles.module.css";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { GeoAltFill } from 'react-bootstrap-icons';
import { ClockFill } from 'react-bootstrap-icons';
import { Heart } from 'react-bootstrap-icons';
import { HeartFill } from 'react-bootstrap-icons';
import Button from 'react-bootstrap/Button';

const StudySpace = ({spaceInfo, userFavorite, toggleFavorite}) => {

    const isFavorite = userFavorite.includes(spaceInfo.name);

    return (
        <Card className={styles.spaceBlock}>
            <Card.Img variant="top" src={spaceInfo.url}></Card.Img>
            <Card.Body>
                <Card.Title>{spaceInfo.name}</Card.Title>
                <Card.Text>
                    {spaceInfo.description}
                </Card.Text>
                <Card.Text>Quietness: {spaceInfo.quietness}</Card.Text>
                <Card.Text>Lighting: {spaceInfo.lighting}</Card.Text>
                <Card.Text>Campus: {spaceInfo.region}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item><GeoAltFill></GeoAltFill> {spaceInfo.location}</ListGroup.Item>
                <ListGroup.Item><ClockFill></ClockFill> {spaceInfo.hours}</ListGroup.Item>
            </ListGroup>
            <Button 
                className="favoriteButton"
                variant={isFavorite ? "danger" : "primary"} 
                onClick={() => toggleFavorite(spaceInfo.name)}>
                {isFavorite ? <HeartFill /> : <Heart />}
            </Button>
        </Card>
    )
}

export default StudySpace;