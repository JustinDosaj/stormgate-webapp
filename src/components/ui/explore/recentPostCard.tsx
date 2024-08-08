import Link from "next/link"

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

export function RecentPostCard({post}: PostCardProps) {
    return(
        <Link key={post.slug} href={`/explore/post/${post.slug}`}>
            <div className="bg-gray-900 hover:bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 mb-4 flex items-center space-x-2">
                <img src={post.image.fields.file.url} alt={post.title} className="rounded-lg h-16 w-16 object-contain" />
                <div className="">
                    <h3 className="text-base font-semibold text-white">{post.title}</h3>
                    <div className="text-gray-500 text-xs">{new Date(post.dateCreated).toLocaleDateString()}</div>
                </div>
            </div>
        </Link>
    )
}