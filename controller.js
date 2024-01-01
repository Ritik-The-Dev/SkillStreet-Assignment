const NoteSchema = require('./Schema.js')

exports.AddNote = async (req, res) => {
  try {
    const{title,content} = req.body
    if(!title || !content){
      return res.status(409).json({message:"All Fields are Mandatory!!"})
    }
    if (title.length < 20 || content.length < 50){
      return res.status(409).json({message:`${title.length < 20 ? "Title too Short Enter Minimum 20 words":" Content too Short Enter Minimum 50 words"}`})
    }
      const data = await NoteSchema.create({title,content})
      return res.status(200).json({
        success:'true',
        data:data,
        message:'Note Created Successfully',
      })
  }
  catch(err){
    res.status(404).json({ message: err.message });
  }
}
exports.DeleteNote = async (req, res) => {
    try {
        const {_id} = req.body
        if(!_id){
          return res.status(409).json({message:"Enter Valid Id"})
        }
        const data = await NoteSchema.findOne({_id})
        if(!data){
          return res.status(409).json({message:"Enter Valid Id"})
        }
        try{
        await NoteSchema.deleteOne({ _id });
        }
        catch(Err){
          console.log(Err)
        }

        return res.status(200).json({
            success:'true',
            message:'Data Removed Successfully',
        })
    }
    catch(err){
        res.status(404).json({ message: err.message });
    }
  }
  exports.EditNote = async (req, res) => {
    try {
        const{title,content,_id} = req.body
         if(!title || !content || !_id){
        return res.status(409).json({message:"All Fields are Mandatory!!"})
        }
        if (title.length < 20 || content.length < 50){
          return res.status(409).json({message:`${title.length < 20 ? "Title too Short Enter Minimum 20 words":" Content too Short Enter Minimum 50 words"}`})
        }
        const getDetails = await NoteSchema.findOne({_id})
        if(!getDetails){
          return res.status(409).json({message:"Id Doesn't Exists"})
        }
        const data = await NoteSchema.findByIdAndUpdate(_id,{title,content,ModifiedAt:Date.now()})
        return res.status(200).json({
            success:'true',
            data:data,
            message:'Data Updated Successfully',
        })
    }
    catch(err){
        res.status(404).json({ message: err.message });
    }
  }
  exports.GetNote = async (req, res) => {
    try {
        let {_id} = req.body
        if(!_id){
          _id = req.query
        }
        if(!_id){
          return res.status(409).json({message:"Enter Valid Id"})
        }
        const data = await NoteSchema.findOne({_id})
        if(!data){
          return res.status(409).json({message:"Enter Valid Id"})
        }
        return res.status(200).json({
            success:'true',
            data:data,
            message:'Data Fetched Successfully',
        })
    }
    catch(err){
        res.status(404).json({ message: err.message });
    }
  }
  exports.GetAllNote = async (req, res) => {
    try {
        const data = await NoteSchema.find({}).sort({ createdAt: -1 });
        return res.status(200).json({
            success:'true',
            data:data,
            message:'Data Fetched Successfully',
        })
    }
    catch(err){
        res.status(404).json({ message: err.message });
    }
  }