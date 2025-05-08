"use client";

import { Button } from "@/components/ui/button";

export function TestComponent() {
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Test Shadcn UI Components</h2>
      <div className="space-x-4">
        <Button variant="default">Default Button</Button>
        <Button variant="destructive">Destructive Button</Button>
        <Button variant="outline">Outline Button</Button>
        <Button variant="secondary">Secondary Button</Button>
        <Button variant="ghost">Ghost Button</Button>
        <Button variant="link">Link Button</Button>
      </div>
    </div>
  );
} 