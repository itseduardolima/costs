import styles from './ProjectCard.module.css'
import { Link } from 'react-router-dom'


import { BsPencil, BsFillTrashFill } from 'react-icons/bs'

function ProjectCard() {

    return (

        <div className={styles.container} >
            <div className={styles.project_card} >
                <h4>Nome do Produto</h4>
                <p>
                    <span>Orçamento:</span> R$0,00
                </p>
                <p className={styles.category_text} >
                    <span></span> Categoria
                </p>
                <div className={styles.project_card_actions} >
                    <Link to="/project" ><BsPencil/> Editar</Link>
                    <button>
                        <BsFillTrashFill /> Remover
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard