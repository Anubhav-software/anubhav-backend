export const validateRegistrationData = (req, res, next) => {
  
  console.log("Request Body:", req.body);
  console.log("Uploaded Files:", req.files);

  const { name, email, mobile, aadharNumber } = req.body;
  const { panImages, aadharImages } = req.files || {};  

 
  if (!name || !email || !mobile || !aadharNumber) {
    return res.status(400).json({ message: "All fields are required." });
  }

  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format." });
  }

 
  if (mobile.length !== 10 || isNaN(mobile)) {
    return res.status(400).json({ message: "Invalid mobile number." });
  }

  
  if (aadharNumber.length !== 12 || isNaN(aadharNumber)) {
    return res.status(400).json({ message: "Invalid Aadhar number." });
  }

 
  if (!panImages || panImages.length !== 2) {
    return res.status(400).json({ message: "You must upload exactly two PAN images." });
  }

  if (!aadharImages || aadharImages.length !== 2) {
    return res.status(400).json({ message: "You must upload exactly two Aadhar images." });
  }

  next();
};
