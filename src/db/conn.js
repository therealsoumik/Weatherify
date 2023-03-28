const mongoose =  require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/weatherapp",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(() =>{
    console.log('connection successful');
}).catch((e) =>{
    console.log(e.message);
})
    