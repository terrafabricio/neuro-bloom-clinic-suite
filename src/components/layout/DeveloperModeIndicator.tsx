
import { Code, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface DeveloperModeIndicatorProps {
  isActive: boolean;
}

export function DeveloperModeIndicator({ isActive }: DeveloperModeIndicatorProps) {
  if (!isActive) return null;

  return (
    <Alert className="border-red-500 bg-red-50">
      <AlertTriangle className="h-4 w-4 text-red-600" />
      <AlertDescription className="flex items-center gap-2 text-red-800">
        <Code className="h-4 w-4" />
        <strong>Modo Desenvolvedor Ativo:</strong> 
        Você tem acesso irrestrito a todas as funcionalidades do sistema
      </AlertDescription>
    </Alert>
  );
}
