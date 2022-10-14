# ASTRID API
## Como rodar o projeto localmente
Clonar o projeto

```console
git clone https://github.com/AllanScala1991/astrid_backend
```
Acessar a pasta a instalar as dependências
```console
cd astrid_backend
npm install
```

Apos configurar o Docker com o postgres rodar o comando para criar o banco de dados
```console
npx prisma migrate dev
```

Rodar o projeto
```console
npm run dev
```

## Variaveis de ambiente
> Devem ser setadas algumas variaveis de ambiente.

* DATABASE_URL: Endereço do DB PostegreSQL
* SECRET_TOKEN: token secreto md5
* LOCALHOST: url do seu localhost do front end
