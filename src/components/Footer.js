export default function Footer() {
  return (
    <footer className="w-full py-6 px-6 border-t mt-auto">
      <div className="max-w-7xl mx-auto text-center">
        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} CRECCAL Investments Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
