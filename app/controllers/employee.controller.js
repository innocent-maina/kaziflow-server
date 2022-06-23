const bcrypt = require('bcrypt');
const { Employee } = require('../models');

module.exports = {
  /**
   * GET /api/v1/employees
   *
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  index: async (req, res) => {
    try {
      const employees = await Employee.find({});
      return res.status(200).json({
        success: true,
        message: 'Successfully retrieved all employees',
        data: employees,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        data: error,
      });
    }
  },

  /**
   * POST /api/v1/employees
   *
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  create: async (req, res) => {
    try {
      const { password } = req.body;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const employee = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        role: req.body.role,
        email: req.body.email,
        name: req.body.name,
        password: hash,
        isAdmin: req.body.isAdmin,
      };
      await Employee.create(employee);
      return res.status(200).json({
        success: true,
        message: 'Successfully created the employee',
        data: employee,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        data: error,
      });
    }
  },
  /**
   * GET /api/v1/employees/:id
   *
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  show: async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) {
        return res.status(404).json({
          success: true,
          message: 'Employee not found',
          data: null,
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Successfully retrieved the employee',
        data: employee,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        data: error,
      });
    }
  },

  /**
   * PUT /api/v1/employees/:id
   *
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  update: async (req, res) => {
    try {
      const { password } = req.body;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const employee = await Employee.findByIdAndUpdate(
        { _id: req.params.id },
        {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          role: req.body.role,
          isAdmin: req.body.isAdmin,
          password: hash,
        },
        {
          new: true,
        },
      );
      if (!employee) {
        return res.status(404).json({
          success: true,
          message: 'Employee not found',
          data: null,
        });
      }
      return res.status(200).json({
        success: true,
        message: 'Successfully updated the employee',
        data: employee,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        data: error,
      });
    }
  },

  /**
   * DELETE /api/v1/employees/:id
   *
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  delete: async (req, res) => {
    try {
      await Employee.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        success: true,
        message: 'Successfully deleted the employee',
        data: null,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
        data: error,
      });
    }
  },
};
