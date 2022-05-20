const { Router } = require('express')

const AlunoController = require('./app/controllers/AlunoController');
const AtividadeController = require('./app/controllers/AtividadeController');
const ProfessorController = require('./app/controllers/ProfessorController');

const router = Router();

// Rotas para o Endpoint Aluno
router.get('/aluno', AlunoController.index);
router.get('/aluno/:email', AlunoController.show);
router.delete('/aluno/:email', AlunoController.delete);
router.post('/aluno', AlunoController.store);
router.put('/aluno/:email', AlunoController.update);

// Rotas para o Endpoint Atividade
router.get('/atividade', AtividadeController.index);
router.get('/atividade/:id', AtividadeController.show);
router.delete('/atividade/:id', AtividadeController.delete);
router.post('/atividade', AtividadeController.store);
router.put('/atividade/:id', AtividadeController.update);

// Rotas para o Endpoint Professor
router.get('/professor', ProfessorController.index);
router.get('/professor/:id', ProfessorController.show);
router.delete('/professor/:id', ProfessorController.delete);
router.post('/professor', ProfessorController.store);
router.put('/professor/:id', ProfessorController.update);

module.exports = router;
