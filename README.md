# 🍽️ Barone - Sistema de Receitas

Bem-vindo ao **Barone**, um sistema completo de gerenciamento de receitas desenvolvido para proporcionar uma experiência de cadastro, visualização, avaliação e interação entre usuários apaixonados por culinária.

O projeto foi implementado em **Java** utilizando **Spring Boot** e **MySQL** no backend, com **HTML**, **CSS** e **JavaScript puro** no frontend. O objetivo foi construir uma aplicação de receitas com recursos de CRUD, avaliação por estrelas e comentários públicos.

---

## 📌 Tecnologias Utilizadas

- **Java 21**
- **Spring Boot** (Maven)
- **Lombok**
- **MySQL**
- **HTML5**
- **CSS3**
- **JavaScript (Vanilla)**
- **IntelliJ IDEA** (backend)
- **Visual Studio Code** (frontend)

---

## 🚀 Manual de Execução

### 📦 Pré-requisitos

- **Java 21+**
- **MySQL 8+**
- **Maven**
- **IntelliJ IDEA** (ou IDE compatível)
- **Visual Studio Code** (ou editor de sua preferência)

### 📑 Configuração do Banco de Dados

1. Crie um banco de dados no MySQL chamado `barone`.
2. Configure o arquivo `application.properties` com as credenciais do seu ambiente local:
```yml
  spring.datasource.url=jdbc:mysql://localhost:3306/barone 
  spring.datasource.username=seu_usuario 
  spring.datasource.password=sua_senha 
  spring.jpa.hibernate.ddl-auto=update
```
3. Execute o projeto pela IDE (IntelliJ ou terminal via `mvn spring-boot:run`).

### 🖥️ Executar o Frontend

1. Navegue até a pasta `/frontend` (caso tenha separado).
2. Abra o arquivo `index.html` ou `recipes.html` diretamente pelo **VS Code** ou navegador.
3. Certifique-se de que o backend está rodando na porta **8080** para os endpoints funcionarem.

---

## 📋 Funcionalidades

- Cadastro e login de usuários.
- CRUD de receitas (nome, tipo, descrição, visibilidade pública).
- Listagem de receitas públicas de outros usuários.
- Comentários em receitas públicas.
- Avaliação de receitas de 1 a 5 estrelas.
- Toasts de notificação e interface responsiva com design dark-friendly.

---

## 📄 Licença

Este projeto está licenciado sob a Licença MIT. Consulte o conteúdo abaixo:

MIT License

Copyright (c) 2024 Marcos Emanuel Leite Santos

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

---

Desenvolvido por **Marcos Emanuel Leite Santos**. 
