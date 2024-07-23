// Importing necessary modules from 'express' and the configured Supabase client
import { Request, Response } from 'express'
import { supabase } from '../supabaseClient'

// signUp function: Asynchronously handles the sign-up process
export const signUp = async (req: Request, res: Response) => {
  // Extracting email and password from the request body
  const { email, password } = req.body
  // Attempting to sign up the user with Supabase Auth using the provided email and password
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  // If an error occurs during sign-up, send a 400 response with the error message
  if (error) {
    return res.status(400).json({ error: error.message })
  }

  // If sign-up is successful, send a 200 response with the user data
  res.status(200).json({ data })
}

// signIn function: Asynchronously handles the sign-in process
export const signIn = async (req: Request, res: Response) => {
  // Extracting email and password from the request body
  const { email, password } = req.body
  // Attempting to sign in the user with Supabase Auth using the provided email and password
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  // If an error occurs during sign-in, send a 400 response with the error message
  if (error) {
    return res.status(400).json({ error: error.message })
  }

  // If sign-in is successful, send a 200 response with the user data
  res.status(200).json({ data })
}
