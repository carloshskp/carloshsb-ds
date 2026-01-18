import {Home, User, Mail} from "lucide-react";
import {cn} from "../../utils";
import "../../styles/side-nav.scss";
import {Link, useLocation} from "react-router-dom";

export function SideNav() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={cn(
        "side-nav",
        "hidden md:flex"
      )}
      id="main-navigation"
      aria-label="Navegação principal"
      role="navigation"
    >
      <Link 
        to="/" 
        className={cn(
          "side-nav__link",
          isActive("/") && "side-nav__link--active"
        )}
        aria-label="Ir para a página inicial"
        aria-current={isActive("/") ? "page" : undefined}
      >
        <Home aria-hidden="true" className="side-nav__icon" />
        <span className="sr-only">Início</span>
        <span className="side-nav__tooltip">Início</span>
      </Link>
      <Link 
        to="/about" 
        className={cn(
          "side-nav__link",
          isActive("/about") && "side-nav__link--active"
        )}
        aria-label="Ir para a página sobre"
        aria-current={isActive("/about") ? "page" : undefined}
      >
        <User aria-hidden="true" className="side-nav__icon" />
        <span className="sr-only">Sobre</span>
        <span className="side-nav__tooltip">Sobre</span>
      </Link>
      <Link 
        to="/contact" 
        className={cn(
          "side-nav__link",
          isActive("/contact") && "side-nav__link--active"
        )}
        aria-label="Ir para a página de contato"
        aria-current={isActive("/contact") ? "page" : undefined}
      >
        <Mail aria-hidden="true" className="side-nav__icon" />
        <span className="sr-only">Contato</span>
        <span className="side-nav__tooltip">Contato</span>
      </Link>
    </nav>
  );
}

export default SideNav;
