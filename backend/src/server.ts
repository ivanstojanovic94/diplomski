import "dotenv/config";
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose, { Connection } from 'mongoose';

import path from 'path';


import userGeneralRouter from './routes/user.general.routes';
import adminRouter from './routes/admin.routes';
import publicCallsRouter from './routes/publicCalls.routes';
import applicationsRouter from './routes/applications.routes';
import notificationsRouter from './routes/notifications.routes';
import registrationTemplateRouter from './routes/registrationTemplate.routes';
import fileRouter from './routes/file.routes';
import registrationTemplate from "./models/registrationTemplate";
import seedData from "./models/registrationTemplateSeedData";
import user from "./models/user";
import adminSeed from "./models/adminSeed";



const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join('uploads')));


const mongoUri = process.env.MONGO_DB;

mongoose.connect(mongoUri)
        .then(async () => {
            await user.deleteOne({id: 1});
            console.log("seeding admin");
                var admin = new user();
                admin.data = adminSeed;
                admin.id = 1;
                console.log(admin);
                await admin.save();
        })
        .then(async () => {
            console.log("try to delete");
            await registrationTemplate.deleteOne({id: '1'});
        })
        .then(async ()=>{
            console.log("try to save");
            console.log(seedData);
                let newTemplate=new registrationTemplate();
                newTemplate.id = 1;
                newTemplate.data = seedData;
                    
                    var res = await newTemplate.save();
                    console.log(res);
            })
        .catch(() => {console.log("Error while connecting to mongoose...")});

const connection = mongoose.connection;

connection.once('open', ()=>{
    console.log('mongo ok');
    

});

// Create storage engine

const router = express.Router();
router.use('/userGeneral', userGeneralRouter);
router.use('/admin', adminRouter);
router.use('/publicCalls', publicCallsRouter);
router.use('/applications', applicationsRouter);
router.use('/notifications',notificationsRouter);
router.use('/registrationTemplate', registrationTemplateRouter);
router.use('/files',fileRouter);




app.use('/',router);
app.listen(4000, () => console.log(`Express server running on port 4000`));