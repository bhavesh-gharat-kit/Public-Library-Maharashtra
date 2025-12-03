"use client";

import dynamic from "next/dynamic";
import "@/flipbook/_styles/globals.css";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IBookGPT } from "@/components";
import { axios } from "@/utils";

const FlipbookViewer = dynamic(
    () => import("@/flipbook/_components/ui/flipbook-viewer/flipbook-viewer"),
    {
        ssr: false,
    }
);
const PDFViewer = dynamic(
    () => import("@/components/PDFViewer"),
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
    const fileUrl = `/api/books/read/${bookId}/${chapterId}`;

    return (
        <div className="py-6 px-4 flex flex-col md:flex-row items-center gap-4">
            <div className="w-full md:w-2/3">
                {/* show chapters here */}
                <FlipbookViewer
                    pdfUrl={fileUrl}
                    className=""
                    disableShare={true} />
            </div>
            <div className="w-full md:w-1/3">
                <IBookGPT bookId={bookId} chapterId={chapterId} studyTools={studyTools} />
            </div>
        </div>
    );
}
