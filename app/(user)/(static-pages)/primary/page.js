"use client"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

import {
    faStarOfLife,
    faBriefcaseMedical,
    faFaceSmile,
    faHeart,
    faHeadSideMask,
    faUtensils,
    faHandsBubbles,
    faBowlFood,
    faPersonWalking,
    faDumbbell,
     faEarthAmericas,
    faKiwiBird,
    faDove,
    faHorseHead,
    faPuzzlePiece,
    faChildDress,
    faChild,
    faChalkboardUser,
    faShieldCat,
    faCow,
    faChildReaching,
    faStore,
    faMasksTheater,
    faSchool,
    faBuildingColumns,
    faPaintbrush,
    faDroplet,
    faPalette,
    faMusic,
    faIcons,
    faGuitar,
    faDemocrat,
    faNewspaper,
    faLaptopFile,
    faGlobe,
    faComputer,
    faMicrophone,
    faPenToSquare,
    faPen,
    faBookOpenReader,
    faFileVideo,
    faVideo,
    faLinesLeaning,
    faBookOpen,
    faBookAtlas,
    faAppleWhole,
    faAtom,
    faMicroscope,
    faBook,
    faBookBible,
    faBookTanakh,
    faBookJournalWhills,
    faHandsHoldingChild,
    faRecycle,
    faCat,
    faOtter,
    faHippo,
    faHorse,
    faLeaf,
    faMountainCity,
    faMountainSun,
    faPlantWilt,
    faTree
} from "@fortawesome/free-solid-svg-icons";
import { faWindowRestore } from '@fortawesome/free-regular-svg-icons';

const healthAndWellbeingResources = [
     {
        id: 3717,
        title: "Basic First Aid Awareness",
        link: "Basic First Aid Awareness",
        color: "#007bff",
        icon: faStarOfLife
    },
    {
        id: 3716,
        title: "Basic First Aid Awareness",
        link: "https://kidsage.in/10-ways-to-teach-children-about-basic-first-aid/",
        color: "#dc3545",
        icon: faBriefcaseMedical
    },
    {
        id: 3715,
        title: "Emotional Well-being & Kindness",
        link: "https://ripplekindness.org/mindfulness-enhances-kindness-wellbeing-in-kids/",
        color: "#28a745",
        icon: faFaceSmile
    },
    {
        id: 3714,
        title: "Emotional Well-being & Kindness",
        link: "Emotional Well-being & Kindness",
        color: "#ffc107",
        icon: faHeart
    },
    {
        id: 3711,
        title: "Emotional Well-being & Kindness",
        link: "https://www.premier-education.com/news/5-ways-to-encourage-emotional-wellbeing-for-children/",
        color: "#fd7e14",
        icon: faHeadSideMask
    },
    {
        id: 3704,
        title: "Healthy Eating & Hygiene Habits",
        link: "https://health.clevelandclinic.org/healthy-eating-for-kids",
        color: "#6f42c1",
        icon: faUtensils
    },
    {
        id: 3701,
        title: "Healthy Eating & Hygiene Habits",
        link: "https://www.healthdirect.gov.au/personal-hygiene-for-children",
        color: "#17a2b8",
        icon: faHandsBubbles
    },
    {
        id: 3700,
        title: "Healthy Eating & Hygiene Habits",
        link: "https://kidshealth.org/en/parents/habits.html",
        color: "#e83e8c",
        icon: faBowlFood
    },
    {
        id: 3697,
        title: "Fun Exercises & Yoga for Kids",
        link: "https://www.arhantayoga.org/blog/yoga-poses-for-kids/",
        color: "#343a40",
        icon: faPersonWalking
    },
    {
        id: 3696,
        title: "Fun Exercises & Yoga for Kids",
        link: "https://www.kidsyogastories.com/kids-yoga-poses/",
        color: "#20c997",
        icon: faDumbbell
    },
    {
        id: 3695,
        title: "Fun Exercises & Yoga for Kids",
        link: "https://kumarahyoga.com/5-active-kids-yoga-games-to-have-fun-in-a-group/?srsltid=AfmBOorsfrwQBY9rW09ykz14udEUe5HsdT6nCb-zvRMdUa9z9Xg_65KN",
        color: "#007bff",
        icon: faPersonWalking
    }
]

