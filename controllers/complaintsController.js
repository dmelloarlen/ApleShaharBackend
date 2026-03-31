import { uploadImageToSupabase } from '../services/uploadService.js';
import {
  createComplaint,
  getComplaintsByWard,
  getMyComplaints,
  getComplaintById,
  updateComplaintStatus,
  resolveComplaint,
  getAllComplaints
} from '../services/complaintsService.js';

export async function submitComplaint(req, res) {
  try {
    const { prob_description, ward, location_coords, issue_type } = req.body;
    const citizenId = req.user.id;

    const imageUrl = await uploadImageToSupabase(
      req.file.buffer,
      req.file.mimetype,
      'complaints'
    );

    const complaint = await createComplaint(
      citizenId,
      imageUrl,
      prob_description,
      ward,
      location_coords,  
      issue_type
    );

    res.status(201).json({ success: true, complaint });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function getAllComplaintsHandler(req, res) {
  try {
    const { ward } = req.query;
    const complaints = await getAllComplaints(ward);
    res.json({ success: true, complaints });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function getMyComplaintsHandler(req, res) {
  try {
    const citizenId = req.user.id;
    const complaints = await getMyComplaints(citizenId);
    res.json({ success: true, complaints });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function getComplaintByIdHandler(req, res) {
  try {
    const { id } = req.params;
    const complaint = await getComplaintById(id);
    res.json({ success: true, complaint });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function getWardComplaintsHandler(req, res) {
  try {
    const { ward_no } = req.params;
    const complaints = await getComplaintsByWard(ward_no);
    res.json({ success: true, complaints });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function updateStatusHandler(req, res) {
  try {
    const { id } = req.params;
    const { status, estimated_time } = req.body;
    const complaint = await updateComplaintStatus(id, status, estimated_time);
    res.json({ success: true, complaint });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export async function resolveComplaintHandler(req, res) {
  try {
    const { id } = req.params;
    const { resolve_description } = req.body;
    
    const resolveImageUrl = await uploadImageToSupabase(
      req.file.buffer,
      req.file.mimetype,
      'resolved'
    );

    const complaint = await resolveComplaint(id, resolve_description, resolveImageUrl);
    res.json({ success: true, complaint });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}