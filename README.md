# Fincheck

Fincheck aims to help users control their personal finances easily and efficiently.

## Run Locally

To run this project in your machine you first need to clone the project.

```bash
  git clone https://github.com/maarcotulio/fincheck.git
```

Go to the project directory

```bash
    cd fincheck
```

Install dependencies the dependencies in the api folder.

```bash
    pnpm install
```
Create the .env file and complete with the necessary infomations of the JWT and your database.

```env
    DATABASE_URL="postgresql://exampleUser:examplePassword@localhost:5432/example?schema=public"
    JWT_SECRET="example"
```

Run your docker with PostgreSQL. After, create a migration with prisma and start the API.

```bash
    pnpm prisma migrate dev
    pnpm start:dev
```

Go to the frontend folder **install the dependencies** and create a .env file and fill it with the link to the API. The standart is the port 3000.

```env
    VITE_API_URL="http://localhost:3000"
```

Last step, start the frontend.

```bash
    pnpm dev
```

## Built With

- Prisma
- Nest.js
- PostgreSQL 
- Zod
- Vite
