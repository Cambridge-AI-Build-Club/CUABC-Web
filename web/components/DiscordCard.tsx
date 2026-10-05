// _includes/discord.html
import { loadDiscord } from '@/lib/content'

export function DiscordCard({ showButton = false }: { showButton?: boolean }) {
  const discord = loadDiscord().discord
  return (
    <div className="discord">
      <div className="discord-box-top">
        <div className="discord-phone">
          <strong>Signed up? Join our Discord for updates!</strong>
        </div>
      </div>
      {showButton && (
        <div className="discord-box-bottom">
          <a href={discord} className="button">
            Discord
          </a>
        </div>
      )}
    </div>
  )
}
