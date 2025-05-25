const fs = require('fs');
const path = require('path');

// Simple SVG placeholder generator
const projects = [
    { name: 'pose-analysis', title: 'Pose Analysis', colors: ['#8B5CF6', '#06B6D4'] },
    { name: 'farm-vision', title: 'Farm Vision', colors: ['#10B981', '#F59E0B'] },
    { name: 'email-ai', title: 'Email AI', colors: ['#3B82F6', '#8B5CF6'] },
    { name: 'finance-platform', title: 'Finance Platform', colors: ['#059669', '#0D9488'] },
    { name: 'cybersecurity', title: 'Cybersecurity', colors: ['#DC2626', '#7C2D12'] },
    { name: 'ai-ml-default', title: 'AI/ML', colors: ['#8B5CF6', '#EC4899'] },
    { name: 'web-dev-default', title: 'Web Dev', colors: ['#3B82F6', '#06B6D4'] },
    { name: 'research-default', title: 'Research', colors: ['#7C3AED', '#A855F7'] },
    { name: 'security-default', title: 'Security', colors: ['#EF4444', '#F97316'] },
    { name: 'project-default', title: 'Project', colors: ['#6B7280', '#9CA3AF'] }
];

function generateSVG(project) {
    return `<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad-${project.name}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style="stop-color:${project.colors[0]};stop-opacity:1" />
                <stop offset="100%" style="stop-color:${project.colors[1]};stop-opacity:1" />
            </linearGradient>
        </defs>
        <rect width="800" height="400" fill="url(#grad-${project.name})" />
        <circle cx="150" cy="100" r="40" fill="white" opacity="0.1" />
        <circle cx="650" cy="300" r="60" fill="white" opacity="0.1" />
        <circle cx="400" cy="80" r="30" fill="white" opacity="0.1" />
        <circle cx="700" cy="150" r="45" fill="white" opacity="0.1" />
        <circle cx="200" cy="320" r="35" fill="white" opacity="0.1" />
        <text x="400" y="200" font-family="Arial, sans-serif" font-size="48" font-weight="bold" 
              text-anchor="middle" fill="white" 
              style="filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5));">
            ${project.title}
        </text>
    </svg>`;
}

// Create images directory if it doesn't exist
const imagesDir = path.join(__dirname, '..', 'public', 'images');
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir, { recursive: true });
}

// Generate SVG files
projects.forEach(project => {
    const svg = generateSVG(project);
    const filePath = path.join(imagesDir, `${project.name}.svg`);
    fs.writeFileSync(filePath, svg);
    console.log(`Generated: ${project.name}.svg`);
});

console.log('All placeholder images generated successfully!'); 