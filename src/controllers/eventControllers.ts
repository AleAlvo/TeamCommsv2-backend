import { Request, Response } from 'express'
import { supabase } from '../supabaseClient' // Import the configured Supabase client
import { EventData } from '../models/db.models'

// Create Event
export const createEvent = async (req: Request, res: Response) => {
  const {
    team_id,
    title,
    description,
    event_date,
    subteams,
  }: Partial<EventData> = req.body

  const { data, error } = await supabase
    .from('events')
    .insert([{ team_id, title, description, event_date, subteams }])
    .select()

  if (error) {
    console.error('Error creating event:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }

  res.status(201).json(data[0])
}

// Update Event
export const updateEvent = async (req: Request, res: Response) => {
  const { id } = req.params
  const { title, description, event_date, subteams }: Partial<EventData> =
    req.body

  const { data, error } = await supabase
    .from('events')
    .update({ title, description, event_date, subteams })
    .eq('id', id)

  if (error) {
    console.error('Error updating event:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }

  if (data === null) {
    return res.status(204).json({ message: 'No Content' })
  }

  res.status(200).json(data[0])
}

// Delete Event
export const deleteEvent = async (req: Request, res: Response) => {
  const { id } = req.params

  const { data, error } = await supabase.from('events').delete().eq('id', id)

  if (error) {
    console.error('Error deleting event:', error)
    return res.status(500).json({ error: 'Internal Server Error' })
  }

  if (data === null) {
    return res.status(204).json({ message: 'No Content' })
  }

  res.status(200).json({ message: 'Event deleted successfully' })
}
