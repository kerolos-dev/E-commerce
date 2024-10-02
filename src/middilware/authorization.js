import { AppError } from "../utils/appError.js"
export const authorize = (roles = []) => {
  return (req, res, next) => {
    console.log('Request User:', req.user); // Debug output

    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }

    // Check if the user role is in the allowed roles
    if (roles.length && !roles.includes(req.user.role)) {
      console.log('User Role:', req.user.role); // Debug output
      return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    next(); // User is authorized, proceed to next middleware
  };
};


