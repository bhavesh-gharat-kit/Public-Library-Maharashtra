"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  faMasksTheater,
  faUserDoctor,
  faNotesMedical,
  faHeart,
  faBrain,
  faDumbbell,
  faMicrophone,
  faMusic,
  faCirclePlay,
  faVideo,
  faPodcast,
  faBriefcase,
  faClipboardList,
  faLightbulb,
  faChartLine,
  faGlobe,
  faSquarePen,
  faChalkboard,
  faPen,
  faUserGraduate,
  faVialCircleCheck,
  faRadiation,
  faBookOpenReader,
  faBookTanakh,
  faPersonSnowboarding,
  faSchool,
  faBookOpen,
  faBook,
  faLaptopFile,
  faLinesLeaning,
  faLandmark,
  faComments,
  faBuildingColumns,
  faVrCardboard,
  faGopuram,
  faFilm,
  faDice,
  faPuzzlePiece,
  faTabletButton,
  faTabletScreenButton,
  faPenClip,
  faPenRuler,
  faFilePen,
  faTachographDigital,
  faBuildingLock,
  faUserClock,
  faUserLock,
  faLock,
  faChalkboardUser,
  faRobot,
  faPlus,
  faBullseye,
  faCoins,
  faClock,
  faPeopleGroup,
  faHandshakeAngle,
  faPlateWheat,
  faUsers,
  faUser,
  faGavel,
  faSeedling,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { faArtstation, faLeanpub } from "@fortawesome/free-brands-svg-icons";
