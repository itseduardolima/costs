import desenvolvimento from '../../img/desenvolvimento.gif'
import styles from './Home.module.css'

function Company() {
    return (
        <div>
            <section className={styles.home_container} >
                <p>Página em desenvolvimento...</p>
                <img src={desenvolvimento}  alt="em construção" />
            </section>
        </div>
    )
}

export default Company;