const funAndEdutainmentResources = [
    {
        id: 3766,
        title: "Virtual Travel for Kids",
        link: "https://thehaphazardtraveler.com/virtual-travel-for-kids-field-trips-museums-zoos/",
        color: "#007bff",
        icon: faEarthAmericas
    },
    {
        id: 3764,
        title: "Virtual Field Trips to the Zoo",
        link: "https://www.kaixr.com/post/virtual-field-trips-zoo",
        color: "#dc3545",
        icon: faKiwiBird
    },
    {
        id: 3762,
        title: "Children’s Museums, Aquariums, and Zoos to Virtually Explore",
        link: "https://coast2coastwithkids.com/10-childrens-museums-aquariums-and-zoos-to-virtually-explore/",
        color: "#28a745",
        icon: faDove
    },
    {
        id: 3761,
        title: "Virtual Zoo & Museum Tours",
        link: "https://louisvilleeast.macaronikid.com/articles/5e750eb26c3c622e02538c7c/free-virtual-tours-animal-cams-and-virtual-field-trips",
        color: "#ffc107",
        icon: faHorseHead
    },
    {
        id: 3760,
        title: "Puzzle Games",
        link: "https://www.digipuzzle.net/education/winter/index.htm#google_vignette",
        color: "#fd7e14",
        icon: faPuzzlePiece
    },
    {
        id: 3756,
        title: "Riddles for Kids",
        link: "https://whosmarted.com/riddles-for-kids/",
        color: "#6f42c1",
        icon: faChildDress
    },
    {
        id: 3755,
        title: "Fun and Challenging Riddles for Kids",
        link: "https://www.pocoyo.com/play/riddles",
        color: "#17a2b8",
        icon: faChild
    },
    {
        id: 3754,
        title: "Fun What Am I Riddles for Kids",
        link: "https://www.splashlearn.com/blog/what-am-i-riddles-for-kids-with-answers/",
        color: "#e83e8c",
        icon: faChalkboardUser
    },
    {
        id: 3752,
        title: "Puzzle Games & Riddles",
        link: "https://www.prodigygame.com/main-en/blog/riddles-for-kids/",
        color: "#343a40",
        icon: faPuzzlePiece
    },
    {
        id: 3751,
        title: "Best Educational Cartoons That Make Learning Fun for Kids",
        link: "https://www.anideos.com/best-educational-cartoons",
        color: "#20c997",
        icon: faShieldCat
    },
    {
        id: 3750,
        title: "Educational Cartoons & Animated Shows",
        link: "https://www.splashlearn.com/blog/best-educational-cartoons-for-kids/",
        color: "#007bff",
        icon: faCow
    },
    {
        id: 3747,
        title: "Digital Storytelling Tools for Students",
        link: "https://khiredkids.com/digital-storytelling-tools-for-students/",
        color: "#dc3545",
        icon: faChildReaching
    },
    {
        id: 3746,
        title: "Best Digital Storytelling Sites and Apps",
        link: "https://www.teachthought.com/technology/digital-storytelling-apps-and-websites/",
        color: "#28a745",
        icon: faWindowRestore
    },
    {
        id: 3743,
        title: "Interactive Storytelling Apps",
        link: "https://www.commonsensemedia.org/lists/storytelling-apps",
        color: "#ffc107",
        icon: faStore
    }
];

