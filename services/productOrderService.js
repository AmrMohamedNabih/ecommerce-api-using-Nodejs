const ProductOrder = require('../models/productOrderModel');
const ApiError = require('../utils/apiError'); // Assuming you have an ApiError utility

exports.updateOrderCount = async (productId) => {
    try {
        await ProductOrder.findOneAndUpdate(
            { productId },
            { $inc: { orderCount: 1 }, lastUpdated: Date.now() },
            { upsert: true, new: true }
        );
    } catch (error) {
        throw new ApiError('Failed to update product order count', 500);
    }
};

exports.getTopThreeOrdered = async () => {
    try {
        const topProducts = await ProductOrder.find()
            .sort({ orderCount: -1 }) // Sort by orderCount in descending order
            .limit(3) // Limit to top 3 products
            .populate('productId', 'title price'); // Populate product details (adjusted to 'title' to match your schema)

        if (!topProducts || topProducts.length === 0) {
            throw new ApiError('No products have been ordered yet', 404);
        }

        return topProducts.map(product => ({
            product: product.productId,
            orderCount: product.orderCount,
            lastUpdated: product.lastUpdated,
        }));
    } catch (error) {
        if (error instanceof ApiError) throw error;
        throw new ApiError('Failed to fetch top ordered products', 500);
    }
};