import React from 'react'
import Image from 'next/image'
import styles from './launchPrograms.module.css'

function launchPrograms({ data }) {
    const domLaunches = data.map((launch) => {
        return (
            <div className={styles.launch} key={launch.flight_number}>
                <div className={styles.launchImg}>
                    <Image src={launch.links.mission_patch_small || "/notFound.png"} alt="Launch" width={200} height={200}/>
                </div>
                <div className={styles.launchDetails}>
                    <p>{launch.mission_name} #{launch.flight_number}</p>
                    <h5>Mission Ids: {launch.mission_id.map((mId) => mId)}</h5>
                    <h5>Launch Year: {launch.launch_year}</h5>
                    <h5>Successful Launch: {launch.launch_success ? launch.launch_success.toString() : ''}</h5>
                    <h5>Successful Landing: {launch.land_success ? launch.land_success.toString() : ''} </h5>
                </div>
            </div>
        )
    });

    return (
        <>
            {domLaunches}
        </>
    )
}

export default launchPrograms
