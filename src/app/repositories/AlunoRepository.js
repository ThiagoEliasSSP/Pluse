const db = require('../../database')
class AlunoRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM alunos ORDER BY nome ${direction}`);
    return rows;
  }

  async findById(id) {
    const [row] = await db.query(`SELECT * FROM alunos WHERE id_aluno = $1`, [id]);
    return row
  }

  async findByEmail(email) {
    const [row] = await db.query(`SELECT * FROM alunos WHERE email = $1`, [email]);
    return row
  }

  async findByPhone(phone) {
    const [row] = await db.query(`SELECT * FROM alunos WHERE celular = $1`, [phone]);
    return row
  }

  async findCurso(curso) {
    const [row] = await db.query('SELECT * FROM cursos WHERE nome = $1', [curso]);
    return row;
  }

  async delete(id) {
    const [row] = await db.query('DELETE FROM alunos WHERE id_aluno = $1 RETURNING *', [id]);
    return row;
  }

  async create({ name, email, phone, idCurso, horasTotais }) {
    const [row] = await db.query(`
        INSERT INTO alunos(email, nome, celular, id_curso, horas_totais) VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `, [email, name, phone, idCurso, horasTotais]);

    return row
  }

  async update({ id, name, email, phone }) {
    const [row] = await db.query(`
        UPDATE alunos
        SET nome = $2, email = $3, celular = $4
        WHERE id_aluno = $1
        RETURNING *
      `, [id, name, email, phone])

    return row;
  }
}

module.exports = new AlunoRepository();
