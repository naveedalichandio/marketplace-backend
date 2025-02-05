const { Owner } = require("../models");

exports.createOwner = async (req, res) => {
  try {
    const { wallet, contract } = req.body;

    const record = await Owner.create({ owner: wallet, contract });

    res.status(201).json({ success: true, record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateOwner = async (req, res) => {
  try {
    const contract = req.params.contract;
    const { wallet } = req.body;

    const record = await Owner.findOneAndUpdate(
      { contract: contract },
      { owner: wallet }
    );

    res.status(201).json({ success: true, record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getOwner = async (req, res) => {
  try {
    const contract = req.params.contract;
    const record = await Owner.findOne({ contract });

    res.status(201).json({ success: true, record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteOwner = async (req, res) => {
  try {
    const contract = req.params.contract;
    const record = await Owner.findOneAndDelete({ contract });
    res.status(201).json({ success: true, record });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
