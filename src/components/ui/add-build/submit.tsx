import { Button } from "@/components/shared/button";
import { useModal } from "@/context/ModalContext"
import { use } from "react"

interface ButtonProps {
    handleSubmit: () => void;
    loading: boolean;
}

export default function SubmitButtons({handleSubmit, loading}: ButtonProps) {

    const { openModal } = useModal();

    return(
        <div className="inline-flex items-center justify-center lg:justify-end w-full gap-4 mt-4">
            <Button
                buttonType="button"
                text="Cancel"
                color="red"
                size="medium"
                onClick={() => openModal("Cancel Build Creation", "Are you sure you want to cancel creating this build? All progress will be lost.", "Leave Build", "warning")}
            />
            <Button
                buttonType="button"
                text={loading ? "Loading" : "Submit Build"}
                color="green"
                size="medium"
                onClick={handleSubmit}
                isDisabled={loading}
            />
        </div>
    )

}