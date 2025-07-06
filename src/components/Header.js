export default function Header() {
  return (
    <header className="w-full py-4 px-6 border-b">
      <nav className="max-w-7xl mx-auto flex flex-col items-center">
      <div className="flex flex-col items-center">
      <img src="logo_sistech.jpg" alt="Logo"/>
      </div>
        <ul className="flex gap-4 mt-4 self-end">
          <li><a href="/" className="hover:underline">Accueil</a></li>
          <li><a href="/aptemails" className="hover:underline">À propos</a></li>
          <li><a href="/packages" className="hover:underline">Services</a></li>
          <li><a href="/" className="hover:underline">Nos réalisations</a></li>
          <li><a href="/" className="hover:underline">Contact</a></li>
          
        </ul>
      </nav>
    </header>
  );
}
