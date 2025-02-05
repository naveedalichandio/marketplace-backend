const { MarketplaceListing, User } = require("../models");

exports.createListing = async (req, res) => {
  try {
    const { title, description, price, category, seller, botId,image ,walletId} = req.body;
    // const creatorId = req?.token_decoded?.id;

    const listing = await MarketplaceListing.create({
      title,
      description,
      price,
      category,
      walletId: walletId,
      botId,
      seller,
      image
    });

    res.status(201).json({ success: true, listing });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getListings = async (req, res) => {
  try {
    const listings = await MarketplaceListing.findAll({
      where: { status: "active" },
      include: [{ model: User, attributes: ["username", "email"] }],
    });

    res.status(200).json({ success: true, listings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getListingById = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await MarketplaceListing.findByPk(id, {
      include: [{ model: User, attributes: ["username", "email"] }],
    });

    if (!listing) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found" });
    }

    res.status(200).json({ success: true, listing });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateListing = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, category, status } = req.body;

    const listing = await MarketplaceListing.findByPk(id);

    if (!listing) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found" });
    }

    if (listing.creatorId !== req.token_decoded.id) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await listing.update({ title, description, price, category, status });

    res.status(200).json({ success: true, listing });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    const listing = await MarketplaceListing.findByPk(id);

    if (!listing) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found" });
    }

    if (listing.creatorId !== req.token_decoded.id) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    await listing.destroy();

    res
      .status(200)
      .json({ success: true, message: "Listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.increaseViewAndTrendingScore = async (req, res) => {
  try {
    const { id } = req.params;
    const listing = await MarketplaceListing.findByPk(id);

    if (!listing) {
      return res
        .status(404)
        .json({ success: false, message: "Listing not found." });
    }

    listing.views += 1;

    // Update trending score
    const daysSinceCreation = Math.ceil(
      (new Date() - new Date(listing.createdAt)) / (1000 * 60 * 60 * 24)
    );
    listing.trendingScore =
      Math.log(listing.views + 1) + 0.5 / (daysSinceCreation + 1);

    await listing.save();

    res.status(200).json({ success: true, data: listing, message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating views and trending score.",
    });
  }
};

exports.getSortedListing = async (req, res) => {
  try {
    const { sortBy } = req.query;

    let order = [];

    switch (sortBy) {
      case "New":
        order = [["createdAt", "DESC"]];
        break;
      case "Popular":
        order = [["views", "DESC"]];
        break;
      case "Trending":
        order = [["trendingScore", "DESC"]];
        break;
      case "Price-Low-High":
        order = [["price", "ASC"]];
        break;
      case "Price-High-Low":
        order = [["price", "DESC"]];
        break;
      default:
        order = [["createdAt", "DESC"]]; // Default to "New"
        break;
    }

    const listings = await MarketplaceListing.findAll({
      order,
    });

    res.status(200).json({ success: true, data: listings, message: "Success" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching listings.",
    });
  }
};
