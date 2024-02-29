import Form from "../models/form.js";

export const getAllData = async(req,res)=>{
    try{
        const forms = await Form.find({});
        res.status(200).json(forms);

    }catch(error){
        return res.status(500).json({ message: error.message });
    }

}


export const getFormData= async(req,res)=>{
    try {
        const form = await Form.findById(req.params.id);

        if (form == null) {
          return res.status(404).json({ message: 'Form not found' });
        }

        res.status(200).json(form);
        
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }

}

export const addForm = async(req,res) =>{

    const form = new Form(req.body);

    try {
        const newForm = await form.save();
        res.status(201).json(newForm);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


export const deleteForm = async(req,res) =>{
    try {
        const form = await Form.findById(req.params.id);

        if (form == null) {
          return res.status(404).json({ message: 'Form not found' });
        }

        await Form.deleteOne({"_id" : req.params.id});
        res.json({ message: 'Form deleted successfully' });

      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
}


export const addSection = async(req,res) =>{
    try {
        const form = await Form.findById(req.params.id);

        if (form == null) {
          return res.status(404).json({ message: 'Form not found' });
        }

        const newSection = req.body.section;
        form.sections.push(newSection);

        const updatedForm = await form.save();
        res.status(201).json(updatedForm);

      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}


export const updateSection = async(req,res) =>{
    try {
        const form = await Form.findById(req.params.formId);

        if (form == null) {
          return res.status(404).json({ message: 'Form not found' });
        }

        const section = form.sections.id(req.params.sectionId);

            if (req.body.name != null) {
            section.name = req.body.name;
            }

            if (req.body.questions != null) {
            // Update questions in the section
            section.questions = req.body.questions;
            }

            const updatedForm = await form.save();

        res.status(201).json(updatedForm);

      } catch (error) {
        res.status(400).json({ message: error.message });
      }
}

export const updateForm = async(req,res) =>{
    try {
        const form = await Form.findById(req.params.id);

        if (form == null) {
          return res.status(404).json({ message: 'Form not found' });
        }

        if(req.body.sections !=null ){
            form.sections = req.body.sections;
        }

        if(req.body.title !=null ){
            form.title = req.body.title;
        }
        console.log(form);

        const updatedForm = await form.save();

        res.status(201).json(updatedForm);

      } catch (error) {
        res.status(400).json({ message: error.message });
      }

}
