const AlunoRepository = require('../repositories/AlunoRepository')

class AlunoController {
  async index(requeste, response) {
    const contacts = await AlunoRepository.findAll();

    return response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;
    const contacts = await AlunoRepository.findById(id);

    if (!contacts) {
      return response.status(404).json({ error: 'Contact Not Found' });
    }

    return response.json(contacts);
  };

  async store(request, response) {
    const { name, email, phone, category_id } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is Required' });
    }

    if (!email) {
      return response.status(400).json({ error: 'Email is Required' });
    }

    if (!phone) {
      return response.status(400).json({ error: 'Phone is Required' });
    }

    const contactExistsEmail = await AlunoRepository.findByEmail(email);

    if (!contactExistsEmail) {
      return response.status(400).json({ error: 'This is e-mail already in use' });
    }

    const contact = await AlunoRepository.create({ name, email, phone, category_id });

    return response.send(contact)
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, phone, category_id, email } = request.body;

    const contactExists = await AlunoRepository.findById(id);

    if (!contactExists) {
      return response.status(404).json({ error: 'Contact Not Found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is Required' });
    }

    const contact = await AlunoRepository.update({ name, email, phone, category_id });

    response.json(contact);
  }

  async delete(request, response) {
    const { id } = request.params;
    const contact = await AlunoRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact Not Found' });
    }

    await AlunoRepository.delete(id);

    response.json(contact);
  }
}

module.exports = new AlunoController();
