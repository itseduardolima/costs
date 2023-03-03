import styles from '../projects/ProjectCard.module.css'

function ServiceCard ({id, name, cost, description , handleRemove}) {

    const remove = (e) => {

    }

    return (
        

        <div className={styles.project_card} >
            <h4>{name}</h4>
            <p>
                <span>Custo Total: </span> R${cost}
            </p>
            <p>{description}</p>
            <div className={styles.project_card_actions} >
                <button onClick={remove}><bsFillTrashFill/>Excluir</button>
                
            </div>
        </div>
    )
}

export default ServiceCard