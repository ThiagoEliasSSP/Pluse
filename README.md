# Plusle

Plusle é um sistema responsável por registrar alunos e suas horas complementares, possibilitando com que os professores possam avaliar e validar as horas registradas pelos alunos.

![Logo](https://user-images.githubusercontent.com/64434954/173251353-b960acfd-2aae-4b94-881a-183f6d545ee1.png)

O objetivo do projeto é facilitar o processo de registro de horas complementares. Dado que o aluno esteja cadastrado no sistema, já poderá registrar suas atividades extracurriculares e aguardar para que um professor também cadastrado no sistema poderá avaliar e aprovar horas dos alunos.

Cada turma tem suas horas especificas e cada atividade também tem seu limite de horas a ser registrado, por tanto, o aluno será notificado ao exceder suas horas de atividades ou suas horas totais.

Equipe (nosso time, demaisss!):

- `Thiago Elias` (dev) <https://www.linkedin.com/in/thiagoeliasssp/>
- `Danielle Carqueijo` (UI/UX) <https://www.linkedin.com/in/daniellecarqueijo/>
- `Neemias Campos` (UI/UX) <https://www.linkedin.com/in/neemiascampos/>
- `Rainer Wuttke` (dev) <https://www.linkedin.com/in/rainer-wuttke-1114a1149/>

#### REQUISITOS FUNCIONAIS

| requisito | descrição |
| ------------ | ------------ |
| [RF01] Cadastro dos alunos | O sistema deve permitir que a instituição cadastre novos alunos no sistema. |
| [RF02] Cadastro dos professores | O sistema deve permitir que a instituição cadastre novos professores no sistema. |
| [RF03] Cadastro das atividades | O sistema deve permitir que a instituição cadastre novas atividades validas no sistema. |
[RF04] Cadastro dos cursos | O sistema deve permitir que a instituição cadastre novos cursos no sistema. |
| [RF05] Atualização cadastral | O sistema deve permitir que os alunos e professores possam atualizar suas informações de cadastro.|
| [RF06] Atualização institucional | O sistema deve permitir que a instituição possa atualizar seus cursos e atividades validas no sitema.|
| [RF07] Cadastro de atividades |  O sistema deve permitir que o aluno cadastre uma nova. |
| [RF08] Horas registradas |  O sistema deve permitir que o aluno visualize suas horas já aprovadas. |
| [RF09] Estado de atividades registradas |  O sistema deve permitir que o aluno o estado das atividades. |
| [RF010] Aprovação de horas |  O sistema deve permitir que o professor possa aprovar/desaprovar atividades cadastradas pelo aluno. |

![use_case](https://user-images.githubusercontent.com/64434954/173251375-4ab635cc-44c3-4030-b739-80c605302901.png)
> Use Case

#### REQUISITOS NAO FUNCIONAIS

- [RNF01] Banco Relacional
 [O sistem deverá ser feito com o banco postegres]

- [RNF02] Ambiente de Desenvolvimento
 [O sistem deverá ser feito utilizando Docker]

- [RNF03] Padrão do código
 [O ambiente de desenvolvimento deverá ter em suas configurações eslint e editorconfig]

#### PROJETO E TECNOLOGIA ENVOLVIDA

##### Frontend/web

- Javascript
- HTML5
- CSS3

##### Backend

- Nodejs
- Express

##### Repositório de dados

- Postgres

As principais entidades do sistema estão no diagrama de classe (UML) abaixo, incluindo também seus relacionamentos de colaboração e de generalização.

![tschool_modelo_banco](https://user-images.githubusercontent.com/64434954/173251387-7a0c98ef-3e95-4f24-a833-2acf524dc2e1.png)
> Diagrama de classe para as principais entidades do sistema

Abaixo os diagramas de banco de dados. As principais entidades do sistema segundo as apresentações no modelo físico.

![tschool_modelo_banco_dados](https://user-images.githubusercontent.com/64434954/173251399-df729054-59c8-434a-9523-ff0e4a803542.png)
> Modelo entidade relacionamento

#### RESULTADOS

Abaixo uma sequência de imagens que mostram o protótipo desenvolvido.

![login](https://user-images.githubusercontent.com/64434954/173251580-03a6bbf5-133f-41a2-8349-d939656980c3.png)
![login](https://user-images.githubusercontent.com/64434954/173251582-ba065fdd-41e3-4c78-9727-85043d537ef4.png)

> Tela exemplo de visualização das atividades

Agora uma sequência de imagens demonstrando algumas telas do sistema no módulo web.

Entre as principais características estão a preocupação com uso de cores, posicionamento das imagens e facilidade de uso através de componentes baseados em cards, type fonte bem apresentáveis e estética, como um todo, adequada ao contexto do sistema.

#### INSTALAÇÃO

##### script para estrutura de banco

```java
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

```

#### Extras

- <https://trello.com/b/m7TEyWMi/pi-unasp>
- <https://www.figma.com/file/FkvgqeY9CFyTPMaG1kR10O/Login?node-id=0%3A1>

> TSchool, é show!
