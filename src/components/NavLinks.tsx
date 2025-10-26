import Link from 'next/link';

export default function NavLinks() {
  return (
 <>
      <a className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-base font-medium py-3 flex items-center gap-2" href="/" onClick={() => setIsMenuOpen(false)}>
        <span className="material-icons text-lg">home</span>
        Home
      </a>
      <a className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-base font-medium py-3 flex items-center gap-2" href="/Shows" onClick={() => setIsMenuOpen(false)}>
        <span className="material-icons text-lg">theater_comedy</span>
        Shows
      </a>
      <a className="text-gray-300 hover:text-amber-400 transition-colors duration-200 text-base font-medium py-3 flex items-center gap-2" href="#" onClick={() => setIsMenuOpen(false)}>
        <span className="material-icons text-lg">contact_support</span>
        Contact
      </a>
    </>
  );
}
