
import { Menu, X, Users, Receipt, Wallet } from 'lucide-react';
const FeatureCard = ({ icon: Icon, title, description, image, reverse }) => {
  return (
    <div className={`flex flex-col ₦{reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-12 mb-16`}>
      <div className="flex-1 space-y-4">
        <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl">
          <Icon className="w-7 h-7 text-emerald-600" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900">{title}</h3>
        <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
      </div>
      <div className="flex-1">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <img
            src={image}
            alt={title}
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard