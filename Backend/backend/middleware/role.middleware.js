// module.exports = (allowedRole) => {
//   return (req, res, next) => {
//     if (!req.user || req.user.role === undefined) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     const rolesMap = {
//       root: 0,
//       company: 1,
//       candidate: 2
//     };

//     const allowed =
//       typeof allowedRole === "string"
//         ? rolesMap[allowedRole]
//         : allowedRole;

//     if (req.user.role !== 0) {
//       console.log(`Role middleware: user role ${req.user.role} does not match allowed role ${allowed}`);
      
//       return res.status(403).json({ message: "Access denied" });
//     }

//     next();
//   };
// };
// module.exports = () => {

  
//   return (req, res, next) => {
//     console.log('req.user--------:', req.user);
//     if (!req.user || req.user.type === undefined || req.user.type === null) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     // Only type 0 is allowed
//     if (Number(req.user.type) !== 0) {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     next();
//   };
// };

// middleware/role.middleware.js
module.exports = (allowedRole) => {
  const rolesMap = {
    root: 0,
    company: 1,
    candidate: 2,
  };

  return (req, res, next) => {
    if (!req.user || req.user.type === undefined) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (req.user.type !== rolesMap[allowedRole]) {
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  };
};
