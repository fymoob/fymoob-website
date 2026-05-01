import { SITE_URL } from "@/lib/constants"

const INDEXNOW_KEY = "d7ce36f0730ca0d491f787e07907b113b89651d7f297a09a2bec64e2cd09e43f"
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"

function getHost(): string {
  return new URL(SITE_URL).host
}

export async function submitToIndexNow(urls: string[]): Promise<{ ok: boolean; status: number }> {
  if (urls.length === 0) return { ok: true, status: 200 }

  const host = getHost()
  const payload = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: `https://${host}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  }

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(payload),
    })
    return { ok: res.ok, status: res.status }
  } catch (err) {
    console.error("[indexnow] submit failed:", err)
    return { ok: false, status: 0 }
  }
}

export async function submitUrl(url: string) {
  return submitToIndexNow([url])
}
