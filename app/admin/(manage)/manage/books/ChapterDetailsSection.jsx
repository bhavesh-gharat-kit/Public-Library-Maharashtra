"use client";
import React, { useState } from "react";
import {
    ChevronDown,
    ChevronUp,
    FileText,
    Video,
    Headphones,
    Image,
    Book,
    Lightbulb,
    AlertTriangle,
    Brain,
} from "lucide-react";

export default function ChapterDetailsSection({ chapter, isExpanded }) {
    if (!isExpanded) return null;

    const sections = [
        {
            key: "chapterOverview",
            title: "Chapter Overview",
            content: chapter.chapterOverview,
            icon: <Book className="w-5 h-5 text-blue-600" />,
            color: "blue",
        },
        {
            key: "keyConcepts",
            title: "Key Concepts",
            content: chapter.keyConcepts,
            icon: <Brain className="w-5 h-5 text-purple-600" />,
            color: "purple",
        },
        {
            key: "detailedNotes",
            title: "Detailed Notes",
            content: chapter.detailedNotes,
            icon: <Book className="w-5 h-5 text-indigo-600" />,
            color: "indigo",
        },
        {
            key: "studyTips",
            title: "Study Tips",
            content: chapter.studyTips,
            icon: <Lightbulb className="w-5 h-5 text-yellow-600" />,
            color: "yellow",
        },
        {
            key: "commonMistakes",
            title: "Common Mistakes",
            content: chapter.commonMistakes,
            icon: <AlertTriangle className="w-5 h-5 text-red-600" />,
            color: "red",
        },
        {
            key: "practiceQuestions",
            title: "Practice Questions",
            content: chapter.practiceQuestions,
            icon: <Book className="w-5 h-5 text-green-600" />,
            color: "green",
        },
        {
            key: "sampleQuestionPaper",
            title: "Sample Question Paper",
            content: chapter.sampleQuestionPaper,
            icon: <Book className="w-5 h-5 text-teal-600" />,
            color: "teal",
        },
        {
            key: "mcqPracticeBank",
            title: "MCQ Practice Bank",
            content: chapter.mcqPracticeBank,
            icon: <Book className="w-5 h-5 text-orange-600" />,
            color: "orange",
        },
    ];

    const availableSections = sections.filter((section) => section.content);

    const links = [
        {
            label: "PDF",
            url: chapter.pdfLink,
            icon: <FileText className="w-4 h-4" />,
            color: "red",
        },
        {
            label: "Video",
            url: chapter.videoLink,
            icon: <Video className="w-4 h-4" />,
            color: "blue",
        },
        {
            label: "Audio",
            url: chapter.audioLink,
            icon: <Headphones className="w-4 h-4" />,
            color: "purple",
        },
        {
            label: "Thumbnail",
            url: chapter.thumbnailLink,
            icon: <Image className="w-4 h-4" />,
            color: "green",
        },
    ];

    const availableLinks = links.filter((link) => link.url);

    return (
        <div className="p-6 bg-gradient-to-br from-gray-50 to-white border-t border-gray-200">
            {/* Content Sections */}
            {availableSections.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                    {availableSections.map((section) => (
                        <ContentCard
                            key={section.key}
                            title={section.title}
                            content={section.content}
                            icon={section.icon}
                            color={section.color}
                        />
                    ))}
                </div>
            )}

            {/* Resource Links */}
            {availableLinks.length > 0 && (
                <div>
                    <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                        <Book className="w-4 h-4 text-gray-500" />
                        Resources & Materials
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {availableLinks.map((link) => (
                            <ResourceLink
                                key={link.label}
                                label={link.label}
                                url={link.url}
                                icon={link.icon}
                                color={link.color}
                            />
                        ))}
                    </div>
                </div>
            )}

            {availableSections.length === 0 && availableLinks.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    <Book className="w-12 h-12 mx-auto mb-2 opacity-30" />
                    <p>No additional details available for this chapter</p>
                </div>
            )}
        </div>
    );
}

function ContentCard({ title, content, icon, color }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const PREVIEW_LENGTH = 250;
    const shouldShowToggle = content.length > PREVIEW_LENGTH;
    const displayContent = isExpanded ? content : content.slice(0, PREVIEW_LENGTH);

    const colorClasses = {
        blue: "border-blue-200 bg-blue-50/50",
        purple: "border-purple-200 bg-purple-50/50",
        indigo: "border-indigo-200 bg-indigo-50/50",
        yellow: "border-yellow-200 bg-yellow-50/50",
        red: "border-red-200 bg-red-50/50",
        green: "border-green-200 bg-green-50/50",
        teal: "border-teal-200 bg-teal-50/50",
        orange: "border-orange-200 bg-orange-50/50",
    };

    const buttonColors = {
        blue: "text-blue-600 hover:bg-blue-100",
        purple: "text-purple-600 hover:bg-purple-100",
        indigo: "text-indigo-600 hover:bg-indigo-100",
        yellow: "text-yellow-700 hover:bg-yellow-100",
        red: "text-red-600 hover:bg-red-100",
        green: "text-green-600 hover:bg-green-100",
        teal: "text-teal-600 hover:bg-teal-100",
        orange: "text-orange-600 hover:bg-orange-100",
    };

    return (
        <div
            className={`border-l-4 ${colorClasses[color]} rounded-lg p-4 transition-all duration-300 hover:shadow-md`}
        >
            <div className="flex items-start gap-3 mb-3">
                <div className="mt-1">{icon}</div>
                <h4 className="font-semibold text-gray-800 flex-1">{title}</h4>
            </div>

            <div className="relative">
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                    {displayContent}
                    {!isExpanded && shouldShowToggle && (
                        <span className="text-gray-400">...</span>
                    )}
                </p>

                {shouldShowToggle && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className={`mt-3 px-3 py-1.5 rounded-md text-sm font-medium flex items-center gap-2 transition-colors ${buttonColors[color]}`}
                    >
                        {isExpanded ? (
                            <>
                                <ChevronUp className="w-3 h-3" />
                                Show Less
                            </>
                        ) : (
                            <>
                                <ChevronDown className="w-3 h-3" />
                                Read More
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}

function ResourceLink({ label, url, icon, color }) {
    const colorClasses = {
        red: "bg-red-100 text-red-700 hover:bg-red-200 border-red-300",
        blue: "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-300",
        purple: "bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-300",
        green: "bg-green-100 text-green-700 hover:bg-green-200 border-green-300",
    };

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${colorClasses[color]} border px-4 py-3 rounded-lg font-medium text-center transition-all hover:shadow-md hover:scale-105 flex items-center justify-center gap-2 group`}
        >
            <span className="group-hover:scale-110 transition-transform">{icon}</span>
            <span className="text-sm">{label}</span>
        </a>
    );
}