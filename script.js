// Portfolio Data for Nivetha G
// This script dynamically populates all portfolio content

// Stats Data
const statsData = [
  { label: "Experience", value: "1+ Years" },
  { label: "Skills", value: "5+" },
  { label: "Technologies", value: "5+" },
  { label: "Internship", value: "1" }
];

// Navigation Contents
const contentsData = [
  { index: "01", label: "About Me", desc: "Professional Summary", link: "about" },
  { index: "02", label: "Personal Info", desc: "Quick Details", link: "about" },
  { index: "03", label: "Education", desc: "Academic Background", link: "education" },
  { index: "04", label: "Certifications", desc: "Achievements", link: "certifications" },
  { index: "05", label: "Skills", desc: "Core Strengths", link: "skills" },
  { index: "06", label: "Project", desc: "Human Fitness System", link: "project" },
  { index: "07", label: "Experience", desc: "Internship Timeline", link: "experience" },
  { index: "08", label: "Contact", desc: "Let's Connect", link: "contact" }
];

// About Me Points
const aboutData = [
  "Undergraduate student",
  "Strong organizational skills",
  "Good time management",
  "Knowledge in computer applications",
  "Good communication skills",
  "Interested in gaining practical experience",
  "Ready to contribute to team success"
];

// Personal Information
const personalData = [
  { label: "Location", value: "Thirupathur, Tamil Nadu" },
  { label: "Email", value: "nivethanivetha2109@gmail.com" },
  { label: "Phone", value: "+91 6380431813" }
];

// Certifications Data
const certsData = [
  {
    title: "Internship Full Stack Development Certificate",
    issuer: "Edu Tantr",
    date: "May 2025",
    type: "Internship"
  },
  {
    title: "Oracle Certified Foundation Associate",
    issuer: "Oracle University",
    date: "August 2025",
    type: "Oracle"
  },
  {
    title: "Basics of Python",
    issuer: "Infosys",
    date: "March 2025",
    type: "Programming"
  },
  {
    title: "Explore Machine Learning using Python",
    issuer: "Infosys",
    date: "March 2025",
    type: "Programming"
  },
  {
    title: "Object Oriented Programming using Python",
    issuer: "Infosys",
    date: "March 2025",
    type: "Programming"
  },
  {
    title: "Introduction to MongoDB for Students",
    issuer: "ICT Academy",
    date: "August 2024",
    type: "Database"
  },
  {
    title: "Diploma in Computer Application",
    issuer: "DCA",
    date: "",
    type: "Diploma"
  }
];

// Skills Data
const skillsData = [
  "Python",
  "HTML",
  "MongoDB",
  "VS Code",
  "Data Structures",
  "Windows 11",
  "OOP",
  "Problem Solving"
];

// Project Details
const projectData = [
  "Real-time human activity detection",
  "CNN-based model implementation",
  "Image preprocessing and data augmentation",
  "Achieved 90%+ accuracy"
];

// Experience Responsibilities
const experienceData = [
  "Built responsive full-stack web applications",
  "Integrated REST APIs",
  "Worked with MySQL and MongoDB databases",
  "Improved API performance",
  "Fixed bugs and optimized features"
];

// Contact Information
const contactData = [
  { 
    label: "Phone", 
    value: "+91 6380431813", 
    icon: "phone",
    link: "tel:+916380431813"
  },
  { 
    label: "Email", 
    value: "nivethanivetha2109@gmail.com", 
    icon: "envelope",
    link: "mailto:nivethanivetha2109@gmail.com"
  },
  { 
    label: "Location", 
    value: "Thirupathur, Tamil Nadu", 
    icon: "location-dot",
    link: "#"
  },
  { 
    label: "LinkedIn", 
    value: "Connect with me", 
    icon: "linkedin",
    link: "https://linkedin.com/in/nivetha-g-7b6587325"
  }
];

// Render Stats Grid
function renderStats() {
  const container = document.getElementById("statsGrid");
  if (!container) return;
  
  container.innerHTML = statsData.map(stat => `
    <div class="stat-card">
      <p>${stat.label}</p>
      <p class="stat-value">${stat.value}</p>
    </div>
  `).join('');
}

// Render Contents Grid
function renderContents() {
  const container = document.getElementById("contentsGrid");
  if (!container) return;
  
  container.innerHTML = contentsData.map(item => `
    <a href="#${item.link}" class="content-card">
      <p class="content-index">${item.index}</p>
      <h3>${item.label}</h3>
      <p class="muted">${item.desc}</p>
    </a>
  `).join('');
}

// Render About List
function renderAbout() {
  const container = document.getElementById("aboutList");
  if (!container) return;
  
  container.innerHTML = aboutData.map(point => `<li>${point}</li>`).join('');
}

// Render Personal Info
function renderPersonalInfo() {
  const container = document.getElementById("personalInfo");
  if (!container) return;
  
  container.innerHTML = personalData.map(info => `
    <div class="info-item">
      <strong>${info.label}:</strong> ${info.value}
    </div>
  `).join('');
}

// Render Certifications Grid
function renderCerts() {
  const container = document.getElementById("certGrid");
  if (!container) return;
  
  container.innerHTML = certsData.map(cert => `
    <div class="cert-card">
      <p class="cert-badge">${cert.type}</p>
      <h3>${cert.title}</h3>
      <p>${cert.issuer} • ${cert.date}</p>
    </div>
  `).join('');
}

// Render Skills Chips
function renderSkills() {
  const container = document.getElementById("skillsChips");
  if (!container) return;
  
  container.innerHTML = skillsData.map(skill => `
    <span class="chip">${skill}</span>
  `).join('');
}

// Render Project List
function renderProject() {
  const container = document.getElementById("projectList");
  if (!container) return;
  
  container.innerHTML = projectData.map(item => `<li>${item}</li>`).join('');
}

// Render Experience List
function renderExperience() {
  const container = document.getElementById("experienceList");
  if (!container) return;
  
  container.innerHTML = experienceData.map(item => `<li>${item}</li>`).join('');
}

// Render Contact Grid
function renderContact() {
  const container = document.getElementById("contactGrid");
  if (!container) return;
  
  const icons = {
    phone: '<i class="fas fa-phone"></i>',
    envelope: '<i class="fas fa-envelope"></i>',
    locationDot: '<i class="fas fa-location-dot"></i>',
    linkedin: '<i class="fab fa-linkedin"></i>'
  };
  
  container.innerHTML = contactData.map(item => `
    <a href="${item.link}" class="contact-item" ${item.link === '#' ? '' : 'target="_blank" rel="noopener noreferrer"'}>
      <p class="label">${icons[item.icon]} ${item.label}</p>
      <p class="value">${item.value}</p>
    </a>
  `).join('');
}

// Initialize all data
document.addEventListener("DOMContentLoaded", function() {
  renderStats();
  renderContents();
  renderAbout();
  renderPersonalInfo();
  renderCerts();
  renderSkills();
  renderProject();
  renderExperience();
  renderContact();
});