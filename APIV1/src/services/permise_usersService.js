const express = require('express');
const {request , response} = require('express');

const db = require('../../models');
const Permiso_usuarios = db.Permiso_usuarios;

    const 
    getPermise_users = async (res,req) => {
      const permiso_usuarios = await Permiso_usuarios.findAll();
        res.status(200).json(permiso_usuarios);
    },
        
    getPermise_usersID = async (id) => {
      const permiso_usuarios= await Permiso_usuarios.findByPk(id);
        return permiso_usuarios;
    } ,

    CreatePermise_users = async (datos) => {
        const permiso_usuarios = await Permiso_usuarios.create(datos);
        return permiso_usuarios ;

    };
        
    PatchPermise_users= async (id, datos) => {
      const [updated] = await Permiso_usuarios.update(datos, {
        where: { ID_permiso_usuarios:id },
      });

      if (updated) {
        const updatedPermise_users = await Permiso_usuarios.findByPk(id);
        return updatedPermise_users;

      }else{
        return { status: 404, message: 'Permise_users not found' };
      }
    },

    DeletePermise_users = async (id) => {
      const deleted = await Permiso_usuarios.destroy({ where: {ID_permiso_usuarios: id}, });
      if (deleted) {
        return deleted;
      }else{
        return {status: 404, message: 'Permise_users not found' };
      }
    } 


        
        

module.exports = {
    getPermise_users,
    getPermise_usersID,
    CreatePermise_users,
    PatchPermise_users,
    DeletePermise_users
}