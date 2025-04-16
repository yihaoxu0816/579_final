import styles from "./styles.module.css";

const StudySpace = ({spaceInfo}) => {

    return (
        <div className={styles.spaceBlock}>
            <h2>{spaceInfo.name}</h2>
            <p>Location: {spaceInfo.location}</p>
            <p>Hours: {spaceInfo.hours}</p>
            <img src={spaceInfo.url} className={styles.images}></img>
            <p>{spaceInfo.description}</p>
            <div>Quietness: {spaceInfo.quietness}</div>
            <div>Lighting: {spaceInfo.lighting}</div>
            <div>Campus: {spaceInfo.region}</div>
        </div>
    )
}

export default StudySpace;