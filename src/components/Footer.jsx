const Footer = () => {
  return <footer className="bg-gray-900 text-gray-300 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h4 className="font-bold text-white mb-4">Product</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Security</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">Company</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-emerald-400 transition-colors">About</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Careers</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">Support</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Contact</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">FAQ</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-4">Legal</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Terms</a></li>
            <li><a href="#" className="hover:text-emerald-400 transition-colors">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-8 text-center">
        <p>&copy; 2025 Splitaire. All rights reserved.</p>
      </div>
    </div>
  </footer>;
};
export default Footer;