import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, // უნიკალური ელ.ფოსტა
        trim: true,
        lowercase: true
    },
    username: {
        type: String,
        required: true,
        unique: true, // უნიკალური მომხმარებლის სახელი
        trim: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model("User", userSchema);

export default User;