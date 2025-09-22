// app/api/ibooks/route.js
import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { insertQuestionsByCategory } from "@/lib/helperFunctionsServerSide";

export async function GET() {
  const categories = [
    {
      id: "10",
      slug: "cbse-class-9-social-science",
      name: "Class 09 - Social Science",
      folder: "cbse",
      subfolder: "class-9-social-science",
    },
    // {
    //   id: "11",
    //   slug: "cbse-class-8-mathematics",
    //   name: "Class 08 - Mathematics",
    //   folder: "cbse",
    //   subfolder: "",
    // },
    {
      id: "12",
      slug: "cbse-class-8-science",
      name: "Class 08 - Science",
      folder: "cbse",
      subfolder: "class-8-science",
    },
    {
      id: "13",
      slug: "cbse-class-8-social-science",
      name: "Class 08 - Social Science",
      folder: "cbse",
      subfolder: "class-8-social-science",
    },
    {
      id: "14",
      slug: "afcat-defense-agniveer",
      name: "AFCAT, Defense, Agniveer",
      folder: "competitive-exams",
      subfolder: "afcatdefenceagniveer",
    },
    {
      id: "15",
      slug: "banking",
      name: "Banking",
      folder: "competitive-exams",
      subfolder: "banking",
    },
    {
      id: "16",
      slug: "mpsc-state-commission",
      name: "MPSC & State Commission",
      folder: "competitive-exams",
      subfolder: "mpsc-and-other-state-commision-exams",
    },
    {
      id: "17",
      slug: "railway",
      name: "Railway",
      folder: "competitive-exams",
      subfolder: "railways",
    },
    {
      id: "18",
      slug: "cuet-accountancy",
      name: "CUET Accountancy",
      folder: "cuet",
      subfolder: "cuet-accountancy",
    },
    {
      id: "19",
      slug: "cuet-biology",
      name: "CUET Biology",
      folder: "cuet",
      subfolder: "cuet-biology",
    },
    {
      id: "20",
      slug: "cuet-business-studies",
      name: "CUET Business Studies",
      folder: "cuet",
      subfolder: "cuet-business-studies",
    },
    {
      id: "21",
      slug: "cuet-chemistry",
      name: "CUET Chemistry",
      folder: "cuet",
      subfolder: "cuet-chemistry",
    },
    {
      id: "22",
      slug: "cuet-economics",
      name: "CUET Economics",
      folder: "cuet",
      subfolder: "cuet-economics",
    },
    {
      id: "23",
      slug: "cuet-maths",
      name: "CUET Maths",
      folder: "cuet",
      subfolder: "cuet-maths",
    },
    {
      id: "24",
      slug: "cuet-physics",
      name: "CUET Physics",
      folder: "cuet",
      subfolder: "cuet-physics",
    },
    {
      id: "25",
      slug: "cuet-quantitative",
      name: "CUET Quantitative",
      folder: "cuet",
      subfolder: "cuet-quantitative-aptitude",
    },
    {
      id: "26",
      slug: "ctet-paper-1",
      name: "CTET Paper 1",
      folder: "ctet",
      subfolder: "ctet-paper-1",
    },
    {
      id: "27",
      slug: "ctet-paper-1-hindi",
      name: "CTET Paper 1 (हिंदी)",
      folder: "ctet",
      subfolder: "ctet-paper-1- (हिंदी)",
    },
    {
      id: "28",
      slug: "ctet-paper-2",
      name: "CTET Paper 2",
      folder: "ctet",
      subfolder: "ctet-paper-2",
    },
    {
      id: "29",
      slug: "english-grammar-advanced",
      name: "Advanced",
      folder: "english",
      subfolder: "advanced",
    },
    {
      id: "30",
      slug: "english-grammar-beginner",
      name: "Beginner",
      folder: "english",
      subfolder: "beginner",
    },
    {
      id: "31",
      slug: "english-grammar-intermediate",
      name: "Intermediate",
      folder: "english",
      subfolder: "intermediate",
    },
    {
      id: "32",
      slug: "iit-jee-chemistry",
      name: "Chemistry",
      folder: "iit-jee",
      subfolder: "chemistry",
    },
    {
      id: "33",
      slug: "iit-jee-mathematics",
      name: "Mathematics",
      folder: "iit-jee",
      subfolder: "mathematics",
    },
    {
      id: "34",
      slug: "iit-jee-physics",
      name: "Physics",
      folder: "iit-jee",
      subfolder: "physics",
    },
    {
      id: "35",
      slug: "mpsc-psi-police-sub-inspector-english",
      name: "PSI – Police Sub Inspector English",
      folder: "mpsc",
      subfolder: "psi-police-sub-inspector-english",
    },
    {
      id: "36",
      slug: "mpsc-rajyaseva-prelims",
      name: "Rajyaseva Prelims",
      folder: "mpsc",
      subfolder: "rajyaseva-prelims",
    },
    {
      id: "37",
      slug: "mpsc-राज्यसेवा-पूर्व-परीक्षा",
      name: "राज्यसेवा पूर्व परीक्षा",
      folder: "mpsc",
      subfolder: "राज्यसेवा पूर्व परीक्षा",
    },
    {
      id: "38",
      slug: "mpsc-वन्-सेवा-परीक्षा-marathi",
      name: "वन सेवा परीक्षा – Marathi",
      folder: "mpsc",
      subfolder: "वन सेवा परिक्षा-marathi",
    },
    // {
    //   id: "39",
    //   slug: "mpsc-महासंचालक-कर-निरीक्षक",
    //   name: "महासंचालक कर निरीक्षक – Inspector",
    //   folder: "",
    //   subfolder: "",
    // },
    {
      id: "40",
      slug: "mpsc-assistant-section-officer",
      name: "Assistant Section Officer",
      folder: "mpsc",
      subfolder: "assistant-section-officer-english",
    },
    {
      id: "41",
      slug: "mpsc-forest-services-english",
      name: "Forest Services – English",
      folder: "mpsc",
      subfolder: "forest-services-english",
    },
    {
      id: "42",
      slug: "neet-biology",
      name: "Biology",
      folder: "neet",
      subfolder: "biology",
    },
    {
      id: "43",
      slug: "neet-chemistry",
      name: "Chemistry",
      folder: "neet",
      subfolder: "chemistry",
    },
    {
      id: "44",
      slug: "neet-pcb-all-in-one",
      name: "PCB – All in one",
      folder: "neet",
      subfolder: "pcb-all-in-one",
    },
    {
      id: "45",
      slug: "neet-physics",
      name: "Physics",
      folder: "neet",
      subfolder: "physics",
    },
    {
      id: "46",
      slug: "ntse-practice",
      name: "NTSE – Practice",
      folder: "ntse",
      subfolder: "ntse-practice",
    },
    {
      id: "47",
      slug: "olympiad-class-6",
      name: "Class 6 English",
      folder: "olympiad",
      subfolder: "class-6-english",
    },
    {
      id: "48",
      slug: "olympiad-class-7",
      name: "Class 7 English",
      folder: "olympiad",
      subfolder: "class-7-english",
    },
    {
      id: "49",
      slug: "olympiad-class-8",
      name: "Class 8 Maths",
      folder: "olympiad",
      subfolder: "class-8-maths",
    },
    {
      id: "50",
      slug: "olympiad-class-9",
      name: "Class 9 English",
      folder: "olympiad",
      subfolder: "class-9-english",
    },
    {
      id: "84",
      slug: "upsc-ncert-hindi",
      name: "NCERT (UPSC) हिंदी",
      folder: "upsc",
      subfolder: "ncert-upsc- (हिंदी)",
    },
    {
      id: "85",
      slug: "upsc-ncert-geography",
      name: "NCERT Geography",
      folder: "upsc",
      subfolder: "ncert-geography",
    },
    {
      id: "86",
      slug: "upsc-ncert-history",
      name: "NCERT History",
      folder: "upsc",
      subfolder: "ncert-history",
    },
    {
      id: "87",
      slug: "upsc-ncert-polity",
      name: "NCERT Indian Polity",
      folder: "upsc",
      subfolder: "ncert-indian-polity",
    },
    {
      id: "88",
      slug: "upsc-reasoning-aptitude",
      name: "Reasoning and Aptitude",
      folder: "upsc",
      subfolder: "reasoning-and-general-intelligence-english",
    },
    {
      id: "89",
      slug: "upsc-samanya-buddhi",
      name: "सामान्य बुद्धि एवं तर्कशक्ति",
      folder: "upsc",
      subfolder: "सामान्य बुद्धि एवं तर्कशक्ति परीक्षण​",
    },
  ];

  try {
    const insertedData = await Promise.all(
      categories.map(async (item) => {
        const filePath = path.join(
          process.cwd(),
          "data",
          "mock-tests",
          item.folder,
          item.subfolder,
          `${item.subfolder}_combined.json`
        );
        
        const fileContents = await fs.readFile(filePath, "utf-8");
        const parsedData = JSON.parse(fileContents);

        // Call your DB insert function
        // await insertQuestionsByCategory(Number(item.id), parsedData.questions);

        return {
          id: item.id,
          category: item.name,
          slug: item.slug,
          subfolder: item.subfolder,
          questions: parsedData.questions?.length || 0,
        };
      })
    );

    return NextResponse.json(
      {
        status: "success",
        message: "Questions inserted successfully",
        questions: insertedData,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error inserting questions:", err);
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 500 }
    );
  }
}
