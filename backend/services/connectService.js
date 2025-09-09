const Connect = require("../models/ConnectModel");

exports.createConnect = async (data) => {
  const connect = new Connect(data);
  return await connect.save();
};

exports.getConnectsByUserId = async (userId) => {
  return await Connect.find({ userId }).sort({ createdAt: -1 });
};

exports.getAllConnects = async () => {
  return await Connect.find({}).sort({ createdAt: -1 });
};



exports.updateConnect = async (id, data) => {
  return await Connect.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteConnect = async (id) => {
  return await Connect.findByIdAndDelete(id);
};
