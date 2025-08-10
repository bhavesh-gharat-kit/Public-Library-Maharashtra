"use client";

import { faVideo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Swal from "sweetalert2";

const standardVideoResources = [
  {
    id: 584,
    title: "संवादातून शिक्षण",
    url: "https://www.youtube.com/playlist?list=PLlPVlklC5YixC1gMuUFrQe56zo54THPP8",
    icon: faVideo,
    color: "#007bff",
  },
];

const youtubeModalResources = [
  {
    id: 584,
    title: "संवादातून शिक्षण",
    youtubeId: "fVIKmEViHlI",
    playlistId:
      "https://www.youtube.com/playlist?list=PLlPVlklC5YixC1gMuUFrQe56zo54THPP8",
    thumbnail: "https://i.ytimg.com/vi/fVIKmEViHlI/hqdefault.jpg",
  },
  {
    id: 555,
    title: "Advanced Certificate in Digital Marketing and Communication",
    youtubeId: "zdi5hEDNmzY",
    thumbnail: "https://i.ytimg.com/vi/zdi5hEDNmzY/hqdefault.jpg",
  },
  {
    id: 554,
    title: "Android App Development for Beginners",
    youtubeId: "NLvaOL6Cm48",
    thumbnail: "https://i.ytimg.com/vi/NLvaOL6Cm48/hqdefault.jpg",
  },
  {
    id: 553,
    title: "Data Science MicroMasters Program",
    youtubeId: "8VjcpGyGeDk",
    thumbnail: "https://i.ytimg.com/vi/8VjcpGyGeDk/hqdefault.jpg",
  },
  {
    id: 552,
    title: "Python for Data Science and Machine Learning Bootcamp",
    youtubeId: "7eh4d6sabA0",
    thumbnail: "https://i.ytimg.com/vi/7eh4d6sabA0/hqdefault.jpg",
  },
  {
    id: 551,
    title: "Applied Data Science with Python Specialization",
    youtubeId: "mkv5mxYu0Wk",
    thumbnail: "https://i.ytimg.com/vi/mkv5mxYu0Wk/hqdefault.jpg",
  },
  {
    id: 550,
    title: "Cloud Computing and DevOps Program",
    youtubeId: "Xrgk023l4lI",
    thumbnail: "https://i.ytimg.com/vi/Xrgk023l4lI/hqdefault.jpg",
  },
  {
    id: 549,
    title: "AI-Powered Full Stack Development Course",
    youtubeId: "sEqLMrfv7HI",
    thumbnail: "https://i.ytimg.com/vi/sEqLMrfv7HI/hqdefault.jpg",
  },
  {
    id: 548,
    title: "Film Production",
    youtubeId: "puF9CkvmJt0",
    thumbnail: "https://i.ytimg.com/vi/puF9CkvmJt0/hqdefault.jpg",
  },
  {
    id: 547,
    title: "Theatre and Performance",
    youtubeId: "iMPWx1v7ioM",
    thumbnail: "https://i.ytimg.com/vi/iMPWx1v7ioM/hqdefault.jpg",
  },
  {
    id: 546,
    title: "Introduction to Music Production",
    youtubeId: "Hi72cCOPUQU",
    thumbnail: "https://i.ytimg.com/vi/Hi72cCOPUQU/hqdefault.jpg",
  },
  {
    id: 545,
    title: "Music Theory",
    youtubeId: "6gHEIF0rT2w",
    thumbnail: "https://i.ytimg.com/vi/6gHEIF0rT2w/hqdefault.jpg",
  },
  {
    id: 544,
    title: "Modern and Contemporary American Poetry",
    youtubeId: "PUok9h6uvO0",
    thumbnail: "https://i.ytimg.com/vi/PUok9h6uvO0/hqdefault.jpg",
  },
  {
    id: 543,
    title: "Classical Literature",
    youtubeId: "MSYw502dJNY",
    thumbnail: "https://i.ytimg.com/vi/MSYw502dJNY/hqdefault.jpg",
  },
  {
    id: 542,
    title: "Human Geography",
    youtubeId: "4y2nndDs8m4",
    thumbnail: "https://i.ytimg.com/vi/4y2nndDs8m4/hqdefault.jpg",
  },
  {
    id: 541,
    title: "Physical Geography",
    youtubeId: "vlVVaZhRAEA",
    thumbnail: "https://i.ytimg.com/vi/vlVVaZhRAEA/hqdefault.jpg",
  },
  {
    id: 540,
    title: "History of Modern China",
    youtubeId: "UUCEeC4f6ts",
    thumbnail: "https://i.ytimg.com/vi/UUCEeC4f6ts/hqdefault.jpg",
  },
  {
    id: 539,
    title: "World History: Imperialism",
    youtubeId: "alJaltUmrGo",
    thumbnail: "https://i.ytimg.com/vi/alJaltUmrGo/hqdefault.jpg",
  },
  {
    id: 538,
    title: "Introduction to Anthropology",
    youtubeId: "LYUzIf12qac",
    thumbnail: "https://i.ytimg.com/vi/LYUzIf12qac/hqdefault.jpg",
  },
  {
    id: 537,
    title: "Global Social Change",
    youtubeId: "J6eSPGVqHok",
    thumbnail: "https://i.ytimg.com/vi/J6eSPGVqHok/hqdefault.jpg",
  },
  {
    id: 536,
    title: "Introduction to Sociology",
    youtubeId: "32KG_ba_NJc",
    thumbnail: "https://i.ytimg.com/vi/32KG_ba_NJc/hqdefault.jpg",
  },
  {
    id: 535,
    title: "Positive Psychology",
    youtubeId: "1qJvS8v0TTI",
    thumbnail: "https://i.ytimg.com/vi/1qJvS8v0TTI/hqdefault.jpg",
  },
  {
    id: 534,
    title: "Introduction to Psychology",
    youtubeId: "vo4pMVb0R6M",
    thumbnail: "https://i.ytimg.com/vi/vo4pMVb0R6M/hqdefault.jpg",
  },
  {
    id: 533,
    title: "Global Diplomacy – Diplomacy in the Modern World",
    youtubeId: "LdKFN1g62PM",
    thumbnail: "https://i.ytimg.com/vi/LdKFN1g62PM/hqdefault.jpg",
  },
  {
    id: 532,
    title: "Understanding Political Concepts",
    youtubeId: "9cz4ikFcwMY",
    thumbnail: "https://i.ytimg.com/vi/9cz4ikFcwMY/hqdefault.jpg",
  },
  {
    id: 531,
    title: "Philosophy and Critical Thinking",
    youtubeId: "Cum3k-Wglfw",
    thumbnail: "https://i.ytimg.com/vi/Cum3k-Wglfw/hqdefault.jpg",
  },
  {
    id: 530,
    title: "Ancient Philosophy: Aristotle and His Successors",
    youtubeId: "7xHbNe-Hy_Q",
    thumbnail: "https://i.ytimg.com/vi/7xHbNe-Hy_Q/hqdefault.jpg",
  },
  {
    id: 529,
    title: "Applied Ethics",
    youtubeId: "CXepYB0sapY",
    thumbnail: "https://i.ytimg.com/vi/CXepYB0sapY/hqdefault.jpg",
  },
  {
    id: 528,
    title: "Introduction to Ethics",
    youtubeId: "-V8t8beCnnY",
    thumbnail: "https://i.ytimg.com/vi/-V8t8beCnnY/hqdefault.jpg",
  },
  {
    id: 527,
    title: "Sustainable Building Design",
    youtubeId: "KAiWdme6EEM",
    thumbnail: "https://i.ytimg.com/vi/KAiWdme6EEM/hqdefault.jpg",
  },
  {
    id: 526,
    title: "Architecture and Urbanism",
    youtubeId: "HiQ0xoHp-fM",
    thumbnail: "https://i.ytimg.com/vi/HiQ0xoHp-fM/hqdefault.jpg",
  },
  {
    id: 525,
    title: "Industrial Biotechnology",
    youtubeId: "2CqjfuTu4K0",
    thumbnail: "https://i.ytimg.com/vi/2CqjfuTu4K0/hqdefault.jpg",
  },
  {
    id: 524,
    title: "Biotechnology: Fundamentals",
    youtubeId: "RrTCjp2015M",
    thumbnail: "https://i.ytimg.com/vi/RrTCjp2015M/hqdefault.jpg",
  },
  {
    id: 523,
    title: "Introduction to Oceanography",
    youtubeId: "7PzNXOBYl6o",
    thumbnail: "https://i.ytimg.com/vi/7PzNXOBYl6o/hqdefault.jpg",
  },
  {
    id: 522,
    title: "Marine Biology",
    youtubeId: "nwyqp8KFGiI",
    thumbnail: "https://i.ytimg.com/vi/nwyqp8KFGiI/hqdefault.jpg",
  },
  {
    id: 521,
    title: "One Health: Connecting Humans, Animals and the Environment",
    youtubeId: "vOyIulcsJww",
    thumbnail: "https://i.ytimg.com/vi/vOyIulcsJww/hqdefault.jpg",
  },
  {
    id: 520,
    title: "Animal Behavior and Welfare",
    youtubeId: "e7nVTvjrV9g",
    thumbnail: "https://i.ytimg.com/vi/e7nVTvjrV9g/hqdefault.jpg",
  },
  {
    id: 519,
    title:
      "Introduction to Aerospace Engineering: Astronautics and Human Spaceflight",
    youtubeId: "zKzCd1mbrb4",
    thumbnail: "https://i.ytimg.com/vi/zKzCd1mbrb4/hqdefault.jpg",
  },
  {
    id: 518,
    title: "Introduction to Aerodynamics",
    youtubeId: "TiLPrV2MpG0",
    thumbnail: "https://i.ytimg.com/vi/TiLPrV2MpG0/hqdefault.jpg",
  },
  {
    id: 517,
    title: "Aviation Management",
    youtubeId: "DnLoLlJgunQ",
    thumbnail: "https://i.ytimg.com/vi/DnLoLlJgunQ/hqdefault.jpg",
  },
  {
    id: 516,
    title: "Electric Vehicles: Introduction to Motors and Power Electronics",
    youtubeId: "tJfERzrG-D8",
    thumbnail: "https://i.ytimg.com/vi/tJfERzrG-D8/hqdefault.jpg",
  },
  {
    id: 515,
    title: "Introduction to Automotive Engineering",
    youtubeId: "VN4_asSBEKY",
    thumbnail: "https://i.ytimg.com/vi/VN4_asSBEKY/hqdefault.jpg",
  },
  {
    id: 514,
    title: "Construction Project Management",
    youtubeId: "PDAmTebSIv8",
    thumbnail: "https://i.ytimg.com/vi/PDAmTebSIv8/hqdefault.jpg",
  },
  {
    id: 513,
    title: "Construction Management Specialization",
    youtubeId: "gYr015pfEr4",
    thumbnail: "https://i.ytimg.com/vi/gYr015pfEr4/hqdefault.jpg",
  },
  {
    id: 512,
    title: "Introduction to Animal Husbandry",
    youtubeId: "vCTHxiATF4A",
    thumbnail: "https://i.ytimg.com/vi/vCTHxiATF4A/hqdefault.jpg",
  },
  {
    id: 511,
    title: "Sustainable Agricultural Land Management",
    youtubeId: "iloAQmroRK0",
    thumbnail: "https://i.ytimg.com/vi/iloAQmroRK0/hqdefault.jpg",
  },
  {
    id: 510,
    title: "Hospitality Management",
    youtubeId: "iP0yfOfR79w",
    thumbnail: "https://i.ytimg.com/vi/iP0yfOfR79w/hqdefault.jpg",
  },
  {
    id: 509,
    title: "Hotel Management",
    youtubeId: "qL9jlm67xSs",
    thumbnail: "https://i.ytimg.com/vi/qL9jlm67xSs/hqdefault.jpg",
  },
  {
    id: 508,
    title: "Tourism and Travel Management",
    youtubeId: "WCK9zQyW9pc",
    thumbnail: "https://i.ytimg.com/vi/WCK9zQyW9pc/hqdefault.jpg",
  },
  {
    id: 507,
    title: "Sustainable Tourism",
    youtubeId: "oL-X2iQi864",
    thumbnail: "https://i.ytimg.com/vi/oL-X2iQi864/hqdefault.jpg",
  },
  {
    id: 506,
    title: "Sports Marketing",
    youtubeId: "Ve-ZcABM7LE",
    thumbnail: "https://i.ytimg.com/vi/Ve-ZcABM7LE/hqdefault.jpg",
  },
  {
    id: 505,
    title: "Sports and Society",
    youtubeId: "d6jj2I_Kn-s",
    thumbnail: "https://i.ytimg.com/vi/d6jj2I_Kn-s/hqdefault.jpg",
  },
  {
    id: 504,
    title: "Stanford Introduction to Food and Health",
    youtubeId: "z7x1aaZ03xU",
    thumbnail: "https://i.ytimg.com/vi/z7x1aaZ03xU/hqdefault.jpg",
  },
  {
    id: 503,
    title: "Nutrition and Health: Macronutrients and Overnutrition",
    youtubeId: "lHO8S0IVTbQ",
    thumbnail: "https://i.ytimg.com/vi/lHO8S0IVTbQ/hqdefault.jpg",
  },
  {
    id: 502,
    title: "Climate Change Mitigation in Developing Countries",
    youtubeId: "sDS1sFg6lNw",
    thumbnail: "https://i.ytimg.com/vi/sDS1sFg6lNw/hqdefault.jpg",
  },
  {
    id: 501,
    title: "Introduction to Environmental Science",
    youtubeId: "7G3eXI_DPn8",
    thumbnail: "https://i.ytimg.com/vi/7G3eXI_DPn8/hqdefault.jpg",
  },
  {
    id: 500,
    title: "Management of Fashion and Luxury Companies",
    youtubeId: "x4L0D76zyPc",
    thumbnail: "https://i.ytimg.com/vi/x4L0D76zyPc/hqdefault.jpg",
  },
  {
    id: 499,
    title: "Fashion as Design",
    youtubeId: "t4RB3CXtdQo",
    thumbnail: "https://i.ytimg.com/vi/t4RB3CXtdQo/hqdefault.jpg",
  },
  {
    id: 498,
    title: "The Modern World, Part One: Global History from 1760 to 1910",
    youtubeId: "ycBpYHbua2k",
    thumbnail: "https://i.ytimg.com/vi/ycBpYHbua2k/hqdefault.jpg",
  },
  {
    id: 497,
    title: "Modern Art & Ideas",
    youtubeId: "YooFwA7xj18",
    thumbnail: "https://i.ytimg.com/vi/YooFwA7xj18/hqdefault.jpg",
  },
  {
    id: 496,
    title: "Solar Energy for Engineers, Architects, and Entrepreneurs",
    youtubeId: "xKxrkht7CpY",
    thumbnail: "https://i.ytimg.com/vi/xKxrkht7CpY/hqdefault.jpg",
  },
  {
    id: 495,
    title: "Renewable Energy and Green Building Entrepreneurship",
    youtubeId: "OxYzhDjDRH0",
    thumbnail: "https://i.ytimg.com/vi/OxYzhDjDRH0/hqdefault.jpg",
  },
  {
    id: 494,
    title: "Logistics Fundamentals",
    youtubeId: "Mi1QBxVjZAw",
    thumbnail: "https://i.ytimg.com/vi/Mi1QBxVjZAw/hqdefault.jpg",
  },
  {
    id: 493,
    title: "Supply Chain Management Specialization",
    youtubeId: "Lpp9bHtPAN0",
    thumbnail: "https://i.ytimg.com/vi/Lpp9bHtPAN0/hqdefault.jpg",
  },
  {
    id: 492,
    title: "Real Estate Financial Modeling",
    youtubeId: "MvMoQvaSiPE",
    thumbnail: "https://i.ytimg.com/vi/MvMoQvaSiPE/hqdefault.jpg",
  },
  {
    id: 491,
    title: "Real Estate Investment",
    youtubeId: "lXN_XhS0aT0",
    thumbnail: "https://i.ytimg.com/vi/lXN_XhS0aT0/hqdefault.jpg",
  },
  {
    id: 490,
    title: "Data-Driven Journalism",
    youtubeId: "IBOhZn28TsE",
    thumbnail: "https://i.ytimg.com/vi/IBOhZn28TsE/hqdefault.jpg",
  },
  {
    id: 489,
    title: "Becoming a Journalist: Reporters and Editors",
    youtubeId: "5USw_7MKooU",
    thumbnail: "https://i.ytimg.com/vi/5USw_7MKooU/hqdefault.jpg",
  },
  {
    id: 488,
    title: "Media Relations and PR",
    youtubeId: "hFvGBdnTuAE",
    thumbnail: "https://i.ytimg.com/vi/hFvGBdnTuAE/hqdefault.jpg",
  },
  {
    id: 487,
    title: "Introduction to Public Relations",
    youtubeId: "8uRh4XYa__M",
    thumbnail: "https://i.ytimg.com/vi/8uRh4XYa__M/hqdefault.jpg",
  },
  {
    id: 486,
    title: "Intellectual Property Law Specialization",
    youtubeId: "8G1POcSNGWM",
    thumbnail: "https://i.ytimg.com/vi/8G1POcSNGWM/hqdefault.jpg",
  },
  {
    id: 485,
    title: "Introduction to International Criminal Law",
    youtubeId: "SHYFTN80ncE",
    thumbnail: "https://i.ytimg.com/vi/SHYFTN80ncE/hqdefault.jpg",
  },
  {
    id: 484,
    title: "UI / UX Design Specialization",
    youtubeId: "6qLq7xkodA8",
    thumbnail: "https://i.ytimg.com/vi/6qLq7xkodA8/hqdefault.jpg",
  },
  {
    id: 483,
    title: "Graphic Design Specialization",
    youtubeId: "WONZVnlam6U",
    thumbnail: "https://i.ytimg.com/vi/WONZVnlam6U/hqdefault.jpg",
  },
  {
    id: 482,
    title: "Electrical Engineering Fundamentals",
    youtubeId: "ZRLXDiiUv8Q",
    thumbnail: "https://i.ytimg.com/vi/ZRLXDiiUv8Q/hqdefault.jpg",
  },
  {
    id: 481,
    title: "Engineering Project Management",
    youtubeId: "B_TO95t0KNc",
    thumbnail: "https://i.ytimg.com/vi/B_TO95t0KNc/hqdefault.jpg",
  },
  {
    id: 480,
    title: "Social Media Marketing Specialization",
    youtubeId: "EnB1OYZeoQs",
    thumbnail: "https://i.ytimg.com/vi/EnB1OYZeoQs/hqdefault.jpg",
  },
  {
    id: 479,
    title: "Marketing in a Digital World",
    youtubeId: "aOZVudBCdlg",
    thumbnail: "https://i.ytimg.com/vi/aOZVudBCdlg/hqdefault.jpg",
  },
  {
    id: 478,
    title: "English for Career Development",
    youtubeId: "ZIv8ywn1aZY",
    thumbnail: "https://i.ytimg.com/vi/ZIv8ywn1aZY/hqdefault.jpg",
  },
  {
    id: 477,
    title: "Entrepreneurship: Launching an Innovative Business",
    youtubeId: "Y_jJ1hsIyd0",
    thumbnail: "https://i.ytimg.com/vi/Y_jJ1hsIyd0/hqdefault.jpg",
  },
  {
    id: 476,
    title: "Entrepreneurship Specialization",
    youtubeId: "MvPTVgGUsyc",
    thumbnail: "https://i.ytimg.com/vi/MvPTVgGUsyc/hqdefault.jpg",
  },
  {
    id: 475,
    title: "Foundations of Teaching for Learning",
    youtubeId: "e9d6Ym3Nfc8",
    thumbnail: "https://i.ytimg.com/vi/e9d6Ym3Nfc8/hqdefault.jpg",
  },
  {
    id: 474,
    title: "Online Teaching Specialization",
    youtubeId: "JFIIP7iKasM",
    thumbnail: "https://i.ytimg.com/vi/JFIIP7iKasM/hqdefault.jpg",
  },
  {
    id: 473,
    title: "Health Informatics",
    youtubeId: "rcvohrUABfc",
    thumbnail: "https://i.ytimg.com/vi/rcvohrUABfc/hqdefault.jpg",
  },
  {
    id: 472,
    title: "Introduction to Healthcare",
    youtubeId: "mG_BZ8GgqJU",
    thumbnail: "https://i.ytimg.com/vi/mG_BZ8GgqJU/hqdefault.jpg",
  },
  {
    id: 471,
    title: "Strategic Human Resource Management",
    youtubeId: "2A_YrAVJukI",
    thumbnail: "https://i.ytimg.com/vi/2A_YrAVJukI/hqdefault.jpg",
  },
  {
    id: 470,
    title: "Human Resource Management: HR for People Managers",
    youtubeId: "bI9RZjF-538",
    thumbnail: "https://i.ytimg.com/vi/bI9RZjF-538/hqdefault.jpg",
  },
  {
    id: 469,
    title: "Investment Management Specialization",
    youtubeId: "iNs84ACbOFM",
    thumbnail: "https://i.ytimg.com/vi/iNs84ACbOFM/hqdefault.jpg",
  },
  {
    id: 468,
    title: "Financial Markets by Yale University",
    youtubeId: null,
    thumbnail: null,
  },
  {
    id: 467,
    title: "Certified Business Analysis Professional (CBAP)",
    youtubeId: "AiBmLBDlAMA",
    thumbnail: "https://i.ytimg.com/vi/AiBmLBDlAMA/hqdefault.jpg",
  },
  {
    id: 466,
    title: "Business Analysis & Process Management",
    youtubeId: "H8kdXXq-pGU",
    thumbnail: "https://i.ytimg.com/vi/H8kdXXq-pGU/hqdefault.jpg",
  },
  {
    id: 465,
    title: "Google Project Management",
    youtubeId: "rck3MnC7OXA",
    thumbnail: "https://i.ytimg.com/vi/rck3MnC7OXA/hqdefault.jpg",
  },
  {
    id: 464,
    title: "Project Management Professional (PMP)",
    youtubeId: "x1POqDjbqmU",
    thumbnail: "https://i.ytimg.com/vi/x1POqDjbqmU/hqdefault.jpg",
  },
  {
    id: 463,
    title: "Google Digital Marketing & E-commerce",
    youtubeId: "6qfLbutyyXc",
    thumbnail: "https://i.ytimg.com/vi/6qfLbutyyXc/hqdefault.jpg",
  },
  {
    id: 462,
    title: "Digital Marketing Specialization",
    youtubeId: "qKXcsOZP10w",
    thumbnail: "https://i.ytimg.com/vi/qKXcsOZP10w/hqdefault.jpg",
  },
  {
    id: 461,
    title: "Certified Information Systems Security Professional (CISSP)",
    youtubeId: "qKXcsOZP10w",
    thumbnail: "https://i.ytimg.com/vi/qKXcsOZP10w/hqdefault.jpg",
  },
  {
    id: 460,
    title: "Cybersecurity Specialization",
    youtubeId: "VYxViY2agwI",
    thumbnail: "https://i.ytimg.com/vi/VYxViY2agwI/hqdefault.jpg",
  },
  {
    id: 459,
    title: "Google Cloud Professional Certificate",
    youtubeId: "nSSQwVREXhY",
    thumbnail: "https://i.ytimg.com/vi/nSSQwVREXhY/hqdefault.jpg",
  },
  {
    id: 458,
    title: "AWS Certified Solutions Architect",
    youtubeId: "Ia-UEYYR44s",
    thumbnail: "https://i.ytimg.com/vi/Ia-UEYYR44s/hqdefault.jpg",
  },
  {
    id: 457,
    title: "React Developer",
    youtubeId: "SqcY0GlETPk",
    thumbnail: "https://i.ytimg.com/vi/SqcY0GlETPk/hqdefault.jpg",
  },
  {
    id: 456,
    title: "Full Stack Web Developer",
    youtubeId: "8KaJRw-rfn8",
    thumbnail: "https://i.ytimg.com/vi/8KaJRw-rfn8/hqdefault.jpg",
  },
  {
    id: 455,
    title: "AI For Everyone by Andrew Ng",
    youtubeId: "ITH_yHzy_Ag",
    thumbnail: "https://i.ytimg.com/vi/ITH_yHzy_Ag/hqdefault.jpg",
  },
  {
    id: 454,
    title: "Deep Learning Specialization",
    youtubeId: "CS4cs9xVecg",
    thumbnail: "https://i.ytimg.com/vi/CS4cs9xVecg/hqdefault.jpg",
  },
  {
    id: 453,
    title: "Machine Learning by Stanford University",
    youtubeId: "jGwO_UgTS7I",
    thumbnail: "https://i.ytimg.com/vi/jGwO_UgTS7I/hqdefault.jpg",
  },
  {
    id: 452,
    title: "IBM Data Science Professional Certificate",
    youtubeId: "ZstzwKbHdUA",
    thumbnail: "https://i.ytimg.com/vi/ZstzwKbHdUA/hqdefault.jpg",
  },
  {
    id: 451,
    title: "Data Science Specialization",
    youtubeId: "2bh0-EbpGM8",
    thumbnail: "https://i.ytimg.com/vi/2bh0-EbpGM8/hqdefault.jpg",
  },
];

function JobAndInterest() {
  // const [isModalOpen, setIsModalOpen] = useState(false)

  // HANDLING THE YOUTUBE POP MODAL USING SWEER-ALERT
  const handleYoutubeModal = (youtubetitle, youtubeId) => {
    const ytLink = "https://www.youtube.com/embed/" + youtubeId + "?autoplay=1";
    console.log(ytLink);

    Swal.fire({
      title: youtubetitle,
      html: `
                    <div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;">
                    <iframe 
                        src=${ytLink}
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen 
                        style="position:absolute;top:0;left:0;width:100%;height:100%;">
                    </iframe>
                    </div>
            `,
      showConfirmButton: false,
      showCancelButton: false,
      showCloseButton: true,
      width: 800,
      padding: "1rem",
      backdrop: true,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* HEADER PART */}
      <h1 className="text-3xl font-bold text-center my-6">
        Job Training Videos
      </h1>

      {/* Skills Training Videos */}
      <h2 className="text-3xl font-medium my-6">Skills Training Videos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {youtubeModalResources.map((resource) => (
          <div
            key={resource.id}
            className="bg-white shadow-md rounded-lg p-6 text-center transition-all hover:shadow-xl"
          >
            <div
              className="cursor-pointer overflow-hidden transition-all duration-300"
              // HANDLING THE YT POP-UP MODAL
              onClick={
                resource.playlistId
                  ? undefined
                  : () => handleYoutubeModal(resource.title, resource.youtubeId)
              }
            >
              <img
                className="hover:scale-105 transition-all"
                src={resource.thumbnail}
                alt={resource.title}
              />
            </div>
            <h5 className="text-lg font-medium mt-4">{resource.title}</h5>
            <div className="flex justify-center gap-3 mt-4">
              <a
                href={resource.playlistId ? resource.playlistId : resource.url}
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 cursor-pointer"
                // HANDLING THE YT POP-UP MODAL
                onClick={
                  resource.playlistId
                    ? undefined
                    : () =>
                        handleYoutubeModal(resource.title, resource.youtubeId)
                }
              >
                View
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobAndInterest;