const creativityAndPerformingArtsResources = [
    {
        id: 3745,
        title: "Free, fun drama games",
        link: "https://www.britishcouncil.in/blog/free-fun-drama-games-help-your-child-learn-english",
        color: "#007bff",
        icon: faMasksTheater
    },
    {
        id: 3744,
        title: "Drama Activities",
        link: "https://www.playfulhomeducation.com/post/how-to-do-drama-activities-with-kids-at-home-indian-themes-and-story-ideas",
        color: "#dc3545",
        icon: faSchool
    },
    {
        id: 3741,
        title: "Puppetry & Drama",
        link: "https://www.youtube.com/@SanMarcosPublicLibrary",
        color: "#28a745",
        icon: faBuildingColumns
    },
    {
        id: 3738,
        title: "Coloring Games",
        link: "https://www.crazygames.com/t/coloring",
        color: "#ffc107",
        icon: faPaintbrush
    },
    {
        id: 3736,
        title: "Online coloring pages for kids",
        link: "https://www.coloringpages-forkids.com/",
        color: "#fd7e14",
        icon: faDroplet
    },
    {
        id: 3734,
        title: "Drawing & Coloring Activities",
        link: "https://www.roomrecess.com/pages/ColoringPagesForKids.html",
        color: "#6f42c1",
        icon: faPalette
    },
    {
        id: 3730,
        title: "Dance for Kids India",
        link: "https://www.youtube.com/playlist?list=PLMAiskWkAi93cMONWWNcqKqcvk-e3JZdi",
        color: "#17a2b8",
        icon: faMusic
    },
    {
        id: 3725,
        title: "Music & Dance for Kids",
        link: "https://www.youtube.com/playlist?list=PLg5d1Q7lsu5EotIPJoe-Y0x7u32ivDMDi",
        color: "#e83e8c",
        icon: faIcons
    },
    {
        id: 3724,
        title: "Indian Children Songs",
        link: "https://open.spotify.com/playlist/3UJut4tjr8GD7dMZeP1Cs7",
        color: "#343a40",
        icon: faGuitar
    },
    {
        id: 3721,
        title: "Music & Dance for Kids",
        link: "https://www.splashlearn.com/blog/the-complete-playlist-of-dance-songs-for-kids-to-get-them-grooving/",
        color: "#20c997",
        icon: faChildReaching
    },
    {
        id: 3718,
        title: "Creativity & Performing Arts",
        link: "https://parents.highlights.com/31-arts-and-crafts-kids-to-make-home",
        color: "#007bff",
        icon: faDemocrat
    },
    {
        id: 3698,
        title: "Creativity & Performing Arts",
        link: "https://www.pinterest.com/kbkonnected/art-and-crafts-for-kids/",
        color: "#dc3545",
        icon: faNewspaper
    },
    {
        id: 3691,
        title: "Creativity & Performing Arts",
        link: "https://www.alldayprimary.com/arts-and-crafts",
        color: "#28a745",
        icon: faMasksTheater
    }
];

