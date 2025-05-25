"use client";

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';

const HomeThreeBackground = dynamic(() => import('../components/HomeThreeBackground'), {
  ssr: false,
  loading: () => null
});

const projects = [
  {
    title: "Intelligent Perfect Pose and Health Analysis in Sports and Fitness",
    shortDescription: "Novel contactless vital-sign monitoring technique, using WebSockets, BERT, and React/D3.js. [IEEE ICHI]",
    detailedDescription: {
      situation: "Presented novel contactless vital-sign monitoring technique at IEEE ICHI; pre-print DOI: xx/xxxx.",
      task: "This was an IEEE Publication associated with IEEE ICHI.",
      action: "Utilized WebSockets for real-time data ingestion, a fine-tuned BERT model for sentiment classification, and Topic Modeling (LDA) for identifying key themes. The frontend was built with React and D3.js for visualizations.",
      result: "Delivered a dashboard providing sub-second latency insights, improving brand engagement tracking by 40%."
    },
    techStack: ["Contactless Vital-Sign Monitoring", "IEEE Publication", "WebSockets", "BERT", "Topic Modeling (LDA)", "React", "D3.js", "AI/ML"],
    githubUrl: undefined,
    liveDemoUrl: undefined,
    paperUrl: "#",
    category: "research",
    featured: true
  },
  {
    title: "Farm Vision 🌾 - Agricultural Intelligence Platform",
    shortDescription: "Award-winning web app for agricultural monitoring, using AI for disease detection & yield prediction.",
    detailedDescription: {
      situation: "Farmers face challenges in optimizing crop yields and managing resources efficiently due to unpredictable weather, soil conditions, and plant diseases.",
      task: "Develop a comprehensive web application, &apos;Farm Vision&apos;, to provide agricultural monitoring and analysis, incorporating weather data, soil metrics, AI-powered disease detection, and yield prediction.",
      action: "Led a team to build a full-stack application using HTML, CSS, JavaScript for the frontend, and Python with FastAPI for the backend. Implemented machine learning models with PyTorch and Scikit-learn for disease detection from images and yield forecasting. Integrated NASA soil data and real-time weather APIs.",
      result: "Successfully launched Farm Vision, which won &apos;Best use of AI/ML&apos; at Hack for Humanity 2025. The platform provides actionable insights to farmers, aiding in improved decision-making."
    },
    techStack: ["Python", "FastAPI", "PyTorch", "Scikit-learn", "AI/ML", "HTML5", "CSS3", "JavaScript", "Chart.js"],
    githubUrl: "https://github.com/mgkram4/Hack-4-Humanity-2025",
    liveDemoUrl: "https://devpost.com/software/farmer-vision?ref_content=my-projects-tab&ref_feature=my_projects",
    paperUrl: undefined,
    category: "ai-ml",
    featured: true
  },
  {
    title: "PenguinPal",
    shortDescription: "AI-powered email summarizer with Claude API.",
    detailedDescription: {
      situation: "This was a Hackathon Project for Cerebral Beach Hacks in 2024.",
      task: "Develop an AI-powered email summarizer with Claude API, secure OAuth stack, and Next.js dashboard.",
      action: "Leveraged Kubeflow and Kubernetes for orchestrating ML workflows, Docker for containerization, Jenkins for CI/CD, and Seldon Core for model serving.",
      result: "Reduced model deployment time from days to hours, and improved model performance monitoring and reproducibility."
    },
    techStack: ["Claude API", "Next.js", "OAuth", "Kubeflow", "Kubernetes", "Docker", "Jenkins"],
    githubUrl: "https://github.com/mgkram4/Langchain-Agent",
    liveDemoUrl: undefined,
    paperUrl: undefined,
    category: "ai-ml"
  },
  {
    title: "Perfect Pose GDG - Computer Vision Pose Estimation",
    shortDescription: "Pose estimation project using C++, potentially for a Google Developer Group.",
    detailedDescription: {
      situation: "The need to accurately detect and analyze human poses from images or video streams for applications in sports, health, or interactive systems.",
      task: "Develop a robust and efficient pose estimation model using C++ for performance-critical applications.",
      action: "Implemented computer vision algorithms in C++ to identify key body joints and track their movement.",
      result: "A C++ based pose estimation system capable of real-time or near real-time performance."
    },
    techStack: ["C++", "Computer Vision", "Pose Estimation", "AI/ML", "OpenCV"],
    githubUrl: "https://github.com/mgkram4/Perfect-Pose-GDG",
    liveDemoUrl: undefined,
    paperUrl: undefined,
    category: "ai-ml"
  },
  {
    title: "Vista Pacific Capital - Equipment Financing Platform",
    shortDescription: "Web application for Vista Pacific Capital, facilitating equipment financing applications.",
    detailedDescription: {
      situation: "Vista Pacific Capital required a modern online presence to streamline their application process.",
      task: "Develop a comprehensive web platform for financing applications ranging from $20,000 to $20 million.",
      action: "Built using TypeScript and modern web technologies with forms for application submission and financing product information.",
      result: "An operational online platform that enhances customer engagement and simplifies the financing workflow."
    },
    techStack: ["TypeScript", "React", "Next.js", "Financial Technology"],
    githubUrl: "https://github.com/mgkram4/Vista-Pacific-Capital",
    liveDemoUrl: "https://www.vistapacificcapital.com/",
    paperUrl: undefined,
    category: "web-dev",
    featured: true
  },
  {
    title: "AI Phishing Email Detector",
    shortDescription: "Machine learning model to detect and classify phishing emails.",
    detailedDescription: {
      situation: "The increasing threat of sophisticated phishing emails requires automated detection systems.",
      task: "Develop a machine learning-based system to classify emails as legitimate or phishing attempts.",
      action: "Utilized NLP techniques, specifically TF-IDF for text vectorization, and trained classifier models.",
      result: "A functional phishing detection model for integration into email security systems."
    },
    techStack: ["Python", "NLP", "TF-IDF", "Machine Learning", "Scikit-learn"],
    githubUrl: "https://github.com/mgkram4/email-phishing-detecor",
    liveDemoUrl: undefined,
    paperUrl: undefined,
    category: "security"
  },
  {
    title: "perfect-pose-vision-demo",
    shortDescription: "A Python-based computer vision demonstration for real-time human pose estimation and analysis.",
    detailedDescription: {
      situation: "Accurate human pose estimation is crucial for applications in fitness, healthcare, and human-computer interaction, but requires sophisticated computer vision techniques.",
      task: "Develop a demonstration system to showcase real-time pose estimation capabilities using Python and popular computer vision libraries, focusing on accuracy and performance.",
      action: "Implemented a pose estimation pipeline using Python, OpenCV, and MediaPipe. The system captures video input, processes frames to detect key body landmarks, and visualizes the skeletal structure in real-time. Explored different models for accuracy trade-offs.",
      result: "Created a functional demo that accurately tracks and visualizes human poses from a webcam feed, serving as a foundation for more complex applications like exercise form correction or gesture recognition."
    },
    techStack: ["Python", "OpenCV", "MediaPipe", "NumPy"],
    githubUrl: "https://github.com/mgkram4/perfect-pose-vision-demo",
    liveDemoUrl: undefined,
    paperUrl: undefined,
    category: "ai-ml",
    featured: true
  },
  {
    title: "Langchain-Agent",
    shortDescription: "An AI agent built with Python and Langchain, capable of performing complex tasks through language understanding.",
    detailedDescription: {
      situation: "Large Language Models (LLMs) offer powerful capabilities, but orchestrating them to perform multi-step, tool-using tasks requires a framework like Langchain.",
      task: "Develop an intelligent agent using Langchain that can interact with various tools (e.g., search engines, APIs, databases) to answer complex queries or automate workflows based on natural language instructions.",
      action: "Designed an agent architecture using Langchain, defining its tools, prompt engineering strategies, and memory management. Implemented the agent in Python, integrating it with selected APIs (e.g., Google Search, Wikipedia) to enable autonomous task execution.",
      result: "Successfully built a Langchain agent that can understand user requests, break them down into sub-tasks, utilize external tools to gather information or perform actions, and synthesize a coherent response or complete a workflow."
    },
    techStack: ["Python", "Langchain", "OpenAI API", "LLMs", "API Integration"],
    githubUrl: "https://github.com/mgkram4/Langchain-Agent",
    liveDemoUrl: undefined,
    paperUrl: undefined,
    category: "ai-ml",
    featured: true
  },
  {
    title: "Twitter-Prediction-Analyzer",
    shortDescription: "TypeScript application for analyzing Twitter data and predicting trends or sentiment using ML.",
    detailedDescription: {
      situation: "Social media platforms like Twitter are vast sources of real-time data that can be analyzed for sentiment, trend prediction, and public opinion mining.",
      task: "Create a tool to fetch Twitter data, perform sentiment analysis, and potentially predict emerging trends using machine learning techniques.",
      action: "Developed a TypeScript application to interact with the Twitter API for data collection. Implemented NLP techniques for text preprocessing and sentiment analysis (e.g., using VADER or training a custom model). Explored time-series analysis or other ML models for trend prediction.",
      result: "A functional analyzer capable of ingesting tweets, classifying their sentiment, and visualizing results, providing insights into public discourse on specific topics."
    },
    techStack: ["TypeScript", "Twitter API", "NLP", "Machine Learning", "Data Visualization"],
    githubUrl: "https://github.com/mgkram4/Twitter-Prediction-Analyzer",
    liveDemoUrl: undefined,
    paperUrl: undefined,
    category: "ai-ml",
    featured: true
  },
  {
    title: "Security-Dashboard",
    shortDescription: "A Python-based dashboard for visualizing security metrics and alerts from various sources.",
    detailedDescription: {
      situation: "Organizations need a centralized view of their security posture, aggregating data from different security tools and logs to identify threats and vulnerabilities.",
      task: "Develop a security dashboard that ingests data from various security information sources, processes it, and presents key metrics and alerts in an intuitive visual format.",
      action: "Built a backend in Python (e.g., using Flask or Django) to collect and parse security logs/alerts from APIs or files. Designed a database schema to store processed security data. Created a web frontend (potentially with a framework like Dash or by integrating with a JS charting library) to display interactive charts, tables, and alert notifications.",
      result: "A prototype security dashboard providing a consolidated view of security events, helping security analysts to monitor threats and respond more effectively."
    },
    techStack: ["Python", "Flask", "Django", "Security Analytics", "Data Visualization"],
    githubUrl: "https://github.com/mgkram4/Security-Dashboard",
    liveDemoUrl: undefined,
    paperUrl: undefined,
    category: "security",
    featured: true
  },
  {
    title: "NFSW-Blocker-Mobile",
    shortDescription: "A Dart-based mobile application to filter and block NSFW content for safer browsing.",
    detailedDescription: {
      situation: "Protecting users, especially minors, from inappropriate online content is a growing concern. Mobile applications can provide on-device filtering solutions.",
      task: "Create a mobile application using Dart (likely with Flutter) that can identify and block NSFW (Not Safe For Work) content in real-time or based on URL filtering.",
      action: "Developed a Flutter application for cross-platform compatibility. Integrated content analysis APIs or developed a local model (e.g., using TensorFlow Lite) for image/text classification. Implemented URL blocklists and potentially VPN service integration for traffic filtering.",
      result: "A mobile app that helps users filter NSFW content, enhancing online safety. The app features a user-friendly interface for managing settings and blocklists."
    },
    techStack: ["Dart", "Flutter", "TensorFlow Lite", "Content Filtering", "Mobile Development"],
    githubUrl: "https://github.com/mgkram4/NFSW-Blocker-Mobile",
    liveDemoUrl: undefined,
    paperUrl: undefined,
    category: "mobile-dev",
    featured: true
  },
  {
    title: "Data-Analysis-Retail",
    shortDescription: "Python project focused on analyzing retail data to extract insights for business intelligence.",
    detailedDescription: {
      situation: "Retail businesses generate vast amounts of sales and customer data. Analyzing this data can reveal valuable insights for inventory management, marketing strategies, and customer segmentation.",
      task: "Perform an in-depth analysis of a retail dataset to identify sales patterns, customer behavior, and product performance. Visualize findings and provide actionable recommendations.",
      action: "Used Python with libraries like Pandas for data manipulation, NumPy for numerical operations, Matplotlib and Seaborn for data visualization, and Scikit-learn for any predictive modeling (e.g., customer churn, sales forecasting). Conducted exploratory data analysis, feature engineering, and statistical modeling.",
      result: "A comprehensive report and Jupyter notebooks detailing key findings from the retail data analysis, including visualizations of trends and patterns, and data-driven recommendations for the retail business."
    },
    techStack: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-learn", "Data Analysis"],
    githubUrl: "https://github.com/mgkram4/Data-Analysis-Retail",
    liveDemoUrl: undefined,
    paperUrl: undefined,
    category: "data-science",
    featured: true
  },
  {
    title: "Quote-Scrapping-Sentiment-Analysis",
    shortDescription: "Python tool for scraping quotes from web sources and performing sentiment analysis on them.",
    detailedDescription: {
      situation: "Understanding public sentiment towards certain topics, figures, or brands often involves analyzing textual data like quotes from news articles or social media.",
      task: "Develop a system to automatically scrape quotes related to specified keywords from online sources and then analyze the sentiment of these quotes.",
      action: "Built a web scraper using Python libraries like BeautifulSoup and Requests/Scrapy to collect quotes. Implemented NLP techniques for sentiment analysis using VADER, TextBlob, or a custom-trained model on the scraped quotes. Stored results in a structured format (e.g., CSV, database).",
      result: "An automated tool that provides a dataset of quotes and their associated sentiment scores, enabling analysis of public opinion on various subjects."
    },
    techStack: ["Python", "BeautifulSoup", "Scrapy", "NLP", "Sentiment Analysis", "VADER", "TextBlob"],
    githubUrl: "https://github.com/mgkram4/Quote-Scrapping-Sentiment-Analysis",
    liveDemoUrl: undefined,
    paperUrl: undefined,
    category: "ai-ml",
    featured: true
  },
  {
    title: "MeidaPipes-Ball-Sort",
    shortDescription: "A Python project using MediaPipe for hand tracking to interact with a virtual ball sorting game.",
    detailedDescription: {
      situation: "Gesture-based interaction offers a natural and engaging way to control applications and games. MediaPipe provides robust hand tracking capabilities.",
      task: "Create a game where users sort virtual balls into containers using hand gestures, tracked in real-time via MediaPipe.",
      action: "Developed a game environment using Pygame or a similar Python graphics library. Integrated MediaPipe for hand landmark detection. Implemented game logic to interpret hand gestures (e.g., pinch to grab, drag to move) to interact with virtual balls and sorting mechanics.",
      result: "An interactive game prototype demonstrating the use of MediaPipe for gesture-controlled gaming, offering a fun and intuitive user experience."
    },
    techStack: ["Python", "MediaPipe", "OpenCV", "Pygame", "NumPy"],
    githubUrl: "https://github.com/mgkram4/MeidaPipes-Ball-Sort",
    liveDemoUrl: undefined,
    paperUrl: undefined,
    category: "ai-ml",
    featured: true
  },
  {
    title: "House-Price_Predictor",
    shortDescription: "A machine learning project in TypeScript to predict house prices based on various features.",
    detailedDescription: {
      situation: "Accurate house price prediction is valuable for buyers, sellers, and real estate investors. Machine learning models can learn complex patterns from historical data to make these predictions.",
      task: "Develop a machine learning model to predict house prices using a dataset of property features (e.g., size, location, number of rooms).",
      action: "Preprocessed a housing dataset, handling missing values and encoding categorical features. Trained and evaluated several regression models (e.g., Linear Regression, Random Forest Regressor, Gradient Boosting Regressor) using a TypeScript-based ML library (like TensorFlow.js or a custom implementation). Performed hyperparameter tuning to optimize the best model.",
      result: "A trained model capable of predicting house prices with a reasonable accuracy, along with an analysis of feature importance and model performance metrics."
    },
    techStack: ["TypeScript", "TensorFlow.js", "Machine Learning", "Regression Models", "Data Preprocessing"],
    githubUrl: "https://github.com/mgkram4/House-Price_Predictor",
    liveDemoUrl: undefined,
    paperUrl: undefined,
    category: "ai-ml",
    featured: true
  },
  {
    title: "Object-Detector---YOLO-ML",
    shortDescription: "Python application for real-time object detection using the YOLO (You Only Look Once) machine learning model.",
    detailedDescription: {
      situation: "Real-time object detection is a fundamental computer vision task with applications in surveillance, autonomous driving, and robotics. YOLO is known for its speed and accuracy.",
      task: "Implement an object detection system using a pre-trained YOLO model to identify and locate objects in images or video streams.",
      action: "Utilized Python with OpenCV&apos;s DNN module or a dedicated YOLO library (like Darknet or PyTorch YOLO implementations) to load a pre-trained YOLO model (e.g., YOLOv3, YOLOv5). Processed input images/video frames, performed inference, and drew bounding boxes with class labels around detected objects.",
      result: "A functional real-time object detector capable of identifying multiple objects from common classes in visual input, showcasing practical application of deep learning for computer vision."
    },
    techStack: ["Python", "YOLO", "OpenCV", "PyTorch", "Computer Vision", "Object Detection"],
    githubUrl: "https://github.com/mgkram4/Object-Detector---YOLO-ML",
    liveDemoUrl: undefined,
    paperUrl: undefined,
    category: "ai-ml",
    featured: true
  },
  {
    title: "Animal-Classifier---Keras-ML",
    shortDescription: "A machine learning project using Python and Keras to classify images of animals.",
    detailedDescription: {
      situation: "Image classification is a core task in computer vision. Deep learning models, particularly Convolutional Neural Networks (CNNs), excel at this.",
      task: "Build and train a CNN using Keras (TensorFlow backend) to classify images into different animal categories.",
      action: "Collected or used a public dataset of animal images (e.g., CIFAR-10 subset, Kaggle datasets). Preprocessed images (resizing, normalization, augmentation). Designed and implemented a CNN architecture in Keras. Trained the model, monitored its performance, and evaluated it on a test set.",
      result: "A trained animal image classifier with good accuracy on the test dataset, demonstrating the process of building and training a deep learning model for image recognition."
    },
    techStack: ["Python", "Keras", "TensorFlow", "CNN", "Image Classification", "Deep Learning"],
    githubUrl: "https://github.com/mgkram4/Animal-Classifier---Keras-ML",
    liveDemoUrl: undefined,
    paperUrl: undefined,
    category: "ai-ml",
    featured: true
  },
  {
    title: "Alpca-Trading-GUI",
    shortDescription: "A GUI application for interacting with the Alpaca trading API, likely for algorithmic trading or portfolio management.",
    detailedDescription: {
      situation: "Algorithmic trading requires an interface to manage strategies, monitor positions, and execute trades. The Alpaca API provides commission-free stock trading.",
      task: "Develop a graphical user interface (GUI) that allows users to connect to their Alpaca account, view market data, manage orders, and potentially deploy trading algorithms.",
      action: "Built the GUI using HTML/JavaScript for a web-based interface or a desktop framework like Tkinter/PyQt (if Python-based). Integrated with the Alpaca trading API for account information, market data, and order execution. Implemented features for displaying portfolio, charts, and order forms.",
      result: "A functional GUI application enabling users to interact with the Alpaca trading platform, facilitating easier management of trading activities."
    },
    techStack: ["HTML", "JavaScript", "Alpaca API", "Trading", "GUI Development"],
    githubUrl: "https://github.com/mgkram4/Alpca-Trading-GUI",
    liveDemoUrl: undefined,
    paperUrl: undefined,
    category: "web-dev",
    featured: false
  },
  {
    title: "shengsheng-mobile",
    shortDescription: "A mobile application developed using Dart, likely with the Flutter framework.",
    detailedDescription: {
      situation: "Mobile applications are ubiquitous, serving various purposes from utility to entertainment. Flutter allows for cross-platform development from a single codebase.",
      task: "Design and develop a functional mobile application named &apos;shengsheng-mobile&apos; with a specific set of features (e.g., social networking, productivity, e-commerce).",
      action: "Utilized Dart and the Flutter framework to build the user interface and application logic. Implemented state management solutions (e.g., Provider, BLoC). Integrated with backend services or local storage (e.g., Firebase, SQLite) for data persistence. Designed an intuitive and responsive UI.",
      result: "A working mobile application available for Android and/or iOS, showcasing skills in mobile development, UI/UX design, and potentially backend integration."
    },
    techStack: ["Dart", "Flutter", "Mobile Development", "State Management", "UI/UX"],
    githubUrl: "https://github.com/mgkram4/shengsheng-mobile",
    liveDemoUrl: undefined,
    paperUrl: undefined,
    category: "mobile-dev",
    featured: false
  },
  {
    title: "honeypot",
    shortDescription: "A cybersecurity project implementing a honeypot to detect and analyze malicious activities.",
    detailedDescription: {
      situation: "Honeypots are valuable tools for cybersecurity researchers and professionals to attract, detect, and analyze attacker techniques and malware in a controlled environment.",
      task: "Set up and configure a honeypot system that mimics vulnerable services to capture information about attempted intrusions and malware.",
      action: "Deployed a honeypot software (e.g., Cowrie, Dionaea) on a server. Configured it to emulate common services (e.g., SSH, Telnet, HTTP). Implemented logging mechanisms to capture attacker IP addresses, commands executed, and malware samples uploaded. Analyzed collected data.",
      result: "A functional honeypot system that successfully captured and logged malicious activities, providing insights into common attack vectors and attacker behaviors. This project was likely HTML-based for a simple web interface or report."
    },
    techStack: ["HTML", "Cybersecurity", "Honeypot", "Network Security", "Threat Analysis"],
    githubUrl: "https://github.com/mgkram4/honeypot",
    liveDemoUrl: undefined,
    paperUrl: undefined,
    category: "security",
    featured: false
  }
];

