import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto flex items-center justify-between p-4">
          <img src="/MELI-logo.png" alt="MELI Logo" className="w-auto h-8" />
        </div>
      </header>

      <main className="max-w-lg mx-auto p-4">{children}</main>
    </div>
  );
};
