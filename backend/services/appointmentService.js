const Appointment = require("../models/AppointmentModel");

exports.createAppointment = async (data) => {
  const appointment = new Appointment(data);
  return await appointment.save();
};

exports.getAppointmentsByUser = async (userId) => {
  return await Appointment.find({ userId }).sort({ createdAt: -1 });
};

exports.getAppointmentById = async (id) => {
  return await Appointment.findById(id);
};

exports.updateAppointment = async (id, data) => {
  return await Appointment.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteAppointment = async (id) => {
  return await Appointment.findByIdAndDelete(id);
};

exports.getAllAppointments = async () => {
  return await Appointment.find({}).sort({ createdAt: -1 });
};
