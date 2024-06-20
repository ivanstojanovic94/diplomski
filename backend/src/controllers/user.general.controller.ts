import express from 'express';
import User from '../models/user';

export class UserGeneralController{
    login = async (req: express.Request, res: express.Response)=>{
        let username=req.body.username;
        let password=req.body.password;
        //let type=req.body.type;
       
        try{
            const user = await User.findOne({ username, password});
            var users = await User.find();
            const user2 = users.filter(e => e.username == username && e.password == password);
            if (!user2) {
              console.log(`User not found for username '${username}' and password '${password}'`);
              return res.status(404).json({ error: 'User not found' });
            }
        console.log(user2);
        res.json(user2);
        }catch(error){
            console.log(error);
        }
    }

    changePassword=(req: express.Request, res: express.Response)=>{
        let username=req.body.username;
        let newPass=req.body.newPass;
        User.collection.updateOne({'username': username}, {$set: {password: newPass}});
        res.json({message:'ok'});
    }

    deactivateAccount=(req: express.Request, res: express.Response)=>{
        let username=req.body.username;
        User.collection.updateOne({'username': username}, {$set: {activeAccount: 0}});
        res.json({message: 'ok'});
    }

    register=(req: express.Request, res: express.Response)=>{
       
        User.find({'username':req.body.username},(err,users)=>{
            
            
            if(users.length!=0){
                
                res.json({'message':'usernameExists'});
            }else{
                User.find({},(err,users)=>{
                    if(err) console.log(err);
                    else{
                        let id=users[users.length-1].id+1;
                        let app=new User(req.body);
                        app.id=id;
                        app.save().then(app=>{
                            res.json({"message":"ok"});
                        }).catch(err=>{
                            console.log(err);
                        })
                    }
                })
            }
        })
       
    }
}