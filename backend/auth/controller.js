import User from "./models/authModel.js";
import bcrypt from 'bcrypt'
import  jwt from  'jsonwebtoken' 
 export const signup=async (req, res) => {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });

    if (existing)
        return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
    });

    res.json({
        message: "Account created successfully",
        user,
    });
}
export const signin= async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
        return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);

    if (!match)
        return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    res.json({
        message: "Login successful",
        token,
    });
}