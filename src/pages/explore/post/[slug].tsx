import { Inter } from "next/font/google";
import { GetServerSideProps } from 'next';
import { getBlogPostBySlug } from '@/lib/contentful';
import { renderContentBlock } from "@/components/ui/explore/render";
import { Container } from '@/components/shared/container';
import { getEntriesForContentTypes } from "@/lib/contentful";
import { RecentPostCard } from "@/components/ui/explore/recentPostCard";
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import Head from "next/head";
import { StickyAd } from "@/components/ads/sticky";
import AdSense from "@/components/ads/adsense";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps: GetServerSideProps = async ( context) => {
  
    const { req, params, resolvedUrl } = context
    const { slug } = params as { slug: string};

    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers.host;
    const url = `${protocol}://${host}${resolvedUrl}`;

    const post = await getBlogPostBySlug(slug);
    const recentPosts = await getEntriesForContentTypes(['blogPost'], 5 );

    if (!post) {
        return {
        notFound: true,
        };
    }

  return {
    props: { post, url, recentPosts },
  };
};

const Post: React.FC = ({ post, url, recentPosts }: any) => {
  
    const { title, image, author, contentBlocks, category, ogDescription, seoDescription, seoTitle, slug, summary, logo } = post.fields;
    const { createdAt } = post.sys 

    const imageUrl = image.fields.file.url;
    const absoluteImageUrl = imageUrl.startsWith('//') ? `https:${imageUrl}` : imageUrl;
    
    const logoUrl = logo.fields.file.url;
    const absoluteLogoUrl = logoUrl.startsWith('//') ? `https:${logoUrl}` : logoUrl; // This is used to schema if there is one

    return (
        <>
        <Head>
        <title>{seoTitle}</title>
          <meta name="title" content={seoTitle}/>
          <meta name="description" content={seoDescription}/>
          <meta property="og:title" content={seoTitle}/>
          <meta property="og:description" content={ogDescription}/>
          <meta property="og:image" content={absoluteImageUrl}/>
          <meta property="og:url" content={url}/>
          <meta property="twitter:image" content={absoluteImageUrl}/>
          <meta property="twitter:title" content={seoTitle}/>
          <meta property="twitter:description" content={seoDescription}/>
          {/*<script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />*/}
        </Head>
        <main className={`bg-gray-900 flex flex-col items-center justify-between space-y-12 min-h-screen py-24 ${inter.className}`}>
            <div className="w-full flex justify-center">
                <StickyAd adSlot="123456789"/>
                <div className="max-w-5xl flex-grow 2xl:mx-28">
                    <Container className="flex flex-col lg:flex-row justify-between items-start gap-8">
                        <div className="lg:w-2/3 text-white">
                            <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
                            <div className="text-gray-500 text-sm mb-4">
                                {new Date(createdAt).toLocaleDateString()} by {author}
                            </div>
                            <div className="mb-8">
                                <p>{summary}</p>
                            </div>
                            {image && (
                                <img
                                src={image.fields.file.url}
                                alt={title}
                                className="mb-8 rounded-lg w-full object-scale-down border"
                                />
                            )}
                            <div className="text-white space-y-4">
                                {contentBlocks.map((block: any) =>
                                    <div key={block.sys.id}>
                                        {renderContentBlock(block)}
                                    </div>
                                )}
                            </div>
                        </div>

                        <aside className="lg:w-1/3 lg:sticky lg:top-24">
                        <h2 className="text-2xl font-bold text-white mb-4">Recent Posts</h2>
                        {recentPosts.blogPost.map((post: any) => (
                            <RecentPostCard key={post.slug} post={post}/>
                        ))}
                        </aside>
                    </Container>
                </div>
                <StickyAd adSlot="123456789"/>
            </div>
            {/*<AdSense 
                adSlot="7423668524" 
                adFormat="auto"
                className="max-w-5xl"
                adStyle={{ width: '100%', height: '300px' }}
            />*/}
        </main>
        </>
    );
};

export default Post;
