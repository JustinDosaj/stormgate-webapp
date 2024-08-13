// components/build/BuildHeader.tsx
import { Button } from "@/components/shared/button";
import { HandThumbUpIcon } from "@heroicons/react/24/solid";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { classNames } from "@/components/shared/classNames";
import { useModal } from "@/context/ModalContext";
import { Title } from "@/components/shared/title";

interface BuildHeaderProps {
  buildName: string;
  isOwner: boolean;
  id: string;
  slug: string;
  likes: number;
  hasLiked: boolean;
  likesDisabled: boolean;
  handleLike: () => void;
  handleReport: () => void;
  openModal: any;
}

const BuildHeader: React.FC<BuildHeaderProps> = ({
  buildName,
  isOwner,
  id,
  slug,
  likes,
  hasLiked,
  likesDisabled,
  handleLike,
  handleReport,
}) => {
  const router = useRouter();
  const { openModal } = useModal();

  return (
    <div className="lg:flex items-center justify-between mb-3 space-y-4 lg:space-y-0">
      <div className="inline-flex items-center gap-4">
        <Title className="text-3xl font-bold">{buildName}</Title>
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
              onClick={() =>
                openModal(
                  "Delete Build",
                  "Are you sure you want to delete this build?",
                  "Delete",
                  "delete",
                  false,
                  parseInt(id),
                  slug
                )
              }
            />
          </>
        )}
        <div className="flex items-center justify-center">
          <button
            onClick={handleLike}
            disabled={likesDisabled}
            className={classNames(
              hasLiked
                ? "bg-violet-700 hover:bg-violet-900 text-white"
                : "bg-gray-200 hover:bg-gray-400 text-gray-800",
              "flex items-center font-bold py-2 px-4 rounded-full transition-all duration-200 ease-in-out"
            )}
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
  );
};

export default BuildHeader;
