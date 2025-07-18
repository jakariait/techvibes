const Company = require("../models/CompanyModel");

const createCompany = (data) => Company.create(data);

const getAllCompanies = () => Company.find();

const getCompanyById = (id) => Company.findById(id);

const updateCompany = (id, data) =>
  Company.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

const deleteCompany = (id) => Company.findByIdAndDelete(id);

module.exports = {
  createCompany,
  getAllCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
