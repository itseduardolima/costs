import desenvolvimento02 from '../../img/desenvolvimento02.gif'
import styles from './Home.module.css'

function Contact() {
    return (
        <div>
            <section className={styles.home_container} >
                <p>Página em desenvolvimento...</p>
                <img src={desenvolvimento02}  alt="em construção" />
            </section>
        </div>
    )
}

export default Contact