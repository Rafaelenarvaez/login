const mongoose = require ('mongoose');
const {Schema}= mongoose;
const bcrypt = require('bcrypt-nodejs');
const userSchema = new Schema({
    nombre: String,
    apellido: String,
    usuario:String,
    email:String,
    password:String,
})
userSchema.methods.encryptPassword= (password) =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('users',userSchema);