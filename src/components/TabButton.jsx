import { Button } from './ui';

export default function TabButton({ active, onClick, children }) {
  return (
    <Button
      onClick={onClick}
      variant={active ? 'primary' : 'secondary'}
      size="md"
      className={active ? 'shadow-sm' : ''}
    >
      {children}
    </Button>
  );
}
