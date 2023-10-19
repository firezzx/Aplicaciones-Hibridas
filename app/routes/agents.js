import express from 'express';
import { viewAgent, createAgent, updateAgent, deleteAgent, getAgentById, getAgentByName, sortByName, getAgentsWithPagination} from '../controllers/agents_controllers.js'
import verifyToken from '../middlewares/auth_middlewares.js'

const route = express.Router();

//Ver agentes.
route.get('/', (req, res) => {
    const page = req.query.page;
    const amount = req.query.amount;
    if(page && amount){
        const skip = (page - 1) * amount;
        let result = getAgentsWithPagination(amount, skip)
        result.then(agents =>{
            res.json({
                agents
            })
        }).catch(err => {
            res.status(400).json({err})
        })
    } else {
        let result = viewAgent();
    result.then(agents => {
        res.json({
            agents
        })
    }).catch(err => {
        res.status(400).json({err})
    })
    }
})

//Crear agente.
route.post('/', (req, res) => {
    let body = req.body;
    let result = createAgent(body);
    result.then(agent => {
        res.json({
            value: agent
        })
    }).catch(err => {
        res.status(400).json({err})
    })
})

//Modificar agente (por id).
route.put('/:id', verifyToken, (req, res) => {
    let body = req.body;
    updateAgent(body, req.params.id)
        .then(value => {
            res.json({
                message: 'Agente modificado exitosamente!'
            });
        })
        .catch(err => {
            res.status(400).json({
                error: 'Error al modificar el agente!',
            });
        });
});


//Eliminar agente (por id).
route.delete('/:id', verifyToken, (req, res) => {
    let result = deleteAgent(req.params.id);
    result.then(value => {
        res.json({
            value
        })
    }).catch(err => {
        res.status(400).json(err)
    })
})

//Agente por id.
route.get('/:id', verifyToken, (req, res) => {
    let agentId = req.params.id;
    getAgentById(agentId)
        .then(agent => {
            res.json({
                agent
            });
        })
        .catch(err => {
            res.status(400).json({
                error: 'Error al obtener el usuario por ID'
            });
        });
});

//Agente por nombre.
route.get('/name/:name', verifyToken, (req, res) => {
    let agentName = req.params.name;
    getAgentByName(agentName)
        .then(agent => {
            res.json({
                agent
            });
        })
        .catch(err => {
            res.status(400).json({
                error: 'Error al obtener el agente por nombre'
            });
        });
});

//Ordenamiento de la A a Z
route.get('/sort/sort-by-name', verifyToken, (req, res) => {
    let result = sortByName();
    result.then(value => {
        res.json(value)
    }).catch(err => {
        res.status(400).json({err, message: "Se ha producido un error al intentar ordenar los agentes."})
    })
})



export default route;
