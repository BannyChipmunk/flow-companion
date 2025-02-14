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
      cycle_entries: {
        Row: {
          created_at: string
          date: string
          flow_intensity: number | null
          id: string
          notes: string | null
          phase: Database["public"]["Enums"]["cycle_phase"] | null
          phase_details: Json | null
          timing_status: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          date: string
          flow_intensity?: number | null
          id?: string
          notes?: string | null
          phase?: Database["public"]["Enums"]["cycle_phase"] | null
          phase_details?: Json | null
          timing_status?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          date?: string
          flow_intensity?: number | null
          id?: string
          notes?: string | null
          phase?: Database["public"]["Enums"]["cycle_phase"] | null
          phase_details?: Json | null
          timing_status?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cycle_entries_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          age: number | null
          created_at: string
          first_name: string | null
          gender_identity: string | null
          health_notes: string | null
          id: string
          last_login: string | null
          last_name: string | null
          typical_cycle_length: number | null
          typical_period_duration: number | null
          updated_at: string
        }
        Insert: {
          age?: number | null
          created_at?: string
          first_name?: string | null
          gender_identity?: string | null
          health_notes?: string | null
          id: string
          last_login?: string | null
          last_name?: string | null
          typical_cycle_length?: number | null
          typical_period_duration?: number | null
          updated_at?: string
        }
        Update: {
          age?: number | null
          created_at?: string
          first_name?: string | null
          gender_identity?: string | null
          health_notes?: string | null
          id?: string
          last_login?: string | null
          last_name?: string | null
          typical_cycle_length?: number | null
          typical_period_duration?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      symptoms: {
        Row: {
          created_at: string
          cycle_entry_id: string
          id: string
          intensity: number | null
          notes: string | null
          type: Database["public"]["Enums"]["symptom_type"]
        }
        Insert: {
          created_at?: string
          cycle_entry_id: string
          id?: string
          intensity?: number | null
          notes?: string | null
          type: Database["public"]["Enums"]["symptom_type"]
        }
        Update: {
          created_at?: string
          cycle_entry_id?: string
          id?: string
          intensity?: number | null
          notes?: string | null
          type?: Database["public"]["Enums"]["symptom_type"]
        }
        Relationships: [
          {
            foreignKeyName: "symptoms_cycle_entry_id_fkey"
            columns: ["cycle_entry_id"]
            isOneToOne: false
            referencedRelation: "cycle_entries"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          apple_health_enabled: boolean | null
          created_at: string
          custom_symptoms: Json | null
          dashboard_view: string | null
          google_fit_enabled: boolean | null
          high_contrast_mode: boolean | null
          id: string
          large_text: boolean | null
          minimal_mode: boolean | null
          notification_sound: boolean | null
          notification_style:
            | Database["public"]["Enums"]["notification_style"]
            | null
          notification_vibration: boolean | null
          ovulation_reminder: boolean | null
          period_end_reminder: boolean | null
          period_start_reminder: boolean | null
          reminder_days_advance: number | null
          screen_reader_enabled: boolean | null
          share_anonymous_data: boolean | null
          sync_with_wearables: boolean | null
          theme_mode: Database["public"]["Enums"]["theme_mode"] | null
          updated_at: string
        }
        Insert: {
          apple_health_enabled?: boolean | null
          created_at?: string
          custom_symptoms?: Json | null
          dashboard_view?: string | null
          google_fit_enabled?: boolean | null
          high_contrast_mode?: boolean | null
          id: string
          large_text?: boolean | null
          minimal_mode?: boolean | null
          notification_sound?: boolean | null
          notification_style?:
            | Database["public"]["Enums"]["notification_style"]
            | null
          notification_vibration?: boolean | null
          ovulation_reminder?: boolean | null
          period_end_reminder?: boolean | null
          period_start_reminder?: boolean | null
          reminder_days_advance?: number | null
          screen_reader_enabled?: boolean | null
          share_anonymous_data?: boolean | null
          sync_with_wearables?: boolean | null
          theme_mode?: Database["public"]["Enums"]["theme_mode"] | null
          updated_at?: string
        }
        Update: {
          apple_health_enabled?: boolean | null
          created_at?: string
          custom_symptoms?: Json | null
          dashboard_view?: string | null
          google_fit_enabled?: boolean | null
          high_contrast_mode?: boolean | null
          id?: string
          large_text?: boolean | null
          minimal_mode?: boolean | null
          notification_sound?: boolean | null
          notification_style?:
            | Database["public"]["Enums"]["notification_style"]
            | null
          notification_vibration?: boolean | null
          ovulation_reminder?: boolean | null
          period_end_reminder?: boolean | null
          period_start_reminder?: boolean | null
          reminder_days_advance?: number | null
          screen_reader_enabled?: boolean | null
          share_anonymous_data?: boolean | null
          sync_with_wearables?: boolean | null
          theme_mode?: Database["public"]["Enums"]["theme_mode"] | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      cycle_phase: "menstrual" | "follicular" | "ovulation" | "luteal"
      notification_style: "detailed" | "discreet"
      symptom_type:
        | "cramps"
        | "headache"
        | "bloating"
        | "fatigue"
        | "mood_changes"
        | "breast_tenderness"
        | "acne"
        | "back_pain"
        | "nausea"
        | "other"
      theme_mode: "light" | "dark" | "custom"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
