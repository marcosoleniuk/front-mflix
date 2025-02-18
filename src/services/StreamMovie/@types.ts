export interface AudioTrack {
  id: string;
  language: string;
  label: string;
}

export interface StreamResponse {
  url: string;
  audioTracks: AudioTrack[];
}