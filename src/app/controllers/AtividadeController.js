const AtividadeRepository = require('../repositories/AtividadeRepository')

class AtividadeController {
  async index(request, response) {
    const { orderBy } = request.query
    const activities = await AtividadeRepository.findAll(orderBy);

    return response.json(activities);
  };

  async show(request, response) {
    const { idAluno } = request.params;
    const { orderBy } = request.query
    const activities = await AtividadeRepository.findByAluno({ orderBy, idAluno });

    if (!activities) {
      return response.status(404).json({ error: 'Nenhuma atividade encontrada' });
    }

    return response.json(activities);
  };

  async store(request, response) {
    const { idAluno } = request.params;
    const { arquivo, name, houers } = request.body;

    if (!arquivo) {
      return response.status(400).json({ error: 'O arquivo é obrigatório' });
    };

    if (!name) {
      return response.status(400).json({ error: 'O nome da atividade é obrigatório' });
    };

    if (!houers) {
      return response.status(400).json({ error: 'As horas trabalhadas são obrigatório' });
    };

    const atividadeDetails = await AtividadeRepository.findAtividade(name)

    if (!atividadeDetails) {
      return response.status(400).json({ error: 'Categoria da atividade não encontrado' });
    }

    const { id_categoria: idCategoria, maximo_horas: maximoHoras } = atividadeDetails;
    const {sum = 0} = await AtividadeRepository.countAllHouresByAtividade({ idAluno, idCategoria })

    if (sum === undefined && sum <= maximoHoras) {
      const contact = await AtividadeRepository.create({ idAluno, arquivo, name, houers, idCategoria });

      return response.status(200).json([contact, { message: 'Atividade cadastrada com exito' }]);
    } else {

      return response.status(400).json({ error: 'Você excedeu o limite de horas para esse tipo de atividade' });
    }
  };

  async update(request, response) {

  };

  async delete(request, response) {

  };
}

module.exports = new AtividadeController();
