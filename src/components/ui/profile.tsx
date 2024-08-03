import { EnvelopeIcon, PencilIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Container } from "../shared/container";
import { Button } from "../elements/button";
import { useAuth } from "@/context/AuthContext";

interface ProfileProps {
    className?: string;
}

export default function ProfileComponent({className}: ProfileProps) {

    const { user, logout } = useAuth();

    return(
    <Container className="py-8 px-4 md:px-8 bg-gray-900 text-white w-full">
        <div className="container mx-auto">
            {/* Title */}
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold">{"Account Details"}</h2>
            </div>
            <div className="flex justify-between bg-gray-800 rounded-md p-4 items-center">
                <div className="">
                    <label className="text-gray-400">Email: </label>
                    {/* Email Input */}
                    <input
                        type="text"
                        value={"johndoe@gmail.com"}
                        disabled={true}
                        onChange={() => console.log("Change input email")}
                        className="w-fit pl-2 py-1 bg-gray-700 text-white rounded-md focus:outline-none"
                    />
                </div>
                <div className="relative">
                    <label className="text-gray-400">Username: </label>
                    {/* Email Input */}
                    <input
                        type="text"
                        value={"User1425"}
                        disabled={true}
                        onChange={() => console.log("Change username input")}
                        className="w-fit pl-2 py-1 bg-gray-700 text-white rounded-md focus:outline-none"
                    />
                    <button onClick={() => console.log("Set up editing")}>
                        <PencilIcon className="h-6 w-6 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 rounded-md bg-gray-900 p-1"/>
                    </button>
                </div>
                <div className="relative">
                    <Button text="Logout" buttonType="button" size="small" className=" bg-red-700 hover:bg-red-600" onClick={logout}/>
                </div>
            </div>
            
        </div>
    </Container>
    );
}
