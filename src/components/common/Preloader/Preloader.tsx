import React from 'react';
import preloader from "../../../assets/img/preloader.gif";
import styles from "../../Users/Users.module.css";

const Preloader = () => {
    return (
        <div>
            <img src={preloader} className={styles.preloader}/>
        </div>
    );
};

export default Preloader;