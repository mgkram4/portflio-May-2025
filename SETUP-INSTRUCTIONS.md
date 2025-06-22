# Portfolio Setup Instructions

Complete guide to implement all templates and make your portfolio production-ready.

## 🚀 Quick Start Checklist

- [ ] **Email Setup** - Configure SMTP for contact form
- [ ] **Resume Creation** - Generate professional PDF resume
- [ ] **Testimonial Collection** - Reach out to 5-7 key contacts
- [ ] **Blog Content** - Write first 2-3 technical articles
- [ ] **Case Studies** - Create detailed project breakdowns
- [ ] **Environment Variables** - Set up production configuration
- [ ] **Testing** - Verify all functionality works
- [ ] **Deployment** - Launch on production domain

---

## 1. 📧 Email Configuration (Priority 1)

### **Step 1: Set Up Gmail App Password**
1. Go to your Google Account settings
2. Enable 2-Factor Authentication if not already enabled
3. Go to "App passwords" section
4. Generate a new app password for "Mail"
5. Copy the 16-character password

### **Step 2: Create Environment File**
```bash
# Copy the template
cp env.template .env.local

# Edit with your values
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-char-app-password
CONTACT_EMAIL=your-email@gmail.com
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

### **Step 3: Test Email Functionality**
1. Start development server: `npm run dev`
2. Go to `/contact` page
3. Fill out and submit the contact form
4. Check both your email and browser for success/error messages

### **Troubleshooting:**
- **"Authentication failed"** → Check app password and 2FA enabled
- **"Connection refused"** → Verify SMTP_HOST and SMTP_PORT
- **"Module not found"** → Run `npm install nodemailer @types/nodemailer`

---

## 2. 📄 Resume Creation (Priority 2)

### **Option A: Convert Markdown to PDF**
1. Use the template in `templates/resume-template.md`
2. Fill in your actual information
3. Convert using online tools:
   - [Markdown to PDF](https://md-to-pdf.fly.dev/)
   - [Pandoc](https://pandoc.org/) (command line)
   - [VS Code PDF extension](https://marketplace.visualstudio.com/items?itemName=yzane.markdown-pdf)

### **Option B: Use Canva/Figma**
1. Create professional design
2. Include all sections from template
3. Export as PDF
4. Ensure ATS-friendly format

### **Step 3: Add to Portfolio**
1. Save PDF as `public/Mark_Garcia_Resume.pdf`
2. Update download links in:
   - Homepage CTA section
   - About page header
   - Navigation bar

### **Resume Checklist:**
- [ ] Contact information current
- [ ] All quantified achievements included
- [ ] ATS-friendly formatting
- [ ] Under 2 pages
- [ ] Professional email address
- [ ] LinkedIn and GitHub links working

---

## 3. 💬 Testimonial Collection (Priority 3)

### **Week 1: Reach Out to Key Contacts**
Use templates from `templates/testimonial-collection-template.md`

**Priority Contacts:**
1. **Research Supervisor** (Dr. at University of La Verne)
2. **Vista Pacific Capital CTO/Manager**
3. **Google Developer Group colleagues**
4. **Coding Minds Academy supervisor**
5. **Top students from your classes**

### **Sample Timeline:**
- **Day 1-2:** Send initial requests to 5-7 people
- **Day 7:** Send follow-up to non-responders
- **Day 10:** Update homepage with received testimonials
- **Day 14:** Replace placeholder testimonials

### **Integration Steps:**
1. Replace placeholder testimonials in `app/page.tsx`
2. Use real names, titles, and companies
3. Include LinkedIn profile links when possible
4. Add professional photos if available

---

## 4. ✍️ Blog Content Creation (Priority 4)

### **Start with 2-3 Core Articles:**

**Article 1: Technical Achievement Focus**
- Title: "Achieving 63% Accuracy Improvement in Pose Estimation"
- Length: 1500-2000 words
- Focus: Your research process and technical details

**Article 2: Performance Optimization**
- Title: "223% Performance Boost: React Optimization Case Study"
- Length: 1800-2200 words
- Focus: Specific techniques and measurable results

**Article 3: Teaching/Leadership**
- Title: "Training 100+ Developers: Lessons in AI Education"
- Length: 1200-1500 words
- Focus: Your teaching experience and methodology

### **Publishing Strategy:**
1. Write articles using template structure
2. Publish on Medium/Dev.to first for reach
3. Update blog page with real URLs
4. Share on LinkedIn and Twitter

### **Update Blog Page:**
Replace placeholder content in `app/blog/page.tsx` with real articles:
```javascript
const blogPosts = [
  {
    title: "Your Real Article Title",
    excerpt: "Actual article summary...",
    date: "Real publication date",
    // ... other real data
    externalUrl: "https://medium.com/@markgarcia/your-real-article"
  }
  // ... more real articles
];
```

---

## 5. 📊 Case Study Development (Priority 5)

### **Create 2-3 Detailed Case Studies:**

**Case Study 1: Pose Estimation Research**
- Use template from `templates/case-study-template.md`
- Focus on 63% accuracy improvement
- Include technical diagrams and code samples
- Highlight research methodology

**Case Study 2: Vista Pacific Capital Platform**
- Detail the 223% performance improvement
- Show before/after metrics
- Include architecture decisions
- Explain optimization techniques

**Case Study 3: Agricultural AI Platform**
- Hackathon project details
- Computer vision implementation
- User interface design
- Impact and recognition

### **Implementation:**
1. Create individual pages: `app/case-studies/[slug]/page.tsx`
2. Add navigation links from project cards
3. Include compelling visuals and metrics
4. Link to live demos and GitHub repos

---

## 6. 🖼️ Visual Assets & Professional Images

### **Professional Headshots:**
- [ ] Get professional photos taken
- [ ] Or use high-quality selfies with good lighting
- [ ] Optimize for web (WebP format, <100KB)
- [ ] Add to About page and testimonials

### **Project Screenshots:**
- [ ] Capture high-quality app screenshots
- [ ] Create architecture diagrams
- [ ] Design performance charts
- [ ] Generate code snippet images

### **Tools for Graphics:**
- **Diagrams:** [Excalidraw](https://excalidraw.com/), [Draw.io](https://draw.io/)
- **Screenshots:** [CleanShot X](https://cleanshot.com/), [Kap](https://getkap.co/)
- **Charts:** [Chart.js](https://chartjs.org/), [D3.js](https://d3js.org/)
- **Image Optimization:** [TinyPNG](https://tinypng.com/)

---

## 7. 🔧 Technical Configuration

### **Environment Variables for Production:**
```bash
# Production .env.local
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-production-email@gmail.com
SMTP_PASS=your-production-app-password
CONTACT_EMAIL=your-production-email@gmail.com
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### **Performance Optimization:**
1. **Image Optimization:**
   ```bash
   npm install next/image
   # Replace <img> tags with Next.js Image component
   ```

