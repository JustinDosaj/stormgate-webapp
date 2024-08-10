import { classNames } from "@/components/shared/classNames"
import { ExclamationCircleIcon } from "@heroicons/react/24/outline"
import { HandThumbUpIcon } from "@heroicons/react/24/solid"
import { Button } from "@/components/shared/button"
import { useModal } from "@/context/ModalContext"
import { useRouter } from "next/router";
import { User } from "firebase/auth"

interface BuildTitleProps {
  title: string;
  isOwner: boolean;  
  id: string;
  handleLike: () => void;
  handleReport: () => void;
  hasLiked: boolean;
  likes: number;
  user: User;
  slug: string;

}

export function BuildTitle({title, isOwner, id, handleLike, handleReport, hasLiked, likes, user, slug}: BuildTitleProps) {

    const { openModal } = useModal()
    const router = useRouter()

    return(
        <div className="lg:flex items-center justify-between mb-3 space-y-4 lg:space-y-0">
                <div className="inline-flex items-center gap-4">
                  <h1 className="text-3xl font-bold">{title}</h1>
                </div>
                <div className="flex justify-start space-x-4">
                  {isOwner && (
                    <>
                      <Button
                        text="Edit"
                        buttonType="button"
                        size="small"
                        onClick={() => router.push(`/builds/edit/${id}`)}
                      />
                      <Button
                        text={"Delete"}
                        buttonType="button"
                        color="red"
                        size="small"
                        onClick={() => openModal("Delete Build", "Are you sure you want to delete this build?", "Delete", "delete", false, parseInt(id), slug, user?.uid)}
                      />
                    </>
                  )}
                  <div className="flex items-center justify-center">
                    <button
                      onClick={handleLike}
                      className={classNames(hasLiked ? "bg-violet-700 hover:bg-violet-900 text-white" : "bg-gray-200 hover:bg-gray-400 text-gray-800", "flex items-center font-bold py-2 px-4 rounded-full transition-all duration-200 ease-in-out")}
                    >
                      <HandThumbUpIcon className="h-4 w-4 lg:h-6 lg:w-6 mr-2" />
                      <span className="text-sm lg:text-base">{likes}</span>
                    </button>
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      onClick={handleReport}
                      className="text-red-600  hover:text-red-800 flex items-center rounded-full transition-all duration-200 ease-in-out"
                    >
                      <ExclamationCircleIcon className="h-8 w-8 lg:h-8 lg:w-8 rounded-full" />
                    </button>
                  </div>
                </div>
              </div>
    )
}