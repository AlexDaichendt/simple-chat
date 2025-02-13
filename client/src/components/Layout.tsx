interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <>
      <main className="min-h-screen p-1 sm:p-4">
        <header className="top-0 w-full bg-white" role="banner">
          <h1 className="text-3xl text-center mb-3">Simple Chat</h1>
        </header>
        <div className="max-w-2xl m-auto" role="main">
          {children}
        </div>
      </main>
    </>
  );
}

export default Layout;
