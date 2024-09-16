import { useState } from "react"
import toast from "react-hot-toast";

const usePreviewImage = () => {
    const [imageUrl, setImageUrl] = useState("");
    const imageChangeHandle = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result);
            }
            reader.readAsDataURL(file);
        }
        else {
            toast.error("Please Check formate of Image.");
            setImageUrl(null);
        }
    }

    return { imageChangeHandle, imageUrl, setImageUrl }
}

export default usePreviewImage;