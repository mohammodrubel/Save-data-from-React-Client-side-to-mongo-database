const { MongoClient } = require('mongodb');
const express = require ('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000
// midddleware
app.use(cors())
app.use(express.json())

// user:Userauthentication
// password:jAaUSpoAGC71I25S

const uri = "mongodb+srv://Userauthentication:jAaUSpoAGC71I25S@cluster0.i8wrn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


    async function run (){
        try{
            await client.connect()
            const database =client.db('moreInformation')
            const userCollection = database.collection('users')
          
            // POST API 
            app.post('/users',async(req,res)=>{
                const newUser = req.body;
                const result =await userCollection.insertOne(newUser)
                console.log('got a new user',(req.body))
                console.log('added user',result)
                res.send(result)
            })


        }
        finally{
            // await client.close()
        }
    }

    run().catch(console.dir)


app.get('/',(req,res)=>{
    res.send('Runing on CRUD server')
})

app.listen(port, ()=>{
    console.log('running server port',port)
})