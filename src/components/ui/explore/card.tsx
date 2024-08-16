import Link from "next/link"
import { Paragraph } from "@/components/shared/paragraph"

interface PostCardProps {
    key: string,
    post: {
        title: string,
        slug: string,
        image: any,
        alt: string,
        summary: string,
        dateCreated: string,
    }
}

export function PostCard({ post }: PostCardProps) {
    return (
        <Link key={post.slug} href={`/explore/post/${post.slug}`}>
            <div className="bg-gray-800 hover:bg-gray-900 p-4 rounded-lg shadow-md border border-gray-800 hover:shadow-xl transition-shadow duration-200 h-[410px] flex flex-col justify-between">
                <img src={post.image.fields.file.url} alt={post.title} className="mb-4 rounded-lg w-full h-40 object-cover" />
                <div className="flex-grow">
                    <h2 className="text-2xl font-semibold text-white mb-2">{post.title}</h2>
                    <Paragraph size="medium" className="mb-4 line-clamp-4">{post.summary}</Paragraph>
                </div>
                <div className="text-gray-500 text-sm">{new Date(post.dateCreated).toLocaleDateString()}</div>
            </div>
        </Link>
    );
}