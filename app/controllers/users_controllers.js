import User from '../models/users_models.js';
import bcrypt from 'bcrypt';

//Ver usuarios.
async function viewUser() {
    let users = await User.find({status: true});
    return users;
}

//Crear usuario.
async function createUser(body) {
    try {
        const user = new User({
            email: body.email,
            name: body.name,
            password: bcrypt.hashSync(body.password, 10)
        });
        const savedUser = await user.save();
        return savedUser;
    } catch (error) {
        throw error; // Rechazar la promesa en caso de error
    }
}


//Modificar usuario (por email).
async function updateUser(body, email) {
    let user = await User.updateOne({"email": email}, {
        $set: {
            name: body.name,
            password: bcrypt.hashSync(body.password, 10)
        }
    })
    return user;
}

//Eliminar usuario (por ID).
async function deleteUser(id) {
    try {
        const deletedUser = await User.findByIdAndRemove(id);
        
        if (!deletedUser) {
            throw new Error("El suario no se pudo eliminar.");
        }
        return deletedUser;
    } catch (error) {
        console.error("Error al eliminar el usuario:", error);
        throw error; 
    }
}

//Usuario por ID.
async function getUserById(id) {
    try {
        const user = await User.findById(id);
        if (!user) {
            throw new Error("Usuario no encontrado.");
        }
        return user;
    } catch (error) {
        console.error("Error al obtener el usuario por ID:", error);
        throw error;
    }
}

//Usuario por nombre.
async function getUserByName(name) {
    try {
        const user = await User.findOne({ name });
        if (!user) {
            throw new Error("usere no encontrado.");
        }
        return user;
    } catch (error) {
        console.error("Error al obtener el useario por nombre:", error);
        throw error;
    }
}

//Usuario ordenado por email de la A a Z
async function sortByEmail() {
    let users = await User.find().sort({email: 1})
    return users;
}

//Paginacion
async function getUsersWithPagination(amount, skip){
    let users = await User.find().limit(amount).skip(skip)
    return users;
}

export { viewUser, createUser, updateUser, deleteUser, getUserById, getUserByName, sortByEmail, getUsersWithPagination };
