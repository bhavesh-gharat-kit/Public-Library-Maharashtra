"use client";
import React from "react";
import { faAppleWhole, faBalanceScale, faBolt, faBoxesPacking, faBrain, faBuilding, faBullhorn, faBullseye, faCar, faCarrot, faChalkboardTeacher, faChartBar, faChartLine, faChartPie, faCity, faClinicMedical, faClipboardCheck, faClipboardList, faCloud, faCode, faCoins, faConciergeBell, faCow, faDatabase, faDrawPolygon, faFish, faFutbol, faGavel, faGem, faGlobeAsia, faGlobeEurope, faHandshake, faHeartbeat, faHelmetSafety, faLanguage, faLaptopCode, faLaptopHouse, faLeaf, faLightbulb, faMicrochip, faMicroscope, faNewspaper, faPalette, faPaw, faPenNib, faPeopleGroup, faPlane, faProjectDiagram, faRobot, faRocket, faSeedling, faServer, faShareAlt, faShieldAlt, faShirt, faShoppingCart, faSuitcaseRolling, faSun, faTasks, faTemperatureHigh, faTools, faTruck, faUniversity, faUsersCog, faUserSecret, faUserTie, faUtensils, faVial, faWater, faWind } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const skillData = [
  {
    title: "Job Related",
    items: [
      {
        id: 425,
        name: "Advanced Certificate in Digital Marketing and Communication",
        url: "https://www.upgrad.com/digital-marketing-and-communication-pgc-mica/?utm_source=GOOGLE&utm_medium=NBSEARCH&utm_campaign=IND_ACQ_WEB_GOOGLE_NBSEARCH_PD_MICA_DM_PHRASE_25_44_HIT2_T1&utm_content=Fundamental&utm_term=fundamental%20of%20digital%20marketing&ad_device=c&ad_network=g&ad_creative=523132358067&ad_placement=&ad_keyword_matchtype=b&ad_clickID=EAIaIQobChMIwOe6zdXWhwMVkKRmAh2rigP2EAAYAyAAEgIE6_D_BwE&gad_source=1&gclid=EAIaIQobChMIwOe6zdXWhwMVkKRmAh2rigP2EAAYAyAAEgIE6_D_BwE",
        icon: faChartLine,
        color: "#007bff",
      },
      {
        id: 424,
        name: "Android App Development for Beginners",
        url: "https://www.udemy.com/course/the-complete-android-10-developer-course-mastering-android/?utm_source=adwords&utm_medium=udemyads&utm_campaign=Search_Keyword_Beta_Prof_la.EN_cc.INDIA&campaigntype=Search&portfolio=India&language=EN&product=Course&test=&audience=Keyword&topic=Android_Development&priority=Beta&utm_content=deal4584&utm_term=_._ag_163642174009_._ad_696203130225_._kw_course%20for%20android%20app%20development_._de_c_._dm__._pl__._ti_kwd-315265897438_._li_1007768_._pd__._&matchtype=b&gad_source=1&gclid=EAIaIQobChMIv_H1v4vdhwMVeKRmAh3CMxMPEAAYASAAEgKOVvD_BwE",
        icon: faChartLine,
        color: "#dc3545",
      },
      {
        id: 423,
        name: "Data Science MicroMasters Program",
        url: "https://www.udemy.com/topic/data-science/?utm_source=adwords&utm_medium=udemyads&utm_campaign=Search_DSA_Alpha_Prof_la.EN_cc.INDIA&campaigntype=Search&portfolio=India&language=EN&product=Course&test=&audience=DSA&topic=Data_Science&priority=Alpha&utm_content=deal4584&utm_term=_._ag_160270535185_._ad_696202838304_._kw__._de_c_._dm__._pl__._ti_dsa-1677974310676_._li_1007768_._pd__._&matchtype=&gad_source=1&gclid=EAIaIQobChMIusmvq4vdhwMVE6ZmAh2zsQucEAAYASAAEgKSf_D_BwE",
        icon: faChartLine,
        color: "#28a745",
      },
      {
        id: 422,
        name: "Python for Data Science and Machine Learning Bootcamp",
        url: "https://www.udemy.com/course/python-for-data-science-and-machine-learning-bootcamp/?utm_source=adwords&utm_medium=udemyads&utm_campaign=Search_DSA_Alpha_Prof_la.EN_cc.INDIA&campaigntype=Search&portfolio=India&language=EN&product=Course&test=&audience=DSA&topic=Python&priority=Alpha&utm_content=deal4584&utm_term=_._ag_160270535025_._ad_696202838298_._kw__._de_c_._dm__._pl__._ti_dsa-1705455366924_._li_1007768_._pd__._&matchtype=&gad_source=1&gclid=EAIaIQobChMIusm2lYvdhwMVr6RmAh2kiQ0EEAAYASAAEgLVafD_BwE&couponCode=IND21PM",
        icon: faChartLine,
        color: "#ffc107",
      },
      {
        id: 421,
        name: "Applied Data Science with Python Specialization",
        url: "https://www.upgrad.com/bootcamps/job-linked-data-science-advanced-bootcamp/?utm_source=GOOGLE&utm_medium=NBSEARCH&utm_campaign=IND_ACQ_WEB_GOOGLE_NBSEARCH_BU_UPG_BCDS_T1_18to24_NS&utm_content=Data_Analyst_Training&utm_term=data%20analyst%20bootcamp&ad_device=c&ad_network=g&ad_creative=701154584294&ad_placement=&ad_keyword_matchtype=b&ad_clickid=Cj0KCQjwh7K1BhCZARIsAKOrVqE6urD4kBXjHMkyMMzwrK58Zj9Gy1h8eIBFKyuyNBMTa63AeD9C83saAgHrEALw_wcB&gad_source=1&gclid=Cj0KCQjwh7K1BhCZARIsAKOrVqE6urD4kBXjHMkyMMzwrK58Zj9Gy1h8eIBFKyuyNBMTa63AeD9C83saAgHrEALw_wcB",
        icon: faChartLine,
        color: "#fd7e14",
      },
      {
        id: 420,
        name: "Cloud Computing and DevOps Program",
        url: "https://www.upgrad.com/executive-pg-certification-in-cloud-computing-and-devops-iiit-bangalore/",
        icon: faChartLine,
        color: "#6f42c1",
      },
      {
        id: 419,
        name: "AI-Powered Full Stack Development Course",
        url: "https://www.upgrad.com/ai-full-stack-development-program-iiit-bangalore/",
        icon: faChartLine,
        color: "#17a2b8",
      },
      {
        id: 418,
        name: "Film Production",
        url: "https://www.udemy.com/topic/Filmmaking/?utm_source=adwords&utm_medium=udemyads&utm_campaign=Search_DSA_GammaCatchall_NonP_la.EN_cc.INDIA&campaigntype=Search&portfolio=India&language=EN&product=Course&test=&audience=DSA&topic=&priority=Gamma&utm_content=deal4584&utm_term=_._ag_166578677881_._ad_700948726517_._kw__._de_c_._dm__._pl__._ti_dsa-1456167871416_._li_1007768_._pd__._&matchtype=&gad_source=1&gclid=EAIaIQobChMI6MjSoYrdhwMV5iqDAx29yRJtEAAYASAAEgIC8PD_BwE",
        icon: faChartLine,
        color: "#e83e8c",
      },
      {
        id: 417,
        name: "Theatre and Performance",
        url: "https://www.udemy.com/topic/theater/",
        icon: faChartLine,
        color: "#343a40",
      },
      {
        id: 416,
        name: "Introduction to Music Production",
        url: "https://www.udemy.com/topic/music-production/?utm_source=adwords&utm_medium=udemyads&utm_campaign=Search_DSA_Beta_Prof_la.EN_cc.INDIA&campaigntype=Search&portfolio=India&language=EN&product=Course&test=&audience=DSA&topic=&priority=Beta&utm_content=deal4584&utm_term=_._ag_160270535985_._ad_696202838367_._kw__._de_c_._dm__._pl__._ti_dsa-1676636546559_._li_1007768_._pd__._&matchtype=&gad_source=1&gclid=EAIaIQobChMI86aBiordhwMV-x6DAx0rVQC4EAAYASAAEgIOtvD_BwE",
        icon: faChartLine,
        color: "#20c997",
      },
      {
        id: 415,
        name: "Music Theory",
        url: "https://www.udemy.com/topic/music-theory/?matchtype=&utm_source=adwords&utm_medium=udemyads&utm_campaign=Search_DSA_GammaCatchall_NonP_la.EN_cc.INDIA&campaigntype=Search&portfolio=India&language=EN&product=Course&test=&audience=DSA&topic=&priority=Gamma&utm_content=deal4584&utm_term=_._ag_166578677881_._ad_700948726517_._kw__._de_c_._dm__._pl__._ti_dsa-1456167871416_._li_1007768_._pd__._&matchtype=&gad_source=1&gclid=EAIaIQobChMI28iLgordhwMVc6pmAh2sdSAXEAAYASAAEgLlEPD_BwE",
        icon: faChartLine,
        color: "#007bff",
      },
      {
        id: 414,
        name: "Modern and Contemporary American Poetry",
        url: "https://www.coursera.org/learn/modpo",
        icon: faChartLine,
        color: "#dc3545",
      },
      {
        id: 413,
        name: "Classical Literature",
        url: "https://www.coursera.org/courses?query=literature",
        icon: faChartLine,
        color: "#28a745",
      },
      {
        id: 412,
        name: "Human Geography",
        url: "https://www.edx.org/learn/geography",
        icon: faChartLine,
        color: "#ffc107",
      },
      {
        id: 411,
        name: "Physical Geography",
        url: "https://www.coursera.org/courses?query=geography",
        icon: faChartLine,
        color: "#fd7e14",
      },
      {
        id: 410,
        name: "History of Modern China",
        url: "https://www.udemy.com/courses/search/?src=ukw&q=History+of+Modern+China",
        icon: faChartLine,
        color: "#6f42c1",
      },
      {
        id: 409,
        name: "World History: Imperialism",
        url: "https://www.udemy.com/topic/world-history/",
        icon: faChartLine,
        color: "#17a2b8",
      },
      {
        id: 408,
        name: "Introduction to Anthropology",
        url: "https://www.coursera.org/courses?query=anthropology",
        icon: faChartLine,
        color: "#e83e8c",
      },
      {
        id: 407,
        name: "Global Social Change",
        url: "https://www.udemy.com/courses/search/?src=ukw&q=Global+Social+Change",
        icon: faChartLine,
        color: "#343a40",
      },
      {
        id: 406,
        name: "Introduction to Sociology",
        url: "https://www.coursera.org/courses?query=sociology",
        icon: faChartLine,
        color: "#20c997",
      },
      {
        id: 405,
        name: "Positive Psychology",
        url: "https://www.coursera.org/learn/positive-psychology",
        icon: faChartLine,
        color: "#007bff",
      },
      {
        id: 404,
        name: "Introduction to Psychology",
        url: "https://www.udemy.com/topic/psychology-fundamentals/?utm_source=adwords&utm_medium=udemyads&utm_campaign=Search_DSA_Gamma_NonP_la.EN_cc.INDIA&campaigntype=Search&portfolio=India&language=EN&product=Course&test=&audience=DSA&topic=&priority=Gamma&utm_content=deal4584&utm_term=_._ag_160270536705_._ad_696202838541_._kw__._de_c_._dm__._pl__._ti_dsa-1677053905648_._li_1007768_._pd__._&matchtype=&gad_source=1&gclid=EAIaIQobChMI-cDzt4jdhwMVZIFLBR0tIifgEAAYASAAEgJUlvD_BwE",
        icon: faChartLine,
        color: "#dc3545",
      },
      {
        id: 403,
        name: "Global Diplomacy – Diplomacy in the Modern World",
        url: "https://www.coursera.org/learn/global-diplomacy",
        icon: faChartLine,
        color: "#28a745",
      },
      {
        id: 402,
        name: "Understanding Political Concepts",
        url: "https://www.coursera.org/learn/understanding-political-concepts",
        icon: faChartLine,
        color: "#ffc107",
      },
      {
        id: 401,
        name: "Philosophy and Critical Thinking",
        url: "https://www.coursera.org/courses?query=critical%20thinking",
        icon: faChartLine,
        color: "#fd7e14",
      },
      {
        id: 400,
        name: "Ancient Philosophy: Aristotle and His Successors",
        url: "https://www.shiksha.com/online-courses/ancient-philosophy-aristotle-and-his-successors-course-courl1052",
        icon: faChartLine,
        color: "#6f42c1",
      },
      {
        id: 399,
        name: "Applied Ethics",
        url: "https://www.coursera.org/courses?query=ethics",
        icon: faChartLine,
        color: "#17a2b8",
      },
      {
        id: 398,
        name: "Introduction to Ethics",
        url: "https://www.udacity.com/course/ethical-ai--cd1827",
        icon: faChartLine,
        color: "#e83e8c",
      },
      {
        id: 397,
        name: "Sustainable Building Design",
        url: "https://www.udemy.com/topic/sustainable-architecture/",
        icon: faCity,
        color: "#343a40",
      },
      {
        id: 396,
        name: "Architecture and Urbanism",
        url: "https://www.coursera.org/courses?query=urban%20design",
        icon: faDrawPolygon,
        color: "#20c997",
      },
      {
        id: 395,
        name: "Industrial Biotechnology",
        url: "https://www.coursera.org/learn/industrial-biotech",
        icon: faMicroscope,
        color: "#007bff",
      },
      {
        id: 394,
        name: "Biotechnology: Fundamentals",
        url: "https://www.udemy.com/topic/biotechnology/?utm_source=adwords&utm_medium=udemyads&utm_campaign=Search_DSA_Gamma_NonP_la.EN_cc.INDIA&campaigntype=Search&portfolio=India&language=EN&product=Course&test=&audience=DSA&topic=&priority=Gamma&utm_content=deal4584&utm_term=_._ag_160270536905_._ad_696202838553_._kw__._de_c_._dm__._pl__._ti_dsa-1677053913968_._li_1007768_._pd__._&matchtype=&gad_source=1&gclid=EAIaIQobChMI7LbQv4fdhwMVMSGDAx2GcCxWEAAYASAAEgKMFfD_BwE",
        icon: faVial,
        color: "#dc3545",
      },
      {
        id: 393,
        name: "Introduction to Oceanography",
        url: "https://www.coursera.org/courses?query=oceanography",
        icon: faWater,
        color: "#28a745",
      },
      {
        id: 392,
        name: "Marine Biology",
        url: "https://www.udemy.com/course/the-complete-marine-biology-101-course/?couponCode=ST3MT72524&utm_source=adwords&utm_medium=udemyads&utm_campaign=Search_DSA_GammaCatchall_NonP_la.EN_cc.INDIA&campaigntype=Search&portfolio=India&language=EN&product=Course&test=&audience=DSA&topic=&priority=Gamma&utm_content=deal4584&utm_term=_._ag_166578677881_._ad_700948726517_._kw__._de_c_._dm__._pl__._ti_dsa-1456167871416_._li_1007768_._pd__._&matchtype=&gad_source=1&gclid=EAIaIQobChMIwIvMjofdhwMVXaNmAh3hxQ3sEAAYASAAEgJacPD_BwE",
        icon: faFish,
        color: "#ffc107",
      },
      {
        id: 391,
        name: "One Health: Connecting Humans, Animals and the Environment",
        url: "https://www.futurelearn.com/courses/one-health",
        icon: faLeaf,
        color: "#fd7e14",
      },
      {
        id: 390,
        name: "Animal Behavior and Welfare",
        url: "https://www.coursera.org/learn/animal-welfare",
        icon: faPaw,
        color: "#6f42c1",
      },
      {
        id: 389,
        name: "Introduction to Aerospace Engineering: Astronautics and Human Spaceflight",
        url: "https://learning.edx.org/course/course-v1:MITx+16.00x+3T2017/home",
        icon: faRocket,
        color: "#17a2b8",
      },
      {
        id: 388,
        name: "Introduction to Aerodynamics",
        url: "https://www.shiksha.com/online-courses/aeroelastic-or-aerodynamics-in-loads-analysis-with-matlab-nastrans-cplusplus-fortran-with-cgi-certification-132",
        icon: faWind,
        color: "#e83e8c",
      },
      {
        id: 387,
        name: "Aviation Management",
        url: "https://www.udemy.com/topic/aviation/?matchtype=b&utm_source=adwords&utm_medium=udemyads&utm_campaign=Search_DSA_GammaCatchall_NonP_la.EN_cc.INDIA&campaigntype=Search&portfolio=India&language=EN&product=Course&test=&audience=DSA&topic=&priority=Gamma&utm_content=deal4584&utm_term=_._ag_166578677881_._ad_700948726517_._kw__._de_c_._dm__._pl__._ti_dsa-1456167871416_._li_1007768_._pd__._&matchtype=&gad_source=1&gclid=EAIaIQobChMIuIqVtYbdhwMVWyWDAx00dx0HEAAYAyAAEgI8DfD_BwE",
        icon: faPlane,
        color: "#343a40",
      },
      {
        id: 386,
        name: "Electric Vehicles: Introduction to Motors and Power Electronics",
        url: "https://www.udemy.com/topic/electric-vehicles/?utm_source=adwords&utm_medium=udemyads&utm_campaign=Search_DSA_Gamma_NonP_la.EN_cc.INDIA&campaigntype=Search&portfolio=India&language=EN&product=Course&test=&audience=DSA&topic=&priority=Gamma&utm_content=deal4584&utm_term=_._ag_160270536905_._ad_696202838553_._kw__._de_c_._dm__._pl__._ti_dsa-1677053913968_._li_1007768_._pd__._&matchtype=&gad_source=1&gclid=EAIaIQobChMI54-U94XdhwMVfqJmAh2N4CbrEAAYAiAAEgL0P_D_BwE",
        icon: faBolt,
        color: "#20c997",
      },
      {
        id: 385,
        name: "Introduction to Automotive Engineering",
        url: "https://www.udemy.com/course/overview-of-automotive-performance-engineering/?couponCode=IND21PM",
        icon: faCar,
        color: "#007bff",
      },
      {
        id: 384,
        name: "Construction Project Management",
        url: "https://www.coursera.org/learn/construction-project-management",
        icon: faHelmetSafety,
        color: "#dc3545",
      },
      {
        id: 383,
        name: "Construction Management Specialization",
        url: "https://www.udemy.com/topic/construction-management/?utm_source=adwords&utm_medium=udemyads&utm_campaign=Search_DSA_Beta_Prof_la.EN_cc.INDIA&campaigntype=Search&portfolio=India&language=EN&product=Course&test=&audience=DSA&topic=&priority=Beta&utm_content=deal4584&utm_term=_._ag_160270535465_._ad_696202838325_._kw__._de_c_._dm__._pl__._ti_dsa-1677053955488_._li_1007768_._pd__._&matchtype=&gad_source=1&gclid=EAIaIQobChMIy7i61oXdhwMVa6JmAh1d_ynaEAAYASAAEgJ8KvD_BwE",
        icon: faTools,
        color: "#28a745",
      },
      {
        id: 382,
        name: "Introduction to Animal Husbandry",
        url: "https://www.coursera.org/courses?query=animal",
        icon: faCow,
        color: "#ffc107",
      },
      {
        id: 381,
        name: "Sustainable Agricultural Land Management",
        url: "https://www.coursera.org/learn/sustainable-agriculture",
        icon: faSeedling,
        color: "#fd7e14",
      },
      {
        id: 380,
        name: "Hospitality Management",
        url: "https://www.shiksha.com/hospitality-travel/hotel-hospitality-management/colleges/colleges-bangalore",
        icon: faUtensils,
        color: "#6f42c1",
      },
      {
        id: 379,
        name: "Hotel Management",
        url: "https://www.shiksha.com/hospitality-travel/hotel-hospitality-management/ranking/top-hotel-management-colleges-in-bangalore/98-2-0-278-0",
        icon: faConciergeBell,
        color: "#17a2b8",
      },
      {
        id: 378,
        name: "Tourism and Travel Management",
        url: "https://www.shiksha.com/hospitality-travel/travel-and-tourism-management-chp",
        icon: faSuitcaseRolling,
        color: "#e83e8c",
      },
      {
        id: 377,
        name: "Sustainable Tourism",
        url: "https://www.coursera.org/learn/sustainable-tourism",
        icon: faGlobeAsia,
        color: "#343a40",
      },
      {
        id: 376,
        name: "Sports Marketing",
        url: "https://www.udemy.com/topic/sports-management/?utm_source=adwords&utm_medium=udemyads&utm_campaign=Search_DSA_Beta_Prof_la.EN_cc.INDIA&campaigntype=Search&portfolio=India&language=EN&product=Course&test=&audience=DSA&topic=&priority=Beta&utm_content=deal4584&utm_term=_._ag_160270535465_._ad_696202838325_._kw__._de_c_._dm__._pl__._ti_dsa-1677053955488_._li_1007768_._pd__._&matchtype=&gad_source=1&gclid=EAIaIQobChMIjPWF14TdhwMVN6JmAh2CLiW6EAAYASAAEgItHPD_BwE",
        icon: faFutbol,
        color: "#20c997",
      },
      {
        id: 375,
        name: "Sports and Society",
        url: "https://www.coursera.org/learn/sports-society",
        icon: faPeopleGroup,
        color: "#007bff",
      },
      {
        id: 374,
        name: "Stanford Introduction to Food and Health",
        url: "https://www.coursera.org/learn/food-and-health",
        icon: faAppleWhole,
        color: "#dc3545",
      },
      {
        id: 373,
        name: "Nutrition and Health: Macronutrients and Overnutrition",
        url: "https://www.udemy.com/topic/nutrition/?utm_source=adwords&utm_medium=udemyads&utm_campaign=Search_DSA_Gamma_NonP_la.EN_cc.INDIA&campaigntype=Search&portfolio=India&language=EN&product=Course&test=&audience=DSA&topic=&priority=Gamma&utm_content=deal4584&utm_term=_._ag_160270536425_._ad_696202838520_._kw__._de_c_._dm__._pl__._ti_dsa-1705455355804_._li_1007768_._pd__._&matchtype=&gad_source=1&gclid=EAIaIQobChMItv3VvYTdhwMV17pLBR1VOikIEAAYAiAAEgIz2PD_BwE",
        icon: faCarrot,
        color: "#28a745",
      },
      {
        id: 372,
        name: "Climate Change Mitigation in Developing Countries",
        url: "https://www.coursera.org/learn/climate-change-mitigation",
        icon: faTemperatureHigh,
        color: "#ffc107",
      },
      {
        id: 371,
        name: "Introduction to Environmental Science",
        url: "https://www.udemy.com/topic/environmental-science/?utm_source=adwords&utm_medium=udemyads&utm_campaign=Search_DSA_Gamma_NonP_la.EN_cc.INDIA&campaigntype=Search&portfolio=India&language=EN&product=Course&test=&audience=DSA&topic=&priority=Gamma&utm_content=deal4584&utm_term=_._ag_160270536905_._ad_696202838553_._kw__._de_c_._dm__._pl__._ti_dsa-1677053913968_._li_1007768_._pd__._&matchtype=&gad_source=1&gclid=EAIaIQobChMIsrG5rYTdhwMVdyiDAx3rpCCbEAAYASAAEgKDTfD_BwE",
        icon: faLeaf,
        color: "#fd7e14",
      },
      {
        id: 370,
        name: "Management of Fashion and Luxury Companies",
        url: "https://www.coursera.org/learn/mafash",
        icon: faGem,
        color: "#6f42c1",
      },
      {
        id: 369,
        name: "Fashion as Design",
        url: "https://www.shiksha.com/online-courses/fashion-designing-courses-certification-training-st557-tg1191",
        icon: faShirt,
        color: "#17a2b8",
      },
      {
        id: 368,
        name: "The Modern World, Part One: Global History from 1760 to 1910",
        url: "https://www.coursera.org/learn/modern-world",
        icon: faGlobeEurope,
        color: "#e83e8c",
      },
      {
        id: 367,
        name: "Modern Art & Ideas",
        url: "https://www.coursera.org/learn/modern-art-ideas",
        icon: faPalette,
        color: "#343a40",
      },
      {
        id: 366,
        name: "Solar Energy for Engineers, Architects, and Entrepreneurs",
        url: "https://www.udemy.com/topic/solar-energy/?matchtype=b&utm_source=adwords&utm_medium=udemyads&utm_campaign=Search_DSA_GammaCatchall_NonP_la.EN_cc.INDIA&campaigntype=Search&portfolio=India&language=EN&product=Course&test=&audience=DSA&topic=&priority=Gamma&utm_content=deal4584&utm_term=_._ag_166578677881_._ad_700948726517_._kw__._de_c_._dm__._pl__._ti_dsa-1456167871416_._li_1007768_._pd__._&matchtype=&gad_source=1&gclid=EAIaIQobChMI062KwoPdhwMVPaNmAh250Ab3EAAYASAAEgK65_D_BwE",
        icon: faSun,
        color: "#20c997",
      },
      {
        id: 365,
        name: "Renewable Energy and Green Building Entrepreneurship",
        url: "https://www.shiksha.com/online-courses/renewable-energy-and-green-building-entrepreneurship-course-courl817",
        icon: faSeedling,
        color: "#007bff",
      },
      {
        id: 364,
        name: "Logistics Fundamentals",
        url: "https://www.udemy.com/course/build-award-winning-customer-service/?couponCode=IND21PM",
        icon: faTruck,
        color: "#dc3545",
      },
      {
        id: 363,
        name: "Supply Chain Management Specialization",
        url: "https://www.coursera.org/specializations/supply-chain-management",
        icon: faBoxesPacking,
        color: "#28a745",
      },
      {
        id: 362,
        name: "Real Estate Financial Modeling",
        url: "https://www.udemy.com/course/the-real-estate-financial-modeling-bootcamp/?matchtype=&utm_source=adwords&utm_medium=udemyads&utm_campaign=Search_DSA_GammaCatchall_NonP_la.EN_cc.INDIA&campaigntype=Search&portfolio=India&language=EN&product=Course&test=&audience=DSA&topic=&priority=Gamma&utm_content=deal4584&utm_term=_._ag_166578677881_._ad_700948726517_._kw__._de_c_._dm__._pl__._ti_dsa-1456167871416_._li_1007768_._pd__._&matchtype=&gad_source=1&gclid=EAIaIQobChMIqNjfjoPdhwMVoqtmAh3VCBANEAAYAiAAEgK5ofD_BwE",
        icon: faChartLine,
        color: "#ffc107",
      },
      {
        id: 361,
        name: "Real Estate Investment",
        url: "https://www.udemy.com/topic/real-estate-investing/?utm_source=adwords&utm_medium=udemyads&utm_campaign=Search_DSA_Beta_Prof_la.EN_cc.INDIA&campaigntype=Search&portfolio=India&language=EN&product=Course&test=&audience=DSA&topic=&priority=Beta&utm_content=deal4584&utm_term=_._ag_160270535905_._ad_696202838358_._kw__._de_c_._dm__._pl__._ti_dsa-1677053929368_._li_1007768_._pd__._&matchtype=&gad_source=1&gclid=EAIaIQobChMIqPeO_oLdhwMVVcs8Ah1iST09EAAYASAAEgJz9PD_BwE",
        icon: faBuilding,
        color: "#fd7e14",
      },
      {
        id: 360,
        name: "Data-Driven Journalism",
        url: "https://www.coursera.org/learn/visualization-for-data-journalism",
        icon: faChartBar,
        color: "#6f42c1",
      },
      {
        id: 359,
        name: "Becoming a Journalist: Reporters and Editors",
        url: "https://www.coursera.org/courses?query=journalism",
        icon: faNewspaper,
        color: "#17a2b8",
      },
      {
        id: 358,
        name: "Media Relations and PR",
        url: "https://www.udemy.com/topic/public-relations/",
        icon: faBullhorn,
        color: "#e83e8c",
      },
      {
        id: 357,
        name: "Introduction to Public Relations",
        url: "https://www.udemy.com/topic/public-relations/?utm_source=adwords&utm_medium=udemyads&utm_campaign=Search_DSA_Beta_Prof_la.EN_cc.INDIA&campaigntype=Search&portfolio=India&language=EN&product=Course&test=&audience=DSA&topic=&priority=Beta&utm_content=deal4584&utm_term=_._ag_160270535465_._ad_696202838325_._kw__._de_c_._dm__._pl__._ti_dsa-1677053955488_._li_1007768_._pd__._&matchtype=&gad_source=1&gclid=EAIaIQobChMIq7zHroLdhwMVEzCDAx0DXCZfEAAYASAAEgJ3nvD_BwE",
        icon: faHandshake,
        color: "#343a40",
      },

      {
        id: 356,
        name: "Intellectual Property Law Specialization",
        url: "https://www.shiksha.com/law/intellectual-property-law-chp",
        icon: faBalanceScale,
        color: "#20c997",
      },
      {
        id: 355,
        name: "Introduction to International Criminal Law",
        url: "https://www.coursera.org/learn/international-criminal-law",
        icon: faGavel,
        color: "#007bff",
      },
      {
        id: 354,
        name: "UI / UX Design Specialization",
        url: "https://www.upgrad.com/bootcamps/ui-ux-design-course/?utm_source=GOOGLE&utm_medium=NBSEARCH&utm_campaign=IND_ACQ_WEB_GOOGLE_NBSEARCH_BU_UPG_UIUX_HSV_Exact_KH&utm_content=UI-UX-Design-Course&utm_term=ui%20ux%20design%20course&gad_source=1&gclid=Cj0KCQjwh7K1BhCZARIsAKOrVqFbVJj4WkxQMbR7fXTHxWPazjafkxl5RMgousRm2g5adT9dY6vOxqEaArJ2EALw_wcB",
        icon: faPalette,
        color: "#dc3545",
      },
      {
        id: 353,
        name: "Graphic Design Specialization",
        url: "https://www.udemy.com/topic/graphic-design/?utm_source=adwords&utm_medium=udemyads&utm_campaign=Search_DSA_Beta_Prof_la.EN_cc.INDIA&campaigntype=Search&portfolio=India&language=EN&product=Course&test=&audience=DSA&topic=&priority=Beta&utm_content=deal4584&utm_term=_._ag_160270535945_._ad_696202838361_._kw__._de_c_._dm__._pl__._ti_dsa-1677053900288_._li_1007768_._pd__._&matchtype=&gad_source=1&gclid=EAIaIQobChMIkLegh4LdhwMVx6lmAh34ijlFEAAYAyAAEgKp4vD_BwE",
        icon: faPenNib,
        color: "#28a745",
      },
      {
        id: 352,
        name: "Electrical Engineering Fundamentals",
        url: "https://www.udemy.com/topic/electrical-engineering/?utm_source=adwords&utm_medium=udemyads&utm_campaign=Search_DSA_Gamma_NonP_la.EN_cc.INDIA&campaigntype=Search&portfolio=India&language=EN&product=Course&test=&audience=DSA&topic=&priority=Gamma&utm_content=deal4584&utm_term=_._ag_160270536905_._ad_696202838553_._kw__._de_c_._dm__._pl__._ti_dsa-1677053913968_._li_1007768_._pd__._&matchtype=&gad_source=1&gclid=EAIaIQobChMIg-bfgYLdhwMVkDODAx1GXDA9EAAYASAAEgIbTfD_BwE",
        icon: faBolt,
        color: "#ffc107",
      },
      {
        id: 351,
        name: "Engineering Project Management",
        url: "https://www.udemy.com/course/engineering-project-management-w/?utm_source=adwords&utm_medium=udemyads&utm_campaign=Search_DSA_Alpha_Prof_la.EN_cc.INDIA&campaigntype=Search&portfolio=India&language=EN&product=Course&test=&audience=DSA&topic=Project_Management&priority=Alpha&utm_content=deal4584&utm_term=_._ag_160270534985_._ad_696202838292_._kw__._de_c_._dm__._pl__._ti_dsa-1677053908688_._li_1007768_._pd__._&matchtype=&gad_source=1&gclid=EAIaIQobChMI8smk9IHdhwMVhDWDAx03UzEzEAAYAiAAEgKmjvD_BwE",
        icon: faProjectDiagram,
        color: "#fd7e14",
      },
      {
        id: 350,
        name: "Social Media Marketing Specialization",
        url: "https://www.mygreatlearning.com/great-lakes-pg-program-strategic-digital-marketing?&utm_source=search&utm_medium=gc1007768&utm_campaign=sm_course-ph-blr-chn-ser-lead-pr-sdm&campaign_id=19636781461&adgroup_id=145112464545&ad_id=646907338544&utm_target=kwd-10621106800&Keyword=social%20media%20marketing%20course&placement=&gad_source=1&gclid=EAIaIQobChMI8b2h7IHdhwMVmqNmAh34Dj3rEAAYAiAAEgJst_D_BwE",
        icon: faShareAlt,
        color: "#6f42c1",
      },
      {
        id: 349,
        name: "Marketing in a Digital World",
        url: "https://www.udemy.com/course/learn-digital-marketing-course/?utm_source=adwords&utm_medium=udemyads&utm_campaign=Search_Keyword_Beta_Prof_la.EN_cc.INDIA&campaigntype=Search&portfolio=India&language=EN&product=Course&test=&audience=Keyword&topic=Digital_Marketing&priority=Beta&utm_content=deal4584&utm_term=_._ag_163642194609_._ad_696202799880_._kw_%23digital%20marketing_._de_c_._dm__._pl__._ti_kwd-837556182626_._li_1007768_._pd__._&matchtype=b&gad_source=1&gclid=EAIaIQobChMIvovy5YHdhwMV86RmAh3WXhRgEAAYASAAEgI_oPD_BwE",
        icon: faBullseye,
        color: "#17a2b8",
      },
      {
        id: 348,
        name: "English for Career Development",
        url: "https://www.classcentral.com/course/careerdevelopment-6011",
        icon: faLanguage,
        color: "#e83e8c",
      },
      {
        id: 347,
        name: "Entrepreneurship: Launching an Innovative Business",
        url: "https://www.udemy.com/course/entrepreneruship-and-innovation-start-your-own-business/",
        icon: faLightbulb,
        color: "#343a40",
      },

      {
        id: 346,
        name: "Entrepreneurship Specialization",
        url: "https://www.udacity.com/?promo=year_end&coupon=JULY4&utm_source=gsem_india_brand&utm_medium=ads_r&utm_campaign=18068487081_c_individuals&utm_term=140610604936&utm_keyword=udacity_p&utm_source=gsem_india_brand&utm_medium=ads_r&utm_campaign=18068487081_c&utm_term=140610604936_in&utm_keyword=udacity_p&gad_source=1&gclid=EAIaIQobChMI-MGwvYHdhwMVf5ZLBR2InB__EAAYASAAEgKAoPD_BwE",
        icon: faLightbulb,
        color: "#20c997",
      },
      {
        id: 345,
        name: "Foundations of Teaching for Learning",
        url: "https://www.shiksha.com/online-courses/foundations-of-teaching-for-learning-curriculum-course-courl2251",
        icon: faChalkboardTeacher,
        color: "#007bff",
      },
      {
        id: 344,
        name: "Online Teaching Specialization",
        url: "https://www.udemy.com/courses/teaching-and-academics/teacher-training/?utm_source=adwords&utm_medium=udemyads&utm_campaign=Search_DSA_Beta_Prof_la.EN_cc.INDIA&utm_term=_._ag_160270536225_._ad_696202838385_._kw__._de_c_._dm__._pl__._ti_dsa-1677053919088_._li_1007768_._pd__._&matchtype=&gad_source=1&gclid=EAIaIQobChMI_eb_rYHdhwMVAqRmAh3DFCGSEAAYASAAEgIQ0PD_BwE",
        icon: faLaptopHouse,
        color: "#dc3545",
      },
      {
        id: 343,
        name: "Health Informatics",
        url: "https://www.udemy.com/course/health-informatics-101/?utm_source=adwords&utm_medium=udemyads&utm_campaign=Search_DSA_GammaCatchall_NonP_la.EN_cc.INDIA&gad_source=1&gclid=EAIaIQobChMI1JiWqIHdhwMVmRmDAx2UpRXrEAAYASAAEgKdjfD_BwE",
        icon: faHeartbeat,
        color: "#28a745",
      },
      {
        id: 342,
        name: "Introduction to Healthcare",
        url: "https://www.coursera.org/learn/intro-to-healthcare",
        icon: faClinicMedical,
        color: "#ffc107",
      },
      {
        id: 341,
        name: "Strategic Human Resource Management",
        url: "https://www.skillshare.com/en/browse/hr-company-culture",
        icon: faUsersCog,
        color: "#fd7e14",
      },
      {
        id: 340,
        name: "Human Resource Management: HR for People Managers",
        url: "https://www.upgrad.com/hrm-analytics-pcp-iimk/?utm_source=GOOGLE&utm_medium=NBSEARCH&utm_campaign=IND_ACQ_WEB_GOOGLE_NBSEARCH_MV_IIMK_CHRMA_T1&utm_term=hr%20course&gad_source=1&gclid=Cj0KCQjwh7K1BhCZARIsAKOrVqEBwhpgxTx8yKWJQ0IOlGirSXaIRK3Xzr-kketWFv_W5_QL3MmBjFgaAvUMEALw_wcB",
        icon: faUserTie,
        color: "#6f42c1",
      },
      {
        id: 339,
        name: "Investment Management Specialization",
        url: "https://www.coursera.org/specializations/investment-management",
        icon: faChartPie,
        color: "#17a2b8",
      },
      {
        id: 338,
        name: "Financial Markets by Yale University",
        url: "https://coursesity.com/course-detail/financial-markets",
        icon: faCoins,
        color: "#e83e8c",
      },
      {
        id: 337,
        name: "Certified Business Analysis Professional (CBAP)",
        url: "https://www.udemy.com/course/certified-business-analysis-professional-cbap/?couponCode=IND21PM",
        icon: faClipboardCheck,
        color: "#343a40",
      },

      {
        id: 336,
        name: "Business Analysis & Process Management",
        url: "https://www.shiksha.com/online-courses/business-analysis-process-management-course-courl5147",
        icon: faProjectDiagram,
        color: "#20c997",
      },
      {
        id: 335,
        name: "Google Project Management",
        url: "https://www.udemy.com/courses/search/?src=ukw&q=Google+Project+Management",
        icon: faTasks,
        color: "#007bff",
      },
      {
        id: 334,
        name: "Project Management Professional (PMP)",
        url: "https://udemy.com/course/the-project-management-course-beginner-to-project-manager/?couponCode=IND21PM",
        icon: faClipboardList,
        color: "#dc3545",
      },
      {
        id: 333,
        name: "Google Digital Marketing & E-commerce",
        url: "https://www.futurelearn.com/subjects/business-and-management-courses/digital-marketing",
        icon: faShoppingCart,
        color: "#28a745",
      },
      {
        id: 332,
        name: "Digital Marketing Specialization",
        url: "https://www.upgrad.com/digital-marketing-courses/",
        icon: faBullhorn,
        color: "#ffc107",
      },
      {
        id: 331,
        name: "Certified Information Systems Security Professional (CISSP)",
        url: "https://www.udemy.com/course/isc2-certified-information-systems-security-professional-cissp/",
        icon: faShieldAlt,
        color: "#fd7e14",
      },
      {
        id: 330,
        name: "Cybersecurity Specialization",
        url: "https://www.skillshare.com/en/classes/cyber-security-go-from-zero-to-hero/1406735847",
        icon: faUserSecret,
        color: "#6f42c1",
      },
      {
        id: 329,
        name: "Google Cloud Professional Certificate",
        url: "https://cloud.google.com/learn/certification",
        icon: faCloud,
        color: "#17a2b8",
      },
      {
        id: 328,
        name: "AWS Certified Solutions Architect",
        url: "https://www.udemy.com/courses/search/?src=ukw&q=AWS+Certified+Solutions+Architect",
        icon: faServer,
        color: "#e83e8c",
      },
      {
        id: 327,
        name: "React Developer",
        url: "https://www.udemy.com/course/complete-react-developer-zero-to-mastery/",
        icon: faCode,
        color: "#343a40",
      },

      {
        id: 326,
        name: "Full Stack Web Developer",
        url: "https://www.udacity.com/course/full-stack-web-developer-nanodegree--nd0044",
        icon: faLaptopCode,
        color: "#20c997",
      },
      {
        id: 325,
        name: "AI For Everyone by Andrew Ng",
        url: "https://www.coursera.org/learn/ai-for-everyone?utm_medium=sem&utm_source=gg&utm_campaign=b2c_india_ai-for-everyone_deeplearning.ai_ftcof_learn_arte_may-24_dr_sem_rsa_gads_lg-all",
        icon: faRobot,
        color: "#007bff",
      },
      {
        id: 324,
        name: "Deep Learning Specialization",
        url: "https://www.deeplearning.ai/courses/deep-learning-specialization/",
        icon: faBrain,
        color: "#dc3545",
      },
      {
        id: 323,
        name: "Machine Learning by Stanford University",
        url: "https://www.coursera.org/specializations/machine-learning-introduction",
        icon: faMicrochip,
        color: "#28a745",
      },
      {
        id: 322,
        name: "IBM Data Science Professional Certificate",
        url: "https://www.udemy.com/courses/search/?src=ukw&q=IBM+Data+Science+Professional+Certificate",
        icon: faChartBar,
        color: "#ffc107",
      },
      {
        id: 321,
        name: "Data Science Specialization",
        url: "https://www.udemy.com/courses/search/?src=ukw&q=Data+Science+Specialization",
        icon: faDatabase,
        color: "#fd7e14",
      },
      {
        id: 22,
        name: "Harvard Online Business",
        url: "https://online.hbs.edu",
        icon: faUniversity,
        color: "#6f42c1",
      },
    ],
  },
  {
    title: "IT & Software",
    items: [
      {
        id: 21,
        name: "Codecademy",
        url: "https://www.codecademy.com",
        icon: faCode,
        color: "#007bff",
      },
    ],
  },
  {
    title: "Language Learning",
    items: [
      {
        id: 23,
        name: "Duolingo",
        url: "https://www.duolingo.com",
        icon: faLanguage,
        color: "#007bff",
      },
    ],
  },
];

const SkillsLearningPage = () => {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-6">Skills & Learning</h1>

      {/* <div className="text-right mb-6">
        <a
          href="/bookmark/index"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View Bookmarks
        </a>
      </div> */}

      {skillData.map((section) => (
        <div key={section.title} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-6 text-center"
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  size="3x"
                  style={{ color: item.color }}
                />
                <h5 className="text-lg font-medium mt-4 text-blue-600">
                  {item.name}
                </h5>
                <div className="flex justify-center gap-3 mt-4">
                  <a
                    href={item.url}
                    target="_blank"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    rel="noreferrer"
                  >
                    View
                  </a>
                  <button
                    onClick={() => alert(`Bookmark added for ${item.name}`)}
                    className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
                  >
                    Bookmark
                  </button>
                </div>
                {/* Optional placeholder divs for bookmark message and loader */}
                <div className="mt-2 hidden text-green-600">Bookmarked!</div>
                <div className="mt-2 hidden">Loading...</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsLearningPage;
