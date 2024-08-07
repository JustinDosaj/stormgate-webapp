// pages/index.tsx
import Link from 'next/link';
import { Button } from '../shared/button';
import { Container } from '../shared/container';
import { Paragraph } from '../shared/paragraph';
import { Title } from '../shared/title';

export function Hero() {
  return (
    <Container className="bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="mx-auto flex flex-col lg:flex-row items-center justify-between py-12 lg:space-x-4">
        {/* Left Side: Hero Text */}
        <div className="w-full lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
          <Title className="text-3xl sm:text-4xl font-bold mb-4">
            Stormgate builds, guides, news & more!
          </Title>
          <Paragraph className="text-base mb-6">
            Learn everything you need to know about Stormgate, the next-gen RTS game - builds, guides, news & more!
          </Paragraph>
          <Link href="/builds">
            <Button buttonType="button" text="Discover Builds" size="medium" />
          </Link>
        </div>

        {/* Right Side: Hero Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
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
