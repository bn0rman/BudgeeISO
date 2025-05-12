'use client';

import { useTheme } from "@/components/ThemeProvider";
import { Moon, Sun } from 'lucide-react';
import { Button } from "@/components/ui/button";
import ThemeWrapper from "@/components/ThemeWrapper";

function ThemeToggleButton() {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="rounded-full"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}

// Default export with the wrapper to avoid "useTheme must be used within a ThemeProvider" error
export default function ThemeToggle() {
  return (
    <ThemeWrapper>
      <ThemeToggleButton />
    </ThemeWrapper>
  );
} 