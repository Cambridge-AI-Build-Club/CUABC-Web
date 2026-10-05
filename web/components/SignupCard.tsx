// _includes/signup.html
import { loadSignup } from '@/lib/content'

export function SignupCard({ showButton = false }: { showButton?: boolean }) {
  const form = loadSignup().form
  return (
    <div className="signup">
      <div className="signup-box-top">
        <div className="signup-phone">
          <strong>Excited to join? Sign up and start building!</strong>
        </div>
      </div>
      {showButton && (
        <div className="signup-box-bottom">
          <a href={form} className="button">
            Sign-Up
          </a>
        </div>
      )}
    </div>
  )
}
