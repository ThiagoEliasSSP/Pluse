CREATE DATABASE Plusle;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS cursos (
  id_curso UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  nome VARCHAR NOT NULL,
  maximo_horas INT
);

CREATE TABLE IF NOT EXISTS alunos (
  id_aluno UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  email VARCHAR NOT NULL UNIQUE,
  nome VARCHAR NOT NULL,
  celular VARCHAR NOT NULL UNIQUE,
  id_curso UUID,
  horas_totais INT,
  horas_acumuladas INT,
  FOREIGN KEY(id_curso) REFERENCES cursos(id_curso)
);

CREATE TABLE IF NOT EXISTS professores (
  id_professor UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  email VARCHAR NOT NULL UNIQUE,
  nome VARCHAR NOT NULL,
  celular VARCHAR NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS categoria_atividades (
  id_categoria UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  nome VARCHAR NOT NULL,
  maximo_horas INT
);

CREATE TABLE IF NOT EXISTS atividades (
  id_atividade UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
  arquivo VARCHAR NOT NULL,
  nome VARCHAR NOT NULL,
  horas VARCHAR NOT NULL,
  status VARCHAR NOT NULL,
  id_aluno UUID,
  id_professor UUID,
  id_categoria UUID,
  FOREIGN KEY(id_aluno) REFERENCES alunos(id_aluno),
  FOREIGN KEY(id_professor) REFERENCES professores(id_professor),
  FOREIGN KEY(id_categoria) REFERENCES categoria_atividades(id_categoria)
);
