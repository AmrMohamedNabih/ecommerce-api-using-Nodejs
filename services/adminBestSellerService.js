const AdminBestSeller = require('../models/adminBestSellerModel');

exports.addBestSeller = async (productId, adminId) => {
    const bestSeller = new AdminBestSeller({ productId, addedBy: adminId });
    return await bestSeller.save();
};

exports.getAdminBestSellers = async () =>
    await AdminBestSeller.find({ isActive: true })
        .populate('productId', 'name price')
        .populate('addedBy', 'name');


exports.removeBestSeller = async (id) =>
    await AdminBestSeller.findByIdAndUpdate(id, { isActive: false }, { new: true });
