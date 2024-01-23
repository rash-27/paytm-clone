const mongoose = require("mongoose");
const z = require("zod");
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
  });

const userValidation = (user)=>{ 
    const User = z.object({
    name : z.string().min(3).max(50),
    email  : z.string().email(),
    password : z.string().min(8).max(50),

})
 return User.safeParse(user);
}
module.exports.User = mongoose.model("User", userSchema);
  