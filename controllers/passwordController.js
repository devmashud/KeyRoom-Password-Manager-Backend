import Password from "../model/Password.js";

export  const createPassword = async(req, res)=>{
    const {site, username, password} = req.body;

    if(!site || !username || !password){
        return res.status(400).json({message: "All filed are required"})
    }

    const newItem = await Password.create({
        site,
        username,
        password
    })
    res.status(201).json(newItem);

}

export const getPassword = async(req, res)=>{
    const items = await Password.find().sort({createdAt: 1})
    res.json(items)
}

export const updatePassword = async (req, res) => {
      console.log("UPDATE HIT", req.params.id, req.body);

    const {id} = req.params;
    const updated = await Password.findByIdAndUpdate(
    id, 
    req.body,
    {returnDocument: "after"}
    );

    if(!updated){
        return res.status(404).json({message: "Not Found"})
    }
    res.json(updated)
    console.log(updated)

}

