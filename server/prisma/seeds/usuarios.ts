import {Role } from "@prisma/client";
export const usuarios = [
  //1
  {
    nombre: "usuarioAdmin1",
    email: "usuario-admin1@prueba.com",
    password: "123456",
    role: Role.ADMIN,
  },
  //2
  {
    nombre: "usuarioAdmin2",
    email: "usuario-admin2@prueba.com",
    password: "123456",
    role: Role.ADMIN,
  },

  //3
  {
    nombre: "usuarioCliente1",
    email: "usuario-cliente1@prueba.com",
    password: "123456",
  },

  //4
  {
    nombre: "usuarioCliente2",
    email: "usuario-cliente2@prueba.com",
    password: "123456",
  },
];
