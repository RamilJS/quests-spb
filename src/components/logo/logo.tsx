import { Link } from 'react-router-dom';

function Logo(): JSX.Element {
  return (
    <Link
      className="logo header__logo"
      to="/"
      aria-label="Перейти на Главную"
    >
      <svg width={134} height={52} aria-hidden="true">
        <use xlinkHref="#logo" />
      </svg>
    </Link>
  );
}

export default Logo;
