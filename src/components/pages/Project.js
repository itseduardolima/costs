import { useState, useEffect } from 'react'
import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import Loading from '../layout/Loading'
import ProjectForm from '../projects/ProjectForm'
import Message from '../layout/Message'

function Project() {

    const { id } = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const {message, setMessage} = useState()
    const {type, setType} = useState()

    useEffect(() => {

        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                .then((resp) => resp.json())
                .then((data) => {
                    setProject(data)
                })
                .catch((err) => console.log)
        }, 1000)

    }, [id])

    function editPost(project) {
        if (project.buget < project.cost) {
            setMessage('O orçamento não pode ser menor que o custo do projeto!')
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {

                setProject(data)
                setShowProjectForm(false)
                setMessage('Projeto atualizado!')
                setType('success')

            })
            .catch((err) => console.log(err))
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details} >
                    {message && <Message type={type} msg={message}/> }
                    <div className={styles.details_container} >
                        <h1>{project.name}</h1>

                        {!showProjectForm ? (
                            <div className={styles.project_info} >
                                <p>
                                    <span>Categoria:</span> {project.category.name}
                                </p>
                                <p>
                                    <span>Total de orçamento:</span> R${project.budget}
                                </p>
                                <p>
                                    <span>Total Utilizado:</span> {project.cost}
                                </p>
                                <button className={styles.btn} onClick={toggleProjectForm}>
                                    {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                                </button>

                            </div>

                        ) : (
                            <div className={styles.project_info} >
                                <ProjectForm handleSubmit={editPost} btnText="Concluir edição" projectData={project} />
                                <button className={styles.btn} onClick={toggleProjectForm}>
                                    {!showProjectForm ? 'Editar Projeto' : 'Fechar'}
                                </button>

                            </div>
                        )}
                    </div>

                </div>
            ) : (
                <Loading />
            )}

        </>

    )
}

export default Project