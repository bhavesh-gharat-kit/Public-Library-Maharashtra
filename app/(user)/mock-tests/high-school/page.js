"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {Header, Footer} from "@/components";
import {
  faUserGear,
  faBriefcase,
  faLeaf,
  faComments,
  faHeartbeat,
  faMicrochip,
  faBullseye,
  faPiggyBank,
  faClock,
  faLightbulb,
  faGraduationCap,
  faHandshake,
  faSeedling,
  faLandmark,
  faGlobe,
  faAppleAlt,
  faDumbbell,
  faSmile,
  faShieldAlt,
  faLaptopCode,
  faRobot,
  faLanguage,
  faIdBadge,
  faMicrophone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Page() {
  useEffect(() => {
    AOS.init({
      once: false,
      duration: 500,
      easing: "ease-in-out",
      offset: 100,
    });
  }, []);

  const allResources = [
    {
      type: "Life Skills & Personal Development",
      typeIcon: faUserGear,
      
      title: "Goal Setting for Students: A Step-by-Step Guide",
      icon: faBullseye,
      color: "text-blue-600",
      aos: "fade-up",
      link: "https://www.oxfordscholastica.com/blog/university-preparation-articles/goal-setting-for-students-a-step-by-step-guide/",
    },
    {
      type: "Life Skills & Personal Development",
      typeIcon: faUserGear,
      title: "School of Finance: 7 Essential Tips for High School Students",
      icon: faPiggyBank,
      color: "text-pink-300",
      aos: "slide-up",
      link: "https://www.penncommunitybank.com/blog/school-of-finance-7-essential-tips-for-high-school-students/",
    },
    {
      type: "Life Skills & Personal Development",
      typeIcon: faUserGear,
      title: "Complete Guide to Stress and Time Management for Students",
      icon: faClock,
      color: "text-yellow-600",
      aos: "fade-right",
      link: "https://www.uwslondon.ac.uk/blog/complete-guide-to-stress-and-time-management-for-students/",
    },
    {
      type: "Career Awareness & Future Readiness",
      typeIcon: faBriefcase,
      title: "Career Exploration (STEM, Arts, Entrepreneurship)",
      icon: faLightbulb,
      color: "text-red-600",
      aos: "zoom-in",
      link: "https://blog.definedlearning.com/blog/early-stem-career-exploration",
    },
    {
      type: "Career Awareness & Future Readiness",
      typeIcon: faBriefcase,
      title: "Comprehensive Scholarship Guide",
      icon: faGraduationCap,
      color: "text-orange-300",
      aos: "slide-down",
      link: "https://study.com/resources/college-scholarships-guide",
    },
    {
      type: "Career Awareness & Future Readiness",
      typeIcon: faBriefcase,
      title: "Workplace Etiquette: 21 Dos and Don’ts of the Workplace",
      icon: faHandshake,
      color: "text-indigo-600",
      aos: "fade-left",
      link: "https://graduate.northeastern.edu/knowledge-hub/workplace-etiquette/",
    },
    {
      type: "Environment & Social Responsibility",
      typeIcon: faLeaf,
      title: "Social Innovation | Social Entrepreneurship",
      icon: faSeedling,
      color: "text-green-600",
      aos: "flip-up",
      link: "https://impactgarden.org/social-innovation/",
    },
    {
      type: "Environment & Social Responsibility",
      typeIcon: faLeaf,
      title: "National Centre for Good Governance",
      icon: faLandmark,
      color: "text-stone-400",
      aos: "flip-down",
      link: "https://ncgg.org.in/training/",
    },
    {
      type: "Environment & Social Responsibility",
      typeIcon: faLeaf,
      title: "Sustainable Development Goals",
      icon: faGlobe,
      color: "text-green-300",
      aos: "fade-down",
      link: "https://www.unv.org/volunteerism-and-global-goals",
    },
    {
      type: "Health & Well-being",
      typeIcon: faHeartbeat,
      title: "Nutrition for Teenagers",
      icon: faAppleAlt,
      color: "text-blue-600",
      aos: "flip-left",
      link: "https://www.nutrition.org.uk/nutrition-for/teenagers/",
    },
    {
      type: "Health & Well-being",
      typeIcon: faHeartbeat,
      title: "Fitness for Both Students and Athletes",
      icon: faDumbbell,
      color: "text-zinc-700",
      aos: "zoom-out-right",
      link: "https://advantagefitness.com/high-school-fitness-for-both-students-and-athletes/",
    },
    {
      type: "Health & Well-being",
      typeIcon: faHeartbeat,
      title: "Mental Health",
      icon: faSmile,
      color: "text-green-600",
      aos: "fade-left",
      link: "https://www.pursuit-of-happiness.org/mental-health-and-wellbeing-toolkit-for-trainers/",
    },
    {
      type: "Digital Literacy & Tech Skills",
      typeIcon: faMicrochip,
      title: "Cyber Ethics",
      icon: faShieldAlt,
      color: "text-cyan-800",
      aos: "flip-left",
      link: "https://www.gov.hk/en/residents/communication/infosec/guidelines/cyberethics.htm",
    },
    {
      type: "Digital Literacy & Tech Skills",
      typeIcon: faMicrochip,
      title: "App Development & Web Designing",
      icon: faLaptopCode,
      color: "text-purple-300",
      aos: "zoom-in-left",
      link: "https://www.designstudiouiux.com/web-design-agency/",
    },
    {
      type: "Digital Literacy & Tech Skills",
      typeIcon: faMicrochip,
      title: "Machine Learning",
      icon: faRobot,
      color: "text-amber-700",
      aos: "fade-up-right",
      link: "https://in.mathworks.com/solutions/machine-learning.html",
    },
    {
      type: "Language & Communication",
      typeIcon: faComments,
      title: "15 Evergreen Careers for Language Enthusiasts",
      icon: faLanguage,
      color: "text-emerald-600",
      aos: "fade-up-left",
      link: "https://www.mindler.com/blog/15-evergreen-careers-for-language-enthusiasts-skills-courses-exams-career-scope/",
    },
    {
      type: "Language & Communication",
      typeIcon: faComments,
      title: "6 High School Resume Examples for 2025",
      icon: faIdBadge,
      color: "text-yellow-300",
      aos: "zoom-in-right",
      link: "https://www.resumebuilder.com/resume-examples/high-school-students/",
    },
    {
      type: "Language & Communication",
      typeIcon: faComments,
      title: "Public Speaking And Presentation Skills",
      icon: faMicrophone,
      color: "text-stone-300",
      aos: "fade-down-right",
      link: "https://kapable.club/blog/public-speaking/public-speaking-and-presentation-skills-all-you-need-to-know/",
    },
  ];

  // ✅ FIXED: Include typeIcon while grouping
  const grouped = [...new Set(allResources.map((item) => item.type))].map((type) => {
    const items = allResources.filter((item) => item.type === type).slice(0, 3);
    const typeIcon = items[0]?.typeIcon;
    return { type, typeIcon, items };
  });

  return (
    <>
      
      <main>
        <section className="py-14 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-center text-3xl lg:text-4xl font-extrabold text-blue-600 mb-12">
              📚 National Library, Bandra Digital Knowledge Centre (NLBDKC)
            </h1>

            {grouped.map((group, idx) => (
              <div key={idx} className="mb-16" data-aos="fade-up">
                <h2 className="text-2xl font-bold text-zinc-600 mb-8 text-center border-l-4 border-blue-500 pl-4 inline-block">
                  <FontAwesomeIcon
                    icon={group.typeIcon}
                    className="pr-2 text-2xl text-red-300 drop-shadow-lg"
                  />
                  {group.type}
                </h2>

                <div className="flex flex-wrap justify-center gap-6">
                  {group.items.map((resource, index) => (
                    <div
                      key={index}
                      className="w-full sm:w-72 md:w-80"
                      data-aos={resource.aos}
                      data-aos-delay={index * 100}
                    >
                      <div className="bg-white rounded-xl shadow-md hover:shadow-xl h-full p-6 transition-all duration-300 flex flex-col items-center justify-between">
                        <div className={`text-4xl mb-4 drop-shadow-sm ${resource.color}`}>
                          <FontAwesomeIcon icon={resource.icon} />
                        </div>
                        <h3 className="text-md font-semibold text-center text-gray-800 mb-2">
                          {resource.title}
                        </h3>
                        <a
                          href={resource.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline font-medium mt-auto"
                        >
                          View Details →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      
    </>
  );
}
