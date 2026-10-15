# API REST - Clínica Odontológica

CMP2304 - Tecnologia de Construção de Software I - Prova P2 (PUC Goiás)

## Executar
1. Criar o banco: `mysql -u root -p < schema.sql`
2. `npm install`
3. `npm start` (API em http://localhost:3000)

Variáveis opcionais: DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, PORT.

## Rotas
- GET /paciente
- GET /paciente/:id
- POST /paciente
- PUT /paciente/:id
- DELETE /paciente/:id

Body (POST/PUT):
```json
{ "nome": "Roberto Almeida", "telefone": "(62) 94444-6666", "procedimento": "Restauração dentária" }
```
