import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'

import styles from './Footer.module.css'


function Footer() {
    return (
        <div className={styles.footer}>

            <ul className={styles.social_list} >
                <li><FaFacebook /></li>
                <li><FaInstagram /></li>
                <li><FaLinkedin /></li>
            </ul>
            <p className={styles.copy_right}><span>&copy; 2023 </span></p>
        </div>
    )
}

export default Footer