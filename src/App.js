import React, { useState, useEffect } from 'react';
import './App.css';
import emailjs from 'emailjs-com';
import { FaGraduationCap, FaChartLine, FaUsers, FaEnvelope, FaStar, FaLightbulb, FaBriefcase, FaTelegram } from 'react-icons/fa';
import { MdSchool, MdFeedback, MdContactMail, MdAddCircle, MdClose } from 'react-icons/md';
import { FaInstagram, FaFacebook, FaLinkedin, } from 'react-icons/fa';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [feedbackForm, setFeedbackForm] = useState({ name: '', feedback: '' });
  const [testimonials, setTestimonials] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [showJobForm, setShowJobForm] = useState(false);
  const [jobForm, setJobForm] = useState({ title: '', description: '', location: '', type: '' });
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [currentJobId, setCurrentJobId] = useState(null);
  const [applicationForm, setApplicationForm] = useState({ name: '', email: '', phone: '', resume: null });

  // Load data from localStorage
  useEffect(() => {
    const savedTestimonials = JSON.parse(localStorage.getItem('trackademicTestimonials')) || [];
    setTestimonials(savedTestimonials);
    
    const savedJobs = JSON.parse(localStorage.getItem('trackademicJobs')) || [];
    setJobs(savedJobs);
  }, []);

  // Save jobs to localStorage when they change
  useEffect(() => {
    localStorage.setItem('trackademicJobs', JSON.stringify(jobs));
  }, [jobs]);

  // Contact form handlers
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  // Feedback form handlers
  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackForm(prev => ({ ...prev, [name]: value }));
  };

  // Job form handlers
  const handleJobChange = (e) => {
    const { name, value } = e.target;
    setJobForm(prev => ({ ...prev, [name]: value }));
  };

  // Application form handlers
  const handleApplicationChange = (e) => {
    const { name, value } = e.target;
    setApplicationForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setApplicationForm(prev => ({ ...prev, resume: e.target.files[0] }));
  };

  // Form submissions
  const handleContactSubmit = (e) => {
    e.preventDefault();
    emailjs.send(
      'service_xsdgkwj',
      'template_7xdwlnj',
      contactForm,
      'qu-d6EcIN8wNV5uA0'
    ).then((response) => {
      console.log('Email sent!', response.status, response.text);
      setFormSubmitted(true);
      setTimeout(() => setFormSubmitted(false), 3000);
      setContactForm({ name: '', email: '', message: '' });
    }, (error) => {
      console.log('Failed to send email:', error);
    });
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    const newTestimonial = {
      id: Date.now(),
      name: feedbackForm.name,
      feedback: feedbackForm.feedback,
      date: new Date().toLocaleDateString(),
      rating: Math.floor(Math.random() * 5) + 1
    };
    
    const updatedTestimonials = [...testimonials, newTestimonial];
    setTestimonials(updatedTestimonials);
    localStorage.setItem('trackademicTestimonials', JSON.stringify(updatedTestimonials));
    setFeedbackForm({ name: '', feedback: '' });
  };

  const handleJobSubmit = (e) => {
    e.preventDefault();
    const newJob = {
      id: Date.now(),
      ...jobForm,
      date: new Date().toLocaleDateString()
    };
    
    setJobs([...jobs, newJob]);
    setJobForm({ title: '', description: '', location: '', type: '' });
    setShowJobForm(false);
  };

  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the application to your server
    // For this example, we'll just log it and reset the form
    console.log('Application submitted:', { jobId: currentJobId, ...applicationForm });
    alert('Application submitted successfully!');
    setApplicationForm({ name: '', email: '', phone: '', resume: null });
    setShowApplicationForm(false);
  };

  const handleDeleteJob = (id) => {
    const updatedJobs = jobs.filter(job => job.id !== id);
    setJobs(updatedJobs);
  };

  const handleApply = (jobId) => {
    setCurrentJobId(jobId);
    setShowApplicationForm(true);
  };

  // Navigation Component
  const Navigation = () => (
    <nav className="navbar">
      <div className="logo">
        <FaGraduationCap className="logo-icon" />
        <span>Trackademic</span>
      </div>
      <ul className="nav-links">
        <li><button onClick={() => setActiveTab('home')} className={activeTab === 'home' ? 'active' : ''}>
          <MdSchool className="nav-icon" /> Home
        </button></li>
        <li><button onClick={() => setActiveTab('mission')} className={activeTab === 'mission' ? 'active' : ''}>
          <FaLightbulb className="nav-icon" /> Mission
        </button></li>
        <li><button onClick={() => setActiveTab('features')} className={activeTab === 'features' ? 'active' : ''}>
          <FaChartLine className="nav-icon" /> Features
        </button></li>
        <li><button onClick={() => setActiveTab('hiring')} className={activeTab === 'hiring' ? 'active' : ''}>
          <FaBriefcase className="nav-icon" /> Careers
        </button></li>
        <li><button onClick={() => setActiveTab('contact')} className={activeTab === 'contact' ? 'active' : ''}>
          <MdContactMail className="nav-icon" /> Contact
        </button></li>
        <li><button onClick={() => setActiveTab('feedback')} className={activeTab === 'feedback' ? 'active' : ''}>
          <MdFeedback className="nav-icon" /> Feedback
        </button></li>
        <li><button onClick={() => setIsAdmin(!isAdmin)} className={isAdmin ? 'active admin' : ''}>
          {isAdmin ? 'Exit Admin' : 'Admin Login'}
        </button></li>
      </ul>
    </nav>
  );

  // Home Component
  const Home = () => (
    <section className="hero">
      <div className="hero-content">
        <h1>Transform Your Institution with <span>Trackademic</span></h1>
        <p className="hero-subtitle">Advanced academic tracking and analytics for modern educational institutions</p>
        <div className="hero-buttons">
          <button className="cta-button primary" onClick={() => setActiveTab('features')}>Explore Features</button>
          <button className="cta-button secondary" onClick={() => setActiveTab('contact')}>Request Demo</button>
        </div>
      </div>
      <div className="hero-image">
        <div className="image-placeholder">📊</div>
      </div>
    </section>
  );

  // Mission Component
  const MissionVision = () => (
    <section className="mission-section">
      <div className="mission-card">
        <div className="mission-icon">
          <FaLightbulb />
        </div>
        <h2>Our Mission</h2>
        <p>To revolutionize education through data-driven insights that empower institutions to maximize student potential and optimize learning outcomes.</p>
      </div>
      <div className="vision-card">
        <div className="vision-icon">
          <FaChartLine />
        </div>
        <h2>Our Vision</h2>
        <p>To become the global standard for academic progress tracking, transforming how educational institutions monitor and enhance student performance.</p>
      </div>
    </section>
  );

  // Features Component
  const CoreFeatures = () => (
    <section className="features-section">
      <h2 className="section-title">Our <span>Core Features</span></h2>
      <p className="section-subtitle">Comprehensive tools designed specifically for educational excellence</p>
      
      <div className="features-grid">
        {[
          { icon: <FaChartLine />, title: "Attendance & Performance", desc: "Track student attendance and academic performance with precision" },
          { icon: <FaUsers />, title: "Daily Schedule", desc: "Manage and share class routines, events, and important dates" },
          { icon: <MdSchool />, title: "Live Bus Tracking", desc: "Real-time updates on student transportation routes and safety" },
          { icon: <FaEnvelope />, title: "Online Fee Payments", desc: "Secure and convenient digital payment solutions for fees" },
          { icon: <FaLightbulb />, title: "Real-time Interaction", desc: "Enable live engagement between students, teachers, and parents" },
          { icon: <FaStar />, title: "Results & Achievements", desc: "Instant access to academic results, awards, and learning resources" },
          { icon: <MdFeedback />, title: "AI Doubt Clarifier", desc: "Instant AI-powered solutions to student questions for deeper understanding" },
          { icon: <FaGraduationCap />, title: "Assessments", desc: "Create, conduct, and evaluate tests to track academic growth" }
        ].map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );

  // Hiring Component
  const HiringSection = () => (
    <section className="hiring-section">
      <h2 className="section-title">Join Our <span>Team</span></h2>
      <p className="section-subtitle">Explore exciting career opportunities at Trackademic</p>
      
      {isAdmin && (
        <div className="job-form">
          <div className="form-header">
            <h3>{showJobForm ? 'Post a New Job' : 'Job Postings'}</h3>
            <button 
              className="toggle-form-button" 
              onClick={() => setShowJobForm(!showJobForm)}
            >
              {showJobForm ? <MdClose /> : <MdAddCircle />}
            </button>
          </div>
          
          {showJobForm && (
            <form onSubmit={handleJobSubmit}>
              <div className="form-group">
                <label htmlFor="title">Job Title</label>
                <input 
                  type="text" 
                  id="title" 
                  name="title" 
                  value={jobForm.title} 
                  onChange={handleJobChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Job Description</label>
                <textarea 
                  id="description" 
                  name="description" 
                  value={jobForm.description} 
                  onChange={handleJobChange} 
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input 
                  type="text" 
                  id="location" 
                  name="location" 
                  value={jobForm.location} 
                  onChange={handleJobChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="type">Job Type</label>
                <input 
                  type="text" 
                  id="type" 
                  name="type" 
                  value={jobForm.type} 
                  onChange={handleJobChange} 
                  required 
                />
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setShowJobForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Post Job
                </button>
              </div>
            </form>
          )}
        </div>
      )}
      
      <div className="jobs-grid">
        {jobs.length === 0 ? (
          <div className="no-jobs">
            <p>No current job openings. Check back later!</p>
          </div>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <div className="job-meta">
                <span>{job.location}</span>
                <span>•</span>
                <span>{job.type}</span>
              </div>
              <p className="job-description">{job.description}</p>
              <button 
                className="apply-button" 
                onClick={() => handleApply(job.id)}
              >
                Apply Now
              </button>
              {isAdmin && (
                <button 
                  className="delete-button" 
                  onClick={() => handleDeleteJob(job.id)}
                >
                  Delete Posting
                </button>
              )}
            </div>
          ))
        )}
      </div>
      
      {showApplicationForm && (
        <div className="application-modal">
          <div className="application-form-container">
            <div className="form-header">
              <h3>Job Application</h3>
              <button 
                className="close-button" 
                onClick={() => setShowApplicationForm(false)}
              >
                <MdClose />
              </button>
            </div>
            <form onSubmit={handleApplicationSubmit} className="application-form">
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={applicationForm.name} 
                  onChange={handleApplicationChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={applicationForm.email} 
                  onChange={handleApplicationChange} 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={applicationForm.phone} 
                  onChange={handleApplicationChange} 
                  required 
                />
              </div>
              <div className="resume-upload">
                <label htmlFor="resume">Upload Resume (PDF)</label>
                <input 
                  type="file" 
                  id="resume" 
                  name="resume" 
                  onChange={handleFileChange} 
                  accept=".pdf,.doc,.docx" 
                  required 
                />
              </div>
              <div className="form-actions">
                <button type="button" className="cancel-button" onClick={() => setShowApplicationForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="submit-button">
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );

  // Contact Component
  const ContactUs = () => (
    <section className="contact-section">
      <div className="contact-container">
        <div className="contact-info">
          <h2>Get In Touch</h2>
          <p>Have questions about Trackademic? Our team is here to help you transform your institution's academic tracking.</p>
          
          <div className="contact-methods">
            <div className="contact-method">
              <div className="method-icon"><FaEnvelope /></div>
              <div className="method-details">
                <h4>Email Us</h4>
                <p>infoatsecura@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="contact-form-container">
          <h2>Send Us a Message</h2>
          {formSubmitted && <div className="form-success">Thank you! Your message has been sent successfully.</div>}
          <form onSubmit={handleContactSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Your Name</label>
              <input type="text" id="name" name="name" value={contactForm.name} onChange={handleContactChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" value={contactForm.email} onChange={handleContactChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea id="message" name="message" value={contactForm.message} onChange={handleContactChange} required></textarea>
            </div>
            <button type="submit" className="submit-button">Send Message</button>
          </form>
        </div>
      </div>
    </section>
  );

  // Feedback Component
  const Feedback = () => (
    <section className="feedback-section">
      <div className="feedback-container">
        <div className="feedback-intro">
          <h2>Share Your Experience</h2>
          <p>We value your feedback to help us improve Trackademic. Share your thoughts with us!</p>
        </div>
        
        <form onSubmit={handleFeedbackSubmit} className="feedback-form">
          <div className="form-group">
            <label htmlFor="feedback-name">Your Name</label>
            <input type="text" id="feedback-name" name="name" value={feedbackForm.name} onChange={handleFeedbackChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="feedback-text">Your Feedback</label>
            <textarea id="feedback-text" name="feedback" value={feedbackForm.feedback} onChange={handleFeedbackChange} required></textarea>
          </div>
          <button type="submit" className="submit-button">Submit Feedback</button>
        </form>
      </div>
    </section>
  );

  // Testimonials Component
  const Testimonials = () => (
    <section className="testimonials-section">
      <h2 className="section-title">What Our <span>Clients Say</span></h2>
      <p className="section-subtitle">Hear from educators and administrators who use Trackademic</p>
      
      {testimonials.length === 0 ? (
        <div className="no-testimonials">
          <p>No testimonials yet. Be the first to share your experience!</p>
        </div>
      ) : (
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < testimonial.rating ? 'filled' : ''} />
                ))}
              </div>
              <p className="testimonial-text">"{testimonial.feedback}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{testimonial.name.charAt(0)}</div>
                <div className="author-details">
                  <h4>{testimonial.name}</h4>
                  <p className="testimonial-date">{testimonial.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );

  // Footer Component
  const Footer = () => (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-about">
          <div className="logo">
            <FaGraduationCap className="logo-icon" />
            <span>Trackademic</span>
          </div>
          <p>Innovative academic tracking solutions for modern educational institutions.</p>
          <div className="social-icons">
            <a href="https://www.instagram.com/trackademic.official?igsh=bjZjb245MmpwcTc2" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <FaFacebook />
            </a>
            <a href="https://www.linkedin.com/company/trackademic/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin />
            </a>
            <a href="mailto:infoatsecura@gmail.com">
              <FaEnvelope />
            </a>
            <a href="https://t.me/trackademic" target="_blank" rel="noopener noreferrer">
              <FaTelegram />
            </a>
          </div>
        </div>
        
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><button onClick={() => setActiveTab('home')}>Home</button></li>
            <li><button onClick={() => setActiveTab('features')}>Features</button></li>
            <li><button onClick={() => setActiveTab('hiring')}>Careers</button></li>
            <li><button onClick={() => setActiveTab('contact')}>Contact</button></li>
          </ul>
        </div>
        
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p><FaEnvelope /> infoatsecura@gmail.com</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Trackademic. All rights reserved.</p>
      </div>
    </footer>
  );

  // Main content render
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <Home />
            <MissionVision />
            <CoreFeatures />
            <Testimonials />
          </>
        );
      case 'mission':
        return <MissionVision />;
      case 'features':
        return <CoreFeatures />;
      case 'hiring':
        return <HiringSection />;
      case 'contact':
        return <ContactUs />;
      case 'feedback':
        return <Feedback />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app">
      <Navigation />
      <main>
        {renderContent()}
        {activeTab !== 'feedback' && activeTab !== 'contact' && activeTab !== 'hiring' && <Testimonials />}
      </main>
      <Footer />
      {isAdmin && <div className="admin-indicator">Admin Mode</div>}
    </div>
  );
};

export default App;