const mongoose = require('mongoose');
const connection=async()=>{

    try {
        await mongoose.connect(process.env.CONNECTION, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
          },
            console.log('db connected')
            );   
    
    } catch (error) {
            console.log(error.message)        
    }

}

module.exports=connection;