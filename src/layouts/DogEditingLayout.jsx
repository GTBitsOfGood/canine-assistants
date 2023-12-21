import { EditDogProvider } from "@/context/EditDogContext";

export default function DogEditingLayout({ children }) {
    return (
        <EditDogProvider>
            {children}
        </EditDogProvider>
    )
}