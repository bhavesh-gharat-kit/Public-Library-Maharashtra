"use client"

import { faFirstdraft, faPagelines, faSpaceAwesome } from '@fortawesome/free-brands-svg-icons';
import { faAddressBook, faAtom, faBaseballBatBall, faBook, faBookAtlas, faBookBookmark, faBookOpen, faBookOpenReader, faBookTanakh, faBowlFood, faBraille, faBrain, faBuildingColumns, faCameraRetro, faCarrot, faClapperboard, faCloudShowersHeavy, faCompassDrafting, faDemocrat, faDrum, faEarthAmericas, faEarthAsia, faEye, faFileVideo, faFilm, faFlask, faFlaskVial, faFootball, faGlobe, faGuitar, faHandsBubbles, faHandSparkles, faHeadset, faHorseHead, faHourglass, faIcons, faLandmarkDome, faLanguage, faMasksTheater, faMicrophone, faMoon, faMusic, faNewspaper, faPen, faPenToSquare, faPersonChalkboard, faPersonRunning, faRadio, faRecordVinyl, faSackDollar, faSchool, faSchoolFlag, faTableTennisPaddleBall, faUserGraduate, faUserNinja, faUserNurse, faUtensils, faVials, faVolleyball } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'


const lifeSkillsAndPersonalDevelopmentResources = [
  {
    id: 3910,
    title: "Financial Literacy Booklet",
    link: "https://www.jmcschoolgn.edu.in/images/pdf/Financial-Literacy_Handbook.pdf",
    color: "#007bff",
    icon: faSackDollar
  },
  {
    id: 3907,
    title: "Financial Education",
    link: "https://ncfe.org.in/wp-content/uploads/2023/12/Class_6th.pdf",
    color: "#dc3545",
    icon: faSackDollar
  },
  {
    id: 3904,
    title: "Financial Literacy",
    link: "https://cbseacademic.nic.in/web_material/Curriculum22/publication/middle/financial_Literacy_classVIII.pdf",
    color: "#28a745",
    icon: faSackDollar
  },
  {
    id: 3900,
    title: "Meditation and Emotional Intelligence: An Exploration",
    link: "https://lifecoachtraining.co/meditation-and-emotional-intelligence-an-exploration/",
    color: "#ffc107",
    icon: faBookOpenReader
  },
  {
    id: 3894,
    title: "6 simple ways to boost your Emotional Intelligence skills",
    link: "https://www.artofliving.org/in-en/lifestyle/well-being/emotional-intelligence",
    color: "#fd7e14",
    icon: faBookOpenReader
  },
  {
    id: 3892,
    title: "9 Effective Ways for Building Emotional Intelligence in Children",
    link: "https://www.narayanaschools.in/blog/9-effective-ways-for-building-emotional-intelligence-in-children/",
    color: "#6f42c1",
    icon: faBookOpenReader
  },
  {
    id: 3891,
    title: "Time Management Skills and Techniques for Students",
    link: "https://www.simplilearn.com/tutorials/time-management-tutorial/best-time-management-tips-for-students",
    color: "#17a2b8",
    icon: faHourglass
  },
  {
    id: 3890,
    title: "Six Steps to Smarter Studying",
    link: "https://kidshealth.org/en/kids/studying.html",
    color: "#e83e8c",
    icon: faHourglass
  },
  {
    id: 3889,
    title: "11 Good Study Habits to Develop",
    link: "https://www.coursera.org/articles/study-habits",
    color: "#343a40",
    icon: faHourglass
  },
  {
    id: 3888,
    title: "Mental Ability Test Questions with Answers",
    link: "https://www.indiafolks.com/mat/mental-ability-test-questions-with-answers-for-class-6/",
    color: "#20c997",
    icon: faBookOpen
  },
  {
    id: 3887,
    title: "Critical Thinking and Problem Solving",
    link: "https://www.utc.edu/academic-affairs/walker-center-for-teaching-and-learning/teaching-resources/pedagogical-strategies-and-techniques/ct-ps",
    color: "#007bff",
    icon: faBookOpen
  },
  {
    id: 3885,
    title: "6 Main Types of Critical Thinking Skills (With Examples)",
    link: "https://www.indeed.com/career-advice/career-development/critical-thinking-examples",
    color: "#dc3545",
    icon: faBookOpen
  }
];

const healthAndWellBeingResources = [
  {
    id: 3834,
    title: "Puberty and Personal Hygiene Lessons",
    link: "https://salemk12.org/district-departments/student-and-family-supports/health-and-wellness/puberty-and-personal-hygiene-lessons/",
    color: "#007bff",
    icon: faHandSparkles
  },
  {
    id: 3832,
    title: "Puberty & Personal Hygiene Education",
    link: "https://www.twinkl.co.in/homework-help/science-homework-help/personal-hygiene/why-is-personal-hygiene-important-during-puberty#:~:text=Both%20boys'%20and%20girls'%20bodies,underarms%20and%20between%20the%20legs.",
    color: "#dc3545",
    icon: faHandsBubbles
  },
  {
    id: 3828,
    title: "7 Nutrition Lesson Plans and Activities",
    link: "https://www.hmhco.com/blog/nutrition-lesson-plans-activities-for-high-school-students?srsltid=AfmBOophAI65PaETMQ5okY1-V4OhUt8ABCmPhN8fxNvV_eDD2loL1zJY",
    color: "#28a745",
    icon: faCarrot
  },
  {
    id: 3826,
    title: "Healthy Eating Week",
    link: "https://www.nutrition.org.uk/healthy-eating-week/secondary/",
    color: "#ffc107",
    icon: faUtensils
  },
  {
    id: 3825,
    title: "Nutrition & Healthy Eating",
    link: "https://www.hopkinsmedicine.org/health/wellness-and-prevention/healthy-eating-during-adolescence",
    color: "#fd7e14",
    icon: faBowlFood
  },
  {
    id: 3823,
    title: "Top 10 Stress Management Techniques",
    link: "https://www.verywellmind.com/top-school-stress-relievers-for-students-3145179",
    color: "#6f42c1",
    icon: faBrain
  },
  {
    id: 3822,
    title: "The impact of stress",
    link: "https://www.tandfonline.com/doi/full/10.1080/02673843.2019.1596823",
    color: "#17a2b8",
    icon: faBrain
  },
  {
    id: 3821,
    title: "Stress Management & Mental Health",
    link: "https://theeducationhub.org.nz/understanding-mental-health-and-wellbeing-in-upper-secondary-school-students/",
    color: "#e83e8c",
    icon: faUserNurse
  },
  {
    id: 3820,
    title: "Sports And Physical Activity",
    link: "https://dalberg.com/wp-content/uploads/2024/09/SoSaPA_report_PRINT_2-Sept.pdf",
    color: "#343a40",
    icon: faPersonRunning
  },
  {
    id: 3819,
    title: "Importance of Physical Education in Secondary School Curriculum",
    link: "https://globalindianschool.org/noida/blog-details/importance-of-physical-education-in-secondary-school-curriculum",
    color: "#20c997",
    icon: faVolleyball
  },
  {
    id: 3817,
    title: "Sports and Physical Education",
    link: "https://samagra.education.gov.in/sports.html",
    color: "#007bff",
    icon: faBaseballBatBall
  },
  {
    id: 3814,
    title: "Sports & Physical Fitness",
    link: "https://nsdcindia.org/nos-listing/40",
    color: "#dc3545",
    icon: faTableTennisPaddleBall
  }
];

