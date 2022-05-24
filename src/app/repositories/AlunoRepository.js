const db = require('../../database')
class AlunoRepository {
  async findAll() {
    const rows = await db.query(`SELECT * FROM alunos;`)
    return rows;
  }

  async findById(id) {
    const row = await db.query(`SELECT * FROM alunos WHERE id_aluno = $1`, [id])
    return row
  }

  async findByEmail(email) {
    const row = await db.query(`SELECT * FROM alunos WHERE email = $1`, [email])
    return row
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM alunos WHERE id_aluno = $1', [id])
    return deleteOp;
  }

  async create({ name, email, phone, category_id }) {
    const [row] = await db.query(`
        INSERT INTO alunos(email, nome, celular, id_curso) VALUES ($1, $2, $3, $4)
        RETURNING *
      `, [name, email, phone, category_id])

    return row
  }

  async update({ name, email, phone }) {
    const [row] = await db.query(`
        UPDATE alunos
        SET nome = $1, email = $2, celular = $3
        WHERE email = $2
      `, [name, email, phone])

    return row
  }
}

module.exports = new AlunoRepository();
