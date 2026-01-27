const StorageCustomer = require('../models/StorageCustomer');
const { 
  fileUploadUtil,
  shouldDeleteExistingFile,
  deleteFileUtil
} = require('../utils/upload');

const createStorageCustomer = async (req, res) => {
  const { name, phone, fee, payday, customerPicture, equipmentPicture } = req.body;
  if (!name || !phone || !fee || !payday) {
    return res.status(400).json({ error: 'Name, phone, fee, and payday are required' });
  }
  try {
    let customerPictureUrl = '';
    let equipmentPictureUrl = '';
    
    if (customerPicture) {
      customerPictureUrl = await fileUploadUtil(customerPicture);
    }
    if (equipmentPicture) {
      equipmentPictureUrl = await fileUploadUtil(equipmentPicture);
    }
    
    const newStorageCustomer = new StorageCustomer({
      ...req.body,
      customerPicture: customerPictureUrl,
      equipmentPicture: equipmentPictureUrl
    });
    const savedStorageCustomer = await newStorageCustomer.save();
    res.status(201).json(savedStorageCustomer);
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};

const getStorageCustomers = async (req, res) => {
  try {
    const storageCustomers = await StorageCustomer.find();
    res.json(storageCustomers);
  } catch (error) {
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};

const getStorageCustomerById = async (req, res) => {
  try {
    const id = req.params.id;
    const storageCustomer = await StorageCustomer.findById(id);
    if (!storageCustomer) {
      return res.status(404).json({ error: 'Storage customer not found' });
    }
    res.json(storageCustomer);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid storage customer ID' });
    }
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};

const updateStorageCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const existingCustomer = await StorageCustomer.findById(id);
    if (!existingCustomer) {
      return res.status(404).json({ error: 'Storage customer not found' });
    }
    
    let newCustomerPicture = req.body.customerPicture ?? '';
    let newEquipmentPicture = req.body.equipmentPicture ?? '';
    
    if (shouldDeleteExistingFile(existingCustomer.customerPicture, newCustomerPicture)) {
      const key = existingCustomer.customerPicture.split('/').pop();
      await deleteFileUtil(key);
      newCustomerPicture = await fileUploadUtil(newCustomerPicture);
    }
    
    if (shouldDeleteExistingFile(existingCustomer.equipmentPicture, newEquipmentPicture)) {
      const key = existingCustomer.equipmentPicture.split('/').pop();
      await deleteFileUtil(key);
      newEquipmentPicture = await fileUploadUtil(newEquipmentPicture);
    }
    
    const updatedStorageCustomer = await StorageCustomer.findByIdAndUpdate(
      id,
      { $set: { ...req.body, customerPicture: newCustomerPicture, equipmentPicture: newEquipmentPicture } },
      { new: true, runValidators: true }
    );
    res.json(updatedStorageCustomer);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid storage customer ID' });
    }
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};

const deleteStorageCustomer = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedStorageCustomer = await StorageCustomer.findByIdAndDelete(id);
    if (!deletedStorageCustomer) {
      return res.status(404).json({ error: 'Storage customer not found' });
    }
    res.json(deletedStorageCustomer);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid storage customer ID' });
    }
    res.status(500).json({ error: 'Server error', message: error.message });
  }
};

module.exports = {
  createStorageCustomer,
  getStorageCustomers,
  getStorageCustomerById,
  updateStorageCustomer,
  deleteStorageCustomer
};
