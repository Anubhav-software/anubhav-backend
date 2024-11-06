import bcrypt from 'bcrypt';  
import jwt from 'jsonwebtoken'; 
import User from '../models/User.js'; 

// export const generateToken = (id) => {
//   try {
//     const token = jwt.sign({id});
//     return token;
//   } catch(error) {
//     return "error";
//   }
// };

// User registration
export const registerUser = async (req, res) => {  
  console.log(req.files);  

  const { name, email, mobile, password, aadharNumber } = req.body;

  
  const panImages = req.files.panImages ? req.files.panImages.map(file => file.path) : [];
  const aadharImages = req.files.aadharImages ? req.files.aadharImages.map(file => file.path) : [];

  
  if (!name || !email || !mobile || !password || !aadharNumber) {
    return res.status(400).json({ message: "All fields are required." });
  }

  
  if (panImages.length !== 2) {
    return res.status(400).json({ message: "You must upload exactly two PAN images." });
  }

  if (aadharImages.length !== 2) {
    return res.status(400).json({ message: "You must upload exactly two Aadhar images." });
  }


  const hashedPassword = await bcrypt.hash(password, 15);

  
  const user = new User({
    name,
    email,
    mobile,
    password: hashedPassword,
    panImages,
    aadharNumber,
    aadharImages
  });

  try {
    
    await user.save();

    // Generate a JWT token 
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.cookie({
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      expiry : 24 * 3600000
    });
    
    res.status(201).json({ message: "Registration successful", token });
  } catch (error) {
   
    res.status(500).json({ message: "Error registering user", error });
  }
};

// User authentication
export const authenticateUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  
    req.user = decoded;  
    next();  
  } catch (error) {
    res.status(401).json({ message: "Unauthorized access" });  
  }
};
