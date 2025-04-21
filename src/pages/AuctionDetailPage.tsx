import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Clock, MapPin, Tag, Box, Truck, 
  Scale, Calendar, DollarSign, User 
} from 'lucide-react';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import BidForm from '../components/auctions/BidForm';
import { useAuctions } from '../context/AuctionContext';
import { formatCurrency } from '../utils/formatters';
import { formatDate, formatTimeRemaining, hasEnded } from '../utils/dateUtils';

const AuctionDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getAuctionById } = useAuctions();
  const [activeImage, setActiveImage] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<string>('');
  
  const auction = getAuctionById(id || '');
  
  useEffect(() => {
    if (!auction) return;
    
    // Update time remaining every second
    const timer = setInterval(() => {
      setTimeRemaining(formatTimeRemaining(auction.endDate));
    }, 1000);
    
    return () => clearInterval(timer);
  }, [auction]);
  
  if (!auction) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Auction Not Found</h1>
          <p className="text-gray-600 mb-8">The auction you're looking for doesn't exist or has been removed.</p>
          <Link to="/auctions">
            <Button variant="primary">Browse Auctions</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  const auctionEnded = hasEnded(auction.endDate);
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Link to="/auctions" className="inline-flex items-center text-blue-800 hover:text-blue-700 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Auctions
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              {/* Main Image */}
              <div className="relative bg-gray-100 aspect-video">
                <img 
                  src={auction.images[activeImage]} 
                  alt={auction.title} 
                  className="w-full h-full object-contain"
                />
                
                {auctionEnded && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-red-600 text-white py-2 px-4 rounded-md font-bold text-lg">
                      Auction Ended
                    </div>
                  </div>
                )}
              </div>
              
              {/* Thumbnail Images */}
              {auction.images.length > 1 && (
                <div className="flex p-2 gap-2 overflow-x-auto">
                  {auction.images.map((image, index) => (
                    <div 
                      key={index}
                      className={`w-20 h-20 flex-shrink-0 cursor-pointer border-2 rounded overflow-hidden
                        ${index === activeImage ? 'border-blue-800' : 'border-transparent'}
                      `}
                      onClick={() => setActiveImage(index)}
                    >
                      <img 
                        src={image} 
                        alt={`Thumbnail ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Auction Details */}
            <Card className="mb-6" padding="lg">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{auction.title}</h1>
              
              <div className="flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-2 mb-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Started {formatDate(auction.startDate)}</span>
                </div>
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  <span>{auction.material}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{auction.location}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  <span>Seller: {auction.sellerName}</span>
                </div>
              </div>
              
              <div className="border-t border-b border-gray-200 py-4 my-4">
                <h2 className="text-lg font-semibold mb-3">Description</h2>
                <p className="text-gray-700 whitespace-pre-line">
                  {auction.description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex items-center text-gray-500 text-sm mb-1">
                    <Box className="h-4 w-4 mr-1" />
                    <span>Quantity</span>
                  </div>
                  <div className="font-medium">{auction.quantity} {auction.unit}</div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex items-center text-gray-500 text-sm mb-1">
                    <Truck className="h-4 w-4 mr-1" />
                    <span>Shipping</span>
                  </div>
                  <div className="font-medium">Buyer arranges pickup</div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex items-center text-gray-500 text-sm mb-1">
                    <Scale className="h-4 w-4 mr-1" />
                    <span>Payment Terms</span>
                  </div>
                  <div className="font-medium">Due within 3 days of auction end</div>
                </div>
              </div>
            </Card>
            
            {/* Bid History */}
            <Card padding="lg">
              <h2 className="text-lg font-semibold mb-4">Bid History</h2>
              
              {auction.bids.length > 0 ? (
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Bidder
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[...auction.bids].reverse().map(bid => (
                        <tr key={bid.id}>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="font-medium text-gray-900">{bid.username}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-blue-800 font-medium">{formatCurrency(bid.amount)}</div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(bid.timestamp)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-4 bg-gray-50 rounded-md">
                  <p className="text-gray-500">No bids yet. Be the first to bid!</p>
                </div>
              )}
            </Card>
          </div>
          
          {/* Right Column - Bidding */}
          <div>
            {/* Auction Status */}
            <Card className="mb-6" padding="lg">
              <div className="flex flex-col">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Current Bid:</p>
                    <p className="text-3xl font-bold text-blue-800">
                      {formatCurrency(auction.currentBid)}
                    </p>
                  </div>
                  
                  <div className="text-right">
                    <p className="text-gray-500 text-sm mb-1">Starting Price:</p>
                    <p className="text-lg font-medium text-gray-700">
                      {formatCurrency(auction.startingPrice)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center mb-4">
                  <Clock className="h-5 w-5 text-amber-600 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Time Remaining:</p>
                    <p className={`font-medium ${auctionEnded ? 'text-red-600' : 'text-amber-600'}`}>
                      {timeRemaining}
                    </p>
                  </div>
                </div>
                
                <div className="text-sm text-gray-500">
                  <p>Auction ends: {formatDate(auction.endDate)}</p>
                  <p className="mt-1">Bids: {auction.bids.length}</p>
                </div>
              </div>
            </Card>
            
            {/* Bid Form */}
            <BidForm 
              auctionId={auction.id} 
              currentBid={auction.currentBid}
              endDate={auction.endDate}
            />
            
            {/* Seller Info */}
            <Card className="mt-6" padding="lg">
              <h3 className="text-lg font-semibold mb-3">Seller Information</h3>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                  <User className="w-full h-full p-2 text-gray-600" />
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">{auction.sellerName}</p>
                  <p className="text-sm text-gray-500">Seller since 2022</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <div className="bg-blue-50 text-blue-800 text-xs px-2 py-1 rounded-full">
                  Verified Seller
                </div>
                <div className="bg-green-50 text-green-800 text-xs px-2 py-1 rounded-full">
                  98% Positive Feedback
                </div>
              </div>
              
              <Button variant="outline" fullWidth>
                Contact Seller
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AuctionDetailPage;