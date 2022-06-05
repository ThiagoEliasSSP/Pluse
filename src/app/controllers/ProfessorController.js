const ProfessorRepository = require('../repositories/ProfessorRepository')

class ProfessorController {
  async index(requeste, response) {
    const { orderBy } = requeste.query
    const contacts = await ProfessorRepository.findAll(orderBy);

    return response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;
    const contact = await ProfessorRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contato não encontrado' });
    }

    return response.json(contact);
  };

  async store(request, response) {
    const { name, email, phone } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'O nome é obrigatório' });
    };

    if (!email) {
      return response.status(400).json({ error: 'O email é obrigatório' });
    };

    const contactExistsEmail = await ProfessorRepository.findByEmail(email);

    if (contactExistsEmail) {
      return response.status(400).json({ error: 'Este email já está cadastrado' });
    };

    if (!phone) {
      return response.status(400).json({ error: 'O phone é obrigatório' });
    };

    const contactExistsPhone = await ProfessorRepository.findByPhone(phone);

    if (contactExistsPhone) {
      return response.status(400).json({ error: 'Este número de celular já está cadastrado' });
    };

    const contact = await ProfessorRepository.create({ name, email, phone });
    return response.status(200).json([contact, { message: 'Professor cadastrado com exito' }]);
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, email, phone } = request.body;

    const contactExists = await ProfessorRepository.findById(id);

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

    const contact = await ProfessorRepository.update({ id, name, email, phone });
    return response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;
    const contactExists = await ProfessorRepository.findById(id);

    if (!contactExists) {
      return response.status(400).json({ error: 'Aluno não encontrado' });
    };

    const contact = await ProfessorRepository.delete(id);

    return response.status(200).json([contact, { message: 'Aluno Deletado com exito' }]);
  }
}

module.exports = new ProfessorController();
