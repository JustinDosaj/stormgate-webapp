import { Inter } from "next/font/google";
import { GetServerSideProps } from 'next';
import { getBlogPostBySlug } from '@/lib/contentful';
import { renderContentBlock } from "@/components/ui/explore/render";
import { Container } from '@/components/shared/container';
import { getEntriesForContentTypes } from "@/lib/contentful";
import { RecentPostCard } from "@/components/ui/explore/recentPostCard";
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

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
  
    const { title, image, author, contentBlocks, category, ogDescription, seoDescription, seoTitle, slug, summary,  } = post.fields;
    const { createdAt } = post.sys 

    return (
        <main className={`bg-gray-900 flex min-h-screen py-24 ${inter.className}`}>
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
                <>
                <RecentPostCard key={post.slug} post={post}/>
                <RecentPostCard key={post.slug} post={post}/>
                <RecentPostCard key={post.slug} post={post}/>
                </>
            ))}
            </aside>
        </Container>
        </main>
    );
};

export default Post;
