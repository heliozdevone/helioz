import { useCallback } from 'react';

export function useToast() {
  const toast = useCallback((message: string) => {
    // placeholder: integrate with UI toast system
    console.log('toast:', message);
  }, []);

  return { toast };
}
