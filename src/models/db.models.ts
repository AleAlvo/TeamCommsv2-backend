// Purpose: Define the interfaces for the database models.
export interface UserData {
  id: number
  created_at: string
  email: string
  password: string
  name: string
  number?: number
  subteam: string
  role: 'admin' | 'coach' | 'player'
  team_id: number
}

export interface TeamData {
  id: number
  created_at: string
  name: string
  subteams?: object
}

export interface EventData {
  id: number
  created_at: string
  title: string
  description?: string
  event_date: string
  team_id: number
  subteams?: object
}

export interface MessageData {
  id: number
  created_at: string
  team_id: number
  user_id: number
  title: string
  content: string
  sent_to: number[]
  read_by: number[]
  priority: boolean
}
