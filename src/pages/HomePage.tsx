import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, DollarSign, Award, TrendingUp, Mail, Phone, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import AuctionList from '../components/auctions/AuctionList';
import { useAuctions } from '../context/AuctionContext';
import { formatCurrency } from '../utils/formatters';
import { formatTimeRemaining } from '../utils/dateUtils';

const HomePage: React.FC = () => {
  const { auctions, featuredAuctions } = useAuctions();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  
  const faqItems = [
    {
      question: "How do I start selling on Meta E Bid?",
      answer: "To start selling, register as a supplier, complete your profile, and list your scrap materials for auction. Our team will verify your account before you can start selling. The verification process typically takes 24-48 hours."
    },
    {
      question: "What types of scrap materials can I sell?",
      answer: "You can sell various industrial scrap materials including metal (steel, aluminum, copper), plastic (PVC, HDPE, PP), electronic components (PCBs, processors), automotive parts, and more. Each category has specific requirements and guidelines to ensure quality standards."
    },
    {
      question: "How are payments processed?",
      answer: "Payments are processed securely through our platform. We hold the payment in escrow until the buyer confirms receipt of the materials. This ensures safe transactions for both parties. We support multiple payment methods including bank transfers and secure digital payments."
    },
    {
      question: "What are the shipping arrangements?",
      answer: "Shipping can be arranged by either the seller or buyer, as agreed upon during the auction. We have partnerships with reliable logistics providers who can handle industrial material transportation. All shipments are tracked and insured for safety."
    },
    {
      question: "How do you ensure quality of materials?",
      answer: "Sellers must provide detailed descriptions, photos, and material certificates when applicable. We have a rating system for sellers and buyers, and our quality assurance team randomly inspects materials. Any disputes are handled through our resolution center."
    }
  ];

  // Get upcoming auctions sorted by end date
  const upcomingAuctions = auctions
    .filter(auction => auction.status === 'active')
    .sort((a, b) => new Date(a.endDate).getTime() - new Date(b.endDate).getTime())
    .slice(0, 5);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white overflow-hidden">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Image */}
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/2760243/pexels-photo-2760243.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                alt="Industrial Scrap" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
            </div>

            {/* Right side - Upcoming Bids */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Find the Best Deals on Industrial Scrap Materials
                </h1>
                <p className="text-lg opacity-90 mb-6">
                  Connect with verified suppliers and buyers. Get the best prices for your industrial scrap materials.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 mb-8">
                  <Button variant="secondary" size="lg">
                    Browse Auctions
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="text-white border-white hover:bg-white/10"
                  >
                    Start Selling
                  </Button>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Upcoming Auctions
                </h2>
                <div className="space-y-3 overflow-y-auto max-h-[200px] pr-2 scrollbar-thin">
                  {upcomingAuctions.map((auction) => (
                    <Link 
                      key={auction.id}
                      to={`/auction/${auction.id}`}
                      className="block bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-colors"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-white">{auction.title}</h3>
                          <p className="text-sm text-blue-200">{auction.material}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-amber-400">
                            {formatCurrency(auction.currentBid)}
                          </p>
                          <p className="text-sm text-blue-200">
                            {formatTimeRemaining(auction.endDate)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Auctions */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Auctions</h2>
            <Link to="/auctions" className="text-blue-800 hover:text-blue-700 flex items-center">
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          
          <AuctionList auctions={featuredAuctions} columns={3} />
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-8">Browse By Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              {
                id: 'industrial',
                name: 'Industrial',
                description: 'Heavy machinery and equipment',
                icon: 'tool'
              },
              {
                id: 'metals',
                name: 'Metals',
                description: 'Steel, aluminum, copper',
                icon: 'flask'
              },
              {
                id: 'electronics',
                name: 'Electronics',
                description: 'Circuit boards, components',
                icon: 'cpu'
              },
              {
                id: 'automotive',
                name: 'Automotive',
                description: 'Vehicle parts and materials',
                icon: 'car'
              },
              {
                id: 'construction',
                name: 'Construction',
                description: 'Building materials and tools',
                icon: 'hard-hat'
              },
              {
                id: 'plastics',
                name: 'Plastics',
                description: 'Industrial plastics and polymers',
                icon: 'scissors'
              }
            ].map(category => (
              <Link 
                key={category.id} 
                to={`/auctions?category=${category.id}`}
                className="bg-gray-50 hover:bg-gray-100 p-4 rounded-lg text-center transition-colors duration-300 border border-gray-200"
              >
                <div className="bg-blue-100 text-blue-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  {/* Dynamically render the icon based on the icon name */}
                  {category.icon === 'tool' && <Award className="h-6 w-6" />}
                  {category.icon === 'flask' && <TrendingUp className="h-6 w-6" />}
                  {category.icon === 'cpu' && <DollarSign className="h-6 w-6" />}
                  {category.icon === 'car' && <Award className="h-6 w-6" />}
                  {category.icon === 'hard-hat' && <Award className="h-6 w-6" />}
                  {category.icon === 'scissors' && <Award className="h-6 w-6" />}
                </div>
                <h3 className="font-medium text-gray-900">{category.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted Partners Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-4">Our Trusted Partners</h2>
          <p className="text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            We collaborate with industry leaders to ensure quality, reliability, and excellence in every transaction.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Tata Steel */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="h-20 flex items-center justify-center mb-4">
                <img 
                  src="https://www.tatasteel.com/images/tata-steel-logo.svg" 
                  alt="Tata Steel" 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-gray-900">Tata Steel</h3>
              <p className="text-sm text-gray-600 text-center">Global Steel Manufacturing</p>
            </div>

            {/* JSW Steel */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="h-20 flex items-center justify-center mb-4">
                <img 
                  src="https://www.jsw.in/sites/all/themes/jsw_theme/images/jsw-logo-new.png" 
                  alt="JSW Steel" 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-gray-900">JSW Steel</h3>
              <p className="text-sm text-gray-600 text-center">Leading Steel Producer</p>
            </div>

            {/* Hindalco */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="h-20 flex items-center justify-center mb-4">
                <img 
                  src="https://www.hindalco.com/style%20library/images/logo.png" 
                  alt="Hindalco" 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-gray-900">Hindalco</h3>
              <p className="text-sm text-gray-600 text-center">Aluminum and Copper Solutions</p>
            </div>

            {/* Vedanta */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="h-20 flex items-center justify-center mb-4">
                <img 
                  src="https://www.vedantalimited.com/img/logo.png" 
                  alt="Vedanta" 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-gray-900">Vedanta</h3>
              <p className="text-sm text-gray-600 text-center">Diversified Natural Resources</p>
            </div>

            {/* SAIL */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="h-20 flex items-center justify-center mb-4">
                <img 
                  src="https://www.sail.co.in/sites/all/themes/sail/images/sail-logo.png" 
                  alt="SAIL" 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-gray-900">SAIL</h3>
              <p className="text-sm text-gray-600 text-center">State-owned Steel Manufacturing</p>
            </div>

            {/* Jindal Steel */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="h-20 flex items-center justify-center mb-4">
                <img 
                  src="https://www.jindalsteelpower.com/img/jspl-logo.png" 
                  alt="Jindal Steel" 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-gray-900">Jindal Steel</h3>
              <p className="text-sm text-gray-600 text-center">Integrated Steel Manufacturing</p>
            </div>

            {/* NALCO */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="h-20 flex items-center justify-center mb-4">
                <img 
                  src="https://www.nalcoindia.com/wp-content/themes/nalco/images/logo.png" 
                  alt="NALCO" 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-gray-900">NALCO</h3>
              <p className="text-sm text-gray-600 text-center">Aluminum Manufacturing</p>
            </div>

            {/* Bharat Forge */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="h-20 flex items-center justify-center mb-4">
                <img 
                  src="https://www.bharatforge.com/assets/images/bf-logo.png" 
                  alt="Bharat Forge" 
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-center text-gray-900">Bharat Forge</h3>
              <p className="text-sm text-gray-600 text-center">Forging and Engineering</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600">Join our network of trusted partners and elevate your business</p>
            <Button variant="primary" size="lg" className="mt-4">
              Become a Partner
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">How Meta E Bid Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 text-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Register & Verify</h3>
              <p className="text-gray-600">Create your account and complete the verification process to start trading.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-amber-100 text-amber-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">List or Browse</h3>
              <p className="text-gray-600">List your materials for auction or browse available listings from verified sellers.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 text-green-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Bid & Negotiate</h3>
              <p className="text-gray-600">Place competitive bids and negotiate terms with sellers through our secure platform.</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 text-purple-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Complete & Deliver</h3>
              <p className="text-gray-600">Finalize transactions with secure payments and arrange material delivery.</p>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-lg shadow-md p-6 max-w-3xl mx-auto">
            <h3 className="text-xl font-semibold mb-4 text-center">Our Commitment</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <span className="text-green-500 flex-shrink-0">✓</span>
                <p className="text-gray-600">Secure escrow payments for safe transactions</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-500 flex-shrink-0">✓</span>
                <p className="text-gray-600">Verified sellers and quality materials</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-500 flex-shrink-0">✓</span>
                <p className="text-gray-600">Transparent bidding process</p>
              </div>
              <div className="flex items-start space-x-3">
                <span className="text-green-500 flex-shrink-0">✓</span>
                <p className="text-gray-600">24/7 support for all users</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses buying and selling scrap materials on Meta E Bid.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              Register
            </Button>
            
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-16">Our Trusted Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-stretch">
            <div className="group relative rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105">
              <img 
                src="https://images.unsplash.com/photo-1530983822321-fcac2d3c0f06?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Steel Manufacturing Facility" 
                className="w-full h-[200px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-bold text-white mb-1">Steel Manufacturing</h3>
                  <p className="text-blue-100 text-sm">High-grade steel materials</p>
                </div>
              </div>
            </div>
            
            <div className="group relative rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105">
              <img 
                src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Automotive Manufacturing" 
                className="w-full h-[200px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-bold text-white mb-1">Automotive Industry</h3>
                  <p className="text-blue-100 text-sm">Premium auto parts</p>
                </div>
              </div>
            </div>
            
            <div className="group relative rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105">
              <img 
                src="https://images.unsplash.com/photo-1601325979086-d54da2c7417c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Electronics Recycling" 
                className="w-full h-[200px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-bold text-white mb-1">Electronics Recycling</h3>
                  <p className="text-blue-100 text-sm">E-waste management</p>
                </div>
              </div>
            </div>
            
            <div className="group relative rounded-xl overflow-hidden shadow-lg transition-transform hover:scale-105">
              <img 
                src="https://images.unsplash.com/photo-1542744094-24638eff58bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" 
                alt="Metal Processing" 
                className="w-full h-[200px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-lg font-bold text-white mb-1">Metal Processing</h3>
                  <p className="text-blue-100 text-sm">Advanced recycling</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-16">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {faqItems.map((faq, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-200 hover:shadow-lg"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center hover:bg-blue-50/50 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 mr-3">
                      {index + 1}
                    </span>
                    {faq.question}
                  </h3>
                  {openFaqIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-blue-500 flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-blue-500 flex-shrink-0 ml-4" />
                  )}
                </button>
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    openFaqIndex === index 
                      ? 'max-h-96 opacity-100' 
                      : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="px-6 pb-6 pt-2">
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600">info@metaebid.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-blue-600 mt-1" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-gray-600">123 Industrial Park, Suite 456<br />New York, NY 10001</p>
                  </div>
                </div>
              </div>
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" id="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" id="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea id="message" rows={4} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
                </div>
                <Button type="submit" variant="primary" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;