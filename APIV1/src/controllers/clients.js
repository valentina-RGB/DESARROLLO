const express = require('express');
const {request , response} = require('express');
const clientService = require('../services/clientsServices');

const 
    
    getClient = (req= req, res= response) =>{
        const allclient = clientService.getClient(req,res)
    } ,  
    
    getClientID = async (req = request, res= response) =>{  
        const clientId = req.params.id;

        try {
            const oneclient = await   clientService.getClientID(clientId)
            return res.status(oneclient.status).json(oneclient.data || { message: oneclient.message });
          } catch (error) {
            return res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
          }
    } ,  

    postClient = async  (req = request, res= response) => {
        try {
            const client = req.body;
            const result = await clientService.postClient(client); 
            res.status(201).json({ message: 'client created successfully', result });
        } catch (error) {
            const statusCode = error.status || 500;
            res.status(statusCode).json({ error: error.message || 'Internal Server Error' });
        }
    
    } ,

    patchClient = async (req = request, res= response) =>{
        try {
            const clientId = req.params.id;
            const client = req.body; 
            const updateclient = await clientService.patchClient(clientId, client);

            res.status(200).json({ message: 'client updated successfully',updateclient });
            
        } catch (error) {
            const statusCode = error.status || 500;
            res.status(statusCode).json({ error: error.message || 'Internal Server Error' });
        }
    } ,

    deleteClient = async (req = request, res= response) =>{
        try {
            const clientId = req.params.id; 
            const result = await clientService.deleteClient(clientId);
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'client not found' });
            }
            
            res.status(200).json({ message: 'client deleted successfully' });
        } catch (error) {
            const statusCode = error.status || 500;
            res.status(statusCode).json({ error: error.message || 'Internal Server Error' });
        } 
    }


module.exports = {
    getClient,
    getClientID,
    postClient,
    patchClient,
    deleteClient
}
const express = require('express');
const {request , response} = require('express');
const clientService = require('../services/clientsServices');

const 
    
    getClient = (req= req, res= response) =>{
        const allclient = clientService.getClient(req,res)
    } ,  
    
    getClientID = async (req = request, res= response) =>{  
        const clientId = req.params.id;

        try {
            const oneclient = await   clientService.getClientID(clientId)
            return res.status(oneclient.status).json(oneclient.data || { message: oneclient.message });
          } catch (error) {
            return res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
          }
    } ,  

    postClient = async  (req = request, res= response) => {
        try {
            const client = req.body;
            const result = await clientService.postClient(client); 
            res.status(201).json({ message: 'client created successfully', result });
        } catch (error) {
            const statusCode = error.status || 500;
            res.status(statusCode).json({ error: error.message || 'Internal Server Error' });
        }
    
    } ,

    patchClient = async (req = request, res= response) =>{
        try {
            const clientId = req.params.id;
            const client = req.body; 
            const updateclient = await clientService.patchClient(clientId, client);

            res.status(200).json({ message: 'client updated successfully',updateclient });
            
        } catch (error) {
            const statusCode = error.status || 500;
            res.status(statusCode).json({ error: error.message || 'Internal Server Error' });
        }
    } ,

    deleteClient = async (req = request, res= response) =>{
        try {
            const clientId = req.params.id; 
            const result = await clientService.deleteClient(clientId);
            
            if (result.affectedRows === 0) {
                return res.status(404).json({ error: 'client not found' });
            }
            
            res.status(200).json({ message: 'client deleted successfully' });
        } catch (error) {
            const statusCode = error.status || 500;
            res.status(statusCode).json({ error: error.message || 'Internal Server Error' });
        } 
    }


module.exports = {
    getClient,
    getClientID,
    postClient,
    patchClient,
    deleteClient
}