const digitalLiteracyResources = [
    {
        id: 3686,
        title: "Safe Online Behavior & Digital Etiquette",
        link: "https://www.kaspersky.com/resource-center/preemptive-safety/what-is-netiquette",
        color: "#007bff",
        icon: faBuildingColumns
    },
    {
        id: 3685,
        title: "Safe Online Behavior & Digital Etiquette",
        link: "https://www.talktoangel.com/blog/digital-etiquette#:~:text=Protect%20others'%20privacy%20and%20security.&text=Avoid%20sharing%20sensitive%20or%20confidential,protect%20your%20own%20digital%20identity.",
        color: "#dc3545",
        icon: faLaptopFile
    },
    {
        id: 3683,
        title: "Basic Coding (Block-based, Scratch)",
        link: "https://tinker.ly/scratch-programming-what-are-code-blocks/",
        color: "#28a745",
        icon: faSchool
    },
    {
        id: 3682,
        title: "Basic Coding (Block-based, Scratch)",
        link: "https://www.geeksforgeeks.org/basics-of-scratch-programming/",
        color: "#ffc107",
        icon: faSchool
    },
    {
        id: 3680,
        title: "Basic Coding (Block-based, Scratch)",
        link: "https://subjectguides.york.ac.uk/coding/scratch#:~:text=Scratch%20is%20a%20block%20based,or%20a%20sound%20to%20play.",
        color: "#fd7e14",
        icon: faBuildingColumns
    },
    {
        id: 3678,
        title: "Introduction to Computers & Internet Safety",
        link: "https://islingtonchildcare.proceduresonline.com/chapters/p_computer_safety.html",
        color: "#6f42c1",
        icon: faGlobe
    },
    {
        id: 3677,
        title: "Introduction to Computers & Internet Safety",
        link: "https://www.vedantu.com/computer-science/introduction-to-computer",
        color: "#17a2b8",
        icon: faComputer
    },
    {
        id: 3676,
        title: "Introduction to Computers & Internet Safety",
        link: "https://peda.net/kenya/ass/subjects2/computer-studies/form-1/itc2",
        color: "#e83e8c",
        icon: faComputer
    },
    {
        id: 3672,
        title: "Introduction to Computers & Internet Safety",
        link: "https://edu.gcfglobal.org/en/internetsafety/introduction-to-internet-safety/1/",
        color: "#343a40",
        icon: faComputer
    }
];

const languageCommunicationResources = [
    {
        id: 3763,
        title: "Tips to Improve Public Speaking Skills in Children",
        link: "https://tist.school/blog/tips-improve-public-speaking-skills-children",
        color: "#007bff",
        icon: faMicrophone
    },
    {
        id: 3759,
        title: "Public Speaking Topics and Ideas for Students",
        link: "https://globalindianschool.org/my/blog-details/list-of-public-speaking-topics-and-ideas-for-students/",
        color: "#dc3545",
        icon: faMicrophone
    },
    {
        id: 3753,
        title: "Public Speaking for Kids: 30 Topic Ideas for 30 Days",
        link: "https://speechblubs.com/blog/public-speaking-for-kids/",
        color: "#28a745",
        icon: faMicrophone
    },
    {
        id: 3749,
        title: "Super Simple Rhymes",
        link: "https://supersimple.com/super-simple-songs/",
        color: "#ffc107",
        icon: faChildReaching
    },
    {
        id: 3742,
        title: "Famous Rhyming Poems",
        link: "https://www.momjunction.com/articles/rhyming-poems-for-kids_001049871/",
        color: "#fd7e14",
        icon: faChildReaching
    },
    {
        id: 3740,
        title: "Short Poems For Kids",
        link: "https://www.planetspark.in/blogs/english-poems-for-kids",
        color: "#6f42c1",
        icon: faChildReaching
    },
    {
        id: 3727,
        title: "25 Creative Writing Prompts for Kids",
        link: "https://www.nightzookeeper.com/blog/articles/25-creative-writing-prompts-for-kids-to-get-imaginations-flowing",
        color: "#17a2b8",
        icon: faPenToSquare
    },
    {
        id: 3713,
        title: "52 Creative Drawing Prompts for Kids",
        link: "https://www.funsensoryplay.com/52-creative-drawing-prompts-for-kids/?srsltid=AfmBOooocVSNFRuDQwpyPhxjzEXT5ik8qIeJa3T0Gp37pCXmnrFaYLo5",
        color: "#e83e8c",
        icon: faPen
    },
    {
        id: 3712,
        title: "Creative Writing & Drawing",
        link: "https://www.edutopia.org/blog/thoughtful-creative-writing-through-art-denise-cassano",
        color: "#343a40",
        icon: faPen
    },
    {
        id: 3703,
        title: "Reading Aloud & Storytelling",
        link: "https://www.tulikabooks.com/early-readers/read-aloud-stories-english.html",
        color: "#20c997",
        icon: faBookOpenReader
    },
    {
        id: 3702,
        title: "Reading Aloud & Storytelling",
        link: "https://www.twinkl.co.in/blog/fourteen-fabulous-stories-read-aloud",
        color: "#007bff",
        icon: faBookOpenReader
    },
    {
        id: 3699,
        title: "Reading Aloud & Storytelling",
        link: "https://www.readingrockets.org/topics/reading-aloud",
        color: "#dc3545",
        icon: faBookOpenReader
    }
];

