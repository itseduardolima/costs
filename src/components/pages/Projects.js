import LinkButton from '../layout/LinkButton'
import ProjectCard from '../projects/ProjectCard'

import styles from './Projects.module.css'


function Projects(){
    return (
        <div className={styles.project_container} >
            <div className={styles.title_container} >
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto" />
            </div>
            <div className={styles.card_container } >
                <ProjectCard/>
                <ProjectCard/>
                <ProjectCard/>
            </div>
        </div>
    )
}

export default Projects