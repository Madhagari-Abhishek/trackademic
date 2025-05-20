import React, { useState } from 'react';
import './App.css';
import emailjs from 'emailjs-com';
import { FaGraduationCap, FaChartLine, FaUsers, FaEnvelope, FaStar, FaLightbulb, FaInstagram, FaFacebook, FaLinkedin, FaTelegram, FaBars, FaTimes } from 'react-icons/fa';
import { MdSchool, MdContactMail } from 'react-icons/md';

const App = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setMenuOpen(false);
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

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

  const Navigation = () => (
    <nav className="navbar">
      <div className="logo">
        <FaGraduationCap className="logo-icon" />
        <span>Trackademic</span>
      </div>
      
      <ul className="nav-links">
        <li><button onClick={() => handleTabChange('home')} className={activeTab === 'home' ? 'active' : ''}>
          <MdSchool className="nav-icon" /> Home
        </button></li>
        <li><button onClick={() => handleTabChange('mission')} className={activeTab === 'mission' ? 'active' : ''}>
          <FaLightbulb className="nav-icon" /> Mission
        </button></li>
        <li><button onClick={() => handleTabChange('features')} className={activeTab === 'features' ? 'active' : ''}>
          <FaChartLine className="nav-icon" /> Features
        </button></li>
        <li><button onClick={() => handleTabChange('team')} className={activeTab === 'team' ? 'active' : ''}>
          <FaUsers className="nav-icon" /> Our Team
        </button></li>
        <li><button onClick={() => handleTabChange('contact')} className={activeTab === 'contact' ? 'active' : ''}>
          <MdContactMail className="nav-icon" /> Contact
        </button></li>
      </ul>
      
      <div className="menu-toggle" onClick={toggleMenu}>
        {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </div>
      
      <div className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
        <ul className="mobile-nav-links">
          <li><button onClick={() => handleTabChange('home')} className={activeTab === 'home' ? 'active' : ''}>
            <MdSchool className="mobile-nav-icon" /> Home
          </button></li>
          <li><button onClick={() => handleTabChange('mission')} className={activeTab === 'mission' ? 'active' : ''}>
            <FaLightbulb className="mobile-nav-icon" /> Mission
          </button></li>
          <li><button onClick={() => handleTabChange('features')} className={activeTab === 'features' ? 'active' : ''}>
            <FaChartLine className="mobile-nav-icon" /> Features
          </button></li>
          <li><button onClick={() => handleTabChange('team')} className={activeTab === 'team' ? 'active' : ''}>
            <FaUsers className="mobile-nav-icon" /> Our Team
          </button></li>
          <li><button onClick={() => handleTabChange('contact')} className={activeTab === 'contact' ? 'active' : ''}>
            <MdContactMail className="mobile-nav-icon" /> Contact
          </button></li>
        </ul>
      </div>
      
      <div className={`overlay ${menuOpen ? 'active' : ''}`} onClick={toggleMenu} />
    </nav>
  );

  const Home = () => (
    <section className="hero">
      <div className="hero-content">
        <h1>Transform Your Institution with <span>Trackademic</span></h1>
        <p className="hero-subtitle">Advanced academic tracking and analytics for modern educational institutions</p>
        <div className="hero-buttons">
          <button className="cta-button primary" onClick={() => handleTabChange('features')}>Explore Features</button>
          <button className="cta-button secondary" onClick={() => handleTabChange('contact')}>Request Demo</button>
        </div>
      </div>
      <div className="hero-image">
        <div className="image-placeholder">📊</div>
      </div>
    </section>
  );

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
          { icon: <FaStar />, title: "Results & Achievements", desc: "Instant access to academic results, awards, and learning resources" }
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

  const TeamAndPartners = () => (
    <>
      <section className="team-section">
        <h2 className="section-title">Our <span>Team</span></h2>
        <p className="section-subtitle">The dedicated professionals behind Trackademic</p>
        
        <div className="team-grid">
          {[
            { name: "Abhishek Madhagari", role: "CEO & Founder", bio: "B.Tech in CSE(Cybersecurity), Malla Reddy University" },
            { name: "Nihkil Urranki", role: "CTO", bio: "B.Sc in computer Science & Cloud computing, Loyola Academy Degree & PG College." },
            { name: "Arun Madhagari", role: "Product Manager", bio: "B.Sc in computer Science & Cloud computing, Loyola Academy Degree & PG College." },
          ].map((member, index) => (
            <div key={index} className="team-member">
              <div className="member-avatar">{member.name.charAt(0)}</div>
              <h3 className="member-name">{member.name}</h3>
              <p className="member-role">{member.role}</p>
              <p className="member-bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="partners-section">
        <h2 className="section-title">Our <span>Partners</span></h2>
        <p className="section-subtitle">Collaborating with leading organizations in education</p>
        
        <div className="partners-grid">
          {[
            { name: "Johns Academy", logo: "https://via.placeholder.com/150x80?text=EduTech" },
            { name: "Global Learning", logo: "https://via.placeholder.com/150x80?text=Global+Learning" },
            { name: "School Systems", logo: "https://via.placeholder.com/150x80?text=School+Systems" },
            { name: "Digital Campus", logo: "https://via.placeholder.com/150x80?text=Digital+Campus" }
          ].map((partner, index) => (
            <div key={index} className="partner-logo">
              <img src={partner.logo} alt={partner.name} />
            </div>
          ))}
        </div>
      </section>
    </>
  );

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
            <li><button onClick={() => handleTabChange('home')}>Home</button></li>
            <li><button onClick={() => handleTabChange('features')}>Features</button></li>
            <li><button onClick={() => handleTabChange('team')}>Our Team</button></li>
            <li><button onClick={() => handleTabChange('contact')}>Contact</button></li>
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

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <Home />
            <MissionVision />
            <CoreFeatures />
          </>
        );
      case 'mission':
        return <MissionVision />;
      case 'features':
        return <CoreFeatures />;
      case 'team':
        return <TeamAndPartners />;
      case 'contact':
        return <ContactUs />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app">
      <Navigation />
      <main>
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;