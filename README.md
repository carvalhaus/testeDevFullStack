# testeDevFullStack

Este projeto implementa uma página de login e cadastro de usuários com diferentes níveis de permissão, utilizando React no front-end, Laravel no back-end e SQLite como banco de dados.

## funcionalidades

O sistema inclui três tipos de usuários com permissões específicas:

- **Administrador (Nível 1)**: Pode visualizar, editar e excluir outros usuários.
- **Moderador (Nível 2)**: Pode visualizar e editar outros usuários, mas não pode excluir.
- **Leitor (Nível 3)**: Pode visualizar outros usuários, mas não tem permissão para editar ou excluir.

## requisitos

Antes de iniciar o projeto, você precisa ter o [Docker](https://www.docker.com/get-started) instalado em sua máquina.

## inicialização do projeto

1. Clone este repositório para sua máquina local:

   ```bash
   git clone git@github.com:carvalhaus/testeDevFullStack.git
   cd testeDevFullStack
   ```

2. Construa os containers Docker:

   ```bash
   docker-compose up --build -d
   ```

3. Acesse o projeto através do seu navegador:

   ```bash
   http://localhost:4173
   ```

## usuários Cadastrados

O projeto já possui alguns usuários cadastrados para facilitar os testes, incluindo um **Administrador**. Você pode usar essas credenciais para realizar o login e testar o sistema.

### exemplos de usuários:

- **Administrador (Nível 1)**:

  - Usuário: `administrador@senacrs.com.br`
  - Senha: `adminpassword`

- **Moderador (Nível 2)**:

  - Usuário: `vidal.carine@senacrs.com.br`
  - Senha: `carinepassword`

- **Leitor (Nível 3)**:
  - Usuário: `silva.pedro@senacrs.com.br`
  - Senha: `pedropassword`

Os demais exemplos de usuários seguem o mesmo padrão de email e senha.
