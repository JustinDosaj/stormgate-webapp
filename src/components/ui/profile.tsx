import { ArrowDownTrayIcon, PencilIcon } from "@heroicons/react/24/solid";
import { Container } from "../shared/container";
import { Button } from "../shared/button";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { UpdateUsername } from "@/pages/api/firebase/functions";
import { Notify } from "../shared/notify";

interface ProfileProps {
    className?: string;
}

export default function ProfileComponent({className}: ProfileProps) {

    const { user, logout, username, isLoading } = useAuth();
    const [ editing, setEditing ] = useState<boolean>(false)
    const [ newUsername, setNewUsername ] = useState<string>('')

    const handleUserNameChange = async () => {

        if(editing && user) {
            // Code to update username
            await UpdateUsername({user, newUsername})
            setEditing(!editing)
            
        } else {
            setEditing(!editing)
        }
    }

    useEffect(() => {
        setNewUsername(username || '')
    },[isLoading, username])

    return(
    <Container className={`py-8 px-4 md:px-8 bg-gray-900 text-white w-full ${className}`}>
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
                        value={user?.email || ''}
                        disabled={true}
                        className="w-fit pl-2 py-1 bg-gray-700 text-white rounded-md focus:outline-none"
                    />
                </div>
                <div className="relative">
                    <label className="text-gray-400">Username: </label>
                    {/* Email Input */}
                    <input
                        type="text"
                        value={newUsername}
                        disabled={!editing}
                        onChange={(e) => setNewUsername(e.target.value)}
                        className="w-fit pl-2 py-1 bg-gray-700 text-white rounded-md focus:outline-none"
                    />
                    <button onClick={handleUserNameChange}>
                        { !editing ? 
                            <PencilIcon className="z-50 h-6 w-6 absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 rounded-md bg-gray-900 p-1"/>
                            :
                            <ArrowDownTrayIcon className="z-50 h-6 w-6 absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 rounded-md bg-green-600 p-1"/>
                        }
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
