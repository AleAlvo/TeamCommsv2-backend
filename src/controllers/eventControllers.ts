import { Request, Response } from 'express'
import { supabase } from '../supabaseClient'

// Example of a controller function to create an event
export const createEvent = async (req: Request, res: Response) => {
  const { team_id, title, description, event_date } = req.body

  const { data, error } = await supabase
    .from('events')
    .insert([{ team_id, title, description, event_date }])

  if (error) {
    return res.status(400).json({ error: error.message })
  }

  res.status(201).json(data)
}
