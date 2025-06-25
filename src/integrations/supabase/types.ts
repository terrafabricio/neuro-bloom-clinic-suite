export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          amount: number
          category: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          due_date: string | null
          id: string
          name: string
          notes: string | null
          patient_id: string | null
          payment_date: string | null
          payment_method: string | null
          status: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          name: string
          notes?: string | null
          patient_id?: string | null
          payment_date?: string | null
          payment_method?: string | null
          status?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          category?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          name?: string
          notes?: string | null
          patient_id?: string | null
          payment_date?: string | null
          payment_method?: string | null
          status?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "accounts_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "accounts_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          appointment_date: string
          created_at: string | null
          end_time: string
          id: string
          notes: string | null
          patient_id: string
          price: number | null
          professional_id: string
          room_id: string | null
          specialty_id: string
          start_time: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          appointment_date: string
          created_at?: string | null
          end_time: string
          id?: string
          notes?: string | null
          patient_id: string
          price?: number | null
          professional_id: string
          room_id?: string | null
          specialty_id: string
          start_time: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          appointment_date?: string
          created_at?: string | null
          end_time?: string
          id?: string
          notes?: string | null
          patient_id?: string
          price?: number | null
          professional_id?: string
          room_id?: string | null
          specialty_id?: string
          start_time?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "appointments_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_specialty_id_fkey"
            columns: ["specialty_id"]
            isOneToOne: false
            referencedRelation: "specialties"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          created_at: string | null
          description: string | null
          file_name: string
          file_path: string
          file_size: number | null
          file_type: string
          id: string
          is_shared_with_parents: boolean | null
          patient_id: string | null
          uploaded_by: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          file_name: string
          file_path: string
          file_size?: number | null
          file_type: string
          id?: string
          is_shared_with_parents?: boolean | null
          patient_id?: string | null
          uploaded_by: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          file_name?: string
          file_path?: string
          file_size?: number | null
          file_type?: string
          id?: string
          is_shared_with_parents?: boolean | null
          patient_id?: string | null
          uploaded_by?: string
        }
        Relationships: [
          {
            foreignKeyName: "documents_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "documents_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      event_registrations: {
        Row: {
          attendance_status: string | null
          certificate_issued: boolean | null
          event_id: string
          id: string
          participant_email: string
          participant_name: string
          participant_phone: string | null
          payment_status: string | null
          registration_date: string | null
        }
        Insert: {
          attendance_status?: string | null
          certificate_issued?: boolean | null
          event_id: string
          id?: string
          participant_email: string
          participant_name: string
          participant_phone?: string | null
          payment_status?: string | null
          registration_date?: string | null
        }
        Update: {
          attendance_status?: string | null
          certificate_issued?: boolean | null
          event_id?: string
          id?: string
          participant_email?: string
          participant_name?: string
          participant_phone?: string | null
          payment_status?: string | null
          registration_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          certificate_template: string | null
          created_at: string | null
          description: string | null
          end_date: string
          event_type: string
          id: string
          instructor_id: string | null
          location: string | null
          max_participants: number | null
          price: number | null
          start_date: string
          status: string | null
          title: string
        }
        Insert: {
          certificate_template?: string | null
          created_at?: string | null
          description?: string | null
          end_date: string
          event_type: string
          id?: string
          instructor_id?: string | null
          location?: string | null
          max_participants?: number | null
          price?: number | null
          start_date: string
          status?: string | null
          title: string
        }
        Update: {
          certificate_template?: string | null
          created_at?: string | null
          description?: string | null
          end_date?: string
          event_type?: string
          id?: string
          instructor_id?: string | null
          location?: string | null
          max_participants?: number | null
          price?: number | null
          start_date?: string
          status?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      medical_records: {
        Row: {
          appointment_id: string | null
          attachments: string[] | null
          created_at: string | null
          evolution: string | null
          goals: string | null
          id: string
          next_session_plan: string | null
          patient_id: string
          professional_id: string
          session_date: string
          session_notes: string
          specialty_id: string
          updated_at: string | null
        }
        Insert: {
          appointment_id?: string | null
          attachments?: string[] | null
          created_at?: string | null
          evolution?: string | null
          goals?: string | null
          id?: string
          next_session_plan?: string | null
          patient_id: string
          professional_id: string
          session_date: string
          session_notes: string
          specialty_id: string
          updated_at?: string | null
        }
        Update: {
          appointment_id?: string | null
          attachments?: string[] | null
          created_at?: string | null
          evolution?: string | null
          goals?: string | null
          id?: string
          next_session_plan?: string | null
          patient_id?: string
          professional_id?: string
          session_date?: string
          session_notes?: string
          specialty_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "medical_records_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medical_records_patient_id_fkey"
            columns: ["patient_id"]
            isOneToOne: false
            referencedRelation: "patients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medical_records_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "medical_records_specialty_id_fkey"
            columns: ["specialty_id"]
            isOneToOne: false
            referencedRelation: "specialties"
            referencedColumns: ["id"]
          },
        ]
      }
      patients: {
        Row: {
          address: string | null
          allergies: string | null
          birth_date: string
          cpf: string | null
          created_at: string | null
          emergency_contact: string | null
          emergency_phone: string | null
          full_name: string
          id: string
          is_active: boolean | null
          medical_history: string | null
          medications: string | null
          phone: string | null
          responsible_id: string | null
          rg: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          allergies?: string | null
          birth_date: string
          cpf?: string | null
          created_at?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          full_name: string
          id?: string
          is_active?: boolean | null
          medical_history?: string | null
          medications?: string | null
          phone?: string | null
          responsible_id?: string | null
          rg?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          allergies?: string | null
          birth_date?: string
          cpf?: string | null
          created_at?: string | null
          emergency_contact?: string | null
          emergency_phone?: string | null
          full_name?: string
          id?: string
          is_active?: boolean | null
          medical_history?: string | null
          medications?: string | null
          phone?: string | null
          responsible_id?: string | null
          rg?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "patients_responsible_id_fkey"
            columns: ["responsible_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          is_active: boolean | null
          phone: string | null
          professional_license: string | null
          role: string
          specialty: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id: string
          is_active?: boolean | null
          phone?: string | null
          professional_license?: string | null
          role: string
          specialty?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          is_active?: boolean | null
          phone?: string | null
          professional_license?: string | null
          role?: string
          specialty?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      rooms: {
        Row: {
          capacity: number | null
          created_at: string | null
          description: string | null
          equipment: string[] | null
          id: string
          is_active: boolean | null
          name: string
        }
        Insert: {
          capacity?: number | null
          created_at?: string | null
          description?: string | null
          equipment?: string[] | null
          id?: string
          is_active?: boolean | null
          name: string
        }
        Update: {
          capacity?: number | null
          created_at?: string | null
          description?: string | null
          equipment?: string[] | null
          id?: string
          is_active?: boolean | null
          name?: string
        }
        Relationships: []
      }
      specialties: {
        Row: {
          created_at: string | null
          default_price: number | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          session_duration: number | null
        }
        Insert: {
          created_at?: string | null
          default_price?: number | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          session_duration?: number | null
        }
        Update: {
          created_at?: string | null
          default_price?: number | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          session_duration?: number | null
        }
        Relationships: []
      }
      work_hours: {
        Row: {
          appointment_id: string | null
          created_at: string | null
          date: string
          description: string | null
          end_time: string
          hourly_rate: number | null
          hours_worked: number
          id: string
          professional_id: string
          start_time: string
          status: string | null
          total_amount: number | null
        }
        Insert: {
          appointment_id?: string | null
          created_at?: string | null
          date: string
          description?: string | null
          end_time: string
          hourly_rate?: number | null
          hours_worked: number
          id?: string
          professional_id: string
          start_time: string
          status?: string | null
          total_amount?: number | null
        }
        Update: {
          appointment_id?: string | null
          created_at?: string | null
          date?: string
          description?: string | null
          end_time?: string
          hourly_rate?: number | null
          hours_worked?: number
          id?: string
          professional_id?: string
          start_time?: string
          status?: string | null
          total_amount?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "work_hours_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_hours_professional_id_fkey"
            columns: ["professional_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
