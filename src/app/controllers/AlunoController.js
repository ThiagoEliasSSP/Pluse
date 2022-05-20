const AlunoRepository = require('../repositories/AlunoRepository')

class AlunoController {
  async index(requeste, response) {
    const contacts = await AlunoRepository.findAll();

    return response.json(contacts);
  }

  async show(request, response) {
    const { email } = request.params;
    const contacts = await AlunoRepository.findByEmail(email);

    return response.json(contacts);
  };

  async store(request, response) {
    const { name, email, phone, category_id } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Name is Required' });
    }

    if (!phone) {
      return response.status(400).json({ error: 'Phone is Required' });
    }

    if (!email) {
      return response.status(400).json({ error: 'Email is Required' });
    }

    // const contactExistsPhone = await AlunoRepository.findByPhone(phone);
    // const contactExistsEmail = await AlunoRepository.findByEmail(email);

    // if (!contactExistsPhone) {
    //   return response.status(400).json({ error: 'This is phone already in use' });
    // }

    // if (!contactExistsEmail) {
    //   return response.status(400).json({ error: 'This is e-mail already in use' });
    // }

    const contact = await AlunoRepository.create({ name, email, phone, category_id });

    return response.send(contact)
  }

  async update(request, response) {
    const { email } = request.params;
    const { name, phone, category_id } = request.body;

    const contactExists = await AlunoRepository.findByEmail(email);

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
    // Deletar um registro
    const { email } = request.params;
    const contact = await ContactRepository.findByEmail(email);

    if (!contact) {
      return response.status(404).json({ error: 'Contact Not Found' });
    }

    await AlunoRepository.delete(contact);

    response.json(contact);
  }
}

module.exports = new AlunoController();
