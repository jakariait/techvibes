const connectService = require("../services/connectService");

exports.createConnect = async (req, res) => {
  try {
    const data = await connectService.createConnect(req.body);

    res.status(201).json({
      message: "Connect created successfully.",
      data,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getAllConnects = async (req, res) => {
  try {
    const connects = await connectService.getAllConnects();

    res.status(200).json({
      message: `${connects.length} connect${connects.length !== 1 ? 's' : ''} found.`,
      total: connects.length,
      data: connects,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getConnectsByUserId = async (req, res) => {
  try {
    const connects = await connectService.getConnectsByUserId(req.params.userId);

    res.status(200).json({
      message: `${connects.length} connect${connects.length !== 1 ? 's' : ''} found for user.`,
      total: connects.length,
      data: connects,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateConnect = async (req, res) => {
  try {
    const updated = await connectService.updateConnect(req.params.id, req.body);

    if (!updated) {
      return res.status(404).json({ message: "Connect not found." });
    }

    res.status(200).json({
      message: "Connect updated successfully.",
      data: updated,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteConnect = async (req, res) => {
  try {
    const deleted = await connectService.deleteConnect(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Connect not found." });
    }

    res.status(200).json({
      message: "Connect deleted successfully.",
      deletedId: req.params.id,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

