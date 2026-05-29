import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-16 bg-gray-900 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="w-full md:w-auto flex items-center gap-3 mb-4 md:mb-0">
            <div style={{ width: "40px", height: "40px", position: "relative" }}>
              <Image 
                src="/images/icon-web1-64.png" 
                alt="Logotipo de Rosario Graphics" 
                fill
                sizes="40px"
                style={{ objectFit: "contain" }} 
              />
            </div>
            <span className="text-white font-bold text-lg">Rosario Graphics</span>
          </div>
          <div className="w-full md:w-auto text-center md:text-left">
            <p className="text-sm text-gray-400">
              © 2026 Rosario Graphics. Todos los derechos reservados. Santo Domingo, República Dominicana
            </p>
          </div>
          <div className="w-full md:w-auto mt-4 md:mt-0 flex justify-center md:justify-end space-x-4">
            <a className="text-gray-400 hover:text-white transition-colors" href="https://facebook.com/rosariographic" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a className="text-gray-400 hover:text-white transition-colors" href="https://instagram.com/rosariographic" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a className="text-gray-400 hover:text-white transition-colors" href="/privacidad">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  );
}