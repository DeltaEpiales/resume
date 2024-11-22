import React, { useState, useEffect } from 'react';
import { Lock, Cpu, Brain, Atom, Shield, ExternalLink, Code, Network } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Quantum3DScene from './components/Quantum3DScene';
import QuantumGame from './components/QuantumGame';

function App() {
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === 'q') {
        setShowGame(prev => !prev);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => window.removeEventListener('keypress', handleKeyPress);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <Quantum3DScene />
      <div className="relative z-10">
        <Navbar />
        
        {/* Hero Section */}
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Ryan Kamosa
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-8">
              Cybersecurity Expert | Quantum Computing Enthusiast
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://www.linkedin.com/in/ryan-kamosa/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0A66C2] text-white px-6 py-2 rounded-full hover:bg-[#0A66C2]/90 transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="#contact"
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-2 rounded-full hover:opacity-90 transition-opacity"
              >
                Contact Me
              </a>
            </div>
            <div className="mt-4 text-sm text-gray-400 animate-pulse">
              Press 'Q' for a quantum surprise
            </div>
          </div>
        </div>

        {/* Expertise Areas */}
        <section className="py-20 px-4 bg-black/20" id="expertise">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Areas of Expertise</h2>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  icon: <Brain className="h-12 w-12 text-indigo-500" />,
                  title: "Quantum Computing",
                  skills: ["Quantum Algorithms", "Quantum Cryptography", "Quantum Mechanics"]
                },
                {
                  icon: <Shield className="h-12 w-12 text-purple-500" />,
                  title: "Cybersecurity",
                  skills: ["Penetration Testing", "Security Analysis", "Risk Assessment"]
                },
                {
                  icon: <Code className="h-12 w-12 text-pink-500" />,
                  title: "Development",
                  skills: ["Secure Coding", "System Architecture", "API Security"]
                },
                {
                  icon: <Network className="h-12 w-12 text-blue-500" />,
                  title: "Network Security",
                  skills: ["Protocol Analysis", "Network Defense", "Threat Detection"]
                }
              ].map((item, index) => (
                <div key={index} className="bg-black/30 backdrop-blur-lg p-8 rounded-xl hover:bg-black/40 transition-all">
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <ul className="text-gray-400 space-y-2">
                    {item.skills.map((skill, idx) => (
                      <li key={idx}>{skill}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-20 px-4" id="projects">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">Notable Projects</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Quantum Computing Research",
                  description: "Research and development in quantum computing applications for cybersecurity",
                  icon: <Lock className="h-6 w-6" />,
                  tags: ["Quantum", "Research", "Security"]
                },
                {
                  title: "Security Framework Development",
                  description: "Development of comprehensive security frameworks and best practices",
                  icon: <Cpu className="h-6 w-6" />,
                  tags: ["Framework", "Architecture", "Best Practices"]
                }
              ].map((project, index) => (
                <div key={index} className="group relative overflow-hidden rounded-xl bg-black/30 backdrop-blur-lg p-8 hover:bg-black/40 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-indigo-500">{project.icon}</div>
                    <div className="flex gap-2">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400">{project.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-4" id="contact">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-8">Let's Connect</h2>
            <p className="text-gray-400 mb-8">
              Interested in quantum computing and cybersecurity collaboration? 
              Let's explore how we can work together to advance the field.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://www.linkedin.com/in/ryan-kamosa/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#0A66C2] text-white font-bold py-3 px-8 rounded-full hover:bg-[#0A66C2]/90 transition-colors"
              >
                Connect on LinkedIn
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {showGame && <QuantumGame onClose={() => setShowGame(false)} />}
      </AnimatePresence>
    </div>
  );
}

export default App;