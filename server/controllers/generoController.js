const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.get = async (request, response, next) => {
  const generos = await prisma.genero.findMany({
    orderBy: {
      nombre: "asc",
    },
  });
  response.json(generos);
};
module.exports.getById = async (request, response, next) => {
  let id = parseInt(request.params.id);
  const genero = await prisma.genero.findUnique({
    where: {
      id: id,
    }
  });
  response.json(genero);
};

