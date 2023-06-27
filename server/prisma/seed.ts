import { PrismaClient } from '@prisma/client';
import { generos } from './seeds/generos';
import { usuarios } from './seeds/usuarios';

const prisma = new PrismaClient();

async function main() {
  //Generos
  await prisma.genero.createMany({
    data: generos
    /* data: [
        { nombre: "Genero1"},
        { nombre: "Genero 2"}
    ] */
  });
  //Usuarios
  await prisma.usuario.createMany({
    data: usuarios
  });
  //Videojuegos
  await prisma.videojuego.create({
    //Instancia de videojuego 1
    data: {
      nombre: 'Super Mario Odyssey',
      descripcion:
        'Únete a Mario en una épica aventura en 3D al mejor estilo trotamundos, usa sus nuevas e increíbles habilidades para obtener lunas con las que cargarás la nave Odyssey para así rescatar a la princesa Peach de los malévolos planes de boda de Bowser',
      precio: '44.99',
      generos: {
        connect: [{ id: 1 }, { id: 5 }]
      }
    }
  });

  //Instancia de videojuego 2
  await prisma.videojuego.create({
    data: {
      nombre: 'Pikmin™ 3 Deluxe ',
      descripcion:
        '¡Comanda un grupo de 5 diferentes Pikmin™ para dominar todos los obstáculos, derrotar las criaturas y encontrar alimentos para tu planeta! Incluso puedes invitar a un segundo jugador para dividir las tareas mientras exploras un mundo que parece inmenso desde la perspectiva de un ser diminuto',
      precio: '59.99',
      generos: {
        connect: [{ id: 1 }, { id: 2 }, { id: 4 }]
      }
    }
  });

  //Instancia de videojuego 3
  await prisma.videojuego.create({
    data: {
      nombre: 'The Legend of Zelda: Breath of the Wild ',
      descripcion:
        'Olvida todo lo que sabes acerca de los juegos de la serie The Legend of Zelda. Explora y descubre en un mundo lleno de aventuras en The Legend of Zelda: Breath of the Wild, un juego nuevo que rompe los esquemas de la serie aclamada.',
      precio: '62.89',
      generos: {
        connect: [{ id: 1 }, { id: 2 }, { id: 3 }]
      }
    }
  });

  //Instancia de videojuego 4
  await prisma.videojuego.create({
    data: {
      nombre: 'Luigi’s Mansion 3 ',
      descripcion:
        'Luigi ha sido invitado al hotel El Gran Descanso Real, ¡pero cuando Mario y sus amigos desaparecen, nuestro héroe de verde tendrá que superar sus miedos para poder salvarlos! Ataca, sopla y aspira a los fantasmas con la nueva Succionaentes GO-1000 y trabaja en conjunto con Gomiluigi para superar los complicados artilugios y traviesos jefes de cada piso temático. ',
      precio: '54.99',
      generos: {
        connect: [{ id: 1 }, { id: 2 }]
      }
    }
  });
  //Ordenes
await prisma.orden.create({
  data: {
    fechaOrden: new Date("2023-05-27"),
    usuarioId: 4,
    videojuegos: {
      createMany: {
        data: [
          { cantidad: 1, videojuegoId: 1 },
          { cantidad: 2, videojuegoId: 4 },
        ],
      },
    }, 
  },
});
await prisma.orden.create({
  data: {
    fechaOrden: new Date("2023-05-30"),
    usuarioId: 3,
    videojuegos: {
      createMany: {
        data: [
          { cantidad: 1, videojuegoId:2 },
        ],
      },
    }, 
  },
});
  await prisma.orden.create({
    data: {
      fechaOrden: new Date("2023-06-20"),
      usuarioId: 2,
      videojuegos: {
        createMany: {
          data: [
            { cantidad: 1, videojuegoId: 1 },
            { cantidad: 1, videojuegoId: 3 },
          ],
        },
      }, 
    },
  });
  await prisma.orden.create({
    data: {
      fechaOrden: new Date("2023-06-27"),
      usuarioId: 2,
      videojuegos: {
        createMany: {
          data: [
            { cantidad: 1, videojuegoId:4 },
            { cantidad: 1, videojuegoId: 3 },
          ],
        },
      }, 
    },
  });
  await prisma.orden.create({
    data: {
      fechaOrden: new Date("2023-07-02"),
      usuarioId: 1,
      videojuegos: {
        createMany: {
          data: [
            { cantidad: 1, videojuegoId: 4 }
          ],
        },
      },
    },
  });
  await prisma.orden.create({
    data: {
      fechaOrden: new Date("2023-07-05"),
      usuarioId: 4,
      videojuegos: {
        createMany: {
          data: [
            { cantidad: 1, videojuegoId: 3 },
          ],
        },
      },
    },
  });
  await prisma.orden.create({
    data: {
      fechaOrden: new Date("2023-07-15"),
      usuarioId: 3,
      videojuegos: {
        createMany: {
          data: [
            { cantidad: 1, videojuegoId: 2 },
            { cantidad: 1, videojuegoId: 1 },
          ],
        },
      },
    },
  });
  await prisma.orden.create({
    data: {
      fechaOrden: new Date("2023-08-02"),
      usuarioId: 4,
      videojuegos: {
        createMany: {
          data: [
            { cantidad: 1, videojuegoId: 3 },
            { cantidad: 1, videojuegoId: 4 },
          ],
        },
      },
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
