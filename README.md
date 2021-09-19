
<h1 align="center">
  <br/>
  <img src="https://user-images.githubusercontent.com/55251721/133930263-b9668899-447d-4f9d-ab74-09dc12e8ab92.png" width=310 />
</h1>
<h2 align="center">
  <a href="https://github.com/rafaelnrabelo/NoteList-Backend#testando">
    <img src="https://img.shields.io/badge/Testing-Install-%23FFFFFF" alt="testing"/>
  </a>
  <a href="https://github.com/rafaelnrabelo/NoteList-Backend/releases/latest">
    <img src="https://img.shields.io/badge/Last%20Release-2.1.1-%23FFFFFF" alt="release"/>
  </a>
</h2>
    
## Dependências
  - NodeJS
  - Express
  - TypeORM
  - Multer
  - Cors
  - Celebrate
   
## Testando:
   1. Clone o repositorio usando `git clone https://github.com/rafaelnrabelo/students.dash-Backend.git`
   2. Mova para a pasta clonada usando `cd students.dash-Backend`
   3. Crie um arquivo `.env` com as chaves presentes no arquivo `.env.example`
   4. Crie um arquivo `ormconfig.json` com:
```json
[
  {
    "name": "default",
    "type": "postgres",
    "host": "Host da DB",
    "port": "Porta da DB",
    "username": "User da DB",
    "password": "Senha da DB",
    "database": "Nome da DB",
    "entities": ["./src/database/entities/*.ts"],
    "migrations": ["./src/database/migrations/*.ts"],
    "cli": {
      "migrationsDir": "./src/database/migrations"
    }
  }
]
```
   5. Instale todas dependecias usando `yarn install`
   6. Execute as Migrations usando `yarn typeorm migration:run`
   7. Execute `yarn dev` para iniciar o servidor.
