"use client";

import dynamic from "next/dynamic";
import "@/flipbook/_styles/globals.css";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { NeoLearn } from "@/components";
import { axios } from "@/utils";

const FlipbookViewer = dynamic(
    () => import("@/flipbook/_components/ui/flipbook-viewer/flipbook-viewer-abhishek"),
    {
        ssr: false,
    }
);


export default function Home({ params }) {
    const router = useRouter();
    const unwrappedParams = use(params);
    const { bookId, chapterId } = unwrappedParams;
    const [chapters, setChapters] = useState([]);
    const [studyTools, setStudyTools] = useState([]);

    if (!bookId || !chapterId) {
        toast.error("Book not found!");
        router.back();
    }

    useEffect(() => {
        const fetchData = async () => {
            try {

                const { data } = await axios.get(`/api/books/${bookId}/${chapterId}`);
                setChapters(data.chapters);
                setStudyTools(data.studyTools);
                console.log(data);

            } catch (error) {
                console.error(error);
                toast.error("Something went wrong...");
            } finally {

            }
        };

        fetchData();
    }, [bookId, chapterId])

    // ✅ Use the proxy endpoint instead of direct external URL
    const fileUrl = `/api/books/read-book/${bookId}/${chapterId}`;
    const baseUrl = `/api`;

    return (
        <div className="py-6 px-4 flex flex-col md:flex-row items-center gap-4">
            <div className="w-full md:w-2/3">
                {/* show chapters here */}
                {/* <FlipbookViewer
                    pdfUrl={fileUrl}
                    baseUrl={baseUrl}
                    className=""
                    disableShare={true} /> */}
                <FlipbookViewer
                    baseUrl="/api"
                    fileUrl={fileUrl}
                    bookId={bookId}
                    initialPagesToLoad={5}
                    pagesPerChunk={5}
                    loadMoreThreshold={2}
                    onPageChange={(page, total) => { }}
                    onBookLoaded={(total) => { }}
                    onError={(err) => { }}
                />
            </div>
            <div className="w-full md:w-1/3">
                <NeoLearn bookId={bookId} chapterId={chapterId} studyTools={studyTools} />
            </div>
        </div>
    );
}
