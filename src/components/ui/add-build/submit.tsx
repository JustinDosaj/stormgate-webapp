import { useModal } from "@/context/ModalContext"
import { use } from "react"

interface ButtonProps {
    handleSubmit: () => void;
    loading: boolean;
}

export default function SubmitButtons({handleSubmit, loading}: ButtonProps) {

    const { openModal } = useModal();

    return(
        <div className="inline-flex items-center justify-end w-full gap-4">
            <button
            className="mt-8 w-fit bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-md"
            onClick={() => openModal("Cancel Build Creation", "Are you sure you want to cancel creating this build? All progress will be lost.", "Leave Build", "warning")}
            >
            Cancel
            </button>
            <button
            className="mt-8 w-fit bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-md"
            onClick={handleSubmit}
            >
            {loading ? "Loading" : "Submit Build"}
            </button>
        </div>
    )

}