const creativityAndArtsResources = [
  {
    id: 3841,
    title: "Easy and Fun Paper Craft Ideas for All Ages",
    link: "https://papercraftworld.com/a/blog/paper-craft-ideas?srsltid=AfmBOorEE9-zwlAp5bA--N4Iz_gWsfrdd5k7CXYRq1tEPSFh3jZQVKd4",
    color: "#007bff",
    icon: faDemocrat
  },
  {
    id: 3837,
    title: "Paper Craft & Origami",
    link: "https://www.creativecenter.brother/en-gb/home/home-category/paper-crafts-origami",
    color: "#dc3545",
    icon: faFirstdraft
  },
  {
    id: 3835,
    title: "DIY Craft & Origami",
    link: "https://www.instructables.com/Origami-For-Everyone/",
    color: "#28a745",
    icon: faCompassDrafting
  },
  {
    id: 3833,
    title: "Why students should learn to play a musical instrument",
    link: "https://institute.thememusic.in/why-students-should-learn-to-play-a-musical-instrument/",
    color: "#ffc107",
    icon: faRadio
  },
  {
    id: 3831,
    title: "musical instruments you can easily learn & play",
    link: "https://medium.com/giglue/top-20-musical-instruments-you-can-easily-play-693f603a2bcf",
    color: "#fd7e14",
    icon: faIcons
  },
  {
    id: 3830,
    title: "Easiest Instruments to Learn at Any Age",
    link: "https://www.savethemusic.org/blog/easy-instruments-to-learn/",
    color: "#6f42c1",
    icon: faDrum
  },
  {
    id: 3829,
    title: "Instrument Courses",
    link: "https://www.shankarmahadevanacademy.com/instruments/",
    color: "#17a2b8",
    icon: faGuitar
  },
  {
    id: 3827,
    title: "Music & Instrument Learning",
    link: "https://meritmusic.org/best-musical-instruments-beginners/",
    color: "#e83e8c",
    icon: faMusic
  },
  {
    id: 3824,
    title: "Theatre Tales: Drama and Performing Arts in School Curriculum",
    link: "https://www.ssvmws.com/blog/theatre-tales-drama-and-performing-arts-in-school-curriculum/",
    color: "#343a40",
    icon: faFilm
  },
  {
    id: 3818,
    title: "Theatre Educations",
    link: "https://theatreprofessionals.co.in/education/",
    color: "#20c997",
    icon: faClapperboard
  },
  {
    id: 3816,
    title: "Drama and Theatre",
    link: "https://www.canadianinternationalschool.com/learning/k-12-programs/drama",
    color: "#007bff",
    icon: faMasksTheater
  },
  {
    id: 3815,
    title: "Course In Photography & Videography",
    link: "https://ftpinstitute.com/master-diploma-in-photography-and-cinematography/",
    color: "#dc3545",
    icon: faCameraRetro
  },
  {
    id: 3813,
    title: "Basics of Videography",
    link: "https://alphacommunity.in/the-alpha-classroom/course/4/basics-of-videography/?lesson_id=25&lesson_slug=white-balance",
    color: "#28a745",
    icon: faFileVideo
  },
  {
    id: 3812,
    title: "Photography & Videography Basics",
    link: "https://teemusphoto.com/tutorials/a-photographers-guide-into-entry-level-videography/",
    color: "#ffc107",
    icon: faRecordVinyl
  }
];

const funAndEdutainmentResources = [
  {
    id: 3860,
    title: "View Space",
    link: "https://viewspace.org/",
    color: "#007bff",
    icon: faEye
  },
  {
    id: 3858,
    title: "Space Exploration",
    link: "https://spacerenaissance.space/?gad_source=1&gclid=CjwKCAiA8Lu9BhA8EiwAag16b5wGkfzYUVpWQpUn5LYSrnXDucaLetNK7ZsErlRTHMSQoAKqBnSR9hoCrGMQAvD_BwE",
    color: "#dc3545",
    icon: faSpaceAwesome
  },
  {
    id: 3856,
    title: "Astronomy, Space Science",
    link: "https://space-india.com/astronomy-and-space-education-programs/",
    color: "#28a745",
    icon: faMoon
  },
  {
    id: 3854,
    title: "Articles About Space and Astronomy",
    link: "https://www.sciencejournalforkids.org/articles/lesson-ideas/space-astronomy/",
    color: "#ffc107",
    icon: faNewspaper
  },
  {
    id: 3852,
    title: "Folklore, Myths & Legends | Characteristics & Examples",
    link: "https://study.com/learn/lesson/folklore-mythology-examples.html",
    color: "#fd7e14",
    icon: faHorseHead
  },
  {
    id: 3851,
    title: "Brain Teaser Questions and Answers",
    link: "https://logiclike.com/en/brain-teaser-questions",
    color: "#6f42c1",
    icon: faBrain
  },
  {
    id: 3850,
    title: "Brain Teaser Questions and Answers",
    link: "https://logiclike.com/en/brain-teaser-questions",
    color: "#17a2b8",
    icon: faBrain
  },
  {
    id: 3849,
    title: "Brain Teaser Quiz",
    link: "Brain Teaser Quiz",
    color: "#e83e8c",
    icon: faBrain // This should ideally be faPersonCircleQuestion, but it was malformed in the source HTML
  },
  {
    id: 3848,
    title: "Brain Teasers",
    link: "https://www.buzzfeed.com/in/tag/brain-teasers",
    color: "#343a40",
    icon: faBraille
  },
  {
    id: 3847,
    title: "Quizzes & Brain Teasers",
    link: "https://www.allprodad.com/brain-teaser-questions-and-answers/",
    color: "#20c997",
    icon: faBrain
  },
  {
    id: 3846,
    title: "Easy Science Experiments For Young Scientists",
    link: "https://www.21kschool.com/in/blog/science-experiments-for-young-scientists/",
    color: "#007bff",
    icon: faVials
  },
  {
    id: 3845,
    title: "Easy Science Experiments Using Materials You Already Have On Hand",
    link: "https://www.weareteachers.com/easy-science-experiments/",
    color: "#dc3545",
    icon: faFlask
  },
  {
    id: 3844,
    title: "Science Experiments",
    link: "https://www.fizzicseducation.com.au/category/150-science-experiments/?srsltid=AfmBOoqXJw6OaiBziPdZj9soL2DQEa3O1B-jVp4S7WbQPkWCb8IDwLuU",
    color: "#28a745",
    icon: faFlaskVial
  },
  {
    id: 3843,
    title: "Science Experiments at Home",
    link: "https://interactives.ck12.org/simulations/physics.html?utm_source=google&utm_medium=cpc&utm_campaign=Simulations&utm_campaign=9020606872&utm_medium=cpc&utm_source=google&utm_term=science%20simulations&gad_source=1&gclid=CjwKCAiA8Lu9BhA8EiwAag16b6XpRlZFRjzUSZCf8w70aAueCqZk79vCLpJM07WbwtY9NOsw6bFpLRoC_pUQAvD_BwE",
    color: "#ffc107",
    icon: faAtom
  }
];

