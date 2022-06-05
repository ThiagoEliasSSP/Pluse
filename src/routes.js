const { Router } = require('express')

const AlunoController = require('./app/controllers/AlunoController');
const AtividadeController = require('./app/controllers/AtividadeController');
const ProfessorController = require('./app/controllers/ProfessorController');

const router = Router();

// Rotas para o Endpoint Aluno
router.get('/aluno', AlunoController.index);
router.get('/aluno/:id', AlunoController.show);
router.delete('/aluno/:id', AlunoController.delete);
router.post('/aluno', AlunoController.store);
router.put('/aluno/:id', AlunoController.update);

// Rotas para o Endpoint Atividade
router.get('/atividade', AtividadeController.index);
router.get('/atividade/:idAluno', AtividadeController.show);
router.delete('/atividade/:id', AtividadeController.delete);
router.post('/atividade/:idAluno', AtividadeController.store);
router.put('/atividade/:id', AtividadeController.update);

// Rotas para o Endpoint Professor
router.get('/professor', ProfessorController.index);
router.get('/professor/:id', ProfessorController.show);
router.delete('/professor/:id', ProfessorController.delete);
router.post('/professor', ProfessorController.store);
router.put('/professor/:id', ProfessorController.update);

module.exports = router;
