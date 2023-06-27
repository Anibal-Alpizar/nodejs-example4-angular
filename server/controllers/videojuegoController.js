const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
//Obtener listado
module.exports.get = async (request, response, next) => {
  const videojuegos = await prisma.videojuego.findMany({
    orderBy: {
      nombre: 'asc',
    },
   /*  select: {
      id: true,
      nombre: true,
    }, */
  });
  response.json(videojuegos);
};
//Obtener por Id
//locahost:3000/videojuego/2
module.exports.getById = async (request, response, next) => {
    let id=parseInt(request.params.id);
    const videojuego=await prisma.videojuego.findUnique({
        where: { id: id },
        include:{
            generos:true
        }
    })
    response.json(videojuego);
};
//Crear un videojuego
module.exports.create = async (request, response, next) => {
  let videojuego = request.body;
  const newVideojuego = await prisma.videojuego.create({
    data: {
      nombre: videojuego.nombre,
      descripcion: videojuego.descripcion,
      precio: videojuego.precio,
      publicar: videojuego.publicar,
      generos: {
        //Generos tiene que ser {id:valor}
        connect: videojuego.generos,
      },
    },
  });
  response.json(newVideojuego);
};
//Actualizar un videojuego
module.exports.update = async (request, response, next) => {
  let videojuego = request.body;
  let idVideojuego = parseInt(request.params.id);
  //Obtener videojuego viejo
  const videojuegoViejo = await prisma.videojuego.findUnique({
    where: { id: idVideojuego },
    include: {
      generos: {
        select:{
          id:true
        }
      }
    }
  });

  const newVideojuego = await prisma.videojuego.update({
    where: {
      id: idVideojuego,
    },
    data: {
      nombre: videojuego.nombre,
      descripcion: videojuego.descripcion,
      precio: videojuego.precio,
      publicar: videojuego.publicar,
      generos: {
        //Generos tiene que ser {id:valor}
        disconnect:videojuegoViejo.generos,
        connect: videojuego.generos,
      },
    },
  });
  response.json(newVideojuego);
};
