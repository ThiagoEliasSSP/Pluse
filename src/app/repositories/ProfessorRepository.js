const db = require('../../database')
class ProfessorRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM professores ORDER BY nome ${direction}`);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`SELECT * FROM professores WHERE id_professor = $1`, [id]);
    return row
  }

  async findByEmail(email) {
    const [row] = await db.query(`SELECT * FROM professores WHERE email = $1`, [email]);
    return row
  }

  async findByPhone(phone) {
    const [row] = await db.query(`SELECT * FROM professores WHERE celular = $1`, [phone]);
    return row
  }

  async delete(id) {
    const [row] = await db.query('DELETE FROM professores WHERE id_professor = $1 RETURNING *', [id]);
    return row;
  }

  async create({ name, email, phone}) {
    const [row] = await db.query(`
        INSERT INTO professores(email, nome, celular) VALUES ($1, $2, $3)
        RETURNING *
      `, [email, name, phone]);

    return row
  }

  async update({ id, name, email, phone }) {
    const [row] = await db.query(`
        UPDATE professores
        SET nome = $2, email = $3, celular = $4
        WHERE id_professor = $1
        RETURNING *
      `, [id, name, email, phone])

    return row;
  }
}

module.exports = new ProfessorRepository();
