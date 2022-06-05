const AlunoRepository = require('../repositories/AlunoRepository');

class AlunoController {
  async index(requeste, response) {
    const { orderBy } = requeste.query
    const contacts = await AlunoRepository.findAll(orderBy);

    return response.json(contacts);
  };

  async show(request, response) {
    const { id } = request.params;
    const contact = await AlunoRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Aluno não encontrado' });
    }

    return response.json(contact);
  };

  async store(request, response) {
    const { name, email, phone, curso } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'O nome é obrigatório' });
    };

    if (!email) {
      return response.status(400).json({ error: 'O email é obrigatório' });
    };

    const contactExistsEmail = await AlunoRepository.findByEmail(email);

    if (contactExistsEmail) {
      return response.status(400).json({ error: 'Este email já está cadastrado' });
    };

    if (!phone) {
      return response.status(400).json({ error: 'O phone é obrigatório' });
    };

    const contactExistsPhone = await AlunoRepository.findByPhone(phone);

    if (contactExistsPhone) {
      return response.status(400).json({ error: 'Este número de celular já está cadastrado' });
    };

    if (!curso) {
      return response.status(400).json({ error: 'O curso é obrigatório' });
    };

    const cursoDetails = await AlunoRepository.findCurso(curso)

    if (!cursoDetails) {
      return response.status(400).json({ error: 'Curso não encontrado' });
    }

    const { id_curso: idCurso, horas_totais: horasTotais } = cursoDetails;

    const contact = await AlunoRepository.create({ name, email, phone, idCurso, horasTotais });
    return response.status(200).json([contact, { message: 'Aluno cadastrado com exito' }]);
  };

  async update(request, response) {
    const { id } = request.params;
    const { name, email, phone } = request.body;

    const contactExists = await AlunoRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: 'Contato não encontrado' });
    }

    if (!name) {
      return response.status(400).json({ error: 'O nome é obrigatório' });
    }

    if (!email) {
      return response.status(400).json({ error: 'O email é obrigatório' });
    }

    if (!phone) {
      return response.status(400).json({ error: 'O celular é obrigatório' });
    }

    const contact = await AlunoRepository.update({ id, name, email, phone });
    return response.json(contact);
  };

  async delete(request, response) {
    const { id } = request.params;
    const contactExists = await AlunoRepository.findById(id);

    if (!contactExists) {
      return response.status(400).json({ error: 'Aluno não encontrado' });
    };

    const contact = await AlunoRepository.delete(id);

    return response.status(200).json([contact, { message: 'Aluno Deletado com exito' }]);
  };
}

module.exports = new AlunoController();
