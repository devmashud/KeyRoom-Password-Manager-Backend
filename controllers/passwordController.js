import Password from "../model/Password.js";
import bcrypt from "bcrypt";

export const createPassword = async (req, res) => {
  try {
    const { site, username, password } = req.body;
    if (!site || !username || !password) {
      return res.status(400).json({ message: "All filed are required" });
    }

    if (
      typeof site !== "string" ||
      typeof username !== "string" ||
      typeof password !== "string"
    ) {
      return res.status(400).json({ message: "Invalid data type" });
    }

    const siteTrimmed = site.trim();
    const usernameTrimmed = username.trim();
    const passwordTrimmed = password.trim();

    if (!siteTrimmed || !usernameTrimmed || !passwordTrimmed) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const hashedPassword = await bcrypt.hash(passwordTrimmed, 10);
    const newItem = await Password.create({
      site: siteTrimmed,
      username: usernameTrimmed,
      password: hashedPassword,
    });

    const safeItem = {
      _id: newItem._id,
      site: newItem.site,
      username: newItem.username,
      createdAt: newItem.createdAt,
      updatedAt: newItem.updatedAt,
    };
    res.status(201).json(safeItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getPassword = async (req, res) => {
  const items = await Password.find()
    .sort({ createdAt: 1 })
    .select("-password");
  res.json(items);
};

export const updatePassword = async (req, res) => {
  console.log("UPDATE HIT", req.params.id, req.body);
  
  const { id } = req.params;
  const updated = await Password.findByIdAndUpdate(id, req.body, {
    returnDocument: "after",
  });
  //update password er modde o hash korte hobe

  if (!updated) {
    return res.status(404).json({ message: "Not Found" });
  }
  const safeItem = {
  _id: updated._id,
  site: updated.site,
  username: updated.username,
  createdAt: updated.createdAt,
  updatedAt: updated.updatedAt,
};

res.json(safeItem);
  console.log(updated);
};

export const deletPassword = async (req, res) => {
  const { id } = req.params;

  const deleted = await Password.findByIdAndDelete(id);
  if (!deleted) {
    return res.status(400).json({ message: "Not found" });
  }
  res.json({ message: "Deleted SuccesFull" });
};
