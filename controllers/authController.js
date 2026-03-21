import { registerUser, loginUser } from "../services/authService.js"
import supabase from "../config/supabaseClient.js"
// import supabaseAdmin from "../config/supabaseAdmin.js"

export const register = async (req, res) => {
  const { email, password, name, contact, ward_no } = req.body

  const { data, error } = await registerUser(email, password)

  if (error) {
    return res.status(400).json({ error: error.message })
  }

  const user = data.user

// await supabaseAdmin.from("users").insert([
//   {
//     id: user.id,
//     email,
//     name,
//     contact,
//     ward_no,
//     role: "citizen",
//   },
// ])

  const { error: dbError } = await supabase.from("users").insert([
    {
      id: user.id,
      email,
      name,
      contact,
      ward_no,
      role: "citizen",
    },
  ])

  if (dbError) {
    return res.status(500).json({ error: dbError.message })
  }

  res.json({ message: "User registered successfully", user })
}

export const login = async (req, res) => {
  const { email, password } = req.body

  const { data, error } = await loginUser(email, password)

  if (error) {
    return res.status(400).json({ error: error.message })
  }

  res.json(data)
}