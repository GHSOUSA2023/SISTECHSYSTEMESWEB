export default function Header() {
  return (
    <header className="w-full py-4 px-6 border-b">
      <nav className="max-w-7xl mx-auto flex flex-col items-center">
      <div className="flex flex-col items-center">
      <h1 className="text-xl font-bold">Creccal Investments Ltd</h1>
      <img src="logo_creccal.png" alt="Logo"/>
      <h2 className="text-lg font-semibold mt-2">Management System</h2>
      </div>
        <ul className="flex gap-4 mt-4 self-end">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><a href="/packages" className="hover:underline">Packages</a></li>
          <li><a href="/aptemails" className="hover:underline">Apt-Emails</a></li>
          
        </ul>
      </nav>
    </header>
  );
}
