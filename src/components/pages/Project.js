import { parse, v4 as uuidv4 } from 'uuid'
import { useState, useEffect } from 'react'
import styles from './Project.module.css'
import { useParams } from 'react-router-dom'
import Loading from '../layout/Loading'
import ProjectForm from '../projects/ProjectForm'
import Message from '../layout/Message'
import ServiceForm from '../service/ServiceForm'
import ServiceCard from '../service/ServiceCard'

function Project() {

    let { id } = useParams()
    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
    const { message, setMessage } = useState()
    const { type, setType } = useState('success')

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
                    setServices(data.services)
                })
                .catch((err) => console.log(err))
        }, 1000)

    }, [id])

    function editPost(project) {

        if (project.budget < project.cost) {
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

    function createService(project) {

      

        const lastService = project.services[project.services.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if (newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            project.services.pop()
            return false
        }

        project.cost = newCost

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project),
        })
            .then((resp) => resp.json())
            .then((data) => {
                setShowServiceForm(false)
            })
            .catch((err) => console.log(err))
    }

    function removeService() {

    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
        
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project_details} >
                    {message && <Message type={type} msg={message} />}
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

                    <div className={styles.service_form_container}>
                        <h2>Adicione um serviço:</h2>
                        <button className={styles.btn} onClick={toggleServiceForm}>
                            {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                        </button>
                        <div className={styles.project_info}>
                            {showServiceForm && (
                                <ServiceForm
                                    handleSubmit={createService}
                                    btnText="Adicionar serviço"
                                    projectData={project}
                                />
                            )}
                        </div>
                    </div>
                    <h2>Serviços</h2>
                    <div className={styles.details_container} >
                        {services.length > 0 &&
                            services.map((service) => (
                                <ServiceCard
                                    id={service.id}
                                    name={service.name}
                                    cost={service.cost}
                                    description={service.description}
                                    key={service.id}
                                    handleRemove={removeService}
                                />
                            ))


                        }
                        {services.length === 0 && <p>Não há serviços cadastrados</p>}
                    </div>
                </div>

            ) : (
                <Loading />
            )}

        </>

    )
}

export default Project