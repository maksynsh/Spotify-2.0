export interface Artist {
  id: string
  name: string
  href: string
}

export interface Image {
  width?: number
  height?: number
  url: string
}

export interface Album {
  id: string
  name: string
  href: string
  artists: Artist[]
  images: Image[]
  uri: string
}

export interface Track {
  id?: string
  duration_ms?: number
  name?: string
  artists?: Array<Artist>
  external_urls?: object
  preview_url?: string | null
  album?: Album
  uri?: string
}

export interface SongData {
  added_at: string
  track: Track
}
