const express = require('express')
const ApiLog = require('./models/productModel')
const app = express()
// Using Node.js `require()`
const mongoose = require('mongoose');

// Using ES6 imports
// import mongoose from 'mongoose';
app.use(express.json())

//Routes
app.get('/', (req, res)=> {
   res.send("Hello this Node Api2")
})


app.get('/getApiLogs', async(req, resp)=> {
    // console.log(req.body)
    // resp.send(req.body)
    console.log("getapi hiting")
    try {
        const allApiLogs = await ApiLog.find({});
        resp.status(200).json({message:"Data Reterived", allApiLogs});
    } catch (error) {
        console.log(error.message)
        resp.status(500).json({message: error.message})        
    }
})
app.get('/getApiLog/:id', async(req, resp)=> {
    // console.log(req.body)
    // resp.send(req.body)
    try {
        const {id} = req.params;
        const allApiLogs = await ApiLog.findById(id);
        resp.status(200).json({message:"Data Reterived", allApiLogs});
    } catch (error) {
        console.log(error.message)
        resp.status(500).json({message: error.message})        
    }
})
// app.get('/getApiLog/:name', async(req, resp)=> {
//     // console.log(req.body)
//     // resp.send(req.body)
//     try {
//         const {name} = req.params;
//         const allApiLogs = await ApiLog.find({apiName:name});
//         resp.status(200).json({message:"Data Reterived", allApiLogs});
//     } catch (error) {
//         console.log(error.message)
//         resp.status(500).json({message: error.message})        
//     }
// })
// app.get('/getApiLogByApiName', async (req, resp) => {
//     try {
//         const { apiName } = req.query;
//         if (!apiName) {
//             return resp.status(400).json({ message: "apiName parameter is required" });
//         }
//         const apiLogs = await ApiLog.find({ apiName: apiName });
//         resp.status(200).json({ message: "Data Retrieved", apiLogs });
//     } catch (error) {
//         console.log(error.message);
//         resp.status(500).json({ message: error.message });
//     }
// });
app.get('/getApiLogByApiName', async (req, resp) => { 
    try {
        const { apiName } = req.body;
        if (!apiName) {
            return resp.status(400).json({ message: "apiName field is required in the request body" });
        }
        const apiLogs = await ApiLog.find({ apiName: apiName });
        resp.status(200).json({ message: "Data Retrieved Successfully!", apiLogs });
    } catch (error) {
        console.log(error.message);
        resp.status(500).json({ message: error.message });
    }
});

// app.post('/addApiLogs', async(req, resp)=> {
//     // console.log(req.body)
//     // resp.send(req.body)
//     try {
//         const apiLog = await ApiLog.create(req.body);
//         resp.status(200).json({message:"Data Inserted Successfully", apiInput:apiLog});
//     } catch (error) {
//         console.log(error.message)
//         resp.status(500).json({message: error.message})        
//     }
// })

app.post('/addApiLogs', async(req, resp) => {
    try {
        const { apiName, inputJson, outputJson } = req.body;

        // Check if all required fields are present
        if (!apiName || !inputJson || !outputJson) {
            return resp.status(400).json({ message: "Invalid API input. Please provide all required fields" });
        }

        const apiLog = await ApiLog.create(req.body);
        resp.status(200).json({ message: "Data Inserted Successfully", apiInput: apiLog });
    } catch (error) {
        console.log(error.message);
        resp.status(500).json({ message: error.message });        
    }
});



app.get('/blog', (req, res)=> {
    res.send("Hello blog")
 })
 app.get('/test', (req, res)=> {
    res.send("Hello blog test")
 })
 



mongoose.connect('mongodb+srv://waqas:Waqas122@admaximpp-v1.9vd9awe.mongodb.net/AdMaximPP-v1?retryWrites=true&w=majority&appName=AdMaximPP-v1')
  .then(() => {
    console.log('MongoDB Connected!')
    app.listen(3000, ()=> {
        console.log('Node Api is running...')
    })
}).catch((error)=> {
    console.log(error + "There is Error Making Connection")
}); 
 