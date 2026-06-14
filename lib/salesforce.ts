interface SFToken {
  access_token: string
  instance_url: string
  expires_at:   number
}

let cachedToken: SFToken | null = null

export async function getSFToken(): Promise<SFToken> {
  if (cachedToken && Date.now() < cachedToken.expires_at - 300_000) {
    return cachedToken
  }

  const res = await fetch(
    `${process.env.SF_INSTANCE_URL}/services/oauth2/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type:    'client_credentials',
        client_id:     process.env.SF_CLIENT_ID!,
        client_secret: process.env.SF_CLIENT_SECRET!,
      }),
      cache: 'no-store',
    }
  )

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`SF Token error: ${err}`)
  }

  const data = await res.json()

  cachedToken = {
    access_token: data.access_token,
    instance_url: data.instance_url,
    expires_at:   Date.now() + 2 * 60 * 60 * 1000,
  }

  return cachedToken
}

export async function sfQuery(soql: string, revalidate = 86400) {
  const token = await getSFToken()
  const url = `${token.instance_url}/services/data/v59.0/query?q=${encodeURIComponent(soql)}`

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token.access_token}` },
    next: { revalidate }
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`SF Query error: ${err}`)
  }

  return res.json()
}

export async function sfCreate(
  objectName: string,
  data: Record<string, unknown>
) {
  const token = await getSFToken()
  const url = `${token.instance_url}/services/data/v59.0/sobjects/${objectName}/`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization:  `Bearer ${token.access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    cache: 'no-store',
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`SF Create error: ${err}`)
  }

  return res.json()
}