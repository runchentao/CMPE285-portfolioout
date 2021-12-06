const express = require('express');
const { spawn } = require('child_process');

const app = express()
const PORT = process.env.PORT || 5000;

app.use(express.json({extended: false}));

app.use("/suggest", require("./routes/suggest"));

app.get('/test', (req, res) => {
    try {
        return res.json({data: "test route OK"});
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
})

// app.get('/', (req, res) => {
//     let dataToSend;
//     // spawn new child process to call the python script
//     const python = spawn('python', ['testScript.py', 'node.js', 'python']);
//     // collect data from script
//     python.stdout.on('data', function (data) {
    
//     console.log('Pipe data from python script ...');
   
//     dataToSend = data.toString();
//     });
//     // in close event we are sure that stream from child process is closed
//     python.on('close', (code) => {
//     console.log(`child process close all stdio with code ${code}`);
//     // send data to browser
//     res.json(dataToSend)
//     });
// });

app.listen(PORT, () => console.log(`Server running on port ${PORT}!`))