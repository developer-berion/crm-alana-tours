export type ContactStatus = 'not_contacted' | 'contacted' | 'waiting_response' | 'rejected' | 'interested'
export type LeadTemperature = 'cold' | 'warm' | 'hot'
export type RelationshipType = 'lead' | 'client'

export interface Agency {
    id: string
    name: string
    created_at: string
}

export interface Branch {
    id: string
    agency_id: string
    branch_name: string
    contact_name: string | null
    email: string | null
    phone: string | null
    country: string | null
    state: string | null
    city: string | null
    instagram_url: string | null
    tiktok_url: string | null
    facebook_url: string | null
    website_url: string | null
    address: string | null
    google_maps_url: string | null
    contact_status: ContactStatus
    lead_temperature: LeadTemperature
    relationship_type: RelationshipType
    notes: string | null
    created_at: string
    updated_at: string
}

export interface AgencyNote {
    id: string
    branch_id: string
    content: string
    created_by: string
    created_at: string
    updated_at: string
    archived: boolean
}

export interface ActivityLog {
    id: string
    branch_id: string
    user_id: string
    action_type: string
    field_name: string | null
    old_value: string | null
    new_value: string | null
    created_at: string
}
