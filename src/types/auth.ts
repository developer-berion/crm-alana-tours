export type UserRole = 'superadmin'

export interface Profile {
    id: string
    name: string
    email: string
    role: UserRole
    created_at: string
}

export interface UserSession {
    user: {
        id: string
        email: string
    }
    profile: Profile | null
}