const academicLearningResources = [
    {
        id: 3690,
        title: "Animated Learning Videos",
        link: "https://www.fiverr.com/categories/video-animation/animation-for-kids",
        color: "#007bff",
        icon: faFileVideo
    },
    {
        id: 3689,
        title: "Animated Learning Videos",
        link: "https://flearningstudio.com/top-animated-educational-videos/",
        color: "#dc3545",
        icon: faVideo
    },
    {
        id: 3688,
        title: "Learning English & Phonics",
        link: "https://www.kizphonics.com/",
        color: "#28a745",
        icon: faLinesLeaning
    },
    {
        id: 3687,
        title: "Language & Communication ● Reading Aloud & Storytelling",
        link: "https://www.splashlearn.com/blog/how-to-teach-phonics-to-kids/",
        color: "#ffc107",
        icon: faChalkboardUser
    },
    {
        id: 3684,
        title: "Learning English & Phonics",
        link: "https://www.socratica.org/courses/the-alphabet-a-z?gad_source=1&gclid=CjwKCAiAzba9BhBhEiwA7glbamCbFsOEgRmn5nlA5GG9oyVaxesPS_2_E2NTXPXEpMUDaX3R4-1yIRoCPIgQAvD_BwE",
        color: "#fd7e14",
        icon: faBookOpen
    },
    {
        id: 3681,
        title: "Learning English & Phonics",
        link: "https://advancedlearning.com.sg/the-best-8-phonics-learning-method-for-primary-school-kids/",
        color: "#6f42c1",
        icon: faBookOpenReader
    },
    {
        id: 3679,
        title: "Introduction to Social Studies & Indian Culture",
        link: "https://www.twinkl.co.in/teaching-wiki/social-studies",
        color: "#17a2b8",
        icon: faBookAtlas
    },
    {
        id: 3675,
        title: "Science Experiments for Kids",
        link: "https://www.splashlearn.com/blog/kids-science-experiments-to-make-learning-engaging/",
        color: "#e83e8c",
        icon: faAppleWhole
    },
    {
        id: 3674,
        title: "Science Experiments for Kids",
        link: "https://www.goodhousekeeping.com/life/parenting/g32176446/science-experiments-for-kids/",
        color: "#343a40",
        icon: faAtom
    },
    {
        id: 3673,
        title: "Science Experiments for Kids",
        link: "https://www.sciencefun.org/kidszone/experiments/top-science-experiments-for-kids/",
        color: "#20c997",
        icon: faMicroscope
    },
    {
        id: 3671,
        title: "Picture Books",
        link: "https://www.storyberries.com/category/picture-books/",
        color: "#007bff",
        icon: faBook
    },
    {
        id: 3670,
        title: "Fun with Numbers & Basic Math",
        link: "https://www.mathplayground.com/math-games.html",
        color: "#dc3545",
        icon: faBook
    },
    {
        id: 3669,
        title: "Fun with Numbers & Basic Math",
        link: "https://www.mathsisfun.com/",
        color: "#28a745",
        icon: faBookBible
    },
    {
        id: 3668,
        title: "Fun with Numbers & Basic Math",
        link: "https://www.mathgames.com/",
        color: "#ffc107",
        icon: faBookBible
    },
    {
        id: 3667,
        title: "Storybooks & Picture Books",
        link: "https://monkeypen.com/pages/free-childrens-books",
        color: "#fd7e14",
        icon: faBookTanakh
    },
    {
        id: 3666,
        title: "Picture & Story Books",
        link: "https://www.spellboundbookstore.com/collections/picture-books-1/picture-books",
        color: "#6f42c1",
        icon: faStore
    },
    {
        id: 3665,
        title: "Storybooks & Picture Books",
        link: "http://letsreadasia.org/",
        color: "#17a2b8",
        icon: faBookJournalWhills
    }
];

