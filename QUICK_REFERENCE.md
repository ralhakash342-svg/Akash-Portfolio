# ⚡ Portfolio Quick Reference Card

## 🎯 5-Minute Setup

```bash
# 1. Create project
npx create-next-app@latest portfolio --typescript --tailwind
cd portfolio

# 2. Install icons
npm install lucide-react

# 3. Copy portfolio code to src/app/page.jsx

# 4. Add font to globals.css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

# 5. Run
npm run dev
```

---

## 🎨 Essential Customization

### 1. Update Name
```javascript
// Find: <span className="...">Alex</span>
// Replace with your name in Hero section
```

### 2. Update Social Links
```javascript
// Update href values
<a href="https://github.com/YOUR_USERNAME">...</a>
<a href="https://linkedin.com/in/YOUR_PROFILE">...</a>
<a href="mailto:your@email.com">...</a>
```

### 3. Add Projects
```javascript
const projects = [
  {
    title: "Project Name",
    description: "What it does",
    tech: ["React", "Node.js"],
    image: "📱",
    category: "Full Stack",
  },
];
```

### 4. Update Skills
```javascript
const skills = [
  { 
    category: 'Frontend', 
    items: [
      { name: 'React', level: 95 },
    ] 
  },
];
```

### 5. Change Colors
```javascript
// Search & replace gradients
from-blue-400 to-purple-500  →  from-green-400 to-cyan-500
```

---

## 🎬 Section Map

| Section | Component | Key Elements |
|---------|-----------|--------------|
| **Hero** | Intro + Typing + Social | `id="hero"` |
| **Services** | 6 Cards | `id="services"` |
| **Projects** | Project Showcase | `id="projects"` |
| **Skills** | Progress Bars + Stats | `id="skills"` |
| **Contact** | Form + Info | `id="contact"` |

---

## 🛠️ Key Functions

```javascript
// Toggle dark mode
setIsDark(!isDark)

// Scroll to section
window.location.hash = '#section-id'

// Scroll to top
window.scrollTo({ top: 0, behavior: 'smooth' })

// Mobile menu toggle
setIsMenuOpen(!isMenuOpen)
```

---

## 📦 File Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── page.jsx          ← PASTE CODE HERE
│   │   ├── layout.jsx
│   │   └── globals.css       ← ADD FONTS HERE
│   └── ...
├── public/
│   └── (images go here)
└── tailwind.config.js
```

---

## 🎨 Color Themes

### Blue & Purple (Default)
```
from-blue-400 to-purple-500
from-blue-500 to-pink-500
```

### Green & Cyan (Fresh)
```
from-green-400 to-cyan-500
from-emerald-400 to-teal-500
```

### Orange & Red (Bold)
```
from-orange-400 to-red-500
from-yellow-400 to-orange-500
```

### Indigo & Violet (Premium)
```
from-indigo-400 to-violet-500
from-fuchsia-400 to-pink-500
```

---

## 📱 Responsive Classes

```
grid-cols-1        // Mobile
md:grid-cols-2     // Tablet
lg:grid-cols-3     // Desktop

text-3xl           // Mobile
md:text-4xl        // Tablet
lg:text-5xl        // Desktop

px-4               // Mobile padding
md:px-6            // Tablet padding
lg:px-8            // Desktop padding
```

---

## 🎯 Important IDs (For Navigation)

```
#hero       → Hero section
#services   → Services section
#projects   → Projects section
#skills     → Skills section
#contact    → Contact section
```

---

## 🚀 Deployment Checklist

- [ ] Update name and bio
- [ ] Add real projects
- [ ] Update social links
- [ ] Add your email
- [ ] Test on mobile
- [ ] Check dark/light mode
- [ ] Run Lighthouse audit
- [ ] Deploy to Vercel
- [ ] Share with others

---

## 🔧 Common Customizations

### Add Contact Form Submission
```bash
npm install @emailjs/browser
```

### Change Font
```css
/* In globals.css */
@import url('https://fonts.googleapis.com/css2?family=YOUR_FONT&display=swap');
```

### Add Custom Animation
```css
@keyframes slideIn {
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
}

