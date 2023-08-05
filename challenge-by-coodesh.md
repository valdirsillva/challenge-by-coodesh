
## Sobre o projeto

Aplicação construída para dar suporte a equipes de nutricionistas por meio de um processo ETL (Leitura, extração e transformação ) em uma base de produtos alimentícios.

## Tecnologias utilizadas

- NodeJS
- Typescript
- Axios
- Jest
- Express
- MongoDB
- Mongoose
- ElasticSearch
- Swagger UI
- Swagger UI Express

## Como rodar projeto
* Preencher as variáveis de ambiente:
Deve ser preenchido:
A porta e string de conexão com o MongoDB Atlas ou banco de dados local.

- PORT: 
- DATABASE_MONGODB: 
- FOOT_DATASET="https://challenges.coode.sh/food/data/json/"
- FOOD_DATA_TEXT="https://challenges.coode.sh/food/data/json/index.txt"

* Instalando as dependências.
``` npm install ```

* Extrair base de dados do projeto web.
``` npm run init ```
**Obs:** - Para que a importação dos dados no banco seja concluída é necessário que a API esteja rodando.

* Executar projeto
```npm run dev ``` 

>  This is a challenge by [Coodesh](https://coodesh.com/)

### REST API

 - `GET /`: Retorna detalhes sobre a API
 - `GET /api/products`: Lista todos os produtos cadastrados
 - `DELETE /api/products/:code`: Muda o status do produto para `trash`
 - `GET /api/products/:code`: Retorna um único produto.