const environmentSocialResponsibilityResources = [
  {
    id: 3739,
    title: "Teaching waste management to children",
    link: "https://www.smilefoundationindia.org/blog/teaching-waste-management-to-children/",
    color: "#007bff",
    icon: faHandsHoldingChild
  },
  {
    id: 3737,
    title: "Reduce, Reuse, Recycle",
    link: "https://kids.niehs.nih.gov/topics/reduce",
    color: "#dc3545",
    icon: faRecycle
  },
  {
    id: 3735,
    title: "Recycling & Waste Management for Kids",
    link: "https://www.iberdrola.com/sustainability/recycling-for-kids",
    color: "#28a745",
    icon: faRecycle
  },
  {
    id: 3733,
    title: "Things Children Learn From Playing With Animals",
    link: "https://kerensnursery.com/8-things-children-learn-from-playing-with-animals/",
    color: "#ffc107",
    icon: faCat
  },
  {
    id: 3731,
    title: "Zoos neither educate nor empower children",
    link: "https://www.freedomforanimals.org.uk/news/zoos-neither-educate-nor-empower-children",
    color: "#fd7e14",
    icon: faOtter
  },
  {
    id: 3729,
    title: "Tips for Teaching Wildlife Conservation for Kids",
    link: "https://environment.co/tips-for-teaching-wildlife-conservation-for-kids/",
    color: "#6f42c1",
    icon: faHippo
  },
  {
    id: 3728,
    title: "Learning about Animals & Conservation",
    link: "https://www.lego.com/en-in/themes/duplo/article/teaching-animal-conservation",
    color: "#17a2b8",
    icon: faHorse
  },
  {
    id: 3726,
    title: "Garden With Kids: Fun Activities",
    link: "https://www.almanac.com/gardening-kids-what-plant-and-fun-activities",
    color: "#e83e8c",
    icon: faLeaf
  },
  {
    id: 3723,
    title: "Childrens Garden Fun",
    link: "https://www.coordikids.com/childrens-garden-fun/",
    color: "#343a40",
    icon: faMountainCity
  },
  {
    id: 3722,
    title: "Fun Winter Garden Activities for Kids",
    link: "https://www.gardenary.com/blog/fun-winter-garden-activities-for-kids",
    color: "#20c997",
    icon: faMountainSun
  },
  {
    id: 3720,
    title: "Fun Garden Activities for Kids",
    link: "https://kidsgardening.org/resource-activities/",
    color: "#007bff",
    icon: faPlantWilt
  },
  {
    id: 3719,
    title: "Fun with Nature & Gardening",
    link: "http://kangarookids.in/blog/gardening-activities-and-nature-exploration-for-preschoolers/",
    color: "#dc3545",
    icon: faTree
  }
];


function PrimaryPage() {
    return (
        <div className="container mx-auto px-4 py-8 max-w-7xl">

            {/* HEADER PART */}
            <h1 className="text-3xl font-bold text-center my-6">Primary</h1>
            {/* <div className="text-right mb-6">
                <a
                    href="/bookmark/index"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    View Bookmarks
                </a>
            </div> */}


            {/* HEALTH AND WELL-BEING */}
            <h2 className="text-2xl font-semibold my-6">Health & Well-being</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {healthAndWellbeingResources.map((resource) => (
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


            {/* Creativity & Performing Arts */}
            <h2 className="text-2xl font-semibold my-6">Creativity & Performing Arts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {creativityAndPerformingArtsResources.map((resource) => (
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
                {digitalLiteracyResources.map((resource) => (
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

            {/* Environment & Social Responsibility */}
            <h2 className="text-2xl font-semibold my-6">Environment & Social Responsibility</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {environmentSocialResponsibilityResources.map((resource) => (
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

export default PrimaryPage