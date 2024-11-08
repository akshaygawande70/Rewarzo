export const categoriesData = [
  {
    id: 1,
    img: "/img/categories/analytics-icon.png",
    title: "Business Intelligence",
    description:
      "Learn data analysis, visualization, and decision-making skills using top BI tools like Tableau, Power BI, and MicroStrategy.",
    route: "/dashboard/tutorial-category/",
    status: "Active",
    subcategories: [
      { id: 101, title: "Tableau", route: "/dashboard/tutorial-category/tableau" },
      { id: 102, title: "Power BI", route: "/dashboard/tutorial-category/powerbi" },
      { id: 103, title: "MicroStrategy", route: "/dashboard/tutorial-category/microstrategy" },
    ]
  },
  {
    id: 2,
    img: "/img/categories/cloud-icon.png",
    title: "Cloud Computing",
    description:
      "Explore cloud services, architecture, and deployment models with AWS, Azure, and Google Cloud Platform.",
    route: "/dashboard/tutorial-category/",
    status: "Inactive",
    subcategories: [
      { id: 201, title: "AWS", route: "/dashboard/tutorial-category/aws" },
      { id: 202, title: "Azure", route: "/dashboard/tutorial-category/azure" },
      { id: 203, title: "Google Cloud Platform", route: "/dashboard/tutorial-category/gcp" },
    ]
  },
  {
    id: 3,
    img: "/img/categories/coding-icon.png",
    title: "Software Development",
    description:
      "Master coding, software design, and development methodologies with languages like Python, JavaScript, and Java.",
    route: "/dashboard/tutorial-category/",
    status: "Active",
    subcategories: [
      { id: 301, title: "Python", route: "/dashboard/tutorial-category/python" },
      { id: 302, title: "JavaScript", route: "/dashboard/tutorial-category/javascript" },
      { id: 303, title: "Java", route: "/dashboard/tutorial-category/java" },
    ]
  },
  {
    id: 4,
    img: "/img/categories/data-science-icon.png",
    title: "Data Science",
    description:
      "Dive into data analysis, machine learning, and statistical modeling with Python, R, and other tools.",
    route: "/dashboard/tutorial-category/",
    status: "Active",
    subcategories: [
      { id: 401, title: "Python", route: "/dashboard/tutorial-category/python-ds" },
      { id: 402, title: "R", route: "/dashboard/tutorial-category/r" },
      { id: 403, title: "Machine Learning", route: "/dashboard/tutorial-category/ml" },
    ]
  },
  {
    id: 5,
    img: "/img/categories/ai-icon.png",
    title: "Artificial Intelligence",
    description:
      "Explore AI concepts, neural networks, and deep learning frameworks to build intelligent systems.",
    route: "/dashboard/tutorial-category/",
    status: "Inactive",
    subcategories: [
      { id: 501, title: "Neural Networks", route: "/dashboard/tutorial-category/neural-networks" },
      { id: 502, title: "Deep Learning", route: "/dashboard/tutorial-category/deep-learning" },
      { id: 503, title: "AI Applications", route: "/dashboard/tutorial-category/ai-applications" },
    ]
  },
  {
    id: 6,
    img: "/img/categories/cybersecurity-icon.png",
    title: "Cybersecurity",
    description:
      "Learn about network security, ethical hacking, and cybersecurity frameworks to protect systems and data.",
    route: "/dashboard/tutorial-category/",
    status: "Active",
    subcategories: [
      { id: 601, title: "Network Security", route: "/dashboard/tutorial-category/network-security" },
      { id: 602, title: "Ethical Hacking", route: "/dashboard/tutorial-category/ethical-hacking" },
      { id: 603, title: "Cybersecurity Frameworks", route: "/dashboard/tutorial-category/cybersecurity-frameworks" },
    ]
  },
  {
    id: 7,
    img: "/img/categories/web-dev-icon.png",
    title: "Web Development",
    description:
      "Build modern web applications using HTML, CSS, JavaScript, and frameworks like React, Angular, and Vue.",
    route: "/dashboard/tutorial-category/",
    status: "Active",
    subcategories: [
      { id: 701, title: "HTML", route: "/dashboard/tutorial-category/html" },
      { id: 702, title: "CSS", route: "/dashboard/tutorial-category/css" },
      { id: 703, title: "JavaScript Frameworks", route: "/dashboard/tutorial-category/javascript-frameworks" },
    ]
  },
  {
    id: 8,
    img: "/img/categories/mobile-dev-icon.png",
    title: "Mobile Development",
    description:
      "Create mobile apps for iOS and Android using Swift, Kotlin, and cross-platform frameworks like React Native.",
    route: "/dashboard/tutorial-category/",
    status: "Active",
    subcategories: [
      { id: 801, title: "Swift", route: "/dashboard/tutorial-category/swift" },
      { id: 802, title: "Kotlin", route: "/dashboard/tutorial-category/kotlin" },
      { id: 803, title: "React Native", route: "/dashboard/tutorial-category/react-native" },
    ]
  },
  {
    id: 9,
    img: "/img/categories/devops-icon.png",
    title: "DevOps",
    description:
      "Implement continuous integration, continuous deployment, and infrastructure as code with tools like Jenkins, Docker, and Kubernetes.",
    route: "/dashboard/tutorial-category/",
    status: "Active",
    subcategories: [
      { id: 901, title: "Jenkins", route: "/dashboard/tutorial-category/jenkins" },
      { id: 902, title: "Docker", route: "/dashboard/tutorial-category/docker" },
      { id: 903, title: "Kubernetes", route: "/dashboard/tutorial-category/kubernetes" },
    ]
  },
  {
    id: 10,
    img: "/img/categories/blockchain-icon.png",
    title: "Blockchain",
    description:
      "Understand blockchain technology, smart contracts, and decentralized applications with platforms like Ethereum and Hyperledger.",
    route: "/dashboard/tutorial-category/",
    status: "Inactive",
    subcategories: [
      { id: 1001, title: "Ethereum", route: "/dashboard/tutorial-category/ethereum" },
      { id: 1002, title: "Hyperledger", route: "/dashboard/tutorial-category/hyperledger" },
      { id: 1003, title: "Smart Contracts", route: "/dashboard/tutorial-category/smart-contracts" },
    ]
  }
];

export default categoriesData;
