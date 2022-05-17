const ProfessorRepository = require('../repositories/ProfessorRepository')

class ProfessorController {
  async index(requeste, response) {
    const contacts = await ContactRepository.findAll();

    return response.json(contacts);
  }

  async show(request, response) {
    const { id } = request.params;
    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact Not Found' });
    }

    return response.json(contact);
  };

  async store(request, response) {
    const { name, email, phone, category_id } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is Required' });
    }

    const contactExists = await ContactRepository.findByEmail(email);

    if (contactExists) {
      return response.status(400).json({ error: 'This is e-mail already in use' });
    }

    const contact = await ContactRepository.create({
      name, email, phone, category_id
    });

    return response.send(request.body)
  }

  async update(request, response) {
    const { id } = request.params;
    const { name, email, phone, category_id } = request.body;

    const contactExists = await ContactRepository.findById(id);
    if (!contactExists) {
      return response.status(404).json({ error: 'Contact Not Found' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is Required' });
    }

    const contactByEmail = await ContactRepository.findByEmail(email);

    if (contactByEmail && contactByEmail.id !== id) {
      return response.status(400).json({ error: 'This is e-mail already in use' });
    }

    const contact = await ContactRepository.update(id, {  name, email, phone, category_id });

    response.json(contact);
  }

  async delete(request, response) {
    // Deletar um registro
    const { id } = request.params;
    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'Contact Not Found' });
    }

    await ContactRepository.delete(id);
    return response.sendStatus(204);
  }
}

module.exports = new ProfessorController();
