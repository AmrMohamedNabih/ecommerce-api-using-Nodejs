const express = require('express');

const router = express.Router();
const productOrderService = require('../services/productOrderService');
const adminBestSellerService = require('../services/adminBestSellerService');
const authService = require('../services/authService'); // Assumes an existing auth service

// Public endpoint: Get top 3 ordered products
router.get('/ordered', async (req, res) => {
    try {
        const topProducts = await productOrderService.getTopThreeOrdered();
        res.status(200).json(topProducts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching top ordered products', error });
    }
});

// Admin endpoints (protected)
router.post(
    '/admin',
    authService.protect, // Middleware to check authentication
    authService.allowedTo('admin'), // Middleware to restrict to admins
    async (req, res) => {
        try {
            await adminBestSellerService.addBestSeller(req.body.productId, req.user._id);
            res.status(201).json({ message: 'Best seller added successfully' });
        } catch (error) {
            res.status(400).json({ message: 'Error adding best seller', error });
        }
    }
);

router.get(
    '/admin',
    async (req, res) => {
        try {
            const bestSellers = await adminBestSellerService.getAdminBestSellers();
            res.status(200).json(bestSellers);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching admin best sellers', error });
        }
    }
);

router.delete(
    '/admin/:id',
    authService.protect,
    authService.allowedTo('admin'),
    async (req, res) => {
        try {
            await adminBestSellerService.removeBestSeller(req.params.id);
            res.status(200).json({ message: 'Best seller removed successfully' });
        } catch (error) {
            res.status(400).json({ message: 'Error removing best seller', error });
        }
    }
);

module.exports = router;