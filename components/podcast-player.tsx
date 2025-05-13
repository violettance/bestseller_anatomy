"use client"

interface PodcastPlayerProps {
  spotifyUrl: string
  className?: string
}

export function PodcastPlayer({ spotifyUrl, className = "" }: PodcastPlayerProps) {
  // Extract the episode ID from the Spotify URL
  const episodeId = spotifyUrl.split("/").pop()?.split("?")[0]

  return (
    <div className={`mb-8 ${className}`} style={{ backgroundColor: "#121212" }}>
      <div
        className="w-full overflow-hidden"
        style={{
          backgroundColor: "#121212",
          position: "relative",
        }}
      >
        {/* Overlay to hide the white corners */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "12px",
            height: "12px",
            backgroundColor: "#121212",
            zIndex: 10,
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "12px",
            height: "12px",
            backgroundColor: "#121212",
            zIndex: 10,
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "12px",
            height: "12px",
            backgroundColor: "#121212",
            zIndex: 10,
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: "12px",
            height: "12px",
            backgroundColor: "#121212",
            zIndex: 10,
          }}
        ></div>

        <iframe
          src={`https://open.spotify.com/embed/episode/${episodeId}?utm_source=generator&theme=0`}
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          style={{
            border: "none",
            backgroundColor: "#121212",
            display: "block",
            margin: 0,
            padding: 0,
            position: "relative",
            zIndex: 1,
          }}
          title="Spotify podcast player"
        ></iframe>
      </div>
    </div>
  )
}
