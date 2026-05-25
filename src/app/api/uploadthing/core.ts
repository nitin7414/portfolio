import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // 👈 Changed maxFileCount to 5
  projectImage: f({ image: { maxFileSize: "4MB", maxFileCount: 5 } })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for url:", file.url);
      return { uploadedBy: "admin" };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;