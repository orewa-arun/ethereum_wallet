import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";

type Role = "user" | "admin"

interface IUser extends Document{
    firstName : string,
    lastName : string,
    username : string,
    email : string,
    hash_password : string,
    role : Role,
    contactNumber : string,
    profilePicture : string,
    fullName : string,
    authenticate(password : string) : Promise<boolean>;
}

const userSchema : Schema<IUser> = new Schema({
    firstName : {
        type : String,
        require : true,
        trim : true,
        min : 3,
        max : 20
    },
    lastName : {
        type : String,
        require : true,
        trim : true,
        min : 3,
        max : 20
    },
    username: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    hash_password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    contactNumber: {
        type: String,
    },
    profilePicture: {
        type: String,
    },
},{ timestamps: true })

//For get fullName from when we get data from database
userSchema.virtual("fullName").get(function ( this : IUser) {
    return `${this.firstName} ${this.lastName}`;
});

// authenticate password function in the "Schema class"
userSchema.methods.authenticate = async function (password : string) : Promise<boolean> {
    return bcrypt.compare(password, this.hash_password)
}

// Create and export the User model
const User = mongoose.model<IUser>("User", userSchema);
export default User;