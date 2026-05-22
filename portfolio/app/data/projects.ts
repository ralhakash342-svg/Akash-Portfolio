export interface Project {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  image: string;
  category: string;
  liveUrl: string;
  codeUrl: string;
  longDescription: string;
  features: string[];
}

export const projects: Project[] = [
  { 
    slug: 'ecommerce-platform',
    title: 'E-Commerce Platform', 
    description: 'Full-stack marketplace with real-time inventory and admin dashboard.', 
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'], 
    image: '/projects/ecommerce.png', 
    category: 'Full Stack', 
    liveUrl: '/projects/ecommerce-platform', 
    codeUrl: 'https://github.com/akashralh/ecommerce-platform',
    longDescription: 'A comprehensive e-commerce solution featuring real-time inventory management, a secure payment gateway integration with Stripe, and a robust administrative dashboard for order fulfillment and analytics.',
    features: ['Secure user authentication', 'Real-time product availability', 'Integrated payment processing', 'Order history and tracking', 'Admin inventory management']
  },
  { 
    slug: 'ai-saas-dashboard',
    title: 'AI SaaS Dashboard', 
    description: 'Analytics platform with real-time data visualization and ML insights.', 
    tech: ['Next.js', 'TypeScript', 'PostgreSQL'], 
    image: '/projects/ai-saas.png', 
    category: 'Frontend', 
    liveUrl: '/projects/ai-saas-dashboard', 
    codeUrl: 'https://github.com/akashralh/ai-saas',
    longDescription: 'A cutting-edge SaaS dashboard designed for AI-driven analytics. It provides users with deep insights through interactive data visualizations and machine learning models running on the backend.',
    features: ['Interactive D3.js charts', 'Real-time data streaming', 'Customizable reporting', 'AI model performance monitoring', 'Collaborative workspaces']
  },
  { 
    slug: 'chat-application',
    title: 'Chat Application', 
    description: 'Real-time messaging app with WebSocket and E2E encryption.', 
    tech: ['React', 'Socket.io', 'Redis'], 
    image: '/projects/chat.png', 
    category: 'Backend', 
    liveUrl: '/projects/chat-application', 
    codeUrl: 'https://github.com/akashralh/realtime-chat',
    longDescription: 'A high-performance chat application built for scale. Utilizing WebSockets for instant messaging and end-to-end encryption to ensure user privacy and security.',
    features: ['Instant message delivery', 'Group chat functionality', 'End-to-end encryption', 'File sharing capabilities', 'Presence indicators']
  },
  { 
    slug: 'task-suite',
    title: 'Task Suite', 
    description: 'Collaborative task tool with real-time updates and team features.', 
    tech: ['React', 'Firebase', 'Redux'], 
    image: '/projects/tasks.png', 
    category: 'Full Stack', 
    liveUrl: '/projects/task-suite', 
    codeUrl: 'https://github.com/akashralh/task-suite',
    longDescription: 'A modern project management suite that enables teams to collaborate in real-time. Features include Kanban boards, task assignments, and comprehensive progress tracking.',
    features: ['Kanban and List views', 'Real-time synchronization', 'Team mentions and comments', 'Automated task reminders', 'Cross-platform compatibility']
  },
  { 
    slug: 'weather-analytics',
    title: 'Weather Analytics', 
    description: 'Advanced weather forecasting app with historical analysis.', 
    tech: ['Next.js', 'D3.js', 'API'], 
    image: '/projects/weather.png', 
    category: 'Frontend', 
    liveUrl: '/projects/weather-analytics', 
    codeUrl: 'https://github.com/akashralh/weather-analytics',
    longDescription: 'An advanced weather application that goes beyond simple forecasting, providing historical weather data analysis and predictive modeling using external meteorological APIs.',
    features: ['Global weather maps', '7-day and hourly forecasts', 'Historical climate data', 'Severe weather alerts', 'Aviation-specific weather data']
  },
  { 
    slug: 'devops-dashboard',
    title: 'DevOps Dashboard', 
    description: 'Comprehensive DevOps monitoring platform with automated alerts.', 
    tech: ['Docker', 'AWS', 'Kubernetes'], 
    image: '/projects/devops.png', 
    category: 'Backend', 
    liveUrl: '/projects/devops-dashboard', 
    codeUrl: 'https://github.com/akashralh/devops-dashboard',
    longDescription: 'A centralized monitoring platform for DevOps engineers to track infrastructure health, deployment pipelines, and log aggregation across multiple cloud environments.',
    features: ['Multi-cloud monitoring (AWS/GCP/Azure)', 'Deployment pipeline status', 'Error log aggregation', 'Automated incident alerts', 'Resource utilization metrics']
  }
];
