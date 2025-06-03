import { createClient } from "@supabase/supabase-js"

// Types for tables
export type Depoimento = {
  id?: string
  name: string
  since: string
  text: string
  photo_url?: string | null
  status: "pendente" | "aprovado" | "rejeitado"
  created_at?: string
}

export type Familia = {
  id?: string
  name: string
  story: string
  photo_url?: string | null
  status: "pendente" | "aprovado" | "rejeitado"
  created_at?: string
}

export type Memoria = {
  id?: string
  honored_name: string
  submitter_name?: string
  message?: string
  status: "pendente" | "aprovado" | "rejeitado"
  created_at?: string
}

// Create a singleton Supabase client lazily
let supabaseInstance: ReturnType<typeof createClient> | null = null

function getSupabaseClient() {
  if (supabaseInstance) return supabaseInstance

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase credentials are missing. Some features may not work properly.")
    return null
  }

  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
  return supabaseInstance
}

// Functions to interact with Supabase
export async function submitDepoimento(depoimento: Omit<Depoimento, "id" | "status" | "created_at">) {
  const supabase = getSupabaseClient()
  if (!supabase) {
    throw new Error("Supabase client not initialized. Check your environment variables.")
  }
  return supabase.from("depoimentos").insert([{ ...depoimento, status: "pendente" }])
}

export async function submitFamilia(familia: Omit<Familia, "id" | "status" | "created_at">) {
  const supabase = getSupabaseClient()
  if (!supabase) {
    throw new Error("Supabase client not initialized. Check your environment variables.")
  }
  return supabase.from("familias").insert([{ ...familia, status: "pendente" }])
}

export async function submitMemoria(memoria: Omit<Memoria, "id" | "status" | "created_at">) {
  const supabase = getSupabaseClient()
  if (!supabase) {
    throw new Error("Supabase client not initialized. Check your environment variables.")
  }
  return supabase.from("memorias").insert([{ ...memoria, status: "pendente" }])
}

export async function getApprovedDepoimentos() {
  const supabase = getSupabaseClient()
  if (!supabase) {
    // Return a mock response that matches the expected structure
    return {
      data: null,
      error: new Error("Supabase client not initialized. Check your environment variables."),
    }
  }
  return supabase.from("depoimentos").select("*").eq("status", "aprovado").order("created_at", { ascending: false })
}