const academicLearningResources = [
  {
    id: 3810,
    title: "Interactive History",
    link: "https://www.historytuition.com/",
    color: "#007bff",
    icon: faBuildingColumns
  },
  {
    id: 3808,
    title: "Interactive Geography & History",
    link: "https://www.nam.ac.uk/schools/learning-resources/india-empire-and-army-interactive-timeline",
    color: "#dc3545",
    icon: faLandmarkDome
  },
  {
    id: 3803,
    title: "Interactive Maps of India",
    link: "https://www.mapsofindia.com/maps/",
    color: "#28a745",
    icon: faBookAtlas
  },
  {
    id: 3787,
    title: "NTSE Preparation Online",
    link: "https://www.ntseguru.in/",
    color: "#ffc107",
    icon: faBaseballBatBall
  },
  {
    id: 3786,
    title: "Olympiad Exam Preparation",
    link: "https://olympiadhelper.com/?srsltid=AfmBOoo8WM2QN0XBl3v4DPt727VB4krTeqQnuVocFP4Dw39ETF6_Mm4a",
    color: "#fd7e14",
    icon: faFootball
  },
  {
    id: 3785,
    title: "Olympiads & NTSE Prep",
    link: "https://www.tcyonline.com/tests/ntse-olympiad",
    color: "#6f42c1",
    icon: faVolleyball
  },
  {
    id: 3783,
    title: "Science & Math Simulations",
    link: "https://phet.colorado.edu/",
    color: "#17a2b8",
    icon: faFlask
  },
  {
    id: 3780,
    title: "Indian State Education Board Textbook",
    link: "https://kadirkhan.com/indian-state-education-board-textbook-pdf/",
    color: "#e83e8c",
    icon: faBook
  },
  {
    id: 3776,
    title: "State Board Books",
    link: "https://www.selfstudys.com/page/state-board-books",
    color: "#343a40",
    icon: faBookOpen
  },
  {
    id: 3773,
    title: "NCERT Books Free PDF",
    link: "https://www.vedantu.com/ncert-books",
    color: "#20c997",
    icon: faBookOpenReader
  },
  {
    id: 3770,
    title: "NCERT",
    link: "https://ncert.nic.in/textbook.php",
    color: "#007bff",
    icon: faSchool
  },
  {
    id: 3767,
    title: "Subject-wise Learning",
    link: "https://ncert.nic.in/textbook.php?fesc1=0-16",
    color: "#dc3545",
    icon: faSchool
  },
  {
    id: 3765,
    title: "Subject-wise Learning",
    link: "https://www.vedantu.com/study-material/cbse-study-material",
    color: "#28a745",
    icon: faBuildingColumns
  },
  {
    id: 3758,
    title: "Subject-wise Learning",
    link: "https://byjus.com/cbse/cbse-books/",
    color: "#ffc107",
    icon: faSchool
  }
];

