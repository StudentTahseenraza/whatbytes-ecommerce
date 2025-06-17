// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="flex items-start justify-between p-6 text-white bg-blue-900">
      <div>
        <h3 className="mb-2 text-sm font-semibold uppercase">Filters</h3>
        <p className="text-sm">All Electronics</p>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold uppercase">About Us</h3>
        <p className="text-sm">About Us</p>
        <p className="mt-1 text-sm">Contact</p>
      </div>
      <div>
        <h3 className="mb-2 text-sm font-semibold uppercase">Follow Us</h3>
        <div className="flex space-x-3">
          <a href="#" className="text-xl">
            <span className="inline-block w-6 h-6 leading-6 text-center bg-blue-600 rounded-full">f</span>
          </a>
          <a href="#" className="text-xl">
            <span className="inline-block w-6 h-6 leading-6 text-center bg-blue-600 rounded-full">t</span>
          </a>
        </div>
      </div>
      <p className="text-sm">© 2024 American</p>
    </footer>
  );
}