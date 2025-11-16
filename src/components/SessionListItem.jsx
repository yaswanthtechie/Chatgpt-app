import { NavLink } from 'react-router-dom';

const SessionListItem = ({ session }) => {
  return (
    <NavLink
      to={`/session/${session.id}`}
      className={({ isActive }) =>
        `block w-full text-left px-3 py-1.5 text-sm rounded-md truncate transition-colors ${
          isActive
            ? 'bg-light-accent/10 dark:bg-dark-accent/20 text-light-accent dark:text-dark-accent'
            : 'text-light-secondary dark:text-dark-secondary hover:bg-light-surface dark:hover:bg-dark-surface'
        }`
      }
    >
      {session.title}
    </NavLink>
  );
};

export default SessionListItem;
