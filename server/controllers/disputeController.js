const Dispute = require("../models/Dispute");
const { fileUploading } = require("./files/fileUpload");
// const path = require("path");
// const fs = require("fs");

exports.raiseDispute = async (req, res) => {
  try {
    const { jobId, reason, description } = req.body;
    const userId = req.user.userId;

    if (!jobId || !reason || !description) {
      return res.status(400).json({ error: "All fields except evidence are required" });
    }

    let evidencePath = null;
    if (req.files.evidence) {
      const response=await fileUploading(req.files.evidence,"gigzy");
      console.log(response);
      evidencePath = response.secure_url;
    }

    const dispute = new Dispute({
      jobId,
      reason,
      description,
      evidence: evidencePath,
      raisedBy: userId,
    });

    await dispute.save();

    res.status(201).json({
      message: "Dispute raised successfully",
      dispute,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getDisputes = async (req, res) => {
  try {
    const disputes = await Dispute.find()
      .populate("jobId", "title")
      .populate("raisedBy", "name email");

    res.status(200).json(disputes);
  } catch (error) {
    console.error("Error fetching disputes:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
