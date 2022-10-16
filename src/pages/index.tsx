// Styles
import styles from '@/styles/Home.module.css';

// Packages
import Switch from '@mui/material/Switch';
import type { NextPage } from 'next';

// Variables
const label = { inputProps: { 'aria-label': 'Switch demo' } };

const Home: NextPage = () => {
 /**
  * @Render
  */
 return (
  <div className={styles.container}>
   <div>
    <span>With default Theme:</span>
   </div>
   <Switch {...label} defaultChecked />
   <Switch {...label} />
   <Switch {...label} disabled defaultChecked />
  </div>
 );
};

export default Home;
