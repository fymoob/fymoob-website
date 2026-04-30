"use server"

/**
 * Upload de cover image — bucket `articles-covers`. Server action separada
 * porque e chamada pelo ContentTab no editor (cliente).
 */

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { uploadImage, isUploadError } from "@/lib/supabase-storage"

export async function uploadCoverImageAction(
  file: File
): Promise<{ url: string } | { error: string }> {
  const session = await auth()
  if (!session?.user?.email) redirect("/admin/login")

  const result = await uploadImage("articles-covers", file)
  if (isUploadError(result)) return { error: result.error }
  return { url: result.url }
}
