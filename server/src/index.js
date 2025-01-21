
const cluster=require('cluster');
const os=require('os');
const express=require('express');
const cors=require('cors');
const cookieParser = require('cookie-parser');
const { corsOptions } = require('./utils/utils');
const connection = require('./connection/database');
const MainRoutes = require('./routes/mainRoutes');
const app=express();
const PORT=process.env.PORT || 5000;
// This will spawn multiple processes (workers) to fully utilize multi-core CPUs.//
// if(cluster.isMaster){
//     const cpus=os.cpus().length;
//     console.log(`Clustering to ${cpus/2} CPUs`);
//     for(let i=0;i<Math.floor(cpus/2);i++){
//         cluster.fork();
//     }
//     cluster.on('exit',(worker,code,signal)=>{
//         console.log(`Worker ${worker.process.pid} died`);
//         cluster.fork();
//     });
// }
// else{
//     app.use(express.json());
//     app.use(cookieParser());
    
//     app.use(express.urlencoded({extended:true}));
//     // app.use('/api',require('./routes/api'));
//     //cors//
//     app.use("/api",MainRoutes.init());
//     app.use(cors(
//         corsOptions
//     ));
    
//        app.listen(PORT,async ()=>{
//         await connection();
//         console.log(`Server started on port ${PORT} with process id ${process.pid}`);
//     });
// }
app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({extended:true}));
// app.use('/api',require('./routes/api'));
//cors//
app.use("/api",MainRoutes.init());
app.use(cors(
    corsOptions
));

   app.listen(PORT,async ()=>{
    await connection();
    console.log(`Server started on port ${PORT} with process id ${process.pid}`);
});


