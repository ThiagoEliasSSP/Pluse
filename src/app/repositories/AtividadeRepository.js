const db = require('../../database')
class AtividadeRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`SELECT * FROM atividades ORDER BY nome ${direction}`);
    return rows;
  }

  async findByAluno({orderBy = 'ASC', idAluno}) {
    const direction = orderBy.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    const rows = await db.query(`
    SELECT *
    FROM atividades
    WHERE id_aluno = $1
    ORDER BY nome ${direction}`, [idAluno]);
    console.log(idAluno)
    return rows;
  }

  async countAllHouresByAtividade({idAluno, idCategoria}) {
    const [row] = await db.query(`
    SELECT SUM(horas)
    FROM atividades
    WHERE id_aluno = $1 and id_categoria = $2
    GROUP BY id_categoria
    `, [idAluno, idCategoria]);

    return row;
  }

  async findAtividade(name) {
    const [row] = await db.query('SELECT * FROM categoria_atividades WHERE nome = $1', [name]);
    return row;
  }

  async create({ idAluno, arquivo, name, houers, idCategoria }) {
    const [row] = await db.query(`
        INSERT INTO atividades(arquivo, nome,	horas, status, id_aluno,id_categoria) VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `, [arquivo, name, houers, 'pendente',idAluno, idCategoria]);

    return row
  }

}

module.exports = new AtividadeRepository();
