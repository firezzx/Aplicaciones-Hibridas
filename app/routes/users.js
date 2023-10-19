import express from 'express';
import { viewUser, createUser, updateUser, deleteUser, getUserById, getUserByName, sortByEmail, getUsersWithPagination } from '../controllers/users_controllers.js'
import verifyToken from '../middlewares/auth_middlewares.js'

const route = express.Router();

// //Ver usuarios.
// route.get('/', (req, res) => {
//     let result = viewUser();
//     result.then(users => {
//         res.json({
//             users
//         })
//     }).catch(err => {
//         res.status(400).json({err})
//     })
// })

//Ver agentes.
route.get('/', (req, res) => {
    const page = req.query.page;
    const amount = req.query.amount;
    if(page && amount){
        const skip = (page - 1) * amount;
        let result = getUsersWithPagination(amount, skip)
        result.then(users =>{
            res.json({
                users
            })
        }).catch(err => {
            res.status(400).json({err})
        })
    } else {
        let result = viewUser();
    result.then(users => {
        res.json({
            users
        })
    }).catch(err => {
        res.status(400).json({err})
    })
    }
})

//Crear usuario.
route.post('/', (req, res) => {
    let body = req.body;
    let result = createUser(body);
    result.then(user => {
        res.json({
            value: user
        })
    }).catch(err => {
        res.status(400).json({err})
    })
})

//Modificar usuario (por email).
route.put('/:email', verifyToken, (req, res) => {
    let body = req.body;
    updateUser(body, req.params.email)
        .then(value => {
            res.json({
                message: 'Usuario modificado exitosamente!'
            });
        })
        .catch(err => {
            res.status(400).json({
                error: 'Error al modificar el usuario!'
            });
        });
});


//Eliminar usuario (por id).
route.delete('/:id', verifyToken, (req, res) => {
    let result = deleteUser(req.params.id);
    result.then(value => {
        res.json({
            value
        })
    }).catch(err => {
        res.status(400).json(err)
    })
})

//Usuario por id.
route.get('/:id', verifyToken, (req, res) => {
    let userId = req.params.id;
    getUserById(userId)
        .then(user => {
            res.json({  
                user
            });
        })
        .catch(err => {
            res.status(400).json({
                error: 'Error al obtener el usuario por ID'
            });
        });
});

//Usuario por nombre.
route.get('/name/:name', verifyToken, (req, res) => {
    let userName = req.params.name;
    getUserByName(userName)
        .then(user => {
            res.json({
                user
            });
        })
        .catch(err => {
            res.status(400).json({
                error: 'Error al obtener el Usuario por nombre'
            });
        });
});

//Ordenamiento de la A a Z
route.get('/sort/sort-by-email', verifyToken, (req, res) => {
    let result = sortByEmail();
    result.then(value => {
        res.json(value)
    }).catch(err => {
        res.status(400).json({err, message: "Se ha producido un error al intentar ordenar los usuarios."})
    })
})

export default route;
