import React from 'react'
import styles from './header.module.css'

function header() {
    return (
        <div className={styles.headerContainer}>
            <h2>SpaceX Launch Programs</h2>
        </div>
    )
}

export default header
