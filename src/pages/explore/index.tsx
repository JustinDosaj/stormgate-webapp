import { GetServerSideProps } from 'next';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import { getEntriesForContentTypes } from '@/lib/contentful';
import { Container } from '@/components/shared/container';
import { PostCard } from '@/components/ui/explore/card';
import { useState } from 'react';
import { ExploreList } from '@/components/ui/explore/explore-list';

const inter = Inter({ subsets: ['latin'] });

const Explore: React.FC = ({ blogContent }: any) => {

  return (
    <main className={`bg-gray-900 flex min-h-screen flex-col items-center justify-between py-24 ${inter.className}`}>
      <ExploreList blogContent={blogContent}/>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {

  const entries = await getEntriesForContentTypes(['blogPost'])

  const blogContent = entries.blogPost

  return {
    props: { blogContent },
  };
};

export default Explore;
