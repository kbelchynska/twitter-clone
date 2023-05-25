import { useRouter } from "next/router";
import { useState } from "react";
import { FileDrop } from "react-file-drop";

export default function Cover ({src}) {
    const [isFileNearby, setIsFileNearby] = useState(false);
    const [isFileOver, setIsFileOver] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    let extraClasses = '';
    if (isFileNearby && !isFileOver) extraClasses += ' bg-white';
    if (isFileOver) extraClasses += ' bg-blue-500';

    function updateImage(files,e) {
        e.preventDefault();
        setIsFileNearby(false);
        setIsFileOver(false);
        setIsUploading(true);
        const data = FormData();
        data.apend('cover', files[0])
        fetch('/api/upload', {
            method: 'POST',
            body: data,
        }).then(async response => {
            const json = await response.json();
            const cover = response.data.user.cover;
            setIsUploading(false);
        })
    }
    return (
        <FileDrop
            onDrop={updateImage}
            onDragOver={() => setIsFileOver(true)}
            onDragLeave={() => setIsFileOver(true)}
            onFrameDragEnter={() => setIsFileNearby(true)}
            onFrameDragLeave={() => setIsFileNearby(false)}
        >
            <div className={"flex items-center overflow-hidden h-36 bg-twitterBorder text-white "+extraClasses}>
                {isUploading ? 'upload' : ''}
                <img src={src} className="w-full" alt="" />
            </div>
        </FileDrop>
    )

}