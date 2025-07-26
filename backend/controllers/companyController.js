const companyService = require("../services/CompanyService");
const asyncHandler = require("express-async-handler");


const createCompany = async (req, res) => {
  try {
    const company = await companyService.createCompany(req.body);
    res.status(201).json({ message: "Company created", company });
  } catch (error) {
    res.status(500).json({ message: "Error creating company", error: error.message });
  }
};

const getCompanies = async (req, res) => {
  try {
    const companies = await companyService.getAllCompanies();
    res.status(200).json({
      message: `${companies.length} compan${companies.length === 1 ? "y" : "ies"} found`,
      total: companies.length,
      companies,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching companies",
      error: error.message,
    });
  }
};


const getCompanyById = async (req, res) => {
  try {
    const company = await companyService.getCompanyById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ message: "Error fetching company", error: error.message });
  }
};



const updateCompany = asyncHandler(async (req, res) => {
  try {
    const companyId = req.params.id;

    // If logo file was uploaded, attach its filename
    if (req.files?.companyLogo?.[0]) {
      req.body.companyLogo = req.files.companyLogo[0].filename;
    }

    // Update company
    const updatedCompany = await companyService.updateCompany(companyId, req.body);

    if (!updatedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json({
      message: "Company updated successfully",
      company: updatedCompany,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update company",
      error: error.message,
    });
  }
});



const deleteCompany = async (req, res) => {
  try {
    const deleted = await companyService.deleteCompany(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Company not found" });
    }
    res.status(200).json({ message: "Company deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting company", error: error.message });
  }
};

module.exports = {
  createCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  deleteCompany,
};
