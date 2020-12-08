import Header from '../components/header/header'
import Filters from '../components/filters/filters'
import LaunchPrograms from '../components/launchPrograms/launchPrograms'
import Footer from '../components/footer/footer'
import styles from './home.module.css'
import { useEffect, useState } from 'react'
import Cookies from 'universal-cookie';

function Home({ launches }) {

  const cookies = new Cookies();

  const [launchData, setLaunchData] = useState(launches);
  const [isSuccessLaunch, setIsSuccessLaunch] = useState("");
  const [isSuccessLand, setIsSuccessLand] = useState("");
  const [launchYear, setLaunchYear] = useState(null);
  const [count, setCount] = useState(0);

  function refetchData(url) {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setLaunchData(data);
      });
  }

  useEffect(() => {
  const successLaunch = cookies.get('isSuccessLaunch');
  const successLand = cookies.get('isSuccessLand');
  const year = cookies.get('launchYear');

  if (year)
    setLaunchYear(year);
  if(successLaunch)
    setIsSuccessLaunch(successLaunch);
  if(successLand)
    setIsSuccessLand(successLand);
     
  }, [])

  useEffect(() => {

    let baseUrl = `https://api.spaceXdata.com/v3/launches?limit=100`;

    if(count>1) {
      if (isSuccessLaunch !== "")
        baseUrl += `&launch_success=${isSuccessLaunch}`;
      if (isSuccessLand !== "")
        baseUrl += `&land_success=${isSuccessLand}`
      if (launchYear !== null )
        baseUrl += `&launch_year=${launchYear}`

      refetchData(baseUrl);
    }

    setCount(count + 1);

  }, [isSuccessLaunch, isSuccessLand, launchYear])


  const successLaunchChange = (e) => {
    if (isSuccessLaunch === "") {
      setIsSuccessLaunch(e.target.value);
      cookies.set('isSuccessLaunch', e.target.value);
    } else if (isSuccessLaunch === e.target.value) {
      setIsSuccessLaunch("");
      cookies.set('isSuccessLaunch', '');
    } else {
      setIsSuccessLaunch(e.target.value);
      cookies.set('isSuccessLaunch', e.target.value);
    }

  }

  const successLandChange = (e) => {
    if (isSuccessLand === "") {
      setIsSuccessLand(e.target.value);
      cookies.set('isSuccessLand', e.target.value);
    } else if (isSuccessLand === e.target.value) {
      setIsSuccessLand("");
      cookies.set('isSuccessLand', '');
    } else {
      setIsSuccessLand(e.target.value);
      cookies.set('isSuccessLand', e.target.value);
    }
  }

  const launchYearChange = (e) => {
    if (launchYear === null) {
      setLaunchYear(e.target.value);
      cookies.set('launchYear', e.target.value);
    } else if (launchYear === e.target.value) {
      setLaunchYear(null);
      cookies.set('launchYear', '');
    } else {
      setLaunchYear(e.target.value);
      cookies.set('launchYear', e.target.value);
    }
  }

  return (
    <div className={styles.home}>
      <Header />
      <div className={styles.container}>
        <div className={styles.filterContainer}>
          <Filters launchYear={launchYear} successLaunch={isSuccessLaunch} successLand={isSuccessLand}
            launchChange={successLaunchChange} landChange={successLandChange} yearChange={launchYearChange} />
        </div>
        <div className={styles.launchContainer}>
          <LaunchPrograms data={launchData} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export async function getServerSideProps(context) {
  let reqUrl = 'https://api.spacexdata.com/v3/launches?limit=100';
  const cookies = new Cookies(context.req.headers.cookie);

  const isSuccessLaunch = cookies.get('isSuccessLaunch');
  const isSuccessLand = cookies.get('isSuccessLand');
  const launchYear = cookies.get('launchYear');

  if (isSuccessLaunch && isSuccessLaunch !== "")
    reqUrl += `&launch_success=${isSuccessLaunch}`;
  if (isSuccessLand && isSuccessLand !== "")
    reqUrl += `&land_success=${isSuccessLand}`;
  if (launchYear && launchYear !== null)
    reqUrl += `&launch_year=${launchYear}`;

  const res = await fetch(reqUrl)
  const launches = await res.json()

  return {
    props: {
      launches,
    },
  }
}

export default Home;
