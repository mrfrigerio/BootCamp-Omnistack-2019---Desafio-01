const express = require('express')
const server = express()
const port = 3333
server.use(express.json())

let fakedb = []

const checkProjectExistence = (req, res, next) => {
  const { id } = req.params
  const findIndex = fakedb.find(project => project.id === Number.parseInt(id))
  findIndex ? next() : res.status(404).send('Projeto não encontrado!')

}

server.post('/projects', (req, res) => {
  const { id, title, tasks } = req.body
  fakedb.push({ id, title, tasks })
  res.status(201).json(fakedb)

})

server.get('/projects', (req, res) => res.json(fakedb))

server.put('/projects/:id', (req, res) => {
  const { id } = req.params
  const { title } = req.body
  fakedb.map(project => {
    project.id === Number.parseInt(id) && (project.title = title)
  })
  res.json(fakedb)
})

server.delete('/projects/:id', checkProjectExistence, (req, res) => {
  const { id } = req.params
  fakedb = fakedb.filter(project => project.id !== Number.parseInt(id))
  res.json(fakedb)
})

server.post('/projects/:id/tasks', (req, res) => {
  const { id } = req.params
  const { title } = req.body
  fakedb.map(project => {
    project.id === Number.parseInt(id) && (project.tasks.push(title))
  })
  res.json(fakedb)
})

server.listen(port, () => console.log(`Servidor escutando na porta ${port}`))

