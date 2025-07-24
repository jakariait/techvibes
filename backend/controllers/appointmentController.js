const appointmentService = require("../services/appointmentService");

exports.createAppointment = async (req, res) => {
  try {
    const appointment = await appointmentService.createAppointment(req.body);
    res.status(201).json({ message: "Created", data: appointment });
  } catch (err) {
    res.status(400).json({ message: "Creation failed", error: err.message });
  }
};

exports.getAppointmentsByUser = async (req, res) => {
  try {
    const appointments = await appointmentService.getAppointmentsByUser(req.params.userId);

    // Count by status
    const counts = {
      total: appointments.length,
      pending: 0,
      accepted: 0,
      declined: 0,
    };

    appointments.forEach((a) => {
      counts[a.status] += 1;
    });

    res.json({
      message: "Appointments fetched successfully",
      total: counts.total,
      statusCounts: {
        pending: counts.pending,
        accepted: counts.accepted,
        declined: counts.declined,
      },
      data: appointments,
    });
  } catch (err) {
    res.status(500).json({ message: "Fetch error", error: err.message });
  }
};

exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await appointmentService.getAppointmentById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        message: "Appointment not found with the provided ID",
      });
    }

    res.json({
      message: "Appointment fetched successfully",
      data: appointment,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to retrieve appointment",
      error: err.message,
    });
  }
};


exports.updateAppointment = async (req, res) => {
  try {
    const updated = await appointmentService.updateAppointment(req.params.id, req.body);
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Updated", data: updated });
  } catch (err) {
    res.status(400).json({ message: "Update error", error: err.message });
  }
};

exports.deleteAppointment = async (req, res) => {
  try {
    const deleted = await appointmentService.deleteAppointment(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete error", error: err.message });
  }
};
