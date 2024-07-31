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

  // Setting the access token as an HttpOnly cookie with a maxAge of one week
  res.cookie('token', data.session.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 1 week in milliseconds
  })

  // If sign-in is successful, send a 200 response with the user data
  res.status(200).json({ data })
}

// refreshToken function: Asynchronously handles the token refresh process
export const refreshToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies // Extract refresh token from cookies

  if (!refreshToken) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { data, error } = await supabase.auth.refreshSession(refreshToken)

  if (error || !data.session) {
    return res
      .status(401)
      .json({ error: error ? error.message : 'Invalid session' })
  }

  // Updating the access token in the cookie
  res.cookie('token', data.session.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 1000, // 1 hour
  })

  res.status(200).json({ message: 'Token refreshed', user: data.user })
}

// signOut function: Asynchronously handles the sign-out process
export const signOut = async (req: Request, res: Response) => {
  await supabase.auth.signOut()

  res.clearCookie('token')
  res.status(200).json({ message: 'Logged out successfully' })
}
