let EmployeeModel = require("../models/EmployeeModel");
function authorize(role) {
  return [
    // authorize based on user_type role
    async function auth(req, res, next) {
      const userId = req.header('user-id');

      if (!userId) {
        return res.status(401).json({ error: { code: 401, message: 'No Id given' } });
      }
      try {
        await EmployeeModel.findOne({ employeeId: userId }, function (err, user) {
          if (user && role.includes(user.empType)) {
            req.user = user;
            next();
          } else {
            return res.status(401).json({ error: { code: 401, message: 'No Id given' } });
          }
        });
      } catch (err) {
        return res.status(401).json({ error: { code: 401, message: 'No Id given' } });
      }
    },
  ];
}

module.exports = authorize;
