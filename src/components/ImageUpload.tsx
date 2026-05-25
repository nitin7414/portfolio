"use client";

import { useState, useEffect } from "react";
import { UploadDropzone } from "@uploadthing/react";
import type { OurFileRouter } from "@/src/app/api/uploadthing/core";
import { X } from "lucide-react";

export default function ImageUpload({ initialImages = [] }: { initialImages?: string[] }) {
  const [images, setImages] = useState<string[]>(initialImages);

  // This forces the uploader to refresh its images when you click "Edit" on different projects
  useEffect(() => {
    setImages(initialImages);
  }, [initialImages]);

  const removeImage = (indexToRemove: number) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="space-y-4">
      {/* PREVIEW GRID */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {images.map((url, index) => (
            <div key={index} className="relative rounded-lg overflow-hidden border border-white/20 aspect-video">
              <img src={url} alt="Preview" className="w-full h-full object-cover" />
              
              {/* CRITICAL: This exact name="images" tells your form to send the URL to the database */}
              <input type="hidden" name="images" value={url} />
              
              <button 
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1.5 bg-red-500/90 hover:bg-red-500 text-white rounded-md backdrop-blur-md transition-colors shadow-lg"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* DROPZONE - Hides automatically if you reach the 5 image limit */}
      {images.length < 5 && (
        <UploadDropzone<OurFileRouter, "projectImage">
          endpoint="projectImage"
          onClientUploadComplete={(res) => {
            if (res) {
              const newUrls = res.map(file => file.url);
              setImages(prev => [...prev, ...newUrls]);
            }
          }}
          onUploadError={(error: Error) => {
            alert(`Upload Error: ${error.message}`);
          }}
          className="ut-button:bg-cyan-500 ut-button:ut-readying:bg-cyan-500/50 ut-label:text-cyan-400 focus-within:ring-cyan-500 border-white/10 bg-slate-900/50 transition-all"
        />
      )}
    </div>
  );
}