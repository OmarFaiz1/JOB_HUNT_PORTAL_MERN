import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // Token can come from cookies or Authorization header

    if (!token) {
      console.log("No token provided"); // Log when token is missing
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      console.log("Invalid token:", token); // Log when token is invalid
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    req.id = decoded.userId; // Store the user ID in the request object
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default isAuthenticated;
