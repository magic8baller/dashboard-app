// import Todo from './todo.model.js'

export const getAll = (req, res) => {
res.status(200).send('get all todos route')
}
export const createOne = (req, res) => {
res.status(200).send('create todo route')
}
export const getOne = (req, res) => {
res.status(200).send('get 1 todo route')
}
export const updateOne = (req, res) => {
res.status(200).send('update 1 todo route')
}
export const removeOne = (req, res) => {
res.status(200).send('delete 1 todo route')
}
