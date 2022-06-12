# Plusle

Plusle é um sistema responsável por registrar alunos e suas horas complementares, possibilitando com que os professores possam avaliar e validar as horas registradas pelos alunos.

![Logo](https://github.com/ThiagoEliasSSP/Plusle/issues/1#issue-1268687201)

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

![use_case](https://github.com/ThiagoEliasSSP/Plusle/issues/1#issuecomment-1153279701)
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

![tschool_modelo_banco](https://github.com/ThiagoEliasSSP/Plusle/issues/1#issuecomment-1153279888)
> Diagrama de classe para as principais entidades do sistema

Abaixo os diagramas de banco de dados. As principais entidades do sistema segundo as apresentações no modelo físico.

![tschool_modelo_banco_dados](https://github.com/ThiagoEliasSSP/Plusle/issues/1#issuecomment-1153279969)
> Modelo entidade relacionamento

#### RESULTADOS

Abaixo uma sequência de imagens que mostram o protótipo desenvolvido.

![Tela-Inicial-Login](https://user-images.githubusercontent.com/34111297/70012793-4d81a680-1554-11ea-96a8-2e1c3ab38b43.jpg)

![Login](https://user-images.githubusercontent.com/34111297/70012956-cb45b200-1554-11ea-9982-265d87d03118.png)](<https://github.com/ThiagoEliasSSP/Plusle/issues/1#issuecomment-1153281508>)
> Tela mobile de apresentação e de login

Agora uma sequência de imagens demonstrando algumas telas do sistema no módulo web.

Entre as principais características estão a preocupação com uso de cores, posicionamento das imagens e facilidade de uso através de componentes baseados em cards, type fonte bem apresentáveis e estética, como um todo, adequada ao contexto do sistema.

![TSCHOOL_WEB_TELALOGIN](https://user-images.githubusercontent.com/2241850/111889093-0fb2c680-89c1-11eb-9c52-908b9127dd91.png)
> Tela de acesso do sistema

Tela de gestão dos eventos. Nela o administrador pode controlar todos os eventos do sistema. Algumas operações são baseadas e limitadas por algumas regras de negócio, por exemplo  um evento não pode ser cancelado muito próximo ao início do evento.

![TSCHOOL_WEB_EVENTOS](https://user-images.githubusercontent.com/2241850/111889101-1b9e8880-89c1-11eb-9757-c4a3e4bacdde.png)
> Tela de gestão e controle de eventos

#### INSTALAÇÃO

###### script para estrutura de banco

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
