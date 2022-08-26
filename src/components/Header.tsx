import './Header.scss'
import igniteLogo from './assets/logo.svg'

export function Header() {
  return (
    <header className="header">
      <div>
        <img src={igniteLogo} alt="Logotipo ignite" />
      </div>
    </header>
  )
}