const categories = [
  { id: 'all', name: 'All Projects', icon: '🚀' },
  { id: 'ai-ml', name: 'AI/ML', icon: '🤖' },
  { id: 'web-dev', name: 'Web Development', icon: '💻' },
  { id: 'research', name: 'Research', icon: '🔬' },
  { id: 'security', name: 'Security', icon: '🔒' },
  { id: 'data-science', name: 'Data Science', icon: '📊' },
  { id: 'mobile-dev', name: 'Mobile Development', icon: '📱' }
];

export default function ProjectsPage() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const smoothY = useSpring(y, { stiffness: 300, damping: 30 });
  const smoothOpacity = useSpring(opacity, { stiffness: 300, damping: 30 });

  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [threeLoaded, setThreeLoaded] = useState(false);
  const [filter, setFilter] = useState("all");
  const [visibleProjects, setVisibleProjects] = useState(6);

  useEffect(() => {
    setMounted(true);
    setThreeLoaded(true);

    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProjects = projects.filter(project => project.category === filter || filter === 'all');

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative" suppressHydrationWarning>
      {/* Three.js Background */}
      {threeLoaded && <HomeThreeBackground scrollY={scrollY} />}
      
      {/* Fallback gradient background */}
      {!threeLoaded && (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-purple-900/20 z-0" />
      )}
      
      {/* Header section */}
      <motion.header
        style={{ y: smoothY, opacity: smoothOpacity }}
        className="pt-24 pb-16 relative"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-center"
          >
            <motion.h1 
              className="text-6xl md:text-8xl font-black mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Projects
              </span>
              <br />
              <span className="text-white/80 text-4xl md:text-5xl font-light">
                Portfolio
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed"
            >
              Innovative solutions spanning{' '}
              <span className="text-purple-400 font-semibold">AI/ML</span>,{' '}
              <span className="text-blue-400 font-semibold">Web Development</span>,{' '}
              <span className="text-cyan-400 font-semibold">Research</span>, and{' '}
              <span className="text-green-400 font-semibold">Security</span>
            </motion.p>
          </motion.div>
        </div>
      </motion.header>

      {/* Content */}
      <div className="relative z-10">
        {/* Category Filter */}
        <div className="container mx-auto px-6 mb-16">
          <motion.div
            className="flex flex-wrap justify-center gap-4"
          >
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                custom={index}
                onClick={() => setFilter(category.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`group relative px-8 py-4 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                  filter === category.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-2xl shadow-purple-500/25'
                    : 'bg-gray-900/50 text-gray-300 hover:bg-gray-800/50 hover:text-white border border-gray-700/50 backdrop-blur-sm'
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.name}</span>
                </span>
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Projects Grid */}
        <div className="container mx-auto px-6 pb-20">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={`${project.title}-${filter}-${index}`}
                project={project}
                index={index}
              />
            ))}
          </motion.div>

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-2xl text-gray-400 mb-2">
                No projects found in this category
              </p>
              <p className="text-gray-500">
                Try selecting a different category to explore more projects
              </p>
            </motion.div>
          )}
        </div>

        {/* Call to Action */}
        <div className="container mx-auto px-6 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="relative text-center bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-cyan-900/20 rounded-3xl p-16 border border-purple-500/20 backdrop-blur-xl overflow-hidden"
          >
            {/* Animated background elements */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 animate-pulse" />
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500" />
            
            <div className="relative z-10">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Ready to collaborate?
                </span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
                className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed"
              >
                I&apos;m passionate about building innovative solutions and always excited to discuss new opportunities, cutting-edge projects, and potential collaborations.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-10 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-2xl transition-all duration-300 shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40"
                >
                  <span className="relative z-10 flex items-center space-x-2">
                    <span>Get In Touch</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </motion.a>
                
                <motion.a
                  href="https://github.com/mgkram4"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-10 py-4 bg-gray-800/50 hover:bg-gray-700/50 text-white font-semibold rounded-2xl transition-all duration-300 border border-gray-600/50 backdrop-blur-sm"
                >
                  <span className="flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                    </svg>
                    <span>View GitHub</span>
                  </span>
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 