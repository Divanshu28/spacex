import Header from '../components/header/header'
import Filters from '../components/filters/filters'
import LaunchPrograms from '../components/launchPrograms/launchPrograms'
import Footer from '../components/footer/footer'
import styles from './home.module.css'

import { useEffect, useState } from 'react'

function Home({ launches }) {

  const [launchData, setLaunchData] = useState(launches);
  const [isSuccessLaunch, setIsSuccessLaunch] = useState("");
  const [isSuccessLand, setIsSuccessLand] = useState("");
  const [launchYear, setLaunchYear] = useState(null);

  function refetchData(url) {
    fetch(url)
          .then(response => response.json())
          .then(data => {
              setLaunchData(data);
          });
  }
  
  useEffect(() => {
   
    let baseUrl = `https://api.spaceXdata.com/v3/launches?limit=100`;

    if(launchYear===null && isSuccessLand==="" && isSuccessLaunch==="") {
        setLaunchData(launches);
      }
    else {
      if(isSuccessLaunch !== "")
        baseUrl += `&launch_success=${isSuccessLaunch}`;
      if(isSuccessLand !== "")
        baseUrl += `&land_success=${isSuccessLand}`
      if(launchYear !== null)
        baseUrl += `&launch_year=${launchYear}`

        refetchData(baseUrl);
    }

  }, [isSuccessLaunch, isSuccessLand, launchYear])


  const successLaunchChange = (e) => {
    if(isSuccessLaunch === "") {
      setIsSuccessLaunch(e.target.value);
    } else if(isSuccessLaunch === e.target.value) {
      setIsSuccessLaunch("");
    } else {
      setIsSuccessLaunch(e.target.value);
    }
      
  }

  const successLandChange = (e) => {
    if(isSuccessLand === "") {
      setIsSuccessLand(e.target.value);
    } else if(isSuccessLand === e.target.value) {
      setIsSuccessLand("");
    } else {
      setIsSuccessLand(e.target.value);
    }
  }

  const launchYearChange = (e) => {
    if(launchYear === null) {
      setLaunchYear(e.target.value);
    } else if(launchYear === e.target.value) {
      setLaunchYear(null);
    } else {
      setLaunchYear(e.target.value);
    }
  }
  
  return (
    <div className={styles.home}>
      <Header />
      <div className={styles.container}>
        <div className={styles.filterContainer}>
          <Filters launchYear={launchYear} successLaunch={isSuccessLaunch} successLand={isSuccessLand} 
          launchChange={successLaunchChange} landChange={successLandChange} yearChange={launchYearChange}/>
        </div>
        <div className={styles.launchContainer}>
          <LaunchPrograms data={launchData}/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://api.spacexdata.com/v3/launches?limit=100')
  const launches = await res.json()

  return {
    props: {
      launches,
    },
  }
}

export default Home;
