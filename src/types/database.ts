
export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          role: 'admin' | 'professional' | 'receptionist' | 'responsible'
          name: string
          cpf: string
          phone: string
          email: string
          avatar_url?: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      clinics: {
        Row: {
          id: string
          name: string
          cnpj: string
          address: string
          phone: string
          email: string
          logo_url?: string
          settings: any
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['clinics']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['clinics']['Insert']>
      }
      patients: {
        Row: {
          id: string
          clinic_id: string
          name: string
          birth_date: string
          cpf: string
          diagnosis?: string
          medical_history?: string
          insurance_info?: any
          emergency_contact: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['patients']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['patients']['Insert']>
      }
      professionals: {
        Row: {
          id: string
          profile_id: string
          clinic_id: string
          specialty_ids: string[]
          registration_number: string
          hourly_rate: number
          bio?: string
          active: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['professionals']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['professionals']['Insert']>
      }
      appointments: {
        Row: {
          id: string
          patient_id: string
          professional_id: string
          room_id?: string
          datetime: string
          duration: number
          status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled'
          notes?: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['appointments']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['appointments']['Insert']>
      }
      specialties: {
        Row: {
          id: string
          clinic_id: string
          name: string
          description?: string
          color: string
          icon?: string
          active: boolean
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['specialties']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['specialties']['Insert']>
      }
    }
  }
}
