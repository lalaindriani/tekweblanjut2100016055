const Rencana = require('../model/rencanamodel');

// fungsi untuk membuat rencana baru
const createRencana = async (req, res) => {
  try {
    const { rencana, waktu, keterangan } = req.body;
    const newRencana = new Rencana({ rencana, waktu, keterangan });
    const savedRencana = await newRencana.save();
    res.status(201).json(savedRencana);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// fungsi untuk melakukan get pada semua data rencana
const getAllRencana = async (req, res) => {
  try {
    const allRencana = await Rencana.find();
    res.status(200).json(allRencana);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// fungsi untuk get data rencana dari id
const getRencanaById = async (req, res) => {
  try {
    const { id } = req.params;
    const foundRencana = await Rencana.findById(id);
    if (foundRencana) {
      res.status(200).json(foundRencana);
    } else {
      res.status(404).json({ message: 'Rencana not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// fungsi untuk melakukan edit dan update
const updateRencanaById = async (req, res) => {
  try {
    const { id } = req.params;
    const { rencana, waktu, keterangan } = req.body;
    const updatedRencana = await Rencana.findByIdAndUpdate(
      id,
      { rencana, waktu, keterangan },
      { new: true }
    );
    if (updatedRencana) {
      res.status(200).json(updatedRencana);
    } else {
      res.status(404).json({ message: 'Rencana not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// fungsi untuk menghapus data rencana
const deleteRencanaById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedRencana = await Rencana.findByIdAndDelete(id);
    if (deletedRencana) {
      res.status(200).json({ message: 'Rencana deleted successfully' });
    } else {
      res.status(404).json({ message: 'Rencana not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createRencana,
  getAllRencana,
  getRencanaById,
  updateRencanaById,
  deleteRencanaById
};
