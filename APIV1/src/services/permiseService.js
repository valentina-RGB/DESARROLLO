const express = require('express');
const {request , response} = require('express');

const db = require('../../models');
const permiso = db.Permiso;

    const 


    getPermiso = async (res,req) => {
      const permiso = await permiso.findAll();
        res.status(200).json(permiso);
    },
        
    getPermisoID = async (id) => {
      const permisos = await permiso.findByPk(id);
        return permisos;
    } ,

    CreatePermiso = async (datos) => {
        const permisos = await permiso.create(datos);
        return permisos;

    };
        
    PatchPermiso = async (id, datos) => {
      const [updated] = await permiso.update(datos, {
        where: { ID_permiso:id },
      });

      if (updated) {
        const updatedpermiso = await permiso.findByPk(id);
        return updatedpermiso;
      }else{
        return { status: 404, message: 'permiso not found' };
      }
    },

    DeletePermiso = async (id) => {
      const deleted = await permiso.destroy({ where: {ID_permiso: id}, });
      if (deleted) {
        return deleted;
      }else{
        return {status: 404, message: 'permiso not found' };
      }


    } 


        
        

module.exports = {
    getPermiso,
    getPermisoID,
    CreatePermiso,
    PatchPermiso,
    DeletePermiso
}