import {
  faLanguage,
  faPersonChalkboard,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";

import { faFigma } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const creativeResources = [
  {
    id: 3956,
    title: "Advanced Drama/IB Theatre",
    url: "https://dbhs.wvusd.org/apps/pages/index.jsp?uREC_ID=1005306&type=u&pREC_ID=1479650",
    icon: faMasksTheater,
    color: "#007bff",
  },
  {
    id: 3955,
    title: "Theatre High School Advanced Acting",
    url: "https://www.nationalartsstandards.org/content/theatre-high-school-advanced-acting-student-work",
    icon: faMasksTheater,
    color: "#dc3545",
  },
  {
    id: 3953,
    title: "Advanced drama and theatre studies",
    url: "https://example.com", // Replace with correct URL
    icon: faMasksTheater,
    color: "#28a745",
  },
  {
    id: 3951,
    title: "Audio Academy",
    url: "https://audioacademy.in/",
    icon: faMicrophone,
    color: "#ffc107",
  },
  {
    id: 3950,
    title: "Music Production and Sound Engineering Institutes in India",
    url: "https://www.tgcindia.com/top-10-music-production-and-sound-engineering-institutes-in-india/",
    icon: faMusic,
    color: "#fd7e14",
  },
  {
    id: 3949,
    title: "Music production workshops",
    url: "https://www.campfr.com/?gad_source=1&gclid=EAIaIQobChMI05GT8dPbiwMV96dmAh1gwwoqEAAYASAAEgKNIfD_BwE",
    icon: faMusic,
    color: "#6f42c1",
  },
  {
    id: 3948,
    title: "Best Podcast Apps and Websites for Students",
    url: "https://www.commonsense.org/education/lists/best-podcast-apps-and-websites-for-students",
    icon: faCirclePlay,
    color: "#17a2b8",
  },
  {
    id: 3947,
    title: "Video - Podcast",
    url: "https://www.podcastingsmart.com/editlab",
    icon: faVideo,
    color: "#e83e8c",
  },
  {
    id: 3945,
    title: "Podcast Editing: How to Do It In 11 Steps",
    url: "https://riverside.fm/blog/podcast-editing",
    icon: faPodcast,
    color: "#343a40",
  },
  {
    id: 3942,
    title: "Graphic Design and Animation",
    url: "https://www.dreamzone.co.in/graphics-design-certification-training/",
    icon: faMasksTheater,
    color: "#20c997",
  },
  {
    id: 3941,
    title: "Graphic Design & Animation",
    url: "https://ads.idea-worldwide.com/?utm_source=&utm_campaign=&utm_ad_group=&utm_keyword=schooling%20for%20graphic%20design&gad_source=1&gclid=EAIaIQobChMI9a6O_9HbiwMV-h2DAx298jhWEAAYASAAEgIWm_D_BwE",
    icon: faFigma,
    color: "#007bff",
  },
];

const academicLearningResources = [
  {
    id: 3896,
    title: "Academic Writing Style",
    url: "https://library.sacredheart.edu/c.php?g=29803&p=185910",
    icon: faSquarePen,
    color: "#007bff",
  },
  {
    id: 3895,
    title: "Research & Academic Writing",
    url: "https://www.indeed.com/career-advice/career-development/academic-writing",
    icon: faChalkboard,
    color: "#dc3545",
  },
  {
    id: 3893,
    title: "Academic Research Writing",
    url: "https://quillbot.com/courses/research-based-writing/chapter/academic-research-writing-what-is-it/",
    icon: faPen,
    color: "#28a745",
  },
  {
    id: 3886,
    title: "Students Engineering Projects",
    url: "https://sciencefaircentral.com/students/engineering-projects",
    icon: faUserGraduate,
    color: "#ffc107",
  },
  {
    id: 3884,
    title: "Science Projects",
    url: "https://www.sciencebuddies.org/science-fair-projects/science-projects",
    icon: faVialCircleCheck,
    color: "#fd7e14",
  },
  {
    id: 3883,
    title: "Science & Engineering Projects",
    url: "https://www.sciencebuddies.org/science-fair-projects/landing-engineering.shtml",
    icon: faRadiation,
    color: "#6f42c1",
  },
  {
    id: 3882,
    title:
      "How the SCORE Scholarship Can Help You Prepare JEE, NEET, CUET, Olympiads",
    url: "https://infinitylearn.com/blog/how-the-score-scholarship-can-help-you-prepare-jee-neet-cuet-olympiads",
    icon: faBookOpenReader,
    color: "#17a2b8",
  },
  {
    id: 3880,
    title: "Early Starters A Guide To JEE, NEET And Olympiad Preparation",
    url: "https://sathee.prutor.ai/article/engineering/early_starters_a_guide_to_jeeneet_and_olympiad_preparation/",
    icon: faBookTanakh,
    color: "#e83e8c",
  },
  {
    id: 3878,
    title: "How to Prepare for Olympiad Exams",
    url: "https://margshree.com/blog/how-to-prepare-for-olympiad-exams/",
    icon: faPersonSnowboarding,
    color: "#343a40",
  },
  {
    id: 3876,
    title: "Competitive Exam Prep",
    url: "https://genesisclasses.net/neet/index.php",
    icon: faSchool,
    color: "#20c997",
  },
  {
    id: 3875,
    title: "All-State Board Books",
    url: "https://www.selfstudys.com/page/state-board-books",
    icon: faBookOpen,
    color: "#007bff",
  },
  {
    id: 3872,
    title: "NCERT, State Boards, Reference Books",
    url: "https://ncert.nic.in/textbook.php",
    icon: faBook,
    color: "#dc3545",
  },
  {
    id: 3871,
    title: "Advanced-placement-courses",
    url: "https://courseleap.org/advanced-placement-courses/",
    icon: faLaptopFile,
    color: "#28a745",
  },
  {
    id: 3868,
    title: "Advanced Topics",
    url: "https://brilliant.org/paths/advanced-and-applied-science/",
    icon: faLightbulb,
    color: "#ffc107",
  },
  {
    id: 3867,
    title: "Advanced Learning",
    url: "https://www.frontiersin.org/research-topics/8563/advanced-learning",
    icon: faLinesLeaning,
    color: "#fd7e14",
  },
  {
    id: 3866,
    title: "Advanced Learners",
    url: "https://cty.jhu.edu/resources-support-advanced-learners/advanced-learners-101",
    icon: faLeanpub,
    color: "#6f42c1",
  },
  {
    id: 3864,
    title: "Explore the STEM Course Catalog",
    url: "https://www.coursera.org/courses?query=stem",
    icon: faLandmark,
    color: "#17a2b8",
  },
  {
    id: 3861,
    title: "Advanced Subject Learning (STEM, Humanities, Commerce)",
    url: "Advanced Subject Learning (STEM, Humanities, Commerce)",
    icon: faBuildingColumns,
    color: "#e83e8c",
  },
];

const funEdutainmentResources = [
  {
    id: 3989,
    title:
      "Analyzing augmented reality (AR) and virtual reality (VR) recent development in education",
    url: "https://www.sciencedirect.com/science/article/pii/S2590291123001377",
    icon: faVrCardboard,
    color: "#007bff",
  },
  {
    id: 3988,
    title: "Virtual Reality in Education: Benefits, Tools, and Resources",
    url: "https://soeonline.american.edu/blog/benefits-of-virtual-reality-in-education/",
    icon: faVrCardboard,
    color: "#dc3545",
  },
  {
    id: 3987,
    title: "Virtual Reality in Education",
    url: "https://www.classvr.com/virtual-reality-in-education/",
    icon: faVrCardboard,
    color: "#28a745",
  },
  {
    id: 3986,
    title: "Indian & World Mythology",
    url: "https://www.originaltravel.co.uk/travel-blog/an-introduction-to-myths-and-legends-in-india",
    icon: faGopuram,
    color: "#ffc107",
  },
  {
    id: 3985,
    title: "Indian & Hindu Mythology | Avatars, Stories & Gods",
    url: "https://study.com/academy/lesson/gods-stories-from-indian-mythology.html#:~:text=Trimurti%20is%20a%20triune%20deity,knowledge%2C%20and%20the%20vedic%20texts.",
    icon: faGopuram,
    color: "#fd7e14",
  },
  {
    id: 3984,
    title: "8 Mind-Blowing Space Documentaries to Watch Now on NOVA",
    url: "https://www.pbs.org/wgbh/nova/article/best-space-documentaries-streaming/",
    icon: faFilm,
    color: "#6f42c1",
  },
  {
    id: 3983,
    title: "15 Great Documentary Movies for Middle and High School Classrooms",
    url: "https://www.commonsense.org/education/articles/15-great-documentary-movies-for-middle-and-high-school-classrooms",
    icon: faFilm,
    color: "#17a2b8",
  },
  {
    id: 3982,
    title: "Escape Room Challenge: Minecraft! Logic, Puzzles, Trivia & Riddles",
    url: "https://outschool.com/classes/escape-room-challenge-minecraft-logic-puzzles-trivia-riddles-ages-10-14-YzHNvm3X?srsltid=AfmBOooeMjIny5x_7_5seqSe8BIeibNWA3uc05t_U5IZ-No_oKxd7fdB",
    icon: faDice,
    color: "#e83e8c",
  },
  {
    id: 3981,
    title: "20 Best Math Puzzles to Engage and Challenge Your Students",
    url: "https://www.prodigygame.com/main-en/blog/math-puzzles/",
    icon: faPuzzlePiece,
    color: "#343a40",
  },
  {
    id: 3980,
    title: "Logical Puzzles & Escape Room Challenges",
    url: "https://learninghypothesis.com/escape-room-puzzle-ideas/",
    icon: faPuzzlePiece,
    color: "#20c997",
  },
];

const digitalLiteracyResources = [
  {
    id: 3929,
    title: "Best Web-Design Apps and Websites for Students",
    url: "https://www.commonsense.org/education/lists/best-web-design-apps-and-websites-for-students",
    icon: faTabletButton,
    color: "#007bff",
  },
  {
    id: 3928,
    title: "App Development & Web Designing",
    url: "https://www.designstudiouiux.com/web-design-agency/?gad_source=1&gclid=EAIaIQobChMIrL-s1MPbiwMVZvU8Ah0J3Q0-EAAYAiAAEgJX1_D_BwE",
    icon: faTabletScreenButton,
    color: "#dc3545",
  },
  {
    id: 3911,
    title: "Digital Content Types: How To Create Digital Content",
    url: "https://www.shopify.com/blog/digital-content",
    icon: faPenClip,
    color: "#28a745",
  },
  {
    id: 3909,
    title: "Digital Content Creation",
    url: "https://ahrefs.com/blog/digital-content-creation/",
    icon: faPenRuler,
    color: "#ffc107",
  },
  {
    id: 3908,
    title: "Digital Content",
    url: "https://www.semrush.com/blog/digital-content-creation/",
    icon: faFilePen,
    color: "#fd7e14",
  },
  {
    id: 3906,
    title: "Digital Content Creation & Blogging",
    url: "https://www.creativepossibilityproject.com/chatgpt-course?gad_source=1&gclid=CjwKCAiA8Lu9BhA8EiwAag16b0Ibdh-V1x4AbFbCEzraPzBkBHDcLLlQFupcsYLIFP1zbE_UnBTOGxoCOTAQAvD_BwE",
    icon: faTachographDigital,
    color: "#6f42c1",
  },
  {
    id: 3905,
    title: "Ethical Issues Related to Data Privacy and Security",
    url: "https://digitalprivacy.ieee.org/publications/topics/ethical-issues-related-to-data-privacy-and-security-why-we-must-balance-ethical-and-legal-requirements-in-the-connected-world",
    icon: faBuildingLock,
    color: "#17a2b8",
  },
  {
    id: 3903,
    title: "Privacy in computer ethics: Navigating the digital age",
    url: "https://www.researchgate.net/publication/371981101_Privacy_in_computer_ethics_Navigating_the_digital_age",
    icon: faUserClock,
    color: "#e83e8c",
  },
  {
    id: 3902,
    title: "Cyber Ethics",
    url: "https://www.gov.hk/en/residents/communication/infosec/guidelines/cyberethics.htm",
    icon: faUserLock,
    color: "#343a40",
  },
  {
    id: 3901,
    title: "Cyber Ethics & Online Privacy",
    url: "https://password-saver.com/data-leakage-protection/?utm_source=google&utm_medium=cpc&utm_campaign=inweb_SER_password-saver_Statti_India&utm_content=582253304639&utm_term=cyber%20security%20and%20data%20protection&gad_source=1&gclid=CjwKCAiA8Lu9BhA8EiwAag16b66aBFdA9LmLyR45LmeHQnUeCtuFcuq75evr0bs8nI3rYQREQK0CWxoCxcsQAvD_BwE",
    icon: faLock,
    color: "#20c997",
  },
  {
    id: 3899,
    title: "Become an Expert in Machine Learning & AI with IIIT-B",
    url: "https://www.upgrad.com/machine-learning-ai-pgd-iiitb-lpv1/?utm_source=GOOGLE&utm_medium=NBSEARCH&utm_campaign=IND_ACQ_WEB_GOOGLE_NBSEARCH_DV_IIITB_EML_HIT_T1_DAcc&utm_content=AI_ML_Courses&utm_term=learn%20ai%20and%20machine%20learning&ad_device=c&ad_network=g&ad_creative=647075414140&ad_placement=&ad_keyword_matchtype=p&ad_clickid=CjwKCAiA8Lu9BhA8EiwAag16b5jI2N0LbztcqOiUbe_57jPDgYA7vsYHHsCfyXgMsgo6znW50tKieBoCWMAQAvD_BwE",
    icon: faLaptopFile,
    color: "#007bff",
  },
  {
    id: 3898,
    title: "Machine Learning",
    url: "https://in.mathworks.com/solutions/machine-learning.html?gclid=CjwKCAiA8Lu9BhA8EiwAag16b-tdUdeQ1xRS5Q9xYxyKa_JCvEWqBSQk0Z62ZNLw3yo3w_77h1wheBoCbSEQAvD_BwE&ef_id=CjwKCAiA8Lu9BhA8EiwAag16b-tdUdeQ1xRS5Q9xYxyKa_JCvEWqBSQk0Z62ZNLw3yo3w_77h1wheBoCbSEQAvD_BwE%3AG%3As&s_kwcid=AL!8664!3!604541475536!p!!g!!machine+learning&s_eid=psn_57384022552&q=machine+learning&gad_source=1",
    icon: faChalkboardUser,
    color: "#dc3545",
  },
  {
    id: 3897,
    title: "Competing in the Age of AI",
    url: "https://www.exed.hbs.edu/competing-age-ai?utm_source=google&utm_medium=paid-search&utm_campaign=non-brand-program-aiv-global-none-phrase-cross-device-all&utm_id=core&gad_source=1&gclid=CjwKCAiA8Lu9BhA8EiwAag16b-eXR6r8jsqpNhM3czNFfMrTIi5cK_hBuKwU7-dZhccJ2HwNvcmYhBoCWQsQAvD_BwE&gclsrc=aw.ds",
    icon: faRobot,
    color: "#28a745",
  },
];

const healthWellbeingResources = [
  {
    id: 3969,
    title: "Sex Education & Healthy Relationships",
    url: "https://globalgirlsglow.org/how-to-create-a-safe-space-to-teach-sexual-and-reproductive-health/?gclid=Cj0KCQiA8fW9BhC8ARIsACwHqYrMiBKdfVvtYtGA55O5aaT2ZS_2zE4PS225TZOS8k0iP8DNnZWBBYkaAnDfEALw_wcB&utm_source=google&utm_medium=cpc&utm_campaign=GF_Prospecting_PMAX",
    icon: faUserDoctor,
    color: "#007bff",
  },
  {
    id: 3968,
    title: "Healthy eating for adolescents",
    url: "https://www.nidirect.gov.uk/articles/healthy-eating-adolescents",
    icon: faPlus,
    color: "#dc3545",
  },
  {
    id: 3967,
    title: "Nutrition for Teenagers",
    url: "https://www.nutrition.org.uk/nutrition-for/teenagers/",
    icon: faPlus,
    color: "#28a745",
  },
  {
    id: 3965,
    title: "Take Charge of Your Health: A Guide for Teenagers",
    url: "https://www.niddk.nih.gov/health-information/weight-management/take-charge-health-guide-teenagers",
    icon: faNotesMedical,
    color: "#ffc107",
  },
  {
    id: 3964,
    title: "Mental Health",
    url: "https://www.pursuit-of-happiness.org/mental-health-and-wellbeing-toolkit-for-trainers/?gad_source=1&gclid=Cj0KCQiA8fW9BhC8ARIsACwHqYoCePqIjAf86mwkzpnndqwhwJ0JLgwRnmd_1Lq6qbC_3yqe9s2tseoaAnS1EALw_wcB",
    icon: faHeart,
    color: "#fd7e14",
  },
  {
    id: 3960,
    title: "Mental Health & Emotional Resilience",
    url: "Mental Health & Emotional Resilience", // NOTE: You may want to update this broken link
    icon: faBrain,
    color: "#6f42c1",
  },
  {
    id: 3959,
    title: "Advanced Fitness Online Classes",
    url: "https://outschool.com/online-classes/popular/advance-fitness?srsltid=AfmBOoo6Ce9z960xTLcbTnOeDcm3GFM4dlCFJ-dDaozMA9Es53yDTa3i",
    icon: faHeart,
    color: "#17a2b8",
  },
  {
    id: 3958,
    title: "Fitness for Both Students and Athletes",
    url: "https://advantagefitness.com/high-school-fitness-for-both-students-and-athletes/",
    icon: faDumbbell,
    color: "#e83e8c",
  },
];

const languageAndCommunication = [
  {
    id: 3924,
    title: "10 Ways that Participating in a MUN Can Help You in the Future",
    url: "https://www.mindler.com/blog/advantages-and-benefits-of-mun/",
    icon: faComments,
    color: "#007bff",
  },
  {
    id: 3923,
    title: "Practicing Debate",
    url: "https://foundation.thimun.org/wp-content/uploads/2023/08/Booklet-9-Practicing-Debate.pdf",
    icon: faComments,
    color: "#dc3545",
  },
  {
    id: 3922,
    title: "Model United Nations and Debate",
    url: "https://bestdelegate.com/model-united-nations-and-debate/",
    icon: faComments,
    color: "#28a745",
  },
  {
    id: 3921,
    title: "How Learning a Foreign Language Can Boost Your Career",
    url: "https://sunbeamworldschool.com/blog/how-learning-a-foreign-language-can-boost-your-career/",
    icon: faLanguage,
    color: "#ffc107",
  },
  {
    id: 3920,
    title:
      "15 Evergreen Careers for Language Enthusiasts: Skills, Courses, Exams & Career Scope",
    url: "https://www.mindler.com/blog/15-evergreen-careers-for-language-enthusiasts-skills-courses-exams-career-scope/",
    icon: faLanguage,
    color: "#fd7e14",
  },
  {
    id: 3919,
    title: "The 12 Most Important Languages To Learn For Success",
    url: "https://www.uopeople.edu/blog/most-important-languages-to-learn/",
    icon: faLanguage,
    color: "#6f42c1",
  },
  {
    id: 3918,
    title: "Presentation Skills - 16 Tips for Effective Presentations",
    url: "https://www.cbs.de/en/blog/15-effective-presentation-tips-to-improve-presentation-skills/",
    icon: faPersonChalkboard,
    color: "#17a2b8",
  },
  {
    id: 3917,
    title: "Public Speaking And Presentation Skills: All You Need To Know!",
    url: "https://kapable.club/blog/public-speaking/public-speaking-and-presentation-skills-all-you-need-to-know/",
    icon: faPersonChalkboard,
    color: "#e83e8c",
  },
  {
    id: 3916,
    title: "What Are Effective Presentation Skills",
    url: "https://www.coursera.org/in/articles/presentation-skills",
    icon: faPersonChalkboard,
    color: "#343a40",
  },
  {
    id: 3915,
    title: "High School Student Resume Examples & Writing Guide for 2025",
    url: "https://www.kickresume.com/en/help-center/high-school-student-resume-samples/",
    icon: faUserTie,
    color: "#20c997",
  },
  {
    id: 3914,
    title: "High School Student Resume Examples And Tips",
    url: "https://in.indeed.com/career-advice/resumes-cover-letters/high-school-student-resume-examples",
    icon: faUserTie,
    color: "#007bff",
  },
  {
    id: 3913,
    title: "6 High School Resume Examples and Templates for 2025",
    url: "https://www.resumebuilder.com/resume-examples/high-school-students/",
    icon: faUserTie,
    color: "#dc3545",
  },
];

const lifeSkillsAndPersonalDevelopment = [
  {
    id: 3963,
    title: "Goal Setting for Students: A Step-by-Step Guide",
    url: "https://www.oxfordscholastica.com/blog/goal-setting-for-students-a-step-by-step-guide/",
    icon: faBullseye,
    color: "#007bff",
  },
  {
    id: 3962,
    title: "Motivation and Goal Setting",
    url: "https://www.cuesta.edu/student/resources/ssc/study_guides/study_skills/502_study_goals.html",
    icon: faBullseye,
    color: "#dc3545",
  },
  {
    id: 3961,
    title: "Decision Making and Goal Setting",
    url: "https://careers.umbc.edu/students/discover/goals/",
    icon: faBullseye,
    color: "#28a745",
  },
  {
    id: 3957,
    title:
      "The Empowering Effect Of Personal Finance Education On High School Students",
    url: "https://futureeducationmagazine.com/impact-of-personal-finance-education/",
    icon: faCoins,
    color: "#ffc107",
  },
  {
    id: 3954,
    title: "School of Finance: 7 Essential Tips for High School Students",
    url: "https://www.penncommunitybank.com/blog/school-of-finance-7-essential-tips-for-high-school-students/",
    icon: faCoins,
    color: "#fd7e14",
  },
  {
    id: 3952,
    title: "Guide to Personal Finance for High School Students",
    url: "https://www.aralia.com/helpful-information/personal-finance-high-school/",
    icon: faCoins,
    color: "#6f42c1",
  },
  {
    id: 3946,
    title: "Time Management: 15 Tips for Middle and High School Students",
    url: "https://kdcollegeprep.com/time-management-15-tips-for-middle-and-high-school-students/",
    icon: faClock,
    color: "#17a2b8",
  },
  {
    id: 3944,
    title: "How to Improve Time Management for Students and Reduce Stress",
    url: "https://setmycareer.com/blog/how-to-improve-time-management-for-students.php",
    icon: faClock,
    color: "#e83e8c",
  },
  {
    id: 3943,
    title: "Complete Guide to Stress and Time Management for Students",
    url: "https://www.uwslondon.ac.uk/complete-guide-to-stress-management-and-time-management-for-students/",
    icon: faClock,
    color: "#343a40",
  },
  {
    id: 3927,
    title: "Nature of teamwork and different types of Leadership styles",
    url: "https://learn.saylor.org/mod/page/view.php?id=51222",
    icon: faPeopleGroup,
    color: "#20c997",
  },
  {
    id: 3926,
    title: "Teamwork and Leadership",
    url: "https://ecampusontario.pressbooks.pub/commbusprofcdn/chapter/teamwork-and-leadership/",
    icon: faPeopleGroup,
    color: "#007bff",
  },
  {
    id: 3925,
    title: "Leadership and teamwork: 10 ways leaders can help their teams",
    url: "https://www.teamwork.com/blog/10-ways-leaders-teams/",
    icon: faPeopleGroup,
    color: "#dc3545",
  },
];

const environmentAndSocialResponsibility = [
  {
    id: 3979,
    title: "Volunteers Stakeholder Group",
    url: "https://sustainabledevelopment.un.org/index.php?page=view&type=30022&nr=2914&menu=3170",
    icon: faHandshakeAngle,
    color: "#007bff",
  },
  {
    id: 3978,
    title: "Sustainable Development Goals",
    url: "https://www.unv.org/volunteerism-and-global-goals",
    icon: faHandshakeAngle,
    color: "#dc3545",
  },
  {
    id: 3977,
    title: "How can I volunteer for the SDGs",
    url: "https://sdgzone.com/action/how-can-i-volunteer/",
    icon: faHandshakeAngle,
    color: "#28a745",
  },
  {
    id: 3976,
    title:
      "Action Against Hunger: Advancing India’s Sustainable Development Goals",
    url: "https://actionagainsthunger.in/action-against-hunger-advancing-indias-sustainable-development-goals",
    icon: faPlateWheat,
    color: "#ffc107",
  },
  {
    id: 3975,
    title: "Entrepreneurship Competitions for High School Students",
    url: "https://www.polygence.org/blog/entrepreneurship-competitions-for-high-school-students",
    icon: faUsers,
    color: "#fd7e14",
  },
  {
    id: 3974,
    title: "Social Innovation | Social Entrepreneurship",
    url: "https://impactgarden.org/social-innovation/",
    icon: faLightbulb,
    color: "#6f42c1",
  },
  {
    id: 3973,
    title: "Entrepreneurship & Social Innovation",
    url: "https://www.alfanar.org/intro-to-socent",
    icon: faUser,
    color: "#17a2b8",
  },
  {
    id: 3972,
    title: "National Centre for Good Governance",
    url: "https://ncgg.org.in/training/",
    icon: faGavel,
    color: "#e83e8c",
  },
  {
    id: 3971,
    title: "Policy and governance in education: Shaping effective leadership",
    url: "https://educationonline.ku.edu/community/policy-and-governance-in-education",
    icon: faGavel,
    color: "#343a40",
  },
  {
    id: 3970,
    title: "Policy & Governance Awareness",
    url: "https://www.isdm.org.in/governance",
    icon: faSeedling,
    color: "#20c997",
  },
];

const careerAwarenessAndFutureReadiness = [
  {
    id: 4001,
    title: "College Admissions: Your Step-by-Step Guide",
    url: "https://www.listening.com/blog/college-admissions/",
    icon: faBuildingColumns,
    color: "#007bff",
  },
  {
    id: 3999,
    title: "National Scholarships",
    url: "https://www.education.gov.in/scholarships-education-loan-0",
    icon: faGraduationCap,
    color: "#dc3545",
  },
  {
    id: 3998,
    title: "Comprehensive Scholarship Guide",
    url: "https://study.com/resources/college-scholarships-guide",
    icon: faGraduationCap,
    color: "#28a745",
  },
  {
    id: 3997,
    title: "Workplace Etiquette: 21 Dos and Don’ts of the Workplace",
    url: "https://graduate.northeastern.edu/knowledge-hub/workplace-etiquette/",
    icon: faPenRuler,
    color: "#ffc107",
  },
  {
    id: 3996,
    title: "Soft skills 101: definition + 50 examples",
    url: "https://joinhandshake.com/blog/students/soft-skills-examples/",
    icon: faPen,
    color: "#fd7e14",
  },
  {
    id: 3995,
    title: "Soft Skills & Workplace Etiquette",
    url: "https://www.europeanfinancialreview.com/soft-skills-and-effective-corporate-etiquette/",
    icon: faBook,
    color: "#6f42c1",
  },
  {
    id: 3994,
    title: "Mentor-Intern Program",
    url: "https://www.globalcitizenshipfoundation.org/internships",
    icon: faLinesLeaning,
    color: "#17a2b8",
  },
  {
    id: 3993,
    title: "Intern Mentoring Program: Building a Better Future Together",
    url: "https://www.qooper.io/blog/intern-mentoring-program-building-a-better-future-together",
    icon: faLinesLeaning,
    color: "#e83e8c",
  },
  {
    id: 3992,
    title: "Internship & Mentorship Programs",
    url: "https://ic3institute.org/volunteering/",
    icon: faLinesLeaning,
    color: "#343a40",
  },
  {
    id: 3991,
    title: "STEM Education in High Schools: College and Career Preparation",
    url: "https://www.vikasconcept.com/stem-education-in-high-schools-college-and-career-preparation/",
    icon: faSchool,
    color: "#20c997",
  },
  {
    id: 3990,
    title: "Career Exploration (STEM, Arts, Entrepreneurship)",
    url: "https://blog.definedlearning.com/blog/early-stem-career-exploration",
    icon: faArtstation,
    color: "#007bff",
  },
];

const HighSchoolCreativeArts = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* HEADER PART */}
      <h1 className="text-3xl font-bold text-center my-6">High School</h1>
      {/* <div className="text-right mb-6">
        <a
          href="/bookmark/index"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View Bookmarks
        </a>
      </div> */}

      {/* CREATIVITY AND PERFORMING ARTS */}
      <h2 className="text-2xl font-semibold my-6">
        Creativity & Performing Arts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {creativeResources.map((resource) => (
          <ResourceCard
            key={resource.id}
            id={resource.id}
            icon={resource.icon}
            iconColor={resource.color}
            title={resource.title}
            link={resource.url}
          />
        ))}
      </div>

      {/* ACADEMIC LEARNING */}
      <h2 className="text-3xl font-semibold my-6">Academic Learning</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {academicLearningResources.map((resource) => (
          <ResourceCard
            key={resource.id}
            id={resource.id}
            icon={resource.icon}
            iconColor={resource.color}
            title={resource.title}
            link={resource.url}
          />
        ))}
      </div>

      {/* FUN EDUTAINMENT */}
      <h2 className="text-3xl font-semibold my-6">Fun Edutainment</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {funEdutainmentResources.map((resource) => (
          <ResourceCard
            key={resource.id}
            id={resource.id}
            icon={resource.icon}
            iconColor={resource.color}
            title={resource.title}
            link={resource.url}
          />
        ))}
      </div>

      {/* DIGITAL LITERACY AND TECH SKILLS */}
      <h2 className="text-3xl font-semibold my-6">
        Digital Literacy & Tech Skills
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {digitalLiteracyResources.map((resource) => (
          <ResourceCard
            key={resource.id}
            id={resource.id}
            icon={resource.icon}
            iconColor={resource.color}
            title={resource.title}
            link={resource.url}
          />
        ))}
      </div>

      {/* HEALTH AND WELL BEING */}
      <h2 className="text-3xl font-semibold my-6">Health & Well-being</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {healthWellbeingResources.map((resource) => (
          <ResourceCard
            key={resource.id}
            id={resource.id}
            icon={resource.icon}
            iconColor={resource.color}
            title={resource.title}
            link={resource.url}
          />
        ))}
      </div>

      {/* LANGUAGE AND COMMUNICATION */}
      <h2 className="text-3xl font-semibold my-6">Language & Communication</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {languageAndCommunication.map((resource) => (
          <ResourceCard
            key={resource.id}
            id={resource.id}
            icon={resource.icon}
            iconColor={resource.color}
            title={resource.title}
            link={resource.url}
          />
        ))}
      </div>

      {/* LIFE SKILLS AND PERSONAL DEVELOPMENT */}
      <h2 className="text-3xl font-semibold my-6">
        Life Skills & Personal Development
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {lifeSkillsAndPersonalDevelopment.map((resource) => (
          <ResourceCard
            key={resource.id}
            id={resource.id}
            icon={resource.icon}
            iconColor={resource.color}
            title={resource.title}
            link={resource.url}
          />
        ))}
      </div>

      {/* ENVIRONMENT AND SOCIAL RESPONSIBILITY */}
      <h2 className="text-3xl font-semibold my-6">
        Environment & Social Responsibility
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {environmentAndSocialResponsibility.map((resource) => (
          <ResourceCard
            key={resource.id}
            id={resource.id}
            icon={resource.icon}
            iconColor={resource.color}
            title={resource.title}
            link={resource.url}
          />
        ))}
      </div>

      {/* ENVIRONMENT AND SOCIAL RESPONSIBILITY */}
      <h2 className="text-3xl font-semibold my-6">
        Career Awareness & Future Readiness
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {careerAwarenessAndFutureReadiness.map((resource) => (
          <ResourceCard
            key={resource.id}
            id={resource.id}
            icon={resource.icon}
            iconColor={resource.color}
            title={resource.title}
            link={resource.url}
          />
        ))}
      </div>
    </div>
  );
};

function ResourceCard({ id, icon, iconColor, title, link }) {
  return (
    <div className="bg-white rounded-lg  shadow-md p-6 flex flex-col items-center text-center">
      <FontAwesomeIcon
        icon={icon}
        className={`text-[${iconColor}] text-5xl`}
        fixedWidth
      />
      <h5 className="text-lg font-medium mt-4">{title}</h5>
      <div className="mt-6 flex gap-4">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
        >
          View
        </a>
        <button className="bg-green-500 text-white cursor-not-allowed border-green-500 py-2 px-4 rounded">
          Bookmark
        </button>
      </div>
    </div>
  );
}

export default HighSchoolCreativeArts;