const languageCommunicationResources = [
  {
    id: 3811,
    title: "Three Language Formula",
    link: "https://www.iitms.co.in/blog/three-language-formula-in-nep-2020.html",
    color: "#007bff",
    icon: faEarthAsia
  },
  {
    id: 3809,
    title: "Foreign language learning statistics",
    link: "https://ec.europa.eu/eurostat/statistics-explained/index.php?title=Foreign_language_learning_statistics",
    color: "#dc3545",
    icon: faEarthAmericas
  },
  {
    id: 3807,
    title: "Education in Regional Languages",
    link: "https://collegedunia.com/news/many-parents-in-favour-of-education-in-regional-languages-chinese-dropped-from-list-of-foreign-languages-to-be-taught-at-secondary-level-alertid-24711",
    color: "#28a745",
    icon: faGlobe
  },
  {
    id: 3806,
    title: "Regional & Foreign Language Learning",
    link: "https://www.educationtimes.com/article/school-guide/99735216/effective-strategies-to-have-classroom-instructions-in-regional-languages",
    color: "#ffc107",
    icon: faLanguage
  },
  {
    id: 3805,
    title: "Speaking workshop",
    link: "https://indianschoolsdebatingsociety.com/",
    color: "#fd7e14",
    icon: faUserNinja
  },
  {
    id: 3801,
    title: "Speech and Debate Program",
    link: "https://westminsteru.edu/student-life/speech-and-debate-program.html",
    color: "#6f42c1",
    icon: faMicrophone
  },
  {
    id: 3799,
    title: "Speech & Debate Clubs",
    link: "https://www.speechdebate.in/?gad_source=1&gclid=CjwKCAiA8Lu9BhA8EiwAag16bx6fcWDr6v-jvMjRfZsltFCo5AhZKLMW4F14NOYmPcNJz3uXXJy0ohoCXJsQAvD_BwE",
    color: "#17a2b8",
    icon: faHeadset
  },
  {
    id: 3798,
    title: "Book Reviews",
    link: "https://writingcenter.unc.edu/tips-and-tools/book-reviews/",
    color: "#e83e8c",
    icon: faAddressBook
  },
  {
    id: 3797,
    title: "Book Reviews & Literary Discussions",
    link: "https://independentbookreview.com/2023/01/16/how-to-write-a-great-book-review/",
    color: "#343a40",
    icon: faAddressBook
  },
  {
    id: 3784,
    title: "Tips To Improve Your Writing Skills",
    link: "https://in.indeed.com/career-advice/career-development/writing-skills",
    color: "#20c997",
    icon: faPenToSquare
  },
  {
    id: 3782,
    title: "writing-skills",
    link: "https://www.skillsyouneed.com/writing-skills.html",
    color: "#007bff",
    icon: faPen
  },
  {
    id: 3781,
    title: "Essential Grammar Rules",
    link: "https://prepmaven.com/blog/preparing/essential-grammar-rules/",
    color: "#dc3545",
    icon: faBookOpen
  },
  {
    id: 3777,
    title: "English Grammar",
    link: "https://www.nationalbookstore.com/books/633-strengthen-english-grammar-for-secondary-.html?srsltid=AfmBOor3E_LZqb_7JjMaqYr1HVLnFlEgdNHHPacpKSIKoMjIT3OyPoee",
    color: "#28a745",
    icon: faBookTanakh
  },
  {
    id: 3774,
    title: "B1-B2 grammar",
    link: "https://learnenglish.britishcouncil.org/grammar/b1-b2-grammar",
    color: "#ffc107",
    icon: faBookBookmark
  },
  {
    id: 3769,
    title: "English Grammar & Writing Skills",
    link: "https://globalindianschool.org/ahmedabad/blog-details/tips-to-improve-writing-skills-for-secondary-school-students/",
    color: "#fd7e14",
    icon: faPenToSquare
  }
];


