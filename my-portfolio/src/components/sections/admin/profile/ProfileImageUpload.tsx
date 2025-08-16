// components/ProfileImageUpload.tsx
import React, { ChangeEvent } from "react";
import { Upload } from "lucide-react";
import Image from "next/image";
import { ThemedButton } from "@/components/common/buttons";

interface ProfileImageUploadProps {
    image: string | null;
    onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onClick: () => void;
}

export default function ProfileImageUpload({ image, onImageChange, onClick }: ProfileImageUploadProps) {
    return (
        <div className="flex flex-col items-center space-y-3 sm:space-y-4 md:space-y-5">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 xl:w-56 xl:h-56 2xl:w-64 2xl:h-64 rounded-full overflow-hidden bg-gray-200">
                <Image
                    src={image || "/about/profile.svg"}
                    alt="Profile Image"
                    fill
                    className="object-cover"
                />
            </div>
            <input
                type="file"
                accept="image/*"
                id="fileInput"
                className="hidden"
                onChange={onImageChange}
            />
            <ThemedButton
                title="Upload Image"
                type="button"
                variant="primary"
                icon={<Upload size={16} />}
                onClick={onClick}
                className="themed-button-primary p-2 sm:p-2.5 md:p-3 lg:px-5 lg:py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-intermedium"
            />
        </div>
    );
}