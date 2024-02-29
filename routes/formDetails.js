import express from "express";
import { getAllData, getFormData, addForm, deleteForm, addSection , updateSection, updateForm} from "../controllers/formDetails.js";

const router = express.Router();

router.get('/',getAllData)
router.get('/:id',getFormData)
router.post('/add',addForm)
router.delete('/:id',deleteForm);
router.put('/:id',updateForm);




router.post('/:id/section',addSection);
router.put('/:formId/section/:sectionId',updateSection);


export default router;