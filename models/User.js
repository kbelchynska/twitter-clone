const { Schema, model, models } = require("mongoose");

const userSchema = new Schema({
    name: String,
    email: String,
    image: String,
    userName: String,
});

const User = models?.User || model('User', userSchema);

export default User;