2. **Bundle Analysis:**
   ```bash
   npm install @next/bundle-analyzer
   # Add to next.config.js for bundle size monitoring
   ```

3. **SEO Enhancement:**
   ```bash
   npm install next-seo
   # Add structured data and meta tags
   ```

---

## 8. 🧪 Testing Checklist

### **Functionality Testing:**
- [ ] Contact form sends emails successfully
- [ ] Auto-reply emails work
- [ ] All internal links work
- [ ] External links open in new tabs
- [ ] Resume download works
- [ ] Mobile responsiveness
- [ ] Dark/light theme switching
- [ ] Loading states and error handling

### **Content Review:**
- [ ] No placeholder text remaining
- [ ] All personal information accurate
- [ ] Professional tone throughout
- [ ] Consistent branding and colors
- [ ] Proper grammar and spelling

### **Performance Testing:**
- [ ] Page load times under 3 seconds
- [ ] Images optimized and loading properly
- [ ] No console errors
- [ ] Lighthouse score above 90

---

## 9. 🚀 Deployment

### **Domain Setup:**
1. Purchase professional domain (markgarcia.dev recommended)
2. Configure DNS settings
3. Set up SSL certificate

### **Recommended Platforms:**
- **Vercel** (Recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- **DigitalOcean App Platform**

### **Vercel Deployment:**
1. Connect GitHub repository
2. Add environment variables in Vercel dashboard
3. Configure custom domain
4. Enable automatic deployments

---

## 10. 📈 Post-Launch Activities

### **SEO & Analytics:**
1. Submit to Google Search Console
2. Set up Google Analytics
3. Create XML sitemap
4. Submit to relevant directories

### **Social Media Integration:**
1. Update LinkedIn with portfolio link
2. Add to GitHub profile README
3. Share on Twitter/X
4. Include in email signature

### **Ongoing Maintenance:**
- [ ] Update projects quarterly
- [ ] Add new blog posts monthly
- [ ] Refresh testimonials annually
- [ ] Monitor analytics and performance
- [ ] Keep dependencies updated

---

## 🆘 Common Issues & Solutions

### **Email Not Working:**
```bash
# Check SMTP configuration
curl -v telnet smtp.gmail.com 587

# Verify environment variables loaded
console.log(process.env.SMTP_USER)
```

### **Build Errors:**
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npm run build
```

### **Performance Issues:**
```bash
# Analyze bundle size
npm run analyze

# Check image optimization
npx next-optimized-images
```

---

## 📞 Next Steps

1. **Start with Email Setup** - This enables immediate contact from employers
2. **Create Resume PDF** - Essential for job applications
3. **Collect 3-5 Testimonials** - Builds credibility quickly
4. **Write First Blog Post** - Shows thought leadership
5. **Deploy to Production** - Make it live and discoverable

**Timeline Recommendation:** Complete items 1-5 within 2 weeks for maximum impact during job search.

---

**Need Help?** Contact me through the portfolio once it's set up! 🚀 