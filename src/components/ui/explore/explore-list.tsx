import { PostCard } from "./card"
import { Container } from "@/components/shared/container"
import { useState } from "react";
import { useRouter } from "next/router";
import { Title } from "@/components/shared/title";

export function ExploreList({blogContent}: any) {

    const router = useRouter()
    const [ currentPage, setCurrentPage ] = useState(1);
    const sortedBlogContent = blogContent.sort((a: any, b: any) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
    
    const handlePageChange = (page: number) => {
        router.push(`/explore?page=${page}`);
    }
    
    return (
        <Container className="container mx-auto">
            <Title className="mb-8">News, Guides & More</Title>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedBlogContent.map((post: any) => (
                <PostCard key={post.slug} post={post}/>
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
    )
}