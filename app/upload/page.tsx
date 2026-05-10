"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { UploadCloud, FileText, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileUpload = async (file: File) => {
    if (file.type !== "text/html" && !file.name.endsWith(".html")) {
      alert("Please upload a valid bookmarks HTML file.");
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Read the file
      const text = await file.text();
      
      // Store in localStorage for the mock dashboard to pick up
      localStorage.setItem("bookmarksHtml", text);
      
      // Navigate to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Error uploading file:", error);
      setIsUploading(false);
    }
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-6">
      <header className="mb-12">
        <Link href="/">
          <Button variant="ghost" className="text-muted-foreground hover:text-white">
            <ArrowLeft className="mr-2 w-4 h-4" /> Back to home
          </Button>
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full text-center space-y-8"
        >
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight">Upload Bookmarks</h1>
            <p className="text-muted-foreground text-lg">
              Export your bookmarks from Chrome or Safari as an HTML file and drop it below.
            </p>
          </div>

          <div
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            className={`
              relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-200
              ${isDragging ? "border-primary bg-primary/5" : "border-white/10 hover:border-white/20 hover:bg-white/[0.02]"}
              glass-card p-16
            `}
          >
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center">
                {isUploading ? (
                  <Loader2 className="w-10 h-10 text-primary animate-spin" />
                ) : (
                  <UploadCloud className={`w-10 h-10 ${isDragging ? "text-primary" : "text-muted-foreground"}`} />
                )}
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">
                  {isDragging ? "Drop the file here" : "Drag & drop your file"}
                </h3>
                <p className="text-muted-foreground text-sm">
                  or click to browse from your computer
                </p>
              </div>

              <input
                type="file"
                accept=".html,text/html"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={onFileChange}
                disabled={isUploading}
              />
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground bg-white/5 py-3 px-4 rounded-lg border border-white/5">
            <FileText className="w-4 h-4 text-primary" />
            Looking for an example?
            <button className="text-primary hover:underline font-medium ml-1">
              Download sample file
            </button>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
