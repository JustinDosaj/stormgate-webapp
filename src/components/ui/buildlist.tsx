// components/BuildList.tsx
import React from 'react';
import Link from 'next/link';
import { Button } from '../elements/button';
import { BellIcon, HandThumbUpIcon } from '@heroicons/react/24/solid';
import { Container } from '../shared/container';
import { useRouter } from 'next/router';

interface BuildListProps {
  builds: Build[];
}

interface Build {
  id: string;
  slug: string
  title: string;
  author: string;
  faction: string;
  opponentFaction: string;
  rating: number;
  dateCreated: string;
}

const BuildList: React.FC<BuildListProps> = ({ builds }) => {

  const router = useRouter();

  return (
    <Container className="py-8 px-4 md:px-8 bg-gray-900 text-white w-full">
      <div className="container mx-auto">
        {/* Title and Create Button */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">Stormgate Build Orders</h2>
          <Button buttonType="button" text="Create Build Order" onClick={() => router.push('/builds/add')}/>
        </div>

        {/* Filter Options */}
        <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-4">
          {/* Left Filters */}
          <div className="flex space-x-4 items-center">
            <div className="flex items-center space-x-2">
              <label htmlFor="game-mode" className="font-semibold">Game Mode:</label>
              <select id="game-mode" className="bg-gray-800 text-white rounded-md py-1 px-3">
                <option>1v1</option>
                <option>3vE</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="you" className="font-semibold">You:</label>
              <select id="you" className="bg-gray-800 text-white rounded-md py-1 px-3">
                <option>Any</option>
                <option>Human Vanguard</option>
                <option>Celestial Armada</option>
                <option>Infernal Host</option>
              </select>
            </div>
            <span className="text-lg font-bold">vs</span>
            <div className="flex items-center space-x-2">
              <label htmlFor="opponent" className="font-semibold">Opponent:</label>
              <select id="opponent" className="bg-gray-800 text-white rounded-md py-1 px-3">
                <option>Any</option>
                <option>Human Vanguard</option>
                <option>Celestial Armada</option>
                <option>Infernal Host</option>
              </select>
            </div>
          </div>

          {/* Right Filters */}
          <div className="flex space-x-4">
            <button className="font-semibold border-r border-gray-700 pr-2">Trending</button>
            <button className="font-semibold border-r border-gray-700 pr-2">New</button>
            <button className="font-semibold">Top Rated</button>
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
          {builds.map((build) => (
            <Link href={{pathname: `/builds/${build.id}/${build.slug}`}}
              key={build.id}
              className="grid grid-cols-6 gap-4 border-b border-gray-700 p-4 items-center rounded-md hover:bg-gray-900 hover:cursor-pointer"
            >
              {/* Title, Icon, and Author */}
              <div className="col-span-2 flex items-center">
                {/* Icon Placeholder */}
                <BellIcon className="h-8 w-8 text-gray-400" />
                <div className="ml-3">
                  <div className="font-semibold">{build.title}</div>
                  <div className="text-sm text-gray-400">by {build.author}</div>
                </div>
              </div>

              {/* Faction */}
              <div>{build.faction}</div>

              {/* Opponent Faction */}
              <div>{build.opponentFaction}</div>

              {/* Build Created */}
              <div>{build.dateCreated}</div>

              {/* Rating */}
              <div className="flex items-center">
                <HandThumbUpIcon className="h-5 w-5 text-green-500 mr-1" />
                {build.rating}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default BuildList;
