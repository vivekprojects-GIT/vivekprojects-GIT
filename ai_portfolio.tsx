import React, { useState, useEffect, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Github, Linkedin, Mail, Phone, MapPin, Award, TrendingUp, Brain, Zap, Code, Database, Cloud, Cpu, Bot, ChevronDown, ExternalLink, Play, Pause } from 'lucide-react';

const AIPortfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [animationPlaying, setAnimationPlaying] = useState(true);
  const [typedText, setTypedText] = useState('');
  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  
  const skills = ['AI Engineer', 'ML Researcher', 'Data Scientist', 'LLM Specialist'];
  
  // Typing animation effect
  useEffect(() => {
    if (!animationPlaying) return;
    
    const currentSkill = skills[currentSkillIndex];
    let index = 0;
    
    const typeInterval = setInterval(() => {
      if (index <= currentSkill.length) {
        setTypedText(currentSkill.slice(0, index));
        index++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setCurrentSkillIndex((prev) => (prev + 1) % skills.length);
        }, 2000);
      }
    }, 100);
    
    return () => clearInterval(typeInterval);
  }, [currentSkillIndex, animationPlaying]);

  // Performance metrics data
  const performanceData = [
    { name: 'Model Accuracy', value: 95.2, color: '#8B5CF6' },
    { name: 'Inference Speed', value: 88.7, color: '#06B6D4' },
    { name: 'Resource Efficiency', value: 91.5, color: '#10B981' },
    { name: 'System Uptime', value: 99.2, color: '#F59E0B' }
  ];

  // Time series data for model performance
  const timeSeriesData = [
    { month: 'Jan', accuracy: 85.2, latency: 680, throughput: 1200 },
    { month: 'Feb', accuracy: 87.5, latency: 650, throughput: 1350 },
    { month: 'Mar', accuracy: 89.1, latency: 620, throughput: 1500 },
    { month: 'Apr', accuracy: 91.3, latency: 580, throughput: 1680 },
    { month: 'May', accuracy: 93.8, latency: 520, throughput: 1850 },
    { month: 'Jun', accuracy: 95.2, latency: 470, throughput: 2100 }
  ];

  // Skills radar chart data
  const skillsRadarData = [
    { skill: 'Machine Learning', value: 95 },
    { skill: 'Deep Learning', value: 92 },
    { skill: 'LLM Fine-tuning', value: 88 },
    { skill: 'MLOps', value: 85 },
    { skill: 'Data Engineering', value: 90 },
    { skill: 'Cloud Platforms', value: 87 }
  ];

  // Project impact data
  const projectImpactData = [
    { project: 'Webflow AI Features', users: 100000, improvement: 30 },
    { project: 'LLM Optimization', cost_savings: 3000000, efficiency: 40 },
    { project: 'Anomaly Detection', uptime: 15, accuracy: 95 },
    { project: 'RAG Pipeline', relevance: 30, setup_time: 40 }
  ];

  const experience = [
    {
      company: 'Webflow',
      role: 'AI Engineer',
      period: 'Jan 2025 - May 2025',
      location: 'Austin, TX',
      achievements: [
        'Designed AI-driven features impacting 100,000+ users',
        'Architected RAG pipelines increasing content relevance by 30%',
        'Built autonomous AI agents reducing setup time by 40%',
        'Maintained 99.2% uptime across 7 environments'
      ],
      metrics: { users: '100K+', uptime: '99.2%', improvement: '30%' }
    },
    {
      company: 'Accenture',
      role: 'Machine Learning Engineer',
      period: 'Jan 2021 - Jul 2023',
      location: 'Telangana, India',
      achievements: [
        'Fine-tuned 65B parameter LLM using QLoRA',
        'Reduced infrastructure costs by 30 lakhs annually',
        'Optimized memory usage by 40% using LoRA techniques',
        'Enhanced inference latency by 30% (680ms to 470ms)'
      ],
      metrics: { parameters: '65B', cost_reduction: '30L', latency: '30%' }
    }
  ];

  const projects = [
    {
      title: 'AI-Powered Adaptive Course Generation',
      description: 'Personalized learning engine using CrewAI, LLMs, and RAG for real-time adaptive course generation',
      tech: ['CrewAI', 'LLMs', 'RAG', 'Pinecone', 'AWS Lambda'],
      metrics: { accuracy: 94, users: 5000, efficiency: 85 }
    },
    {
      title: 'Agentic RAG-Powered Mentor System',
      description: 'Multi-agent mentor matching system with contextual recommendations',
      tech: ['CrewAI', 'LangChain', 'Knowledge Graphs', 'Vector Search'],
      metrics: { accuracy: 91, matches: 2500, satisfaction: 89 }
    },
    {
      title: 'Predictive Sales Forecasting',
      description: 'Hybrid forecasting models using ARIMA, LSTM, Prophet, and XGBoost',
      tech: ['ARIMA', 'LSTM', 'Prophet', 'XGBoost', 'Bayesian Optimization'],
      metrics: { accuracy: 87, predictions: 10000, improvement: 25 }
    }
  ];

  const ScrollIndicator = () => (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <ChevronDown className="w-6 h-6 text-white opacity-70" />
    </div>
  );

  const MetricCard = ({ title, value, unit, color, icon: Icon }) => (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <Icon className="w-8 h-8" style={{ color }} />
        <div className="text-right">
          <div className="text-2xl font-bold text-white">{value}</div>
          <div className="text-sm text-gray-400">{unit}</div>
        </div>
      </div>
      <div className="text-gray-300 font-medium">{title}</div>
    </div>
  );

  const SkillBar = ({ skill, percentage, color }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-300 font-medium">{skill}</span>
        <span className="text-gray-400">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2">
        <div 
          className="h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ 
            width: `${percentage}%`, 
            background: `linear-gradient(90deg, ${color}, ${color}aa)` 
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-teal-600/20 animate-pulse"></div>
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-teal-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              Sai Vivek Katkruti
            </h1>
            <div className="text-2xl md:text-3xl text-gray-300 mb-6 h-12 flex items-center justify-center">
              <span className="mr-2">Senior</span>
              <span className="text-purple-400 font-semibold min-w-[200px] text-left">
                {typedText}
                <span className="animate-pulse">|</span>
              </span>
            </div>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Pioneering AI solutions with expertise in LLMs, RAG systems, and scalable ML architectures. 
              Transforming complex data into intelligent, actionable insights.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <MetricCard title="Users Impacted" value="100K+" unit="Active" color="#8B5CF6" icon={TrendingUp} />
            <MetricCard title="Model Accuracy" value="95.2%" unit="Average" color="#06B6D4" icon={Brain} />
            <MetricCard title="Cost Savings" value="30L+" unit="Annual" color="#10B981" icon={Zap} />
            <MetricCard title="System Uptime" value="99.2%" unit="Reliability" color="#F59E0B" icon={Cpu} />
          </div>

          {/* Contact Links */}
          <div className="flex justify-center space-x-6 mb-8">
            <a href="mailto:saivivekkatkuri8@gmail.com" className="flex items-center space-x-2 bg-purple-600/20 hover:bg-purple-600/40 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105">
              <Mail className="w-5 h-5" />
              <span>Email</span>
            </a>
            <a href="tel:+19293009293" className="flex items-center space-x-2 bg-blue-600/20 hover:bg-blue-600/40 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105">
              <Phone className="w-5 h-5" />
              <span>Call</span>
            </a>
            <a href="#" className="flex items-center space-x-2 bg-gray-600/20 hover:bg-gray-600/40 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105">
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
            <a href="#" className="flex items-center space-x-2 bg-green-600/20 hover:bg-green-600/40 px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105">
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
          </div>

          <ScrollIndicator />
        </div>
      </section>

      {/* Performance Analytics Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Performance Analytics
            </h2>
            <p className="text-xl text-gray-400">Real-time insights into model performance and system metrics</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Time Series Performance */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Model Performance Over Time</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }} 
                  />
                  <Line type="monotone" dataKey="accuracy" stroke="#8B5CF6" strokeWidth={3} dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Latency Optimization */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Latency Optimization</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="latency" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Skills Radar Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-green-400">Technical Expertise</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={skillsRadarData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                  <Radar name="Skills" dataKey="value" stroke="#10B981" fill="#10B981" fillOpacity={0.3} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Performance Metrics Pie */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-semibold mb-4 text-yellow-400">System Metrics</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={performanceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {performanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-gray-900/50 to-purple-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Professional Journey
            </h2>
            <p className="text-xl text-gray-400">Building AI solutions that scale and deliver real impact</p>
          </div>

          <div className="space-y-8">
            {experience.map((exp, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">{exp.role}</h3>
                    <div className="flex items-center space-x-4 text-gray-400">
                      <span className="text-purple-400 font-semibold">{exp.company}</span>
                      <span>•</span>
                      <span>{exp.period}</span>
                      <span>•</span>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-4 mt-4 lg:mt-0">
                    {Object.entries(exp.metrics).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-lg font-bold text-purple-400">{value}</div>
                        <div className="text-xs text-gray-400 capitalize">{key.replace('_', ' ')}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {exp.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-300">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-400">Innovative AI solutions driving real-world impact</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                </div>
                
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, idx) => (
                      <span key={idx} className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  {Object.entries(project.metrics).map(([key, value]) => (
                    <div key={key}>
                      <div className="text-lg font-bold text-blue-400">{value}{key.includes('accuracy') || key.includes('efficiency') || key.includes('satisfaction') ? '%' : ''}</div>
                      <div className="text-xs text-gray-400 capitalize">{key.replace('_', ' ')}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-gray-900/50 to-blue-900/20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Technical Arsenal
            </h2>
            <p className="text-xl text-gray-400">Cutting-edge technologies and frameworks</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-purple-400 flex items-center">
                  <Brain className="w-6 h-6 mr-2" />
                  Machine Learning & AI
                </h3>
                <SkillBar skill="Deep Learning (TensorFlow, PyTorch)" percentage={95} color="#8B5CF6" />
                <SkillBar skill="LLM Fine-tuning (LoRA, QLoRA)" percentage={92} color="#06B6D4" />
                <SkillBar skill="RAG Systems & Vector Search" percentage={90} color="#10B981" />
                <SkillBar skill="AutoML & Model Optimization" percentage={88} color="#F59E0B" />
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-blue-400 flex items-center">
                  <Code className="w-6 h-6 mr-2" />
                  Programming & Development
                </h3>
                <SkillBar skill="Python, SQL, TypeScript" percentage={94} color="#8B5CF6" />
                <SkillBar skill="FastAPI, Flask, REST APIs" percentage={91} color="#06B6D4" />
                <SkillBar skill="Docker, Kubernetes" percentage={87} color="#10B981" />
                <SkillBar skill="Git, CI/CD, DevOps" percentage={85} color="#F59E0B" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-green-400 flex items-center">
                  <Database className="w-6 h-6 mr-2" />
                  Data & Analytics
                </h3>
                <SkillBar skill="PostgreSQL, MongoDB, Neo4j" percentage={93} color="#8B5CF6" />
                <SkillBar skill="Time Series Analysis" percentage={89} color="#06B6D4" />
                <SkillBar skill="Feature Engineering" percentage={91} color="#10B981" />
                <SkillBar skill="Data Visualization" percentage={87} color="#F59E0B" />
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-semibold mb-4 text-yellow-400 flex items-center">
                  <Cloud className="w-6 h-6 mr-2" />
                  Cloud & MLOps
                </h3>
                <SkillBar skill="AWS, GCP, Azure" percentage={88} color="#8B5CF6" />
                <SkillBar skill="MLflow, DVC, Airflow" percentage={85} color="#06B6D4" />
                <SkillBar skill="Model Deployment" percentage={90} color="#10B981" />
                <SkillBar skill="Monitoring & Logging" percentage={86} color="#F59E0B" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Let's Build the Future Together
            </h2>
            <p className="text-xl text-gray-400">Ready to transform your ideas into intelligent solutions</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
              <Mail className="w-8 h-8 text-purple-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
              <p className="text-gray-400 text-sm">saivivekkatkuri8@gmail.com</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-blue-500/50 transition-all duration-300">
              <Phone className="w-8 h-8 text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Phone</h3>
              <p className="text-gray-400 text-sm">+1 (929) 300-9293</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-green-500/50 transition-all duration-300">
              <MapPin className="w-8 h-8 text-green-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Location</h3>
              <p className="text-gray-400 text-sm">Texas, USA</p>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-all duration-300">
              <Award className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Status</h3>
              <p className="text-gray-400 text-sm">Available for PhD Programs</p>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-6">Education & Certifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-left">
                <h4 className="text-lg font-semibold text-purple-400 mb-2">Master of Science, Data Science</h4>
                <p className="text-gray-400 mb-1">Southern Arkansas University</p>
                <p className="text-gray-500 text-sm">May 2025</p>
              </div>
              <div className="text-left">
                <h4 className="text-lg font-semibold text-blue-400 mb-2">Azure AI Engineer Associate</h4>
                <p className="text-gray-400 mb-1">Microsoft Certified</p>
                <p className="text-gray-500 text-sm">Professional Certification</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center space-x-6 mb-8">
            <a href="mailto:saivivekkatkuri8@gmail.com" className="text-gray-400 hover:text-purple-400 transition-colors duration-300">
              <Mail className="w-6 h-6" />
            </a>
            <a href="tel:+19293009293" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
              <Phone className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors duration-300">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-300">
              <Github className="w-6 h-6" />
            </a>
          </div>
          <div className="text-gray-500">
            <p className="mb-2">© 2025 Sai Vivek Katkruti. All rights reserved.</p>
            <p className="text-sm">Transforming the future with AI, one model at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AIPortfolio;