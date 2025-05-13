"use client"

interface PodcastPlayerProps {
  spotifyUrl: string
  className?: string
}

export function PodcastPlayer({ spotifyUrl, className = "" }: PodcastPlayerProps) {
  // Extract the episode ID from the Spotify URL
  const episodeId = spotifyUrl.split("/").pop()?.split("?")[0]

  return (
    <div className={`mb-8 rounded-lg overflow-hidden bg-[#8b5cf6] bg-opacity-10 ${className}`}>
      <div className="w-full">
        <iframe
          src={`https://open.spotify.com/embed/episode/${episodeId}?utm_source=generator&theme=0`}
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className="border-none"
          title="Spotify podcast player"
        ></iframe>
      </div>
    </div>
  )
}
