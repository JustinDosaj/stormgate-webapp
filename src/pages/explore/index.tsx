import { GetServerSideProps } from 'next';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import { getEntriesForContentTypes } from '@/lib/contentful';
import { Container } from '@/components/shared/container';
import { PostCard } from '@/components/ui/explore/card';
import { useState } from 'react';

const inter = Inter({ subsets: ['latin'] });

const Explore: React.FC = ({ blogContent }: any) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    router.push(`/explore?page=${page}`);
  };

  const [ currentPage, setCurrentPage ] = useState(1);

  const sortedBlogContent = blogContent.sort((a: any, b: any) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

  return (
    <main className={`bg-gray-900 flex min-h-screen flex-col items-center justify-between py-24 ${inter.className}`}>
      <Container className="container mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">News, Guides & More</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedBlogContent.map((post: any) => (
            <>
            <PostCard key={post.slug} post={post}/>
            <PostCard key={post.slug} post={post}/>
            <PostCard key={post.slug} post={post}/>
            </>
          ))}

        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          {Array.from({ length: 1 }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-1 rounded-md ${
                currentPage === index + 1 ? 'bg-violet-700 text-white' : 'bg-gray-800 text-gray-300 hover:bg-violet-700'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </Container>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {

  const entries = await getEntriesForContentTypes(['blogPost'])

  console.log(entries)
  const blogContent = entries.blogPost


  return {
    props: { blogContent },
  };
};

export default Explore;
