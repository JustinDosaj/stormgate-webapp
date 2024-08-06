// components/BuildList.tsx

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '../shared/button';
import { BellIcon, HandThumbUpIcon } from '@heroicons/react/24/solid';
import { Container } from '../shared/container';
import algoliasearch, { SearchIndex } from 'algoliasearch/lite';
import { Build } from '@/constants/interfaces';
import { useRouter } from 'next/router';
import { GetAuthor } from '@/pages/api/firebase/functions';
import SkeletonLoader from './skeletonloader';

// Algolia configuration

const BUILDS_PER_PAGE = 10;

interface BuildListProps {
  title: string;
  userId?: string;
}

const BuildList: React.FC<BuildListProps> = ({ title, userId }) => {

  const [builds, setBuilds] = useState<Build[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [wait, setWait] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [filters, setFilters] = useState({
    gameMode: '1v1', // Default to 1v1
    faction: '', // Default to Any (empty string for no filter)
    enemyFaction: '', // Default to Any (empty string for no filter)
    userId: userId || '',
    sortBy: 'likes', // Default to sorting by likes
  });

  const searchClient = algoliasearch('IWZ4YN8O57', 'fce4ad6ae8c31f0c8e29644c3941c864');
  const index: SearchIndex = searchClient.initIndex(filters.sortBy === "likes" ? 'TEST_BUILDS_likes' : filters.sortBy === "createdAt" ? 'TEST_BUILDS_createdAt' : `TEST_BUILDS`);

  const router = useRouter();

  const fetchBuilds = async () => {
    setLoading(true); // Set loading state to true

    try {
      const filtersArray = [];

      // Add gameMode filter
      if (filters.gameMode) {
        filtersArray.push(`gameMode:${filters.gameMode}`);
      }

      // Add faction filter if selected
      if (filters.faction) {
        filtersArray.push(`faction:${filters.faction}`);
      }

      // Add enemyFaction filter if selected
      if (filters.enemyFaction) {
        filtersArray.push(`enemyFaction:${filters.enemyFaction}`);
      }

      if (userId) {
        filtersArray.push(`owner.id:${userId}`);
      }

      // Convert filters to Algolia query string
      const filtersString = filtersArray.join(' AND ');

      // Algolia search
      const { hits, nbPages } = await index.search('', {
        filters: `${filtersString}`,
        hitsPerPage: BUILDS_PER_PAGE,
        page: currentPage - 1,
        facetFilters: filtersString ? filtersArray : undefined,
      });

      // Transform hits to Build array
      const fetchedBuilds = await Promise.all(
        hits.map(async (hit: any) => {
          const author = await GetAuthor(hit.owner.id); // Retrieve the author's name
          return {
            id: hit.objectID,
            slug: hit.data.slug || 'temp-slug',
            title: hit.buildName,
            faction: hit.faction,
            ownerId: hit.owner.id,
            author: author, // Use the retrieved author's name
            enemyFaction: hit.enemyFaction,
            likes: hit.data.likes || 0,
            dateCreated: new Date(hit.data.createdAt).toLocaleDateString(),
          };
        })
      );

      setBuilds(fetchedBuilds);
      setTotalPages(nbPages);
    } catch (error) {
      console.error('Error fetching builds:', error);
    } finally {
      setLoading(false); // Set loading state to false after fetching
    }
  };

  useEffect(() => {
    fetchBuilds();
  }, [currentPage, filters]); // Removed duplicate fetchBuilds call

  // Handle filter changes
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWait(true);
    setFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value,
    }));
    setCurrentPage(1);
    setWait(false);
  };

  // Handle apply filters
  const handleApplyFilters = async () => {
    setCurrentPage(1); // Reset to first page
    await fetchBuilds(); // Fetch builds with applied filters
    setWait(false);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber); // Update current page
    fetchBuilds(); // Fetch builds for the new page
  };

  return (
    <Container className="py-8 px-4 md:px-8 bg-gray-900 text-white w-full">
      <div className="container mx-auto">
        {/* Title and Create Button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">{title}</h2>
          <Button buttonType="button" text="Create Build Order" onClick={() => router.push('/builds/add')} />
        </div>

        {/* Filter Options */}
        <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-4">
          {/* Left Filters */}
          <div className="flex space-x-4 items-center">
            <div className="flex items-center space-x-2">
              <label htmlFor="gameMode" className="font-semibold">
                Game Mode:
              </label>
              <select
                id="gameMode"
                name="gameMode"
                className="bg-gray-800 text-white rounded-md py-1 px-3"
                value={filters.gameMode}
                onChange={handleFilterChange}
                disabled={wait}
              >
                <option value="1v1">1v1</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="faction" className="font-semibold">
                You:
              </label>
              <select
                id="faction"
                name="faction"
                className="bg-gray-800 text-white rounded-md py-1 px-3"
                value={filters.faction}
                onChange={handleFilterChange}
                disabled={wait}
              >
                <option value="">Any</option>
                <option value="vanguard">Human Vanguard</option>
                <option value="celestials">Celestial Armada</option>
                <option value="infernals">Infernal Host</option>
              </select>
            </div>
            <span className="text-lg font-bold">vs</span>
            <div className="flex items-center space-x-2">
              <label htmlFor="enemyFaction" className="font-semibold">
                Opponent:
              </label>
              <select
                id="enemyFaction"
                name="enemyFaction"
                className="bg-gray-800 text-white rounded-md py-1 px-3"
                value={filters.enemyFaction}
                onChange={handleFilterChange}
                disabled={wait}
              >
                <option value="">Any</option>
                <option value="vanguard">Human Vanguard</option>
                <option value="celestials">Celestial Armada</option>
                <option value="infernals">Infernal Host</option>
              </select>
            </div>
          </div>

          {/* Right Filters */}
          <div className="flex space-x-4">
            <button
              className={`font-semibold border-r border-gray-700 pr-2 ${
                filters.sortBy === 'likes' ? 'text-violet-500' : 'hover:text-violet-50'
              }`}
              onClick={() => {
                setWait(true);
                setFilters({ ...filters, sortBy: 'likes' });
                handleApplyFilters();
              }}
              disabled={wait}
            >
              Top Rated
            </button>
            <button
              className={`font-semibold ${
                filters.sortBy === 'createdAt' ? 'text-violet-500' : 'hover:text-violet-500'
              }`}
              onClick={() => {
                setWait(true);
                setFilters({ ...filters, sortBy: 'createdAt' });
                handleApplyFilters();
              }}
              disabled={wait}
            >
              New
            </button>
          </div>
        </div>

        {/* List Header */}
        <div className="grid grid-cols-6 gap-4 bg-gray-800 rounded-t-md p-4 font-semibold text-gray-300 border-b border-gray-400">
          <div className="col-span-2">Title</div>
          <div>Faction</div>
          <div>Against</div>
          <div>Created</div>
          <div>Rating</div>
        </div>

        {/* Build List */}
        <div className="bg-gray-800 rounded-b-md">
          {loading ? (
            // Display skeleton loaders if loading
            Array.from({ length: BUILDS_PER_PAGE }).map((_, index) => (
              <SkeletonLoader key={index} />
            ))
          ) : (
            builds.map((build) => (
              <Link
                href={`/builds/${build.id}/${build.slug}`}
                key={build.id}
                className="grid grid-cols-6 gap-4 border-b border-gray-700 p-4 items-center rounded-md hover:bg-gray-900 hover:cursor-pointer"
              >
                {/* Title, Icon, and Author */}
                <div className="col-span-2 flex items-center">
                  {/* Icon Placeholder */}
                  <BellIcon className="h-8 w-8 text-gray-400" />
                  <div className="ml-3">
                    <div className="font-semibold capitalize">{build.title}</div>
                    <div className="text-sm text-gray-400">by {build.author}</div>
                  </div>
                </div>

                {/* Faction */}
                <div className="capitalize">{build.faction}</div>

                {/* Opponent Faction */}
                <div className="capitalize">{build.enemyFaction}</div>

                {/* Build Created */}
                <div>{build.dateCreated}</div>

                {/* Rating */}
                <div className="flex items-center">
                  <HandThumbUpIcon className="h-5 w-5 text-green-500 mr-1.5" />
                  {build.likes}
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          {Array.from({ length: totalPages }, (_: any, index: number) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-1 rounded-md ${
                currentPage === index + 1
                  ? 'bg-violet-700 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-violet-700'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default BuildList;
