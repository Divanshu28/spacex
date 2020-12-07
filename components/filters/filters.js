import React from 'react'
import styles from './filters.module.css'

function filters({launchChange, landChange, yearChange, launchYear, successLaunch, successLand}) {

    const yearFilters = [];

    for(let i = 2006; i < 2021; i++) { 
        yearFilters.push(<button className={i === +launchYear ? styles.activeButton : styles.toggleButton} 
                    key={i} value={i} onClick = { (e) => yearChange(e)}>{i}</button>)
    }
    
    return (
        <div className={styles.filters}>
            <h4>Filters</h4>
            <p className={styles.heading}>Launch Year</p>
            <div className={styles.buttonContainer}>
                { yearFilters}
            </div>
            <p className={styles.heading}>Successful Launch</p>
            <div className={styles.buttonContainer}>
            <button value="true" className={successLaunch==="true" ? styles.activeButton : styles.toggleButton} onClick = {(e) => launchChange(e)}>True</button>
            <button value="false" className={successLaunch==="false" ? styles.activeButton : styles.toggleButton} onClick = {(e) => launchChange(e)}>False</button>
            </div>
            <p className={styles.heading}>Successful Landing</p>
            <div className={styles.buttonContainer}>
            <button value="true" className={successLand==="true" ? styles.activeButton : styles.toggleButton} onClick = {(e) => landChange(e)}>True</button>
            <button value="false" className={successLand==="false" ? styles.activeButton : styles.toggleButton} onClick = {(e) => landChange(e)}>False</button>
            </div>
        </div>
    )
}

export default filters
