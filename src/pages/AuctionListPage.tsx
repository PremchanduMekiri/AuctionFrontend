import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import AuctionList from '../components/auctions/AuctionList';
import SearchFilters from '../components/auctions/SearchFilters';
import { Auction } from '../types';
import { useAuctions, AuctionFilters } from '../context/AuctionContext';

const AuctionListPage: React.FC = () => {
  const location = useLocation();
  const { auctions, searchAuctions } = useAuctions();
  const [filteredAuctions, setFilteredAuctions] = useState<Auction[]>(auctions);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<AuctionFilters>({});
  
  // Parse query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get('category');
    
    if (categoryFromUrl) {
      setFilters(prev => ({ ...prev, category: categoryFromUrl }));
      handleSearch('', { ...filters, category: categoryFromUrl });
    } else {
      setFilteredAuctions(auctions);
    }
  }, [location.search, auctions]);
  
  const handleSearch = (query: string, filters: AuctionFilters) => {
    setSearchQuery(query);
    setFilters(filters);
    const results = searchAuctions(query, filters);
    setFilteredAuctions(results);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {searchQuery ? `Search Results for "${searchQuery}"` : 'Browse Auctions'}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {filteredAuctions.length} {filteredAuctions.length === 1 ? 'auction' : 'auctions'} found
          </p>
        </div>
        
        <SearchFilters onSearch={handleSearch} />
        
        <AuctionList 
          auctions={filteredAuctions}
          emptyMessage={searchQuery 
            ? `No auctions found matching "${searchQuery}". Try adjusting your search criteria.` 
            : "No auctions found matching your filters."
          }
          columns={3}
        />
      </div>
    </Layout>
  );
};

export default AuctionListPage;