const express = require('express');
const {request , response} = require('express');

const db = require('../../models');
const Roles = db.Roles;

    const 


    getRol = async (res,req) => {
      const roles = await Roles.findAll();
        res.status(200).json(roles);
    },
        
    getRolesID = async (id) => {
      const roles = await Roles.findByPk(id);
        return roles;
    } ,

    CreateRoles = async (datos) => {
        const roles = await Roles.create(datos);
        return roles;

    },
        
    PatchRoles = async (id, datos) => {
      const [updated] = await Roles.update(datos, {
        where: { ID_rol:id },
      });

      if (updated) {
        const updatedroles = await Roles.findByPk(id);
        return updatedroles;
      }else{
        return { status: 404, message: 'roles not found' };
      }
    },

    DeleteRoles = async (id) => {
      const deleted = await Roles.destroy({ where: {ID_rol: id}, });
      if (deleted) {
        return deleted;
      }else{
        return {status: 404, message: 'roles not found' };
      }


    } 


        
        

module.exports = {
    getRol,
    getRolesID,
    CreateRoles,
    PatchRoles,
    DeleteRoles,
}