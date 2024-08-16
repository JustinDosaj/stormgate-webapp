// components/ui/about.tsx
import React from "react";
import { Container } from "../shared/container";
import { Title } from "../shared/title";
import { Button } from "../shared/button";
import Link from "next/link";
import { Paragraph } from "../shared/paragraph";
import Image from "next/image";

export function About() {
  return (
    <Container className="px-4 md:px-8 bg-gray-900 text-white w-full">
      <div className="container mx-auto flex flex-col md:flex-row items-center space-y-8 md:space-y-0 md:space-x-8 py-16">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <Image 
            src="/images/about-img.png" 
            alt="Stormgate Tactics"
            width={1000}
            height={1000} 
            className="rounded-md"
          />
        </div>
        
        {/* Text Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center md:items-start space-y-6">
          <Title className="text-center md:text-left">About Stormgate Tactics</Title>
          <Paragraph className=" text-center md:text-left max-w-3xl">
            Welcome to Stormgate Tactics, your ultimate resource for everything Stormgate! Whether you're looking to master new strategies, discover optimized build orders, or stay updated with the latest news, our platform has you covered.
          </Paragraph>
          <Paragraph className="text-center md:text-left max-w-3xl">
            Our web app offers a vast array of build orders tailored for various game modes and factions, helping you dominate your opponents in every match. Stay ahead of the curve with our guides and articles, where we break down complex strategies and offer insights into the game's ever-evolving meta.
          </Paragraph>
          <Link href="/builds">
            <Button buttonType="button" text="Discover Builds" size="medium"/>
          </Link>
        </div>
      </div>
    </Container>
  );
}
