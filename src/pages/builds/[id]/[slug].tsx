import { GetServerSideProps } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const getServerSideProps: GetServerSideProps = async (context) => {
    
    const { query } = context
    const id = query.id as string
    const slug = query.slug as string

    return {
        props: {
            id, slug
        }
    }
}

const Build: React.FC = ({id, slug}: any) => {

    return (
        <main className={`bg-gray-900 flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}>
            <div className="my-auto mx-auto text-white text-center">
                <div>{id}</div>
                <div>{slug}</div>
            </div>
        </main>
    )
}

export default Build;