const environmentSocialResources = [
  {
    id: 3870,
    title: "Community Service: Top 10 Reasons to Volunteer",
    link: "https://getinvolved.ucsd.edu/service/resources/reasons.html",
    color: "#007bff",
    icon: faBookOpen
  },
  {
    id: 3869,
    title: "Volunteerism and Community Service",
    link: "http://khwaahish.in/volunteerism-and-community-service/",
    color: "#dc3545",
    icon: faBuildingColumns
  },
  {
    id: 3865,
    title: "Top 9 Volunteer Programs in India",
    link: "https://www.goabroad.com/articles/volunteer-abroad/top-volunteer-programs-india",
    color: "#28a745",
    icon: faSchoolFlag
  },
  {
    id: 3863,
    title: "Top 10 Volunteering Programs for High School Students",
    link: "https://enablingleadership.org/top-10-volunteering-programs-for-high-school-students/",
    color: "#ffc107",
    icon: faBuildingColumns
  },
  {
    id: 3862,
    title: "Community Service & Volunteering",
    link: "https://volunteeringwithindia.org/#:~:text=VWI%20offers%20affordable%20volunteering%20in,in%20the%20local%20indian%20culture.",
    color: "#fd7e14",
    icon: faBookOpenReader
  },
  {
    id: 3859,
    title: "Fundamental Duties",
    link: "https://www.nextias.com/blog/fundamental-duties/#:~:text=These%20duties%20include%20respecting%20the,collective%20endeavors%2C%20and%20so%20on.",
    color: "#6f42c1",
    icon: faBookOpenReader
  },
  {
    id: 3857,
    title: "Civic Duties & Rights",
    link: "https://knowledgeum.in/blogs/fundamental-rights-and-duties",
    color: "#17a2b8",
    icon: faBookOpen
  },
  {
    id: 3855,
    title: "Fundamental rights and duties in the Indian constitution",
    link: "https://unacademy.com/content/karnataka-psc/study-material/polity/fundamental-rights-and-duties-in-the-indian-constitution/",
    color: "#e83e8c",
    icon: faUserGraduate
  },
  {
    id: 3853,
    title: "Civic Duties & Rights",
    link: "https://knowledgeum.in/blogs/fundamental-rights-and-duties",
    color: "#343a40",
    icon: faSchool
  },
  {
    id: 3842,
    title: "Climate change and sustainability education",
    link: "https://journals.uclpress.co.uk/lre/article/pubid/LRE-20-48/",
    color: "#20c997",
    icon: faCloudShowersHeavy
  },
  {
    id: 3840,
    title: "Climate Change and Environmental Sustainability",
    link: "https://www.unicef.org/india/what-we-do/climate-change",
    color: "#007bff",
    icon: faPagelines
  },
  {
    id: 3839,
    title: "Climate Change Programme",
    link: "https://dst.gov.in/climate-change-programme",
    color: "#dc3545",
    icon: faSchool
  },
  {
    id: 3838,
    title: "Climate Change & Sustainability",
    link: "https://journals.uclpress.co.uk/lre/article/pubid/LRE-20-48/",
    color: "#28a745",
    icon: faPersonChalkboard
  }
];

function SecondaryPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">

      {/* HEADER PART */}
      <h1 className="text-3xl font-bold text-center my-6">Secondary</h1>
      <div className="text-right mb-6">
        <a
          href="/bookmark/index"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View Bookmarks
        </a>
      </div>


      {/* Life Skills & Personal Development */}
      <h2 className="text-2xl font-semibold my-6">Life Skills & Personal Development</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lifeSkillsAndPersonalDevelopmentResources.map((resource) => (
          <div
            key={resource.id}
            className="bg-white shadow-md rounded-lg p-6 text-center"
          >
            <FontAwesomeIcon
              icon={resource.icon}
              size="3x"
              style={{ color: resource.color }}
            />
            <h5 className="text-lg font-medium mt-4">{resource.title}</h5>
            <div className="flex justify-center gap-3 mt-4">
              <a
                href={resource.link}
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                View
              </a>
              <button
                
                className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
              >
                Bookmark
              </button>
            </div>
          </div>
        ))}
      </div>


      {/* Health & Well-being */}
      <h2 className="text-2xl font-semibold my-6">Health & Well-being</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {healthAndWellBeingResources.map((resource) => (
          <div
            key={resource.id}
            className="bg-white shadow-md rounded-lg p-6 text-center"
          >
            <FontAwesomeIcon
              icon={resource.icon}
              size="3x"
              style={{ color: resource.color }}
            />
            <h5 className="text-lg font-medium mt-4">{resource.title}</h5>
            <div className="flex justify-center gap-3 mt-4">
              <a
                href={resource.link}
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                View
              </a>
              <button
                
                className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
              >
                Bookmark
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Creativity & Performing Arts */}
      <h2 className="text-2xl font-semibold my-6">Creativity & Performing Arts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {creativityAndArtsResources.map((resource) => (
          <div
            key={resource.id}
            className="bg-white shadow-md rounded-lg p-6 text-center"
          >
            <FontAwesomeIcon
              icon={resource.icon}
              size="3x"
              style={{ color: resource.color }}
            />
            <h5 className="text-lg font-medium mt-4">{resource.title}</h5>
            <div className="flex justify-center gap-3 mt-4">
              <a
                href={resource.link}
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                View
              </a>
              <button
                
                className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
              >
                Bookmark
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Fun & Edutainment */}
      <h2 className="text-2xl font-semibold my-6">Fun & Edutainment</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {funAndEdutainmentResources.map((resource) => (
          <div
            key={resource.id}
            className="bg-white shadow-md rounded-lg p-6 text-center"
          >
            <FontAwesomeIcon
              icon={resource.icon}
              size="3x"
              style={{ color: resource.color }}
            />
            <h5 className="text-lg font-medium mt-4">{resource.title}</h5>
            <div className="flex justify-center gap-3 mt-4">
              <a
                href={resource.link}
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                View
              </a>
              <button
                
                className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
              >
                Bookmark
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Academic Learning */}
      <h2 className="text-2xl font-semibold my-6">Academic Learning</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {academicLearningResources.map((resource) => (
          <div
            key={resource.id}
            className="bg-white shadow-md rounded-lg p-6 text-center"
          >
            <FontAwesomeIcon
              icon={resource.icon}
              size="3x"
              style={{ color: resource.color }}
            />
            <h5 className="text-lg font-medium mt-4">{resource.title}</h5>
            <div className="flex justify-center gap-3 mt-4">
              <a
                href={resource.link}
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                View
              </a>
              <button
                
                className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
              >
                Bookmark
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Language & Communication */}
      <h2 className="text-2xl font-semibold my-6">Language & Communication</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {languageCommunicationResources.map((resource) => (
          <div
            key={resource.id}
            className="bg-white shadow-md rounded-lg p-6 text-center"
          >
            <FontAwesomeIcon
              icon={resource.icon}
              size="3x"
              style={{ color: resource.color }}
            />
            <h5 className="text-lg font-medium mt-4">{resource.title}</h5>
            <div className="flex justify-center gap-3 mt-4">
              <a
                href={resource.link}
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                View
              </a>
              <button
                
                className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
              >
                Bookmark
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Environment & Social Responsibility */}
      <h2 className="text-2xl font-semibold my-6">Environment & Social Responsibility</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {environmentSocialResources.map((resource) => (
          <div
            key={resource.id}
            className="bg-white shadow-md rounded-lg p-6 text-center"
          >
            <FontAwesomeIcon
              icon={resource.icon}
              size="3x"
              style={{ color: resource.color }}
            />
            <h5 className="text-lg font-medium mt-4">{resource.title}</h5>
            <div className="flex justify-center gap-3 mt-4">
              <a
                href={resource.link}
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                View
              </a>
              <button
                
                className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
              >
                Bookmark
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Digital Literacy & Tech Skills */}
      <h2 className="text-2xl font-semibold my-6">Digital Literacy & Tech Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {languageCommunicationResources.map((resource) => (
          <div
            key={resource.id}
            className="bg-white shadow-md rounded-lg p-6 text-center"
          >
            <FontAwesomeIcon
              icon={resource.icon}
              size="3x"
              style={{ color: resource.color }}
            />
            <h5 className="text-lg font-medium mt-4">{resource.title}</h5>
            <div className="flex justify-center gap-3 mt-4">
              <a
                href={resource.link}
                target="_blank"
                rel="noreferrer"
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                View
              </a>
              <button 
                className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
              >
                Bookmark
              </button>
            </div>
          </div>
        ))}
      </div>


    </div>
  )
}

export default SecondaryPage