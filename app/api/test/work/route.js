// BOOKS INSERTION LOGIC

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // your Prisma client instance


export async function GET() {
  try {
    

    let books = [
      {
        "title": "अस्पृश्यांचा लष्करी पेशा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/अस्पृश्यांचा लष्करी पेशा.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "आसरा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%86%E0%A4%B8%E0%A4%B0%E0%A4%BE.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "कर्मवीर भाऊराव पाटील (काल आणि कर्तृत्व)",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%95%E0%A4%B0%E0%A5%8D%E0%A4%AE%E0%A4%B5%E0%A5%80%E0%A4%B0%20%E0%A4%AD%E0%A4%BE%E0%A4%8A%E0%A4%B0%E0%A4%BE%E0%A4%B5%20%E0%A4%AA%E0%A4%BE%E0%A4%9F%E0%A5%80%E0%A4%B2.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "कात्यायन शुल्ब सूत्रे",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%95%E0%A4%BE%E0%A4%B2%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%AF%E0%A4%A8%20%E0%A4%B6%E0%A5%81%E0%A4%B2%E0%A5%8D%E0%A4%AC%20%E0%A4%B8%E0%A5%82%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A5%87.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्राचे शिल्पकार – नाना पाटील",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%B0%E0%A4%BE%E0%A4%B7%E0%A5%8D%E0%A4%9F%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%9A%E0%A5%87%20%E0%A4%B6%E0%A4%BF%E0%A4%B2%E0%A5%8D%E0%A4%AA%E0%A4%95%E0%A4%BE%E0%A4%B0%20-%20%E0%A4%A8%E0%A4%BE%E0%A4%A8%E0%A4%BE%20%E0%A4%AA%E0%A4%BE%E0%A4%9F%E0%A5%80%E0%A4%B2.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "खानदेशातील कृषक जीवन सचित्र कोश",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%96%E0%A4%BE%E0%A4%A8%E0%A4%A6%E0%A5%87%E0%A4%B6%E0%A4%BE%E0%A4%A4%E0%A5%80%E0%A4%B2%20%E0%A4%95%E0%A5%83%E0%A4%B7%E0%A4%95%20%E0%A4%9C%E0%A5%80%E0%A4%B5%E0%A4%A8.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "गजाआडच्या कविता",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%97%E0%A4%9C%E0%A4%BE%E0%A4%86%E0%A4%A1%E0%A4%9A%E0%A5%8D%E0%A4%AF%E0%A4%BE%20%E0%A4%95%E0%A4%B5%E0%A4%BF%E0%A4%A4%E0%A4%BE.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "चलेजाव आंदोलन",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%9A%E0%A4%B2%E0%A5%87%E0%A4%9C%E0%A4%BE%E0%A4%B5%20%E0%A4%86%E0%A4%82%E0%A4%A6%E0%A5%8B%E0%A4%B2%E0%A4%A8.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्राचे शिल्पकार तंट्या भिल्ल",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%9C%E0%A4%A8%E0%A4%A8%E0%A4%BE%E0%A4%AF%E0%A4%95%20%E0%A4%A4%E0%A4%82%E0%A4%9F%E0%A5%8D%E0%A4%AF%E0%A4%BE%20%E0%A4%AD%E0%A4%BF%E0%A4%B2%E0%A5%8D%E0%A4%B2.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "टोळ्ळु-गट्टी",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%9F%E0%A5%8B%E0%A4%B3%E0%A5%8D%E0%A4%B3%E0%A5%81-%E0%A4%97%E0%A4%9F%E0%A5%8D%E0%A4%9F%E0%A5%80.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "ट्रांझिस्टर",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%9F%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%82%E0%A4%9D%E0%A4%BF%E0%A4%B8%E0%A5%8D%E0%A4%9F%E0%A4%B0.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "ताऱ्यांचे अंतरंग",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/ताऱ्यांचे अंतरंग.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "धर्मकीर्तन",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%A7%E0%A4%B0%E0%A5%8D%E0%A4%AE%E0%A4%95%E0%A5%80%E0%A4%B0%E0%A5%8D%E0%A4%A4%E0%A4%A8.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "पंडिता रमाबाई यांचा इंग्लंडचा प्रवास",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AA%E0%A4%82%E0%A4%A1%E0%A4%BF%E0%A4%A4%E0%A4%BE%20%E0%A4%B0%E0%A4%AE%E0%A4%BE%E0%A4%AC%E0%A4%BE%E0%A4%88%20%E0%A4%AF%E0%A4%BE%E0%A4%82%E0%A4%9A%E0%A4%BE%20%E0%A4%87%E0%A4%82%E0%A4%97%E0%A5%8D%E0%A4%B2%E0%A4%82%E0%A4%A1%E0%A4%9A%E0%A4%BE%20%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%B5%E0%A4%BE%E0%A4%B8.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "पाणिनीय व्याकरण आणि भाषा तत्त्वज्ञान",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AA%E0%A4%BE%E0%A4%A3%E0%A4%BF%E0%A4%A8%E0%A5%80%E0%A4%AF%20%E0%A4%B5%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%95%E0%A4%B0%E0%A4%A3%20%E0%A4%86%E0%A4%A3%E0%A4%BF%20%E0%A4%AD%E0%A4%BE%E0%A4%B7%E0%A4%BE-%E0%A4%A4%E0%A4%A4%E0%A5%8D%E0%A4%A4%E0%A5%8D%E0%A4%B5%E0%A4%9C%E0%A5%8D%E0%A4%9E%E0%A4%BE%E0%A4%A8.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "प्लॅस्टिकची मेजवानी",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/प्लॅस्टिकची मेजवानी.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "बहिणाईची गाणी एक अभ्यास",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/बहिणाईची गाणी एक अभ्यास.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "बहुरुपी बहुगुणी कार्बन",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AC%E0%A4%B9%E0%A5%81%E0%A4%B0%E0%A5%82%E0%A4%AA%E0%A5%80%20%E0%A4%AC%E0%A4%B9%E0%A5%81%E0%A4%97%E0%A5%81%E0%A4%A3%E0%A5%80%20%E0%A4%95%E0%A4%BE%E0%A4%B0%E0%A5%8D%E0%A4%AC%E0%A4%A8.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महात्मा गांधी – रविंद्रनाथ ठाकूर",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%A4%E0%A5%8D%E0%A4%AE%E0%A4%BE%20%E0%A4%97%E0%A4%BE%E0%A4%82%E0%A4%A7%E0%A5%80%20%E2%80%93%20%E0%A4%B0%E0%A4%B5%E0%A5%80%E0%A4%82%E0%A4%A6%E0%A5%8D%E0%A4%B0%E0%A4%A8%E0%A4%BE%E0%A4%A5%20%E0%A4%A0%E0%A4%BE%E0%A4%95%E0%A5%82%E0%A4%B0.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्राचे शिल्पकार – दादासाहेब फाळके",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%A6%E0%A4%BE%E0%A4%A6%E0%A4%BE%E0%A4%B8%E0%A4%BE%E0%A4%B9%E0%A5%87%E0%A4%AC%20%E0%A4%AB%E0%A4%BE%E0%A4%B3%E0%A4%95%E0%A5%87.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "दासोपंतकृत गीतार्णव_अध्याय १६ वा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/दासोपंतकृत गीतार्णव_अध्याय १६ वा.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "देशनांक निर्देशांक",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/देशनांक निर्देशांक.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "परिवर्तनाची क्षितिजे",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/परिवर्तनाची क्षितिजे.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "पाणी पुरवठा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/पाणी पुरवठा.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "पिता-पुत्र",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/पिता-पुत्र.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "पुस्तक–बांधणी",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/पुस्तक–बांधणी.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "प्रबोधनकार ठाकरे समग्र वाङ्‌मय खंड चौथा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/प्रबोधनकार ठाकरे समग्र वाङ्‌मय खंड चौथा.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "प्राणिसृष्टी भाग पहिला",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/प्राणिसृष्टी भाग पहिला.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "भारताचा स्वातंत्र्यलढा १९३०-३४",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/भारताचा स्वातंत्र्यलढा १९३०-३४.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "भौतिकशास्त्रातील नोबल पारितोषिक विजेते भाग २",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/भौतिकशास्त्रातील नोबल पारितोषिक विजेते भाग २.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मधुमेह",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/मधुमेह.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महापर्व",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/महापर्व.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्र महोदयाचा पूर्वरंग",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/महाराष्ट्र महोदयाचा पूर्वरंग.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्राचे शिल्पकार गोविंदभाई श्रॉफ",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/महाराष्ट्राचे शिल्पकार गोविंदभाई श्रॉफ.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "लैगिंक नीती आणि समाज",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/लैगिंक नीती आणि समाज.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "विलक्षण जपानी",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/विलक्षण जपानी.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "शेक्सपिअर परिचय ग्रंथ",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/शेक्सपिअर परिचय ग्रंथ.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "सेनापती बापट वाङ्मय-समग्र ग्रंथ खंड ४ था",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/सेनापती बापट वाङ्मय-समग्र ग्रंथ खंड ४ था.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "सेनापती बापट वाङ्मय–समग्र ग्रंथ खंड २ रा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/सेनापती बापट वाङ्मय–समग्र ग्रंथ खंड २ रा.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "जाति-उद्‌गम",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/जाति-उद्‌गम.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "तिसरी लाट",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/तिसरी लाट.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "धर्मशास्त्राचा इतिहास पूर्वार्ध",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/धर्मशास्त्राचा इतिहास पूर्वार्ध.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "प्रवासवर्णन_एक वाङ्‌मयप्रकार",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/प्रवासवर्णन_एक वाङ्‌मयप्रकार.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "फळे व भाज्यांपासून टिकाऊ पदार्थ",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/फळे व भाज्यांपासून टिकाऊ पदार्थ.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "ब्राह्मण",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/ब्राह्मण.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "भारतीय वाद्ये",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/भारतीय वाद्ये.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "लोकसंस्कृतीतील स्त्रीरूपे",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/लोकसंस्कृतीतील स्त्रीरूपे.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मृगपक्षिशास्त्र",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/मृगपक्षिशास्त्र.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "आदर्श राज्य",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/आदर्श राज्य.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मिष्टखाद्ये",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/मिष्टखाद्ये.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "कर्मवीर दादासाहेब गायकवाड-काल आणि कर्तृत्व",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/कर्मवीर दादासाहेब गायकवाड काल आणि कर्तृत्व.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "माताजी",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/माताजी.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "MAHARASHTRA IN MAPS",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/MAHARASHTRA IN MAPS.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "सत्यशोधक दीनमित्र कार मुकुंदराव पाटील यांचे समग्र वाङ्‌मय",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/सत्यशोधक दीनमित्र कार मुकुंदराव पाटील यांचे समग्र वाङ्‌मय.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "थेरीगाथा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/थेरीगाथा.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "पाणी–जीवन",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/पाणी–जीवन.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "युरायपिडीजची शोक नाट्ये",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/युरायपिडीजची शोक नाट्ये.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "बंडखोरीचे तत्त्वज्ञान",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/बंडखोरीचे तत्त्वज्ञान.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "पं. जवाहरलाल नेहरू-व्यक्ति आणि कार्य",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/पं. जवाहरलाल नेहरू व्यक्ति आणि कार्य.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "कौटिलीय अर्थशास्त्रातील शिल्पशास्त्र",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/कौटिलीय अर्थशास्त्रातील शिल्पशास्त्र.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "समानता",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/समानता.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्राचे शिल्पकार रामजोशी",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/महाराष्ट्राचे शिल्पकार रामजोशी.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "धर्मनिरपेक्षता नव्हे, इहवाद",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/धर्मनिरपेक्षता नव्हे, इहवाद.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मोरस मराठी कविता दशावतार",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/मोरस मराठी कविता दशावतार.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "दलित साहित्य एक अभ्यास",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/दलित साहित्य एक अभ्यास.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "संगीत आणि कल्पकता",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/संगीत आणि कल्पकता.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "सातवाहन आणि पश्चिम क्षत्रप आणि त्यांचे कोरीव लेखः",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/सातवाहन आणि पश्चिम क्षत्रप आणि त्यांचे कोरीव लेखः.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "खनिज तेल व तज्जन्य रसायने",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/खनिज तेल व तज्जन्य रसायने.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "दशरूपक-विधान",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/दशरूपक-विधान.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "स्ट्रॅविन्स्कीचे सांगीतिक सौंदर्यशास्त्र",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/स्ट्रॅविन्स्कीचे सांगीतिक सौंदर्यशास्त्र.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "डॉन संथ वहातच आहे_भाग १",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/डॉन संथ वहातच आहे_भाग १.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "यंत्रकाम भाग– १",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/यंत्रकाम भाग– १.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "संहिता समीक्षा आणि परिभाषिक संज्ञा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/संहितासमीक्षा आणि पारिभाषिक संज्ञा.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "आरोग्य आणि आहारशास्त्र",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/आरोग्य आणि आहारशास्त्र.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्राचे शिल्पकार लोकशाहीर पठ्ठे बापूराव",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/महाराष्ट्राचे शिल्पकार लोकशाहीर पठ्ठे बापूराव.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "अहिराणी लोक साहित्य दर्शन खंड दुसरा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/अहिराणी लोक साहित्य दर्शन खंड दुसरा.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मोगल दरबारची बातमीपत्रे खंड तिसरा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/मोगल दरबारची बातमीपत्रे खंड तिसरा.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "आभास आणि वास्तवता",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/आभास आणि वास्तवता.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "कातन यंत्राचे अंतरंग",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/कातन यंत्राचे अंतरंग.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "सत्याग्रही समाजवाद आचार्य जावडेकर निवडक लेखसंग्रह",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/सत्याग्रही समाजवाद आचार्य जावडेकर निवडक लेखसंग्रह.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मोगल दरबारची बातमी पत्रे-१",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/मोगल दरबारची बातमी पत्रे-१.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महान भारतीय क्रांतिकारक प्रथम पर्व १७७० ते १९००",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/महान भारतीय क्रांतिकारक प्रथम पर्व १७७० ते १९००.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "चार शूल्बसुत्रे",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/चार शूल्बसुत्रे.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्राचे शिल्पकार ताराबाई शिंदे",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/महाराष्ट्राचे शिल्पकार ताराबाई शिंदे.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्रातील पुरातत्त्व",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/महाराष्ट्रातील पुरातत्त्व.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "डॉन संथ वहातच आहे भाग २",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/डॉन संथ वहातच आहे भाग २.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "दिल्लीच्या शहाजहानचा इतिहास",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/दिल्लीच्या शहाजहानचा इतिहास.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "भट्टि व्यक्ति आणि वाङ्मय",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/भट्टि व्यक्ति आणि वाङ्मय.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "एमिली डिकिन्सन्‌",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/एमिली डिकिन्सन्‌.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "यशोधन",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/यशोधन.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "काश्यपशिल्प",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/काश्यपशिल्प.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "पाकिस्तानचे जन्मरहस्य",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/पाकिस्तानचे जन्मरहस्य.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "रायगडची जीवनकथा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/रायगडची जीवनकथा.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "प्रबोधनकार ठाकरे समग्र वाङ्‌मय खंड पहिला",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/प्रबोधनकार ठाकरे समग्र वाङ्‌मय खंड पहिला.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "दूध आणि दुधाचे पदार्थ",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/दूध आणि दुधाचे पदार्थ.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "अंकीय संगणकाचा परिचय",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/अंकीय संगणकाचा परिचय.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "स्वातंत्र्याचे भय",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/स्वातंत्र्याचे भय.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "संत रोहिदास चरित्र आणि वाङ्‌मय",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/संत रोहिदास चरित्र आणि वाङ्‌मय.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "भारतीय मुसलमान",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/भारतीय मुसलमान.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "साम्राज्यवादी षड्यंत्र",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/साम्राज्यवादी षड्यंत्र.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मोगल दरबारची बातमी पत्रे खंड २",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/मोगल दरबारची बातमी पत्रे खंड २.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "Maratha Wall Painting",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/Maratha Wall Painting.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "संगीताचार्य पं. विष्णु नारायण भातखंडे",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/संगीताचार्य पं. विष्णु नारायण भातखंडे.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "भाषाशुद्धि",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/भाषाशुद्धि.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "भौतिकी शास्त्रातील नोबेल पारितोषिक विजेते भाग-३",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/भौतिकी शास्त्रातील नोबेल पारितोषिक विजेते भाग-३.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "आचार्य भागवत संकलित वाङ्मय_खंड दुसरा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/आचार्य भागवत संकलित वाङ्मय_खंड दुसरा.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "प्राणिसृष्टी भाग २",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/प्राणिसृष्टी भाग २.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "भारतीय मुसलमानांचा राजकीय इतिहास",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/भारतीय मुसलमानांचा राजकीय इतिहास.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "Studies in Ancient Indian History",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/Studies in Ancient Indian History.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "श्री. के. क्षी. वाङ्मयीन लेखसंग्रह",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/श्री. के. क्षी. वाङ्मयीन लेखसंग्रह.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "सुती वस्त्रोद्योग",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/सुती वस्त्रोद्योग.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "श्रृंगार श्रीरंग",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/श्रृंगार श्रीरंग.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महिमभट्टकृत व्यक्तिविवेक",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/महिमभट्टकृत व्यक्तिविवेक.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मानसशास्त्रः सद्यःकालीन प्रचलित संप्रदाय",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/मानसशास्त्रः सद्यःकालीन प्रचलित संप्रदाय.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "तेले व मेदे भाग ४ आणि ५",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/तेले व मेदे भाग ४ आणि ५.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "FRENCH RECORDS VOLUME V & VI",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/FRENCH RECORDS VOLUME V & VI.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "सावित्रीबाई फुले_काल आणि कर्तृत्व",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/सावित्रीबाई फुले_काल आणि कर्तृत्व.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "The Letters and Correspondence of Pandita Ramabai",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/The Letters and Correspondence of Pandita Ramabai.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "भौतिकी मानवशास्त्र",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/भौतिकी मानवशास्त्र.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "संपूर्ण गडकरी_खंड पहिला",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/संपूर्ण गडकरी_खंड पहिला.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "आगरकर-वाङ्मय खंड ३",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/आगरकर-वाङ्मय खंड ३.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "इस्लामची सामाजिक रचना",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/इस्लामची सामाजिक रचना.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "माडिया गोंडांची बोली",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/माडिया गोंडांची बोली.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "FRENCH RECORDS_VOLUMES I & II",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/FRENCH RECORDS_VOLUMES I & II.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "खड्‌गहस्त की सन्यस्त",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/खड्‌गहस्त की सन्यस्त.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "प्रबोधनकार ठाकरे समग्र वाङ्‌मय खंड तिसरा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/प्रबोधनकार ठाकरे समग्र वाङ्‌मय खंड तिसरा.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "तत्त्वज्ञानातील समस्या",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/तत्त्वज्ञानातील समस्या.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "संगीतदर्पण",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/संगीतदर्पण.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "India Fights for Freedom",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/India Fights for Freedom.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "उद्‌भट आणि त्याचा काव्यालंकार सारसंग्रह",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/उद्‌भट आणि त्याचा काव्यालंकार सारसंग्रह.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "पं. शिवनाथशास्त्री यांचे आत्मचरित्र",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/पं. शिवनाथशास्त्री यांचे आत्मचरित्र.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्रातील दप्तरखाने (वर्णन आणि तंत्र)",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/महाराष्ट्रातील दप्तरखाने (वर्णन आणि तंत्र).pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "वैज्ञानिक पारिभाषिक संज्ञा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/वैज्ञानिक पारिभाषिक संज्ञा.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "स्वातंत्र्योत्तर भारतीय स्त्री",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/स्वातंत्र्योत्तर भारतीय स्त्री.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "A HISTORY OF THE MARATHA NAVY AND MERCHANTSHIPS",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/A HISTORY OF THE MARATHA NAVY AND MERCHANTSHIPS.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "डॉ. भीमराव रामजी आंबेडकर चरित्र खंड १२ वा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/डॉ. भीमराव रामजी आंबेडकर चरित्र खंड १२ वा.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "कै. वीर वामनराव जोशी ह्यांची नाटके",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/कै. वीर वामनराव जोशी ह्यांची नाटके.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "म. शि. १ संत गाडगे महाराज (काल आणि कर्तृत्व)",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/म. शि. १ संत गाडगे महाराज (काल आणि कर्तृत्व).pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "सावित्रीबाई फुले समग्र वाङ्‌मय",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/सावित्रीबाई फुले समग्र वाङ्‌मय.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मानवी देह_भाग पहिला_खंड पहिला",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/मानवी देह_भाग पहिला_खंड पहिला.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "श्री भावार्थ रामायण खंड १ला‌",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/श्री भावार्थ रामायण खंड १ला.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "वंदे मातरम्‌",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/वंदे मातरम्‌.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "डॉ. भीमराव रामजी आंबेडकर चरित्र ग्रंथ खंड १०",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/डॉ. भीमराव रामजी आंबेडकर चरित्र ग्रंथ खंड १०.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "शीघ्रनागरी",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/शीघ्रनागरी.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "संपूर्ण गडकरी खंड २",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/संपूर्ण गडकरी खंड २.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "पोर्तुगीज-मराठा संबंध (मराठी)",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/पोर्तुगीज-मराठा संबंध (मराठी).pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "युद्ध आणि शांती",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/युद्ध आणि शांती.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मानवी शरीर विज्ञान",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/मानवी शरीर विज्ञान.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "रामायणावर नवा प्रकाश",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/रामायणावर नवा प्रकाश.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "डॉ. भीमराव रामजी आंबेडकर चरित्र खंड नववा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/डॉ. भीमराव रामजी आंबेडकर चरित्र खंड नववा.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "श्री. ज्ञानेश्वरी मुक्तचिंतन",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/श्री. ज्ञानेश्वरी मुक्तचिंतन.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "Bombay and Congress Presidents",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/Bombay and Congress Presidents.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "ॲरिस्टॉटलचे नीतिशास्त्र",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/ॲरिस्टॉटलचे नीतिशास्त्र.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "उत्तरकालीन मुघल_खंड २",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/उत्तरकालीन मुघल_खंड २.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मानवी देह_भाग दुसरा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/मानवी देह_भाग दुसरा.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मराठ्यांच्या इतिहासाची साधने पोर्तुगीज दफ्तर खंड ३",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/मराठ्यांच्या इतिहासाची साधने पोर्तुगीज दफ्तर खंड ३.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "बालचरित्र",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/बालचरित्र.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "बंदरविकास व नौकानयन",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/बंदरविकास व नौकानयन.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "बुद्धिबळे",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/बुद्धिबळे.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "लोकजीवन आणि लोकसंस्कृती",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/लोकजीवन आणि लोकसंस्कृती.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "तंजावूर नृत्य प्रबंध",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/तंजावूर नृत्य प्रबंध.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "सिबिल",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/सिबिल.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "डॉ. बाबासाहेब आंबेडकर गौरवग्रंथ",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/डॉ. बाबासाहेब आंबेडकर गौरवग्रंथ.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "शिवकाल (१६३० ते १७०७ इ.)",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/शिवकाल (१६३० ते १७०७ इ.).pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "क्रांतिपर्व",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/क्रांतिपर्व.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "सांस्कृतिक महाराष्ट्र भाग १",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/सांस्कृतिक महाराष्ट्र भाग १.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "धर्मशार्त्राचा इतिहास (सारांशरुप ग्रंथ, उत्तरार्ध)",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/धर्मशार्त्राचा इतिहास (सारांशरुप ग्रंथ, उत्तरार्ध).pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "धर्मरहस्य",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/धर्मरहस्य.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "औरंगजेबाचा इतिहास",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/औरंगजेबाचा इतिहास.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "लोकशाहीर अण्णा भाऊ साठे निवडक वाङ्मय",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/लोकशाहीर अण्णा भाऊ साठे निवडक वाङ्मय.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "लोकहितवादी समग्र वाङ्मय खंड २ रा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/लोकहितवादी समग्र वाङ्मय खंड २ रा.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "वेद बोलिला अनंत",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/वेद बोलिला अनंत.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मुसलमान (सूफी) संतांचे मराठी साहित्य",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/मुसलमान (सूफी) संतांचे मराठी साहित्य.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "भूमिका शिल्प",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/भूमिका शिल्प.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "वनश्रीसृष्टी खंड दुसरा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/वनश्रीसृष्टी खंड दुसरा.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "बौध्दधर्मावरील चार निबंध",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/बौध्दधर्मावरील चार निबंध.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "डॉन क्विक्झोट - भाग २",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/डॉन क्विक्झोट - भाग २.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "गांधी–पर्व",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/गांधी–पर्व.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "FRENCH RECORDS Vol. VII",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/FRENCH RECORDS Vol. VII.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "बुध्दी, प्रेरणा आणि क्रांती भाग १",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/बुध्दी, प्रेरणा आणि क्रांती भाग १.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "बाबा पदमनजी काल व कर्तृत्व",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/बाबा पदमनजी काल व कर्तृत्व.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "काँक्रीटची नियम पुस्तिका",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/काँक्रीटची नियम पुस्तिका.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "प्राणिजन्य मानवी रोग",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/प्राणिजन्य मानवी रोग.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "बंधाऱ्याचे स्थापत्यशास्त्र",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/बंधाऱ्याचे स्थापत्यशास्त्र.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "रसराज",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/रसराज.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मानवी देह भाग पहिला खंड दुसरा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/मानवी देह भाग पहिला खंड दुसरा.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "वनश्रीसृष्टी खंड १",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/वनश्रीसृष्टी खंड १.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "भाई माधवरावजी बागल",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/भाई माधवरावजी बागल.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "घोरपडे घराण्याचा इतिहास",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/घोरपडे घराण्याचा इतिहास.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "अंतरीक्ष-दर्शन",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/अंतरीक्ष-दर्शन.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "साहित्य सिध्दान्त",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/साहित्य सिध्दान्त.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "विनोबा-जीवन-दर्शन",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/विनोबा-जीवन-दर्शन.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "शिल्पप्रकाश",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/शिल्पप्रकाश.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "रस–भाव–विचार",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/रस–भाव–विचार.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "शारीर तत्त्वदर्शन",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/शारीर तत्त्वदर्शन.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "French Records_Vol. IX",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/French Records_Vol. IX.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "ज्ञानोदय लेखनसारसूची खंड २,भाग २",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/ज्ञानोदय लेखनसारसूची खंड २,भाग २.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महर्षी विठ्ठल रामजी शिंदे",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/महर्षी विठ्ठल रामजी शिंदे.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "आगरकर-वाङ्मय खंड २",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/आगरकर-वाङ्मय खंड २.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "होमिओपाथिक औषधांचा निघंटु",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/होमिओपाथिक औषधांचा निघंटु.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "कलेची मूलतत्त्वे",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/कलेची मूलतत्त्वे.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "संगीत रत्नाकर भाग ३",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/संगीत रत्नाकर भाग ३.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "बुद्धी, प्रेरणा आणि क्रांती",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/बुद्धी, प्रेरणा आणि क्रांती.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्र व गोवे शिलालेख-ताम्रपटांची वर्णनात्मक संदर्भ सूची",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/महाराष्ट्र व गोवे शिलालेख-ताम्रपटांची वर्णनात्मक संदर्भ सूची.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "French Records Vol. III & IV",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/French Records Vol. III & IV.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मराठी नाटकाची गंगोत्री",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/मराठी नाटकाची गंगोत्री.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्राचा इतिहास मराठा कालखंड (भाग २) १७०७ ते १८१८",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/महाराष्ट्राचा इतिहास मराठा कालखंड (भाग २) १७०७ ते १८१८.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "प्रबोधनकार ठाकरे समग्र वाङमय खंड पाचवा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/प्रबोधनकार ठाकरे समग्र वाङमय खंड पाचवा.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "सर्वदर्शनसंग्रह",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/सर्वदर्शनसंग्रह.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "बंगाली भाषा प्रवेश (मराठी माध्यमाच्याद्वारे) खंड १",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/बंगाली भाषा प्रवेश (मराठी माध्यमाच्याद्वारे) खंड १.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "देवनागरी मुद्राक्षरलेखनकला खंड पहिला",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/देवनागरी मुद्राक्षरलेखनकला खंड पहिला.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "पाणी पुरवठा आणि टाकाऊ द्रव्यांची विल्हेवाट",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/पाणी पुरवठा आणि टाकाऊ द्रव्यांची विल्हेवाट.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "पंचोपाख्यान",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/पंचोपाख्यान.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मराठी शब्दकोश खंड १",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/मराठी शब्दकोश खंड १.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मराठी वाङ्मयकोशःखंड-३",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/मराठी वाङ्मयकोशःखंड-३.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "गुलशने इब्राहिमी",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/गुलशने इब्राहिमी.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मराठी शब्दकोशःखंड-२",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/मराठी शब्दकोशःखंड2.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "वैज्ञानिक तत्त्वज्ञानाचा उदय",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/वैज्ञानिक तत्त्वज्ञानाचा उदय.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "गडकऱ्यांची नाटके चिंतन आणि आकलन",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/गडकऱ्यांची नाटके चिंतन आणि आकलन.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्राचे शिल्पकार – महर्षी धोंडो केशव कर्वे",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%B0%E0%A4%BE%E0%A4%B7%E0%A5%8D%E0%A4%9F%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%9A%E0%A5%87%20%E0%A4%B6%E0%A4%BF%E0%A4%B2%E0%A5%8D%E0%A4%AA%E0%A4%95%E0%A4%BE%E0%A4%B0%20%E2%80%93%20%E0%A4%A7%E0%A5%8B%E0%A4%82%E0%A4%A1%E0%A5%8B%20%E0%A4%95%E0%A5%87%E0%A4%B6%E0%A4%B5%20%E0%A4%95%E0%A4%B0%E0%A5%8D%E0%A4%B5%E0%A5%87.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्राचे शिल्पकार – लोकहितवादी",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%B0%E0%A4%BE%E0%A4%B7%E0%A5%8D%E0%A4%9F%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%9A%E0%A5%87%20%E0%A4%B6%E0%A4%BF%E0%A4%B2%E0%A5%8D%E0%A4%AA%E0%A4%95%E0%A4%BE%E0%A4%B0%20%E2%80%93%20%E0%A4%B2%E0%A5%8B%E0%A4%95%E0%A4%B9%E0%A4%BF%E0%A4%A4%E0%A4%B5%E0%A4%BE%E0%A4%A6%E0%A5%80.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्राचे शिल्पकार – वसंतराव नाईक",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%B0%E0%A4%BE%E0%A4%B7%E0%A5%8D%E0%A4%9F%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%9A%E0%A5%87%20%E0%A4%B6%E0%A4%BF%E0%A4%B2%E0%A5%8D%E0%A4%AA%E0%A4%95%E0%A4%BE%E0%A4%B0%20%E2%80%93%20%E0%A4%B5%E0%A4%B8%E0%A4%82%E0%A4%A4%E0%A4%B0%E0%A4%BE%E0%A4%B5%20%E0%A4%A8%E0%A4%BE%E0%A4%88%E0%A4%95.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्राचे शिल्पकार – साने गुरुजी",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%B0%E0%A4%BE%E0%A4%B7%E0%A5%8D%E0%A4%9F%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%9A%E0%A5%87%20%E0%A4%B6%E0%A4%BF%E0%A4%B2%E0%A5%8D%E0%A4%AA%E0%A4%95%E0%A4%BE%E0%A4%B0%20%E2%80%93%20%E0%A4%B8%E0%A4%BE%E0%A4%A8%E0%A5%87%20%E0%A4%97%E0%A5%81%E0%A4%B0%E0%A5%81%E0%A4%9C%E0%A5%80.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्राचे शिल्पकार यदुनाथ थत्ते",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%B0%E0%A4%BE%E0%A4%B7%E0%A5%8D%E0%A4%9F%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%9A%E0%A5%87%20%E0%A4%B6%E0%A4%BF%E0%A4%B2%E0%A5%8D%E0%A4%AA%E0%A4%95%E0%A4%BE%E0%A4%B0%20%E0%A4%AF%E0%A4%A6%E0%A5%81%E0%A4%A8%E0%A4%BE%E0%A4%A5%20%E0%A4%A5%E0%A4%A4%E0%A5%8D%E0%A4%A4%E0%A5%87.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्राचे शिल्पकार वसंतदादा पाटील",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%B0%E0%A4%BE%E0%A4%B7%E0%A5%8D%E0%A4%9F%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%9A%E0%A5%87%20%E0%A4%B6%E0%A4%BF%E0%A4%B2%E0%A5%8D%E0%A4%AA%E0%A4%95%E0%A4%BE%E0%A4%B0%20%E0%A4%B5%E0%A4%B8%E0%A4%82%E0%A4%A4%E0%A4%A6%E0%A4%BE%E0%A4%A6%E0%A4%BE%20%E0%A4%B0%E0%A4%BE%E0%A4%9C%E0%A4%BE%20%E0%A4%AE%E0%A4%BE%E0%A4%A8%E0%A5%87.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्रातील काँग्रेसचा स्वातंत्र्यलढा (१८८५-१९२०)",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%B0%E0%A4%BE%E0%A4%B7%E0%A5%8D%E0%A4%9F%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%A4%E0%A5%80%E0%A4%B2%20%E0%A4%95%E0%A4%BE%E0%A4%81%E0%A4%97%E0%A5%8D%E0%A4%B0%E0%A5%87%E0%A4%B8%E0%A4%9A%E0%A4%BE%20%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A4%BE%E0%A4%A4%E0%A4%82%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A5%8D%E0%A4%AF%E0%A4%B2%E0%A4%A2%E0%A4%BE.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्रातील वन्य प्राणी",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%B0%E0%A4%BE%E0%A4%B7%E0%A5%8D%E0%A4%9F%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%A4%E0%A5%80%E0%A4%B2%20%E0%A4%B5%E0%A4%A8%E0%A5%8D%E0%A4%AF%20%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%A3%E0%A5%80.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मानवी आनुवंशिकता",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AE%E0%A4%BE%E0%A4%A8%E0%A4%B5%E0%A5%80%20%E0%A4%86%E0%A4%A8%E0%A5%81%E0%A4%B5%E0%A4%82%E0%A4%B6%E0%A4%BF%E0%A4%95%E0%A4%A4%E0%A4%BE.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मुस्लिम व्यक्तिगत कायद्यात सुधारणा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AE%E0%A5%81%E0%A4%B8%E0%A5%8D%E0%A4%B2%E0%A4%BF%E0%A4%AE%20%E0%A4%B5%E0%A5%8D%E0%A4%AF%E0%A4%95%E0%A5%8D%E0%A4%A4%E0%A4%BF%E0%A4%97%E0%A4%A4%20%E0%A4%95%E0%A4%BE%E0%A4%AF%E0%A4%A6%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%A4%20%E0%A4%B8%E0%A5%81%E0%A4%A7%E0%A4%BE%E0%A4%B0%E0%A4%A3%E0%A4%BE.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मोरस कथा दशावतार",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AE%E0%A5%8B%E0%A4%B0%E0%A4%B8%20%E0%A4%95%E0%A4%A5%E0%A4%BE%20%E0%A4%A6%E0%A4%B6%E0%A4%BE%E0%A4%B5%E0%A4%A4%E0%A4%BE%E0%A4%B0.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "लुकेना क्रान्तिकारी कल्पवृक्ष",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%B2%E0%A5%81%E0%A4%95%E0%A5%87%E0%A4%A8%E0%A4%BE%20%E0%A4%95%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%82%E0%A4%A4%E0%A4%BF%E0%A4%95%E0%A4%BE%E0%A4%B0%E0%A5%80%20%E0%A4%95%E0%A4%B2%E0%A5%8D%E0%A4%AA%E0%A4%B5%E0%A5%83%E0%A4%95%E0%A5%8D%E0%A4%B7.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "संत जनाबाई",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%B8%E0%A4%82%E0%A4%A4%20%E0%A4%9C%E0%A4%A8%E0%A4%BE%E0%A4%AC%E0%A4%BE%E0%A4%88.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "सामाजिक वाद",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%B8%E0%A4%BE%E0%A4%AE%E0%A4%BE%E0%A4%9C%E0%A4%BF%E0%A4%95%20%E0%A4%B5%E0%A4%BE%E0%A4%A6.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "हुतात्मा दामोदर हरि चापेकर यांचे आत्मवृत्त",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%B9%E0%A5%81%E0%A4%A4%E0%A4%BE%E0%A4%A4%E0%A5%8D%E0%A4%AE%E0%A4%BE%20%E0%A4%A6%E0%A4%BE%E0%A4%AE%E0%A5%8B%E0%A4%A6%E0%A4%B0%20%E0%A4%B9%E0%A4%B0%E0%A4%BF%20%E0%A4%9A%E0%A4%BE%E0%A4%AA%E0%A5%87%E0%A4%95%E0%A4%B0%20%E0%A4%AF%E0%A4%BE%E0%A4%82%E0%A4%9A%E0%A5%87%20%E0%A4%86%E0%A4%A4%E0%A5%8D%E0%A4%AE%E0%A4%B5%E0%A5%83%E0%A4%A4%E0%A5%8D%E0%A4%A4.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "हॉकी",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%B9%E0%A5%89%E0%A4%95%E0%A5%80.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "केशवसुतांची कविता",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%95%E0%A5%87%E0%A4%B6%E0%A4%B5%E0%A4%B8%E0%A5%81%E0%A4%A4%E0%A4%BE%E0%A4%82%E0%A4%9A%E0%A5%80%20%E0%A4%95%E0%A4%B5%E0%A4%BF%E0%A4%A4%E0%A4%BE.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "ग्रहगणित मालिका",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%97%E0%A5%8D%E0%A4%B0%E0%A4%B9%E0%A4%97%E0%A4%A3%E0%A4%BF%E0%A4%A4%20%E0%A4%AE%E0%A4%BE%E0%A4%B2%E0%A4%BF%E0%A4%95%E0%A4%BE.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "Shankar Palsikar",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%B6%E0%A4%82%E0%A4%95%E0%A4%B0%20%E0%A4%AA%E0%A4%B3%E0%A4%B6%E0%A5%80%E0%A4%95%E0%A4%B0.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "श्री संत शुभराय महाराज कलाकृतीसंग्रह चित्रचिरंतन",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A5%80%20%E0%A4%B8%E0%A4%82%E0%A4%A4%20%E0%A4%B6%E0%A5%81%E0%A4%AD%E0%A4%B0%E0%A4%BE%E0%A4%AF%20%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%B0%E0%A4%BE%E0%A4%9C%20%E0%A4%95%E0%A4%B2%E0%A4%BE%E0%A4%95%E0%A5%83%E0%A4%A4%E0%A5%80%E0%A4%B8%E0%A4%82%E0%A4%97%E0%A5%8D%E0%A4%B0%E0%A4%B9%20%E0%A4%9A%E0%A4%BF%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A4%9A%E0%A4%BF%E0%A4%B0%E0%A4%82%E0%A4%A4.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "कौटिल्य अर्थशास्त्र",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/कौटिल्य अर्थशास्त्र.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मराठी शब्दकोशःखंड-३",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/मराठी शब्दकोशःखंड-३.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्रातील काही ताम्रपट व शिलालेख",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/महाराष्ट्रातील काही ताम्रपट व शिलालेख.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "औद्योगिक अपशिष्टांवरील उपचारांसंबंधी मूलभूत ज्ञान आणि प्रथा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/औद्योगिक अपशिष्टांवरील उपचारांसंबंधी मूलभूत ज्ञान आणि प्रथा",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मराठी शब्दकोशःखंड-४",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/मराठी शब्दकोश_खंड-4.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "बंगाली साहित्य परिचय-मराठी माध्यम",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/बंगाली साहित्य परिचय-मराठी माध्यम.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महात्मा फुले समग्र वाङ्मय",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/महात्मा फुले समग्र वाङ्मय.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "प्रकाशचित्रण एक कलामाध्यम",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/प्रकाशचित्रण_एक कलामाध्यम.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "लोकहितवादी समग्र वाङ्मय-खंड १",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/लोकहितवादी समग्र वाङ्मय-खंड १.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "The History and Inscriptions of The Satavahanas and The Western Kshatrapas",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/The History and Inscriptions of The Satavahanas and The Western Kshatrapas.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "आयुर्वेदीय शब्दकोश भाग १ व २ (संस्कृत-संस्कृत)",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/आयुर्वेदीय शब्दकोश भाग १ व २ (संस्कृत-संस्कृत).pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "आयुर्वेदीय शब्दकोश भाग १ व २ (संस्कृत-संस्कृत-मराठी)",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/आयुर्वेदीय शब्दकोश भाग १ व २ (संस्कृत-संस्कृत-मराठी).pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "इंग्रजी-मराठी स्थापत्य शिल्पकोश",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/इंग्रजी-मराठी स्थापत्य शिल्पकोश.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "उर्दू-मराठी शब्दकोश",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/उर्दू-मराठी शब्दकोश.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "कन्नड भाषा प्रवेश (मराठी माध्यमाच्या द्वारे)",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/कन्नड भाषा प्रवेश (मराठी माध्यमाच्या द्वारे).pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "कन्नड-मराठी शब्दकोश",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/कन्नड-मराठी शब्दकोश.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "कानडी साहित्य परिचय",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/कानडी साहित्य परिचय.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "गुजराती भाषा प्रवेश",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/गुजराती भाषा प्रवेश.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "गुजराती-मराठी शब्दकोश",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/गुजराती-मराठी शब्दकोश.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "ज्ञानोदय लेखन सार सूची खंड १ ला, भाग दुसरा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/ज्ञानोदय लेखन सार सूची खंड १ ला, भाग दुसरा.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "तमिळ भाषा प्रवेश",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/तमिळ भाषा प्रवेश.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "तमिळ-मराठी शब्दकोश",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/तमिळ-मराठी शब्दकोश.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "नामदेव गाथा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/नामदेव गाथा.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "पाली-मराठी शब्दकोश",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/पाली-मराठी शब्दकोश.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "प्रसुतीविद्या",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/प्रसुतीविद्या.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "फार्सी मराठी अनुबंध भाषिक वाङ्‍मयीन व सांस्कृतिक",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/फार्सी मराठी अनुबंध भाषिक वाङ्‍मयीन व सांस्कृतिक.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "बंगाली भाषा प्रवेश खंड १",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/बंगाली भाषा प्रवेश खंड १.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "भारतीय लिपीचे मौलिक एकरूप",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/भारतीय लिपीचे मौलिक एकरूप.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मराठी अनुवाद ग्रंथसूची",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/मराठी अनुवाद ग्रंथसूची.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मराठी-कन्नड शब्दकोश",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/मराठी-कन्नड शब्दकोश.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मराठी-सिंधी शब्दकोश",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/मराठी-सिंधी शब्दकोश.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मल्याळम भाषा प्रवेश",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/मल्याळम भाषा प्रवेश.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "संगीत रत्नाकार भाग-२",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/संगीत रत्नाकार भाग-२.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "भारतीय संगीत व संगीतशास्त्र",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/भारतीय संगीत व संगीतशास्त्र.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "डॉ. भीमराव रामजी आंबेडकर चरित्र ग्रंथ खंड ६ ते ७",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/डॉ. भीमराव रामजी आंबेडकर चरित्र ग्रंथ खंड ६ ते ७.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "स्वामी रामानंदतीर्थ यांची दैनंदिनी",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/स्वामी रामानंदतीर्थ यांची दैनंदिनी.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "सांस्कृतिक महाराष्ट्र १९६० ते २०१० भाग-२",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/सांस्कृतिक महाराष्ट्र १९६० ते २०१० भाग-२.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "संक्षिप्त संख्यानक",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/संक्षिप्त संख्यानक.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "होमिओपाथिक औषधांचा लक्षण भावनाकोश",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/होमिओपाथिक-औषधांचा-लक्षण-भावनाकोश.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "स्त्री रोग चिकित्सा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/स्त्री-रोग-चिकित्सा.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मोगल साम्राज्याचा ऱ्हास",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/मोगल साम्राज्याचा ऱ्हास.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मराठी वाङ्मयकोश खंड १",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/मराठी वाङ्मयकोश खंड १.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मराठी वाङ्मयकोश खंड ४",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/मराठी वाङमयकोश_खंड ४.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "ज्ञानोदय लेखनसारसूची खंड २ (१८५८-१८७४) भाग १",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/ज्ञानोदय लेखनसारसूची खंड-२(१८५८-१८७४) भाग_१.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "ग्रह गति सिद्धांत",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/ग्रह_गति_सिद्धांत.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "ज्ञानोदयलेखनसारसूची (खंड पहिला) (भाग पहिला)",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/ज्ञानोदयलेखनसारसूची (खंड पहिला) (भाग पहिला).pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "विज्ञान आणि तंत्रज्ञान कोश",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/विज्ञान आणि तंत्रज्ञान कोश.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मराठी वाङ्मयकोश खंड २",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/मराठी वाङ्मयकोश खंड २.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "श्री तुकारामबोवांच्या अभंगाची गाथा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/श्री तुकारामबोवांच्या अभंगाची गाथा.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "भूगोलाचे स्वरूप",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/भूगोलाचे स्वरूप.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "सैध्दान्तिक मृत्तिका-बलविज्ञान",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/सैध्दान्तिक मृत्तिका-बलविज्ञान.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "श्री विष्णुसहस्त्रनाम चिंतनिका",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/श्री विष्णुसहस्त्रनाम चिंतनिका.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "शपाश्चात्य रोग चिकित्सा खंड २",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/पाश्चात्य रोग चिकित्सा खंड २.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "Bombay and Congree Movement",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/BOMBAY%20AND%20CONGRESS%20MOVEMENT.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "PORTUGUESE-MAHRATTA RELATIONS",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/Portuguese Mahratta Relations.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "COCHIN",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/COCHIN.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "GAWDI GOA",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/Gawadi%20of%20Goa.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "KONKANI OF KANKON",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/Konkani%20of%20Kankon.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "KONKANI OF SOUTH KANARA",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/Konkani%20of%20South_kanara.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "KUNABI OF MAHAD",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/Kunbi%20of%20Mahad.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "KUDALI",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/Kundali.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "LIFE N STILL LIFE",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/life%20&%20still%20life.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "MARATHI OF KASARGOD",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/Marathi%20of%20Kasargod.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "WARLI OF THANA",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/Warli%20Of%20Thana.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "नाट्य मंडप",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%A8%E0%A4%BE%E0%A4%9F%E0%A5%8D%E0%A4%AF%E0%A4%AE%E0%A4%82%E0%A4%A1%E0%A4%AA.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मुंबईचा वृत्तांत",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/मुंबईचा वृत्तांत .pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "समर्थ रामदासांची साहित्य सृष्टी",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%B8%E0%A4%AE%E0%A4%B0%E0%A5%8D%E0%A4%A5%20%E0%A4%B0%E0%A4%BE%E0%A4%AE%E0%A4%A6%E0%A4%BE%E0%A4%B8%E0%A4%BE%E0%A4%82%E0%A4%9A%E0%A5%80%20%E0%A4%B8%E0%A4%BE%E0%A4%B9%E0%A4%BF%E0%A4%A4%E0%A5%8D%E0%A4%AF%20%E0%A4%B8%E0%A5%83%E0%A4%B7%E0%A5%8D%E0%A4%9F%E0%A5%80.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "प्रेमचंद व्यक्ती आणि वाङ्‌मय",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A5%87%E0%A4%AE%E0%A4%9A%E0%A4%82%E0%A4%A6%20%E0%A4%B5%E0%A5%8D%E0%A4%AF%E0%A4%95%E0%A5%8D%E0%A4%A4%E0%A5%80%20%E0%A4%86%E0%A4%A3%E0%A4%BF%20%E0%A4%B5%E0%A4%BE%E0%A4%99%E0%A5%8D%E0%A4%AE%E0%A4%AF.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्राचे शिल्पकार तेजस्विनी अहिल्याबाई होळकर",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/महाराष्ट्राचे शिल्पकार – तेजस्विनी अहिल्याबाई होळकर.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "सांख्यतत्त्वकेोमुदी",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%B8%E0%A4%BE%E0%A4%82%E0%A4%96%E0%A5%8D%E0%A4%AF%E0%A4%A4%E0%A4%A4%E0%A5%8D%E0%A4%A4%E0%A5%8D%E0%A4%B5%E0%A4%95%E0%A5%87%E0%A5%8B%E0%A4%AE%E0%A5%81%E0%A4%A6%E0%A5%80.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "पॉवर लॉन्ड्री यंत्र, तंत्र, मंत्र",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AA%E0%A5%89%E0%A4%B5%E0%A4%B0%20-%20%E0%A4%B2%E0%A5%89%E0%A4%A8%E0%A5%8D%E0%A4%A1%E0%A5%8D%E0%A4%B0%E0%A5%80%20%E0%A4%AF%E0%A4%82%E0%A4%A4%E0%A5%8D%E0%A4%B0-%E0%A4%A4%E0%A4%82%E0%A4%A4%E0%A5%8D%E0%A4%B0-%E0%A4%AE%E0%A4%82%E0%A4%A4%E0%A5%8D%E0%A4%B0.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "माहेरी गेली",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AE%E0%A4%BE%E0%A4%B9%E0%A5%87%E0%A4%B0%E0%A5%80%20%E0%A4%97%E0%A5%87%E0%A4%B2%E0%A5%80.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "THE HIGH-CASTE HINDU WOMAN",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/The%20High%20Caste%20Hindu%20Women%20(Pandita%20Ramabai)%20Final.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्रातील स्वातंत्र्य लढे",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%B0%E0%A4%BE%E0%A4%B7%E0%A5%8D%E0%A4%9F%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%A4%E0%A5%80%E0%A4%B2%20%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A4%BE%E0%A4%A4%E0%A4%82%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A5%8D%E0%A4%AF%20%E0%A4%B2%E0%A4%A2%E0%A5%87.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "डॉ. भीमराव रामजी आंबेडकर चरित्र खंड अकरावा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%A1%E0%A5%89.%20%E0%A4%AD%E0%A5%80%E0%A4%AE%E0%A4%B0%E0%A4%BE%E0%A4%B5%20%E0%A4%B0%E0%A4%BE%E0%A4%AE%E0%A4%9C%E0%A5%80%20%E0%A4%86%E0%A4%82%E0%A4%AC%E0%A5%87%E0%A4%A1%E0%A4%95%E0%A4%B0.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "भारतातील आदिवासी वंश",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AD%E0%A4%BE%E0%A4%B0%E0%A4%A4%E0%A4%BE%E0%A4%A4%E0%A5%80%E0%A4%B2%20%E0%A4%86%E0%A4%A6%E0%A4%BF%E0%A4%B5%E0%A4%BE%E0%A4%B8%E0%A5%80%20%E0%A4%B5%E0%A4%82%E0%A4%B6.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "खगोलशास्त्राचे विश्व",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%96%E0%A4%97%E0%A5%8B%E0%A4%B2%E0%A4%B6%E0%A4%BE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%9A%E0%A5%87%20%E0%A4%B5%E0%A4%BF%E0%A4%B6%E0%A5%8D%E0%A4%B5.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "सुबण्णा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%B8%E0%A5%81%E0%A4%AC%E0%A4%A3%E0%A5%8D%E0%A4%A3%E0%A4%BE.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "आधारवड",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%86%E0%A4%A7%E0%A4%BE%E0%A4%B0%E0%A4%B5%E0%A4%A1%20(%E0%A5%A7%E0%A5%AF%E0%A5%AE%E0%A5%AE).pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "शून्य संपादन",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%B6%E0%A5%82%E0%A4%A8%E0%A5%8D%E0%A4%AF%20%E0%A4%B8%E0%A4%82%E0%A4%AA%E0%A4%BE%E0%A4%A6%E0%A4%A8.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "तेरा पोवाडे",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%A4%E0%A5%87%E0%A4%B0%E0%A4%BE%20%E0%A4%AA%E0%A5%8B%E0%A4%B5%E0%A4%BE%E0%A4%A1%E0%A5%87.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "सौंदर्य शास्त्रावरील तीन व्याख्याने",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%B8%E0%A5%8C%E0%A4%82%E0%A4%A6%E0%A4%B0%E0%A5%8D%E0%A4%AF%20%E0%A4%B6%E0%A4%BE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%B5%E0%A4%B0%E0%A5%80%E0%A4%B2%20%E0%A4%A4%E0%A5%80%E0%A4%A8%20%E0%A4%B5%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%96%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%A8%E0%A5%87.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "चिरंजीव माणूस",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%9A%E0%A4%BF%E0%A4%B0%E0%A4%82%E0%A4%9C%E0%A5%80%E0%A4%B5%20%E0%A4%AE%E0%A4%BE%E0%A4%A3%E0%A5%82%E0%A4%B8%20(%E0%A5%A7%E0%A5%AF%E0%A5%AE%E0%A5%AC).pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "धन्याचा बंदा गुलाम",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%A7%E0%A4%A8%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%9A%E0%A4%BE%20%E0%A4%AC%E0%A4%82%E0%A4%A6%E0%A4%BE%20%E0%A4%97%E0%A5%81%E0%A4%B2%E0%A4%BE%E0%A4%AE.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "डीझेल एंजिन",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%A1%E0%A4%BF%E0%A4%9D%E0%A5%87%E0%A4%B2%20%E0%A4%8F%E0%A4%82%E0%A4%9C%E0%A4%BF%E0%A4%A8.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "वंश आणि वंशवाद",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%B5%E0%A4%82%E0%A4%B6%20%E0%A4%86%E0%A4%A3%E0%A4%BF%20%E0%A4%B5%E0%A4%82%E0%A4%B6%E0%A4%B5%E0%A4%BE%E0%A4%A6.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "हैदराबादचा स्वातंत्र्य संग्राम",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%B9%E0%A5%88%E0%A4%A6%E0%A4%B0%E0%A4%BE%E0%A4%AC%E0%A4%BE%E0%A4%A6%E0%A4%9A%E0%A4%BE%20%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A4%BE%E0%A4%A4%E0%A4%82%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A5%8D%E0%A4%AF%20%E0%A4%B8%E0%A4%82%E0%A4%97%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%AE.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "कोकणी लोकगीते",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%95%E0%A5%8B%E0%A4%95%E0%A4%A3%E0%A5%80%20%E0%A4%B2%E0%A5%8B%E0%A4%95%E0%A4%97%E0%A5%80%E0%A4%A4%E0%A5%87.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "झुंडशाहीचे बंड",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%9D%E0%A5%81%E0%A4%82%E0%A4%A1%E0%A4%B6%E0%A4%BE%E0%A4%B9%E0%A5%80%E0%A4%9A%E0%A5%87%20%E0%A4%AC%E0%A4%82%E0%A4%A1.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महात्मा ज्योतिराव फुले",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%A4%E0%A5%8D%E0%A4%AE%E0%A4%BE%20%E0%A4%9C%E0%A5%8D%E0%A4%AF%E0%A5%8B%E0%A4%A4%E0%A4%BF%E0%A4%B0%E0%A4%BE%E0%A4%B5%20%E0%A4%AB%E0%A5%81%E0%A4%B2%E0%A5%87.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "ओदिसी",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%93%E0%A4%A6%E0%A4%BF%E0%A4%B8%E0%A5%80.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "आराधना",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/Aaradhana1.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मुलखावेगळा राजा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AE%E0%A5%81%E0%A4%B2%E0%A4%96%E0%A4%BE%E0%A4%B5%E0%A5%87%E0%A4%97%E0%A4%B3%E0%A4%BE%20%E0%A4%B0%E0%A4%BE%E0%A4%9C%E0%A4%BE.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्राचे शिल्पकार – बॅ. राजाभाऊ खोब्रागडे",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%B0%E0%A4%BE%E0%A4%B7%E0%A5%8D%E0%A4%9F%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%9A%E0%A5%87%20%E0%A4%B6%E0%A4%BF%E0%A4%B2%E0%A5%8D%E0%A4%AA%E0%A4%95%E0%A4%BE%E0%A4%B0%20%E2%80%93%20%E0%A4%AC%E0%A5%50.%20%E0%A4%B0%E0%A4%BE%E0%A4%9C%E0%A4%BE%E0%A4%AD%E0%A4%BE%E0%A4%8A%20%E0%A4%96%E0%A5%8B%E0%A4%AC%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%97%E0%A4%A1%E0%A5%87.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "कापडावरील रासायनिक प्रक्रिया",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%95%E0%A4%BE%E0%A4%AA%E0%A4%A1%E0%A4%BE%E0%A4%B5%E0%A4%B0%E0%A5%80%E0%A4%B2%20%E0%A4%B0%E0%A4%BE%E0%A4%B8%E0%A4%BE%E0%A4%AF%E0%A4%A8%E0%A4%BF%E0%A4%95%20%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%95%E0%A5%8D%E0%A4%B0%E0%A4%BF%E0%A4%AF%E0%A4%BE.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "निर्मलक",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%A8%E0%A4%BF%E0%A4%B0%E0%A5%8D%E0%A4%AE%E0%A4%B2%E0%A4%95.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "काव्ये आणि विज्ञाने",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%95%E0%A4%BE%E0%A4%B5%E0%A5%8D%E0%A4%AF%E0%A5%87%20%E0%A4%86%E0%A4%A3%E0%A4%BF%20%E0%A4%B5%E0%A4%BF%E0%A4%9C%E0%A5%8D%E0%A4%9E%E0%A4%BE%E0%A4%A8%E0%A5%87.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "छत्रपती शिवाजी महाराज",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%9B%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A4%AA%E0%A4%A4%E0%A5%80%20%E0%A4%B6%E0%A4%BF%E0%A4%B5%E0%A4%BE%E0%A4%9C%E0%A5%80%20%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%B0%E0%A4%BE%E0%A4%9C.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मी-इझाडोरा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AE%E0%A5%80-%E0%A4%87%E0%A4%9D%E0%A4%BE%E0%A4%A1%E0%A5%8B%E0%A4%B0%E0%A4%BE.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "भरत-मुनि-प्रणीतं नाट्यशास्त्रम्",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AD%E0%A4%B0%E0%A4%A4-%E0%A4%AE%E0%A5%81%E0%A4%A8%E0%A4%BF-%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%A3%E0%A5%80%E0%A4%A4%E0%A4%82%20%E0%A4%A8%E0%A4%BE%E0%A4%9F%E0%A5%8D%E0%A4%AF%E0%A4%B6%E0%A4%BE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A4%AE%E0%A5%8D%20.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "कामायनी",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AF%E0%A5%82%E0%A4%A8%E0%A4%BE%E0%A4%87%E0%A4%9F%E0%A5%87%E0%A4%A1%20%E0%A4%B8%E0%A5%8D%E0%A4%9F%E0%A5%87%E0%A4%9F%E0%A5%8D%E0%A4%B8%E0%A4%9A%E0%A5%80%20%E0%A4%B2%E0%A5%8B%E0%A4%95%E0%A4%B8%E0%A5%8D%E0%A4%A5%E0%A4%BF%E0%A4%A4%E0%A5%80.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "यूनाइटेड् स्टेट्सची लोकस्थिती",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%B6%E0%A4%B0%E0%A5%80%E0%A4%B0%20%E0%A4%8F%E0%A4%95%20%E0%A4%B8%E0%A4%AE%E0%A4%B0%E0%A4%BE%E0%A4%82%E0%A4%97%E0%A4%A3.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "शरीर एक समरांगण",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%B0%E0%A4%BE%E0%A4%B7%E0%A5%8D%E0%A4%9F%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%9A%E0%A5%87%20%E0%A4%B6%E0%A4%BF%E0%A4%B2%E0%A5%8D%E0%A4%AA%E0%A4%95%E0%A4%BE%E0%A4%B0%20-%20%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A4%BE%E0%A4%AE%E0%A5%80%20%E0%A4%B0%E0%A4%BE%E0%A4%AE%E0%A4%BE%E0%A4%A8%E0%A4%82%E0%A4%A6%20%E0%A4%A4%E0%A5%80%E0%A4%B0%E0%A5%8D%E0%A4%A5.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्राचे शिल्पकार स्वामी रामानंद तीर्थ",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A4%BE%E0%A4%A4%E0%A4%82%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%B5%E0%A4%BF%E0%A4%B7%E0%A4%AF%E0%A5%80.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "स्वातंत्र्याविषयी",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%95%E0%A4%BE%E0%A4%AE%E0%A4%BE%E0%A4%AF%E0%A4%A8%E0%A5%80.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "बुद्धलीला सारसंग्रह",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AC%E0%A5%81%E0%A4%A6%E0%A5%8D%E0%A4%A7%E0%A4%B2%E0%A5%80%E0%A4%B2%E0%A4%BE%20%E0%A4%B8%E0%A4%BE%E0%A4%B0%E0%A4%B8%E0%A4%82%E0%A4%97%E0%A5%8D%E0%A4%B0%E0%A4%B9_Final.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "कबड्डी्",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%95%E0%A4%AC%E0%A4%A1%E0%A5%8D%E0%A4%A1%E0%A5%80.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "संगणकाची जादुई दुनिया्",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%B8%E0%A4%82%E0%A4%97%E0%A4%A3%E0%A4%95%E0%A4%BE%E0%A4%9A%E0%A5%80%20%E0%A4%9C%E0%A4%BE%E0%A4%A6%E0%A5%81%E0%A4%88%20%E0%A4%A6%E0%A5%81%E0%A4%A8%E0%A4%BF%E0%A4%AF%E0%A4%BE.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्राचे संगीतातील कार्य",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%B0%E0%A4%BE%E0%A4%B7%E0%A5%8D%E0%A4%9F%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%9A%E0%A5%87%20%E0%A4%B8%E0%A4%82%E0%A4%97%E0%A5%80%E0%A4%A4%E0%A4%BE%E0%A4%A4%E0%A5%80%E0%A4%B2%20%E0%A4%95%E0%A4%BE%E0%A4%B0%E0%A5%8D%E0%A4%AF.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "गायनमहर्षी अल्लादियाखां यांचे चरित्र",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%97%E0%A4%BE%E0%A4%AF%E0%A4%A8%E0%A4%AE%E0%A4%B9%E0%A4%B0%E0%A5%8D%E0%A4%B7%E0%A5%80%20%E0%A4%50%E0%A4%B2%E0%A5%8D%E0%A4%B2%E0%A4%BE%E0%A4%A6%E0%A4%BF%E0%A4%AF%E0%A4%BE%E0%A4%96%E0%A4%BE%E0%A4%82%20%E0%A4%AF%E0%A4%BE%E0%A4%82%E0%A4%9A%E0%A5%87%20%E0%A4%9A%E0%A4%B0%E0%A4%BF%E0%A4%A4%E0%A5%8D%E0%A4%B0.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "धम्मपद्",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%A7%E0%A4%AE%E0%A5%8D%E0%A4%AE%E0%A4%AA%E0%A4%A6.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "धर्म आणि विज्ञान",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%A7%E0%A4%B0%E0%A5%8D%E0%A4%AE%20%E0%A4%86%E0%A4%A3%E0%A4%BF%20%E0%A4%B5%E0%A4%BF%E0%A4%9C%E0%A5%8D%E0%A4%9E%E0%A4%BE%E0%A4%A8.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "आशियाई क्रीडास्पर्धा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%86%E0%A4%B6%E0%A4%BF%E0%A4%AF%E0%A4%BE%E0%A4%88%20%E0%A4%95%E0%A5%8D%E0%A4%B0%E0%A5%80%E0%A4%A1%E0%A4%BE%20%E0%A4%B8%E0%A5%8D%E0%A4%AA%E0%A4%B0%E0%A5%8D%E0%A4%A7%E0%A4%BE.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "आबाजी गोखले एक आनंदयात्री",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%8F%E0%A4%95%20%E0%A4%86%E0%A4%A8%E0%A4%82%E0%A4%A6%E0%A4%AF%E0%A4%BE%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A5%80%20-%20%20%E0%A4%86%E0%A4%AC%E0%A4%BE%E0%A4%9C%E0%A5%80%20%E0%A4%97%E0%A5%8B%E0%A4%96%E0%A4%B2%E0%A5%87.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "कालिदास",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%95%E0%A4%BE%E0%A4%B2%E0%A4%BF%E0%A4%A6%E0%A4%BE%E0%A4%B8%20%20.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "क्रांतिसुक्ते राजेर्षी छत्रपती शाहू",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%95%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%82%E0%A4%A4%E0%A4%BF%E0%A4%B8%E0%A5%81%E0%A4%95%E0%A5%8D%E0%A4%A4%E0%A5%87%20%E0%A4%B0%E0%A4%BE%E0%A4%9C%E0%A5%87%E0%A4%B0%E0%A5%8D%E0%A4%B7%E0%A5%80%20%E0%A4%9B%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A4%AA%E0%A4%A4%E0%A5%80%20%E0%A4%B6%E0%A4%BE%E0%A4%B9%E0%A5%82.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "कोल्हटकरांची पत्रे",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%95%E0%A5%8B%E0%A4%B2%E0%A5%8D%E0%A4%B9%E0%A4%9F%E0%A4%95%E0%A4%B0%E0%A4%BE%E0%A4%82%E0%A4%9A%E0%A5%80%20%E0%A4%AA%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A5%87.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "ग. त्र्यं. माडखोलकर",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%97.%20%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A5%8D%E0%A4%AF%E0%A4%82.%20%E0%A4%AE%E0%A4%BE%E0%A4%A1%E0%A4%96%E0%A5%8B%E0%A4%B2%E0%A4%95%E0%A4%B0.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "तुळशी मंजिऱ्या",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%A4%E0%A5%81%E0%A4%B3%E0%A4%B6%E0%A5%80%20%E0%A4%AE%E0%A4%82%E0%A4%9C%E0%A4%BF%E0%A4%B1%E0%A5%8D%E0%A4%AF%E0%A4%BE.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "भौतिकी शास्त्रातील नोबेल पारितोषिक विजेते भाग ५",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AD%E0%A5%8C%E0%A4%A4%E0%A4%BF%E0%A4%95%E0%A5%80%20%E0%A4%B6%E0%A4%BE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%A4%E0%A5%80%E0%A4%B2%20%E0%A4%A8%E0%A5%8B%E0%A4%AC%E0%A5%87%E0%A4%B2%20%E0%A4%AA%E0%A4%BE%E0%A4%B0%E0%A4%BF%E0%A4%A4%E0%A5%8B%E0%A4%B7%E0%A4%BF%E0%A4%95%E0%A5%87%20%E0%A4%B5%E0%A4%BF%E0%A4%A6%E0%A5%87%E0%A4%A4%E0%A5%87%20%E0%A4%AD%E0%A4%BE%E0%A4%97-%E0%A5%AB.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्राची सागरी मत्स्यसंपत्ती",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%B0%E0%A4%BE%E0%A4%B7%E0%A5%8D%E0%A4%9F%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%9A%E0%A5%80%20%E0%A4%B8%E0%A4%BE%E0%A4%97%E0%A4%B0%E0%A5%80%20%E0%A4%AE%E0%A4%A4%E0%A5%8D%E0%A4%B8%E0%A5%8D%E0%A4%AF%E0%A4%B8%E0%A4%82%E0%A4%AA%E0%A4%A4%E0%A5%8D%E0%A4%A4%E0%A5%80.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्राचे शिलपकार कर्मवीर मामासाहेब जगदाळे",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%B0%E0%A4%BE%E0%A4%B7%E0%A5%8D%E0%A4%9F%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%9A%E0%A5%87%20%E0%A4%B6%E0%A4%BF%E0%A4%B2%E0%A4%AA%E0%A4%95%E0%A4%BE%E0%A4%B0%20%E0%A4%95%E0%A4%B0%E0%A5%8D%E0%A4%AE%E0%A4%B5%E0%A5%80%E0%A4%B0%20%E0%A4%AE%E0%A4%BE%E0%A4%AE%E0%A4%BE%E0%A4%B8%E0%A4%BE%E0%A4%B9%E0%A5%87%E0%A4%AC%20%E0%A4%9C%E0%A4%97%E0%A4%A6%E0%A4%BE%E0%A4%B3%E0%A5%87_.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "माणसाचा मेंदू व त्याचे कार्य",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AE%E0%A4%BE%E0%A4%A3%E0%A4%B8%E0%A4%BE%E0%A4%9A%E0%A4%BE%20%E0%A4%AE%E0%A4%82%E0%A4%A6%E0%A5%82%20%E0%A4%B5%20%E0%A4%A4%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%9A%E0%A5%87%20%E0%A4%95%E0%A4%BE%E0%A4%B0%E0%A5%8D%E0%A4%AF.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "लोकमहर्षी भाऊसाहेब डॉ. पंजाबराव देशमुख गौरवग्रंथ",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%B2%E0%A5%8B%E0%A4%95%E0%A4%AE%E0%A4%B9%E0%A4%B0%E0%A5%8D%E0%A4%B7%E0%A5%80%20%E0%A4%AD%E0%A4%BE%E0%A4%8A%E0%A4%B8%E0%A4%BE%E0%A4%B9%E0%A5%87%E0%A4%AC%20%E0%A4%A1%E0%A5%89.%20%E0%A4%AA%E0%A4%82%E0%A4%9C%E0%A4%BE%E0%A4%AC%E0%A4%B0%E0%A4%BE%E0%A4%B5%20%E0%A4%A6%E0%A5%87%E0%A4%B6%E0%A4%AE%E0%A5%81%E0%A4%96%20%E0%A4%97%E0%A5%8C%E0%A4%B0%E0%A4%B5%E0%A4%97%E0%A5%8D%E0%A4%B0%E0%A4%82%E0%A4%A5.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "सामाजिक करार",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%B8%E0%A4%BE%E0%A4%AE%E0%A4%BE%E0%A4%9C%E0%A4%BF%E0%A4%95%20%E0%A4%95%E0%A4%B0%E0%A4%BE%E0%A4%B0.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "साखर",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%B8%E0%A4%BE%E0%A4%96%E0%A4%B0.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "साद सागराची",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%B8%E0%A4%BE%E0%A4%A6%20%E0%A4%B8%E0%A4%BE%E0%A4%97%E0%A4%B0%E0%A4%BE%E0%A4%9A%E0%A5%80.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "एक होता गंधर्व",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%8F%E0%A4%95%20%E0%A4%B9%E0%A5%8B%E0%A4%A4%E0%A4%BE%20%E0%A4%97%E0%A4%82%E0%A4%A7%E0%A4%B0%E0%A5%8D%E0%A4%B5.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "जीवनसंग्राम",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%9C%E0%A5%80%E0%A4%B5%E0%A4%A8%E0%A4%B8%E0%A4%82%E0%A4%97%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%AE.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्राचे शिल्पकार भाई उद्धवराव पाटील",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%B0%E0%A4%BE%E0%A4%B7%E0%A5%8D%E0%A4%9F%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%9A%E0%A5%87%20%E0%A4%B6%E0%A4%BF%E0%A4%B2%E0%A5%8D%E0%A4%AA%E0%A4%95%E0%A4%BE%E0%A4%B0%20%E0%A4%AD%E0%A4%BE%E0%A4%88%20%E0%A4%89%E0%A4%A6%E0%A5%8D%E0%A4%A7%E0%A4%B5%E0%A4%B0%E0%A4%BE%E0%A4%B5%20%E0%A4%AA%E0%A4%BE%E0%A4%9F%E0%A5%80%E0%A4%B2.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्राचे शिल्पकार शंकरराव किर्लोस्कर",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%B0%E0%A4%BE%E0%A4%B7%E0%A5%8D%E0%A4%9F%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%9A%E0%A5%87%20%E0%A4%B6%E0%A4%BF%E0%A4%B2%E0%A5%8D%E0%A4%AA%E0%A4%95%E0%A4%BE%E0%A4%B0%20%E0%A4%B6%E0%A4%82%E0%A4%95%E0%A4%B0%E0%A4%B0%E0%A4%BE%E0%A4%B5%20%E0%A4%95%E0%A4%BF%E0%A4%B0%E0%A5%8D%E0%A4%B2%E0%A5%8B%E0%A4%B8%E0%A5%8D%E0%A4%95%E0%A4%B0.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "आर्थिक सिध्दान्त व अर्धविकसित प्रदेश",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%86%E0%A4%B0%E0%A5%8D%E0%A4%A5%E0%A4%BF%E0%A4%95%20%E0%A4%B8%E0%A4%BF%E0%A4%A6%E0%A5%8D%E0%A4%A7%E0%A4%BE%E0%A4%A8%E0%A5%8D%E0%A4%A4%20%E0%A4%B5%20%E0%A4%50%E0%A4%B0%E0%A5%8D%E0%A4%A7%E0%A4%B5%E0%A4%BF%E0%A4%95%E0%A4%B8%E0%A4%BF%E0%A4%A4%20%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%A6%E0%A5%87%E0%A4%B6.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "गानहिरा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%97%E0%A4%BE%E0%A4%A8%E0%A4%B9%E0%A4%BF%E0%A4%B0%E0%A4%BE.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "भारतातील मुसलमानांपुढील पेच",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AD%E0%A4%BE%E0%A4%B0%E0%A4%A4%E0%A4%BE%E0%A4%A4%E0%A5%80%E0%A4%B2%20%E0%A4%AE%E0%A5%81%E0%A4%B8%E0%A4%B2%E0%A4%AE%E0%A4%BE%E0%A4%A8%E0%A4%BE%E0%A4%82%E0%A4%AA%E0%A5%81%E0%A4%A2%E0%A5%80%E0%A4%B2%20%E0%A4%AA%E0%A5%87%E0%A4%9A.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "चौदा पत्रे",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A5%A7%E0%A5%AA%20%E0%A4%AA%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A5%87%E0%A5%A7.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "पुरातत्त्वविद्या",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AA%E0%A5%81%E0%A4%B0%E0%A4%BE%E0%A4%A4%E0%A4%A4%E0%A5%8D%E0%A4%A4%E0%A5%8D%E0%A4%B5%E0%A4%B5%E0%A4%BF%E0%A4%A6%E0%A5%8D%E0%A4%AF%E0%A4%BE.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "भौतिकी शास्त्रातील नोबेल पारितोषिक विजेते भाग ४",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AD%E0%A5%8C%E0%A4%A4%E0%A4%BF%E0%A4%95%E0%A5%80%20%E0%A4%B6%E0%A4%BE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%A4%E0%A5%80%E0%A4%B2%20%E0%A4%A8%E0%A5%8B%E0%A4%AC%E0%A5%87%E0%A4%B2%20%E0%A4%AA%E0%A4%BE%E0%A4%B0%E0%A4%BF%E0%A4%A4%E0%A5%8B%E0%A4%B7%E0%A4%BF%E0%A4%95%E0%A5%87%20%E0%A4%B5%E0%A4%BF%E0%A4%9C%E0%A5%87%E0%A4%A4%E0%A5%87%20%E0%A4%AD%E0%A4%BE%E0%A4%97-%E0%A5%AA.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "भौतिकी शास्त्रातील नोबेल पारितोषिक विजेते भाग १",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AD%E0%A5%8C%E0%A4%A4%E0%A4%BF%E0%A4%95%E0%A5%80%20%E0%A4%B6%E0%A4%BE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%A4%E0%A5%80%E0%A4%B2%20%E0%A4%A8%E0%A5%8B%E0%A4%AC%E0%A5%87%E0%A4%B2%20%E0%A4%AA%E0%A4%BE%E0%A4%B0%E0%A4%BF%E0%A4%A4%E0%A5%8B%E0%A4%B7%E0%A4%BF%E0%A4%95%E0%A5%87%20%E0%A4%B5%E0%A4%BF%E0%A4%A6%E0%A5%87%E0%A4%A4%E0%A5%87%20%E0%A4%AD%E0%A4%BE%E0%A4%97-%E0%A5%A7.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मध्ययुगीन महाराष्ट्र सामाजिक आणि सांस्कृतिक जीवन",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AE%E0%A4%A7%E0%A5%8D%E0%A4%AF%E0%A4%AF%E0%A5%81%E0%A4%97%E0%A5%80%E0%A4%A8%20%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%B0%E0%A4%BE%E0%A4%B7%E0%A5%8D%E0%A4%9F%E0%A5%8D%E0%A4%B0%20-%20%E0%A4%B8%E0%A4%BE%E0%A4%AE%E0%A4%BE%E0%A4%9C%E0%A4%BF%E0%A4%95%20%E0%A4%86%E0%A4%A3%E0%A4%BF%20%E0%A4%B8%E0%A4%BE%E0%A4%82%E0%A4%B8%E0%A5%8D%E0%A4%95%E0%A5%83%E0%A4%A4%E0%A4%BF%E0%A4%95%20%E0%A4%9C%E0%A5%80%E0%A4%B5%E0%A4%A8.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्राचे शिल्पकार महात्मा जोतिबा फुले",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%B0%E0%A4%BE%E0%A4%B7%E0%A5%8D%E0%A4%9F%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%9A%E0%A5%87%20%E0%A4%B6%E0%A4%BF%E0%A4%B2%E0%A5%8D%E0%A4%AA%E0%A4%95%E0%A4%BE%E0%A4%B0%20%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%A4%E0%A5%8D%E0%A4%AE%E0%A4%BE%20%E0%A4%9C%E0%A5%8B%E0%A4%A4%E0%A4%BF%E0%A4%AC%E0%A4%BE%20%E0%A4%AB%E0%A5%81%E0%A4%B2%E0%A5%87.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "रबर",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%B0%E0%A4%AC%E0%A4%B0.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "सिमेंट",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%B8%E0%A4%BF%E0%A4%AE%E0%A5%87%E0%A4%82%E0%A4%9F.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "भारतातील वन्यप्राणीजीवन",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AD%E0%A4%BE%E0%A4%B0%E0%A4%A4%E0%A4%BE%E0%A4%A4%E0%A5%80%E0%A4%B2%20%E0%A4%B5%E0%A4%A8%E0%A5%8D%E0%A4%AF%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%A3%E0%A5%80%E0%A4%9C%E0%A5%80%E0%A4%B5%E0%A4%A8.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "उष्णताविज्ञान (मूलतत्त्वे)",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%89%E0%A4%B7%E0%A5%8D%E0%A4%A3%E0%A4%A4%E0%A4%BE%E0%A4%B5%E0%A4%BF%E0%A4%9C%E0%A5%8D%E0%A4%9E%E0%A4%BE%E0%A4%A8%20(%E0%A4%AE%E0%A5%82%E0%A4%B2%E0%A4%A4%E0%A4%A4%E0%A5%8D%E0%A4%A4%E0%A5%8D%E0%A4%B5%E0%A5%87).pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "समाजशास्त्रीय विचारातील प्रमुख प्रवाह",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%B8%E0%A4%AE%E0%A4%BE%E0%A4%9C%E0%A4%B6%E0%A4%BE%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A5%80%E0%A4%AF%20%E0%A4%B5%E0%A4%BF%E0%A4%9A%E0%A4%BE%E0%A4%B0%E0%A4%BE%E0%A4%A4%E0%A5%80%E0%A4%B2%20%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%AE%E0%A5%81%E0%A4%96%20%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%B5%E0%A4%BE%E0%A4%B9.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "ध्वनिवर्धन आणि वितरण व्यवस्था",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%A7%E0%A5%8D%E0%A4%B5%E0%A4%A8%E0%A4%BF%E0%A4%B5%E0%A4%B0%E0%A5%8D%E0%A4%A7%E0%A4%A8%20%E0%A4%86%E0%A4%A3%E0%A4%BF%20%E0%A4%B5%E0%A4%BF%E0%A4%A4%E0%A4%B0%E0%A4%A3%20%E0%A4%B5%E0%A5%8D%E0%A4%AF%E0%A4%B5%E0%A4%B8%E0%A5%8D%E0%A4%A5%E0%A4%BE.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "Studies in Indian Philosophy",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/Studies%20in%20Indian%20Philosophy.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "रेकॉर्ड प्लेअर",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%B0%E0%A5%87%E0%A4%95%E0%A5%89%E0%A4%B0%E0%A5%8D%E0%A4%A1%20%E0%A4%AA%E0%A5%8D%E0%A4%B2%E0%A5%87%E0%A4%50%E0%A4%B0.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "गणिती तत्त्वज्ञानाचा परिचय",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%97%E0%A4%A3%E0%A4%BF%E0%A4%A4%E0%A5%80%20%E0%A4%A4%E0%A4%A4%E0%A5%8D%E0%A4%A4%E0%A5%8D%E0%A4%B5%E0%A4%9C%E0%A5%8D%E0%A4%9E%E0%A4%BE%E0%A4%A8%E0%A4%BE%E0%A4%9A%E0%A4%BE%20%E0%A4%AA%E0%A4%B0%E0%A4%BF%E0%A4%9A%E0%A4%AF.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "सत्यशोधक समाजाचा इतिहास प्रस्तावना खंड",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%B8%E0%A4%A4%E0%A5%8D%E0%A4%AF%E0%A4%B6%E0%A5%8B%E0%A4%A7%E0%A4%95%20%E0%A4%B8%E0%A4%AE%E0%A4%BE%E0%A4%9C%E0%A4%BE%E0%A4%9A%E0%A4%BE%20%E0%A4%87%E0%A4%A4%E0%A4%BF%E0%A4%B9%E0%A4%BE%E0%A4%B8%20%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%B8%E0%A5%8D%E0%A4%A4%E0%A4%BE%E0%A4%B5%E0%A4%A8%E0%A4%BE%20%E0%A4%96%E0%A4%82%E0%A4%A1_Final%20File_27.08.2014.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "भारतीय रेल्वे",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AD%E0%A4%BE%E0%A4%B0%E0%A4%A4%E0%A5%80%E0%A4%AF%20%E0%A4%B0%E0%A5%87%E0%A4%B2%E0%A5%8D%E0%A4%B5%E0%A5%87.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "लिओनार्दो दा विंची",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%B2%E0%A4%BF%E0%A4%93%E0%A4%A8%E0%A4%BE%E0%A4%B0%E0%A5%8D%E0%A4%A6%E0%A5%8B%20%E0%A4%A6%E0%A4%BE%20%E0%A4%B5%E0%A4%BF%E0%A4%82%E0%A4%9A%E0%A5%80.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "तुरुंगातील पत्रे",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%A4%E0%A5%81%E0%A4%B0%E0%A5%81%E0%A4%82%E0%A4%97%E0%A4%BE%E0%A4%A4%E0%A5%80%E0%A4%B2%20%E0%A4%AA%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A5%87.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "चिरकालीन सिरॅमिक्स",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%9A%E0%A4%BF%E0%A4%B0%E0%A4%95%E0%A4%BE%E0%A4%B2%E0%A5%80%E0%A4%A8%20%E0%A4%B8%E0%A4%BF%E0%A4%B0%E0%A5%50%E0%A4%AE%E0%A4%BF%E0%A4%95%E0%A5%8D%E0%A4%B8.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "इस्लामसंबंधी एक आधुनिक दृष्टिकोण",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%87%E0%A4%B8%E0%A5%8D%E0%A4%B2%E0%A4%BE%E0%A4%AE%E0%A4%B8%E0%A4%82%E0%A4%AC%E0%A4%82%E0%A4%A7%E0%A5%80%20%E0%A4%8F%E0%A4%95%20%E0%A4%86%E0%A4%A7%E0%A5%81%E0%A4%A8%E0%A4%BF%E0%A4%95%20%E0%A4%A6%E0%A5%83%E0%A4%B7%E0%A5%8D%E0%A4%9F%E0%A4%BF%E0%A4%95%E0%A5%8B%E0%A4%A3.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "असंस्कृत समाजातील लैंगिकता",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%50%E0%A4%B8%E0%A4%82%E0%A4%B8%E0%A5%8D%E0%A4%95%E0%A5%83%E0%A4%A4%20%E0%A4%B8%E0%A4%AE%E0%A4%BE%E0%A4%9C%E0%A4%BE%E0%A4%A4%E0%A5%80%E0%A4%B2%20%E0%A4%B2%E0%A5%88%E0%A4%82%E0%A4%97%E0%A4%BF%E0%A4%95%E0%A4%A4%E0%A4%BE.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "गांधी कार्य व विचार प्रणाली",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%97%E0%A4%BE%E0%A4%82%E0%A4%A7%E0%A5%80%20%E0%A4%95%E0%A4%BE%E0%A4%B0%E0%A5%8D%E0%A4%AF%20%E0%A4%B5%20%E0%A4%B5%E0%A4%BF%E0%A4%9A%E0%A4%BE%E0%A4%B0%20%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%A3%E0%A4%BE%E0%A4%B2%E0%A5%80.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "गांधीजींच्या जीवनाचे अखेरचे पर्व",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%97%E0%A4%BE%E0%A4%82%E0%A4%A7%E0%A5%80%E0%A4%9C%E0%A5%80%E0%A4%82%E0%A4%9A%E0%A5%8D%E0%A4%AF%E0%A4%BE%20%E0%A4%9C%E0%A5%80%E0%A4%B5%E0%A4%A8%E0%A4%BE%E0%A4%9A%E0%A5%87%20%E0%A4%50%E0%A4%96%E0%A5%87%E0%A4%B0%E0%A4%9A%E0%A5%87%20%E0%A4%AA%E0%A4%B0%E0%A5%8D%E0%A4%B5.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "ग्रीक शोकनाट्ये",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%97%E0%A5%8D%E0%A4%B0%E0%A5%80%E0%A4%95%20%E0%A4%B6%E0%A5%8B%E0%A4%95%E0%A4%A8%E0%A4%BE%E0%A4%9F%E0%A5%8D%E0%A4%AF%E0%A5%87.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "जातककथासंग्रह भागः१,२,३",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/pdf/newpdf/next12/जातककथासंग्रह भागः१_२_३.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "तेले व मेदे भाग १ ला",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%A4%E0%A5%87%E0%A4%B2%E0%A5%87%20%E0%A4%B5%20%E0%A4%AE%E0%A5%87%E0%A4%A6%E0%A5%87.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मुघल साम्राज्याचा ऱ्हास",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AE%E0%A5%81%E0%A4%98%E0%A4%B2%20%E0%A4%B8%E0%A4%BE%E0%A4%AE%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%9C%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%9A%E0%A4%BE%20%E0%A4%B1%E0%A5%8D%E0%A4%B9%E0%A4%BE%E0%A4%B8.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "असे होते मोगल",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%50%E0%A4%B8%E0%A5%87%20%E0%A4%B9%E0%A5%8B%E0%A4%A4%E0%A5%87%20%E0%A4%AE%E0%A5%8B%E0%A4%97%E0%A4%B2.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "वाटचाल",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%B5%E0%A4%BE%E0%A4%9F%E0%A4%9A%E0%A4%BE%E0%A4%B2.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "विसावे शतक आणि समाजवाद",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%B5%E0%A4%BF%E0%A4%B8%E0%A4%BE%E0%A4%B5%E0%A5%87%20%E0%A4%B6%E0%A4%A4%E0%A4%95%20%E0%A4%86%E0%A4%A3%E0%A4%BF%20%E0%A4%B8%E0%A4%AE%E0%A4%BE%E0%A4%9C%E0%A4%B5%E0%A4%BE%E0%A4%A6.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "सामाजिक थर",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%B8%E0%A4%BE%E0%A4%AE%E0%A4%BE%E0%A4%9C%E0%A4%BF%E0%A4%95%20%E0%A4%A5%E0%A4%B0.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "स्वरयोगिनी",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%B8%E0%A5%8D%E0%A4%B5%E0%A4%B0%E0%A4%AF%E0%A5%8B%E0%A4%97%E0%A4%BF%E0%A4%A8%E0%A5%80.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "तिरुक्कुरळ",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%A4%E0%A4%BF%E0%A4%B0%E0%A5%81%E0%A4%95%E0%A5%8D%E0%A4%95%E0%A5%81%E0%A4%B0%E0%A4%B3.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "प्रासाद-मंडन",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%B8%E0%A4%BE%E0%A4%A6-%E0%A4%AE%E0%A4%82%E0%A4%A1%E0%A4%A8.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "बोस्टन",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AC%E0%A5%8B%E0%A4%B8%E0%A5%8D%E0%A4%9F%E0%A4%A8.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्राचे शिल्पकार पद्मश्री डॉ. विठ्ठलराव विखेपाटील",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%B0%E0%A4%BE%E0%A4%B7%E0%A5%8D%E0%A4%9F%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%9A%E0%A5%87%20%E0%A4%B6%E0%A4%BF%E0%A4%B2%E0%A5%8D%E0%A4%AA%E0%A4%95%E0%A4%BE%E0%A4%B0%20%E0%A4%AA%E0%A4%A6%E0%A5%8D%E0%A4%AE%E0%A4%B6%E0%A5%8D%E0%A4%B0%E0%A5%80%20%E0%A4%A1%E0%A5%89.%20%E0%A4%B5%E0%A4%BF%E0%A4%A0%E0%A5%8D%E0%A4%A0%E0%A4%B2%20%E0%A4%B5%E0%A4%BF%E0%A4%96%E0%A5%87%20%E0%A4%AA%E0%A4%BE%E0%A4%9F%E0%A5%80%E0%A4%B2.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "मुसलमानी.अमदानीतं संगीत",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AE%E0%A5%81%E0%A4%B8%E0%A4%B2%E0%A4%AE%E0%A4%BE%E0%A4%A8%E0%A5%80.%E0%A4%50%E0%A4%AE%E0%A4%A6%E0%A4%BE%E0%A4%A8%E0%A5%80%E0%A4%A4%E0%A4%82%20%E0%A4%B8%E0%A4%82%E0%A4%97%E0%A5%80%E0%A4%A4.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "रसलीना",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%B0%E0%A4%B8%E0%A4%B2%E0%A5%80%E0%A4%A8%E0%A4%BE.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "इस्लामची जीवनपद्धती",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/इस्लामची जीवनपद्धती.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "डॉ. माधवराव पटवर्धन वाङ् मय सूची",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/डॉ. माधवराव पटवर्धन वाङ् मय सूची.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "स्त्रीजीवन व विवाहविषयक लेखसंग्रह",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/स्त्रीजीवन व विवाहविषयक लेखसंग्रह.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "Tilak: The Economist(१९८६)",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/Tilak The Economist.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "अशोक आणि मौर्याचा ऱ्हास",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/अशोक आणि मौर्याचा ऱ्हास.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "आक्रमण",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/आक्रमण.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "आगरकर-वाङ्मय खंड १",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/आगरकर-वाङ्मय खंड १.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "आचार्य भागवत संकलित वाङ्मय_खंड १ ला",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/आचार्य भागवत संकलित वाङ्मय_खंड १ ला.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "इनिइड",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/इनिइड.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "इलियद",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/इलियद.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "कल्लाप्पा ढाले ह्यांची दुर्मिळ डायरीः",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/कल्लाप्पा ढाले ह्यांची दुर्मिळ डायरीः.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "कागद",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/कागद.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "किबुट्झ नवसमाज निर्मितीचा एक प्रयोग",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/किबुट्झ नवसमाज निर्मितीचा एक प्रयोग.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "क्रांतिमार्गावरील प्रवासी",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/क्रांतिमार्गावरील प्रवासी.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "चरियापिटक",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/चरियापिटक.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "जगाची शेती",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/जगाची शेती.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "ज्ञानेश्वरीची प्रस्तावना आणि ज्ञानेश्वरीतील मराठी भाषेचे व्याकरण",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/ज्ञानेश्वरीची प्रस्तावना आणि ज्ञानेश्वरीतील मराठी भाषेचे व्याकरण.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "तेलंगणातील अरे मराठा समाज भाषा आणि संस्कृती",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/तेलंगणातील अरे मराठा समाज भाषा आणि संस्कृती.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "तेले व मेदे भाग २ व ३",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/तेले व मेदे भाग २ व ३.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "अस्पृश्यांचा लष्करी पेशा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/अस्पृश्यांचा लष्करी पेशा.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "आसरा",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%86%E0%A4%B8%E0%A4%B0%E0%A4%BE.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "कर्मवीर भाऊराव पाटील (काल आणि कर्तृत्व)",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%95%E0%A4%B0%E0%A5%8D%E0%A4%AE%E0%A4%B5%E0%A5%80%E0%A4%B0%20%E0%A4%AD%E0%A4%BE%E0%A4%8A%E0%A4%B0%E0%A4%BE%E0%A4%B5%20%E0%A4%AA%E0%A4%BE%E0%A4%9F%E0%A5%80%E0%A4%B2.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "कात्यायन शुल्ब सूत्रे",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%95%E0%A4%BE%E0%A4%B2%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%AF%E0%A4%A8%20%E0%A4%B6%E0%A5%81%E0%A4%B2%E0%A5%8D%E0%A4%AC%20%E0%A4%B8%E0%A5%82%E0%A4%A4%E0%A5%8D%E0%A4%B0%E0%A5%87.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्राचे शिल्पकार – नाना पाटील",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%B0%E0%A4%BE%E0%A4%B7%E0%A5%8D%E0%A4%9F%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%9A%E0%A5%87%20%E0%A4%B6%E0%A4%BF%E0%A4%B2%E0%A5%8D%E0%A4%AA%E0%A4%95%E0%A4%BE%E0%A4%B0%20-%20%E0%A4%A8%E0%A4%BE%E0%A4%A8%E0%A4%BE%20%E0%A4%AA%E0%A4%BE%E0%A4%9F%E0%A5%80%E0%A4%B2.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "खानदेशातील कृषक जीवन सचित्र कोश",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%96%E0%A4%BE%E0%A4%A8%E0%A4%A6%E0%A5%87%E0%A4%B6%E0%A4%BE%E0%A4%A4%E0%A5%80%E0%A4%B2%20%E0%A4%95%E0%A5%83%E0%A4%B7%E0%A4%95%20%E0%A4%9C%E0%A5%80%E0%A4%B5%E0%A4%A8.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "गजाआडच्या कविता",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%97%E0%A4%9C%E0%A4%BE%E0%A4%86%E0%A4%A1%E0%A4%9A%E0%A5%8D%E0%A4%AF%E0%A4%BE%20%E0%A4%95%E0%A4%B5%E0%A4%BF%E0%A4%A4%E0%A4%BE.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "चलेजाव आंदोलन",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%9A%E0%A4%B2%E0%A5%87%E0%A4%9C%E0%A4%BE%E0%A4%B5%20%E0%A4%86%E0%A4%82%E0%A4%A6%E0%A5%8B%E0%A4%B2%E0%A4%A8.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्राचे शिल्पकार तंट्या भिल्ल",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%9C%E0%A4%A8%E0%A4%A8%E0%A4%BE%E0%A4%AF%E0%A4%95%20%E0%A4%A4%E0%A4%82%E0%A4%9F%E0%A5%8D%E0%A4%AF%E0%A4%BE%20%E0%A4%AD%E0%A4%BF%E0%A4%B2%E0%A5%8D%E0%A4%B2.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "टोळ्ळु-गट्टी",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%9F%E0%A5%8B%E0%A4%B3%E0%A5%8D%E0%A4%B3%E0%A5%81-%E0%A4%97%E0%A4%9F%E0%A5%8D%E0%A4%9F%E0%A5%80.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "ट्रांझिस्टर",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%9F%E0%A5%8D%E0%A4%B0%E0%A4%BE%E0%A4%82%E0%A4%9D%E0%A4%BF%E0%A4%B8%E0%A5%8D%E0%A4%9F%E0%A4%B0.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "ताऱ्यांचे अंतरंग",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/ताऱ्यांचे अंतरंग.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "धर्मकीर्तन",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%A7%E0%A4%B0%E0%A5%8D%E0%A4%AE%E0%A4%95%E0%A5%80%E0%A4%B0%E0%A5%8D%E0%A4%A4%E0%A4%A8.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "पंडिता रमाबाई यांचा इंग्लंडचा प्रवास",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AA%E0%A4%82%E0%A4%A1%E0%A4%BF%E0%A4%A4%E0%A4%BE%20%E0%A4%B0%E0%A4%AE%E0%A4%BE%E0%A4%AC%E0%A4%BE%E0%A4%88%20%E0%A4%AF%E0%A4%BE%E0%A4%82%E0%A4%9A%E0%A4%BE%20%E0%A4%87%E0%A4%82%E0%A4%97%E0%A5%8D%E0%A4%B2%E0%A4%82%E0%A4%A1%E0%A4%9A%E0%A4%BE%20%E0%A4%AA%E0%A5%8D%E0%A4%B0%E0%A4%B5%E0%A4%BE%E0%A4%B8.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "पाणिनीय व्याकरण आणि भाषा तत्त्वज्ञान",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AA%E0%A4%BE%E0%A4%A3%E0%A4%BF%E0%A4%A8%E0%A5%80%E0%A4%AF%20%E0%A4%B5%E0%A5%8D%E0%A4%AF%E0%A4%BE%E0%A4%95%E0%A4%B0%E0%A4%A3%20%E0%A4%86%E0%A4%A3%E0%A4%BF%20%E0%A4%AD%E0%A4%BE%E0%A4%B7%E0%A4%BE-%E0%A4%A4%E0%A4%A4%E0%A5%8D%E0%A4%A4%E0%A5%8D%E0%A4%B5%E0%A4%9C%E0%A5%8D%E0%A4%9E%E0%A4%BE%E0%A4%A8.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "प्लॅस्टिकची मेजवानी",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/प्लॅस्टिकची मेजवानी.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "बहिणाईची गाणी एक अभ्यास",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/बहिणाईची गाणी एक अभ्यास.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "बहुरुपी बहुगुणी कार्बन",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AC%E0%A4%B9%E0%A5%81%E0%A4%B0%E0%A5%82%E0%A4%AA%E0%A5%80%20%E0%A4%AC%E0%A4%B9%E0%A5%81%E0%A4%97%E0%A5%81%E0%A4%A3%E0%A5%80%20%E0%A4%95%E0%A4%BE%E0%A4%B0%E0%A5%8D%E0%A4%AC%E0%A4%A8.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महात्मा गांधी – रविंद्रनाथ ठाकूर",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%AE%E0%A4%B9%E0%A4%BE%E0%A4%A4%E0%A5%8D%E0%A4%AE%E0%A4%BE%20%E0%A4%97%E0%A4%BE%E0%A4%82%E0%A4%A7%E0%A5%80%20%E2%80%93%20%E0%A4%B0%E0%A4%B5%E0%A5%80%E0%A4%82%E0%A4%A6%E0%A5%8D%E0%A4%B0%E0%A4%A8%E0%A4%BE%E0%A4%A5%20%E0%A4%A0%E0%A4%BE%E0%A4%95%E0%A5%82%E0%A4%B0.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      },
      {
        "title": "महाराष्ट्राचे शिल्पकार – दादासाहेब फाळके",
        "medium": "Marathi",
        "syllabus": "Marathi Literature",
        "pdfLink": "https://sahitya.marathi.gov.in/ebooks/%E0%A4%A6%E0%A4%BE%E0%A4%A6%E0%A4%BE%E0%A4%B8%E0%A4%BE%E0%A4%B9%E0%A5%87%E0%A4%AC%20%E0%A4%AB%E0%A4%BE%E0%A4%B3%E0%A4%95%E0%A5%87.pdf",
        "contentType": "openAccess",
        "bookType": "eBook"
      }
    ]

    // Loop through books and insert
    // for (const book of booksData) {
    //   await prisma.book.create({
    //     data: {
    //       yearOfPublication: book.publicationYear
    //         ? parseInt(book.publicationYear, 10)
    //         : null,
    //       author: book.author || null,
    //       publisher: book.publisher || null,
    //       issn: book.issn || null,
    //       subject: book.subject || null,
    //       title: book.title || null,
    //       pdfLink: book.pdfLink || null,
    //       contentType: "openAccess",
    //       bookType: "iBook", // default
    //       medium: book.medium ||book.language || null,
    //       thumbnailLink: book.thumbnailLink || null,
    //       standard: book.standard || null,
    //     },
    //   });
    //   insertedCount++;
    // }

    await prisma.Book.createMany({data:books});

    return NextResponse.json({
      success: true,
      message: ` books inserted successfully.`,
    });

  } catch (error) {
    console.error("Error inserting books:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
