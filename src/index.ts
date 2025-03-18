import { serve } from '@hono/node-server'
import { PrismaClient } from '@prisma/client';
import { Hono } from 'hono'


const prismaClient = new PrismaClient();

// await prismaClient.country.createMany({
//   data : [
//     {
//       name: "United States of America",
//       CountryCode: "USA",
//     },
//     {

//         name: "United States of America",
//         CountryCode: "USA",

//     },
//   ],

// });



// const countries = await prismaClient.country.findMany();

// console.log("countries:", countries);





// const app = new Hono()

// app.get('/', (c) => {
//   return c.json({ message: 'Hello, World!' })
// })

// serve(app)

// serve({
//   fetch: app.fetch,
//   port: 3000
// }, (info) => {
//   console.log(`Server is running on http://localhost:${info.port}`)
// })



// const select = (parameters : {tableName: string ; columns : string[]}) => {
// const tableName = parameters.tableName;
// const columns = parameters.columns.join(', ');

// const sqlQuery = `SELECT ${columns} FROM ${tableName}`;

// return sqlQuery;


// };

// const execute = (sqlQuery: string): void => {
//   const psqlCommmand = `psql -U postgres -d mydb -c "${sqlQuery}"`;
// };

// const sqlQuery = select({ tableName: 'users', columns: ['name', 'email'] });
// execute(sqlQuery);


// GET /countries
// post /countries
// {
// "name": "United States of America",
// "CountryCode": "USA"

// }

// patch /countries/:countycode

// {
//   "name" : "United States of America",
// }

// delete /countries/:countrycode

const app = new Hono()


serve(app)


app.get('/countries', async (c) => {
  const countries = await prismaClient.country.findMany();
  // return c.json({ countries });

  return c.json({ countries }, 200);

})


app.post('/countries', async (c) => {
  const { name, CountryCode } = await c.req.json();
  const country = await prismaClient.country.create({
    data: {
      name,
      CountryCode,
    }
  });
  return c.json({ country }, 201);
})


app.patch('/countries/:CountryCode', async (c) => {

  const { CountryCode } = c.req.param();
  const { name } = await c.req.json();

  const country = await prismaClient.country.update({
    where: {
      CountryCode,
    },
    data: {
      name,
    }
  });

  return c.json({ country }, 200);

});


app.delete('/countries/:CountryCode', async (c) => {
  const { CountryCode } = c.req.param();
  const country = await prismaClient.country.delete({
    where: {
      CountryCode,
    }
  });

  return c.json({ country }, 200);




});





console.log("Server is running on http://localhost:3000");