.animate-slideIn {
  animation: slideIn 0.5s ease-out;
}
```

---

## 📊 Stats Customization

```javascript
const stats = [
  { label: 'Projects', value: '25+', icon: '🎯' },
  { label: 'Years', value: '5+', icon: '⭐' },
  { label: 'Clients', value: '40+', icon: '😊' },
  { label: 'Tech', value: '30+', icon: '🛠️' },
];
```

---

## 🔗 Useful Links

| Resource | Link |
|----------|------|
| **Next.js** | https://nextjs.org/docs |
| **React** | https://react.dev |
| **Tailwind** | https://tailwindcss.com/docs |
| **Lucide Icons** | https://lucide.dev |
| **Vercel Deploy** | https://vercel.com |

---

## ⚠️ Common Issues & Quick Fixes

### Styles not showing?
```bash
rm -rf .next node_modules
npm install
npm run dev
```

### Mobile menu won't close?
- Check `setIsMenuOpen(false)` is called
- Verify state management

### Dark mode resets?
- Add localStorage:
```javascript
useEffect(() => {
  localStorage.setItem('theme', isDark);
}, [isDark]);
```

### Animations stuttering?
- Use `transform` not `top/left`
- Check for simultaneous animations

---

## 🎬 Available Sections in Code

```javascript
// Components in the file:
<NavBar />          // Sticky header
<Hero />            // Landing
<Services />        // What you offer
<Projects />        // Portfolio
<Skills />          // Expertise
<Contact />         // Contact form
<Footer />          // Footer
```

---

## 📋 Data Arrays

```javascript
// Main data structures to modify:
const roles = ['...', '...']
const projects = [{...}, {...}]
const skills = [{...}, {...}]
const stats = [{...}, {...}]
const services = [{...}, {...}]
```

---

## 🌐 Deployment Commands

```bash
# Vercel
npm i -g vercel
vercel

# Build locally
npm run build

# Start production
npm run start

# Export static (if needed)
npm run export
```

---

## 📞 Quick Support

| Issue | Solution |
|-------|----------|
| Blank page | Check console for errors |
| Styles broken | Clear .next folder |
| Mobile issues | Test in DevTools device mode |
| Slow loading | Check image sizes |
| Form not working | Add form handler |

---

## ✅ Before Deployment

- [ ] All text updated
- [ ] Links working
- [ ] Images optimized
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Dark mode works
- [ ] Performance OK (Lighthouse)

---

## 🎯 Key File Paths

```
page.jsx         ← Main portfolio component
globals.css      ← Global styles + fonts
layout.jsx       ← Next.js layout
tailwind.config  ← Tailwind configuration
```

---

## 🔄 Version Comparison

| Feature | Basic | Advanced |
|---------|-------|----------|
| Size | 21KB | 25KB |
| Animations | Few | Many |
| Setup time | 2min | 5min |
| Customization | Easy | Easy |
| Best for | Quick | Feature-rich |

---

## 💾 Backup Command

```bash
# Save your work
git init
git add .
git commit -m "Initial portfolio"
git remote add origin YOUR_REPO
git push -u origin main
```

---

## 🚀 Go Live in 10 Minutes

1. Copy code (1 min)
2. Customize (5 min)
3. Test locally (2 min)
4. Deploy (2 min)
5. Share link!

---

## 📞 Documentation Files

- `README.md` - Overview
- `PORTFOLIO_SETUP.md` - Basic setup
- `IMPLEMENTATION_GUIDE.md` - Advanced guide
- `CUSTOMIZATION_GUIDE.md` - Examples

---

<p align="center">
  <strong>Quick Reference • Copy • Customize • Deploy • Share!</strong>
</p>

**Your portfolio is ready! Start customizing now! 🚀**
