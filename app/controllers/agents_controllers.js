import Agent from '../models/agents_models.js';

//Ver agentes.
async function viewAgent() {
    let agents = await Agent.find({status: true});
    return agents;
}

//Crear agente.
async function createAgent(body) {
    const newAgent = new Agent({
        name: body.name,
        rol: body.rol,
        description: body.description,
    });
    try {
        const savedAgent = await newAgent.save();
        return savedAgent;
    } catch (error) {
        throw error;
    }
}

//Modificar agente (por id).
async function updateAgent(body, id) {
    try {
        const updatedAgent = await Agent.findByIdAndUpdate(id, {
            name: body.name,
            rol: body.rol,
            description: body.description,
        }, { new: true });
        if (!updatedAgent) {
            throw new Error("El agente no se pudo actualizar!");
        }
        return updatedAgent;
    } catch (error) {
        console.error("Error al actualizar el agente:", error);
        throw error;
    }
}


//Eliminar agente (por ID).
async function deleteAgent(id) {
    try {
        const deletedAgent = await Agent.findByIdAndRemove(id);
        
        if (!deletedAgent) {
            throw new Error("El agente no se pudo eliminar.");
        }
        return deletedAgent;
    } catch (error) {
        console.error("Error al eliminar el agente:", error);
        throw error; 
    }
}

//Agente por ID.
async function getAgentById(id) {
    try {
        const agent = await Agent.findById(id);
        if (!agent) {
            throw new Error("Agente no encontrado.");
        }
        return agent;
    } catch (error) {
        console.error("Error al obtener el agente por ID:", error);
        throw error;
    }
}

//Agente por nombre.
async function getAgentByName(name) {
    try {
        const agent = await Agent.findOne({ name });
        if (!agent) {
            throw new Error("Agente no encontrado.");
        }
        return agent;
    } catch (error) {
        console.error("Error al obtener el agente por nombre:", error);
        throw error;
    }
}

//Agentes ordenado por name de la A a Z
async function sortByName() {
    let agents = await Agent.find().sort({name: 1})
    return agents;
}

//Paginacion
async function getAgentsWithPagination(amount, skip){
    let agents = await Agent.find().limit(amount).skip(skip)
    return agents;
}

export { viewAgent, createAgent, updateAgent, deleteAgent, getAgentById, getAgentByName, sortByName, getAgentsWithPagination};
