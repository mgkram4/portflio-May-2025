"use client";

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
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

// Ensure all projects have a `featured` property, defaulting to false if not present
const allProjects = projects.map(p => ({ ...p, featured: p.featured ?? false }));

export default function ProjectsPage() {
  const [filter, setFilter] = useState('all');
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [threeLoaded, setThreeLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Load Three.js background after a short delay
    const timer = setTimeout(() => setThreeLoaded(true), 100);
    
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const filteredProjects = allProjects.filter(project => 
    filter === 'all' || project.category?.toLowerCase() === filter
  );

  const pageCategories = Array.from(new Set(allProjects.map(p => p.category || 'general')));

  if (!mounted) {
    return (
      <div className="min-h-screen bg-neutral-950 text-neutral-300 flex items-center justify-center">
        <div className="text-2xl">Loading Projects...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-300 overflow-x-hidden relative pt-24 md:pt-32 pb-16">
      {threeLoaded && <HomeThreeBackground scrollY={scrollY} />}
      {!threeLoaded && (
        <div className="fixed inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-800 z-0" />
      )}

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black mb-4">
            <span className="bg-gradient-to-r from-neutral-100 via-neutral-300 to-neutral-400 bg-clip-text text-transparent">
              My Portfolio
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto">
            A collection of my work in AI/ML, web development, research, and more.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 md:mb-16"
        >
          <button
            onClick={() => setFilter('all')}
            className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 border-2 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 ${filter === 'all' 
              ? 'bg-neutral-300 text-neutral-900 border-neutral-300 shadow-lg' 
              : 'bg-neutral-800/60 text-neutral-300 border-neutral-700/70 hover:bg-neutral-700 hover:border-neutral-500 hover:text-neutral-100'}`}
          >
            All
          </button>
          {pageCategories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category.toLowerCase())}
              className={`px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-300 border-2 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-900 ${filter === category.toLowerCase() 
                ? 'bg-neutral-300 text-neutral-900 border-neutral-300 shadow-lg' 
                : 'bg-neutral-800/60 text-neutral-300 border-neutral-700/70 hover:bg-neutral-700 hover:border-neutral-500 hover:text-neutral-100'}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, ' ')}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title + index} project={project} index={index} />
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="text-center py-16"
          >
            <p className="text-2xl text-neutral-500 mb-4">No projects found for this category.</p>
            <button
              onClick={() => setFilter('all')}
              className="px-6 py-3 bg-neutral-700 text-neutral-200 rounded-lg hover:bg-neutral-600 transition-colors duration-300"
            >
              Show All Projects
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
} 