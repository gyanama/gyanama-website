import { useEffect } from 'react';

/**
 * Sets the document title for the current page.
 * Appends " | GYANAMA" suffix automatically.
 */
export function useDocumentTitle(title: string): void {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${title} | GYANAMA`;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}
