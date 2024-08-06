// pages/index.tsx
import Link from 'next/link';
import { Button } from '../shared/button';
import { Container } from '../shared/container';

export function Hero() {
  return (
    <Container className=" bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-12">
        
        {/* Left Side: Hero Text */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4">
            Discover the Best Game Builds
          </h1>
          <p className="text-lg mb-6">
            Dive into a world of strategic builds that can take your gaming experience to the next level. Explore top strategies for different races and enhance your gameplay.
          </p>
          <Link href="/builds">
            <Button buttonType="button" text="Find Builds" size="medium"/>
          </Link>
        </div>
        
        {/* Right Side: Hero Image */}
        <div className="md:w-3/5 mt-8 md:mt-0 flex justify-center">
          <img
            src="/images/placeholders/3d-fantasy-scene.jpg" // Replace with your actual image path
            alt="Hero Image"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>
    </Container>
  );
}
