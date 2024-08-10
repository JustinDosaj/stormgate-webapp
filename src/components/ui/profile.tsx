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
    <Container className={` bg-gray-900 text-white ${className}`}>
        <div className="mx-auto">
            {/* Title */}
            
                <h2 className="text-center lg:text-left text-3xl lg:text-4xl font-semibold text-white mb-6">{"Account Details"}</h2>
            
            <div className="grid lg:flex justify-center lg:justify-between space-y-4 lg:space-y-0 bg-gray-800 rounded-md p-4 items-center">
                <div className="">
                    <label className="hidden lg:inline-flex lg:mr-1 text-gray-400">Email: </label>
                    {/* Email Input */}
                    <input
                        type="text"
                        value={user?.email || ''}
                        disabled={true}
                        className="w-fit pl-2 py-1 bg-gray-700 text-gray-400 rounded-md focus:outline-none"
                    />
                </div>
                <div className="relative">
                    <label className="hidden lg:inline-flex lg:mr-1 text-gray-400">Username: </label>
                    {/* Email Input */}
                    <input
                        type="text"
                        value={newUsername}
                        disabled={!editing}
                        onChange={(e) => setNewUsername(e.target.value)}
                        maxLength={15}
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
                <div className="grid justify-center lg:grid-justify-end">
                    <Button text="Logout" buttonType="button" size="small" className=" bg-red-700 hover:bg-red-600" onClick={logout}/>
                </div>
            </div>
            
        </div>
    </Container>
    );
}
