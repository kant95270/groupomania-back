## Groupomania P7

this is the backend for the Groupomania projet

### Technologie used

- Node.js, Express, JWT , Multer
- MySQl hosted on PlanetScale
- Prisma for ORM

### How to use

1. 'git clone' this repo
2. 'npm install'
3. Rename the '.env.development' file into '.en'
4. Populate it with your personal environment variables
5. This repo was tested with an online PlanetScale MySQl database

### How to use Prisma to interact with the DB

The db schema is inside the 'schema.Prisma'

if you want to change it, you have ton run 'npx prisma db push'

to launch the 'npm run dev' 