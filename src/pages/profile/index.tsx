import { Inter } from "next/font/google";
import ProfileComponent from "@/components/ui/profile";
import BuildList from "@/components/ui/buildlist";
import { useRequireAuth } from "@/hooks/useRequireAuth";
import { placeholderBuilds } from "..";


const inter = Inter({ subsets: ["latin"] });


export default function Profile() {

    const auth = useRequireAuth();

    
    return (
        <main className={`bg-gray-900 flex min-h-screen flex-col items-center justify-between p-24 space-y-12 ${inter.className}`}>
            <ProfileComponent className="w-1/2"/>
            <BuildList builds={placeholderBuilds} title={"Your Build Orders"}/>
        </main>
    );
}
