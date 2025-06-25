
import { useState } from 'react';
import { Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export function DevModeToggle() {
  const [devMode, setDevMode] = useState(false);
  const navigate = useNavigate();

  const toggleDevMode = () => {
    const newMode = !devMode;
    setDevMode(newMode);
    
    // Store in localStorage for persistence
    localStorage.setItem('developerMode', newMode.toString());
    
    // If activating dev mode and on home page, redirect to dashboard
    if (newMode && window.location.pathname === '/') {
      navigate('/dashboard');
    }
  };

  return (
    <Button
      variant={devMode ? "destructive" : "outline"}
      size="sm"
      onClick={toggleDevMode}
      className="gap-2 fixed top-4 right-4 z-50"
    >
      <Code className="h-4 w-4" />
      {devMode ? "Sair Modo Dev" : "Modo Dev"}
    </Button>
  );
}
