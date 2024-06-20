import express from 'express';
import RegistrationTemplate from '../models/registrationTemplate';
import User from '../models/user';

export class RegistrationTemplateController{
    addNewTemplate=(req: express.Request, res: express.Response)=>{
        let newTemplate=new RegistrationTemplate(req.body);
        newTemplate.id=1;
        
        newTemplate.save().then(template=>{
            res.json({'message':'ok'})
           
        }).catch(err=>{
            console.log(err);
            
        })

    }

    deleteOldTemplate=(req: express.Request, res: express.Response)=>{
        RegistrationTemplate.deleteOne({'id':1},err=>{
            if(err) console.log(err);
            else res.json({'message':'ok'});
        })
    }

    getTemplate= async (req: express.Request, res: express.Response)=> {
        try {
            const obj = await RegistrationTemplate.findOne({ 'id': 1 });
            if (!obj) {
              return res.status(404).send('Template not found');
            }
            return res.status(200).json(obj);
          } catch (err) {
            return res.status(500).send(err);
          }
    }
}