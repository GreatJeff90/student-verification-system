// app/page.tsx (only showing the updated header section)
'use client'

import Link from 'next/link'
import Card from '../components/UI/Card'
import Button from '../components/UI/Button'
import { Shield, Users, Clock, BarChart3, Camera, UserPlus, Cpu, Brain, Zap, Sparkles, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-slate-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-xl border-b border-blue-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand - Always visible on all screens */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src="https://www.uniport.edu.ng/wp-content/themes/unipix/assets/images/logo/uniport_logo1.png" 
                  alt="University of Port Harcourt"
                  className="h-8 w-auto sm:h-10"
                />
                <div className="absolute inset-0 bg-blue-500/10 rounded-lg blur-sm"></div>
              </div>
              <div>
                <h1 className="text-sm sm:text-lg font-bold text-slate-800 leading-tight">
                  University of Port Harcourt
                </h1>
                <p className="text-xs text-slate-600 hidden xs:block">
                  FaceID Verification System
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4">
              <Link href="/register">
                <Button variant="outline" size="sm" className="bg-transparent border-blue-600 text-blue-600 hover:bg-blue-600/10">
                  Login
                </Button>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-blue-50 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-blue-600" />
              ) : (
                <Menu className="w-6 h-6 text-blue-600" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-blue-200">
              <div className="flex flex-col space-y-3">
                <Link href="/register">
                  <Button variant="outline" className="w-full justify-center bg-transparent border-blue-600 text-blue-600 hover:bg-blue-600/10">
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Rest of the component remains the same */}
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8 sm:mb-12">
            {/* Animated Badge */}
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 sm:mb-8 backdrop-blur-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-blue-500/5 group-hover:bg-blue-500/10 transition-all duration-500"></div>
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2 sm:mr-3 relative z-10" />
              <span className="text-xs sm:text-sm font-medium text-blue-700 relative z-10">
                AI-Powered Face Recognition
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-slate-900 mb-6 sm:mb-8 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
                FaceID
              </span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-slate-700 mt-2 sm:mt-4">
                Smart Campus Security
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light px-4">
              Advanced facial recognition powered by deep learning algorithms. 
              Secure biometric authentication for the modern academic ecosystem.
            </p>
          </div>

          {/* Animated Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto mb-12 sm:mb-16">
            {[
              { value: '15K+', label: 'Digital Identities', icon: Users },
              { value: '99.9%', label: 'AI Accuracy', icon: Brain },
              { value: '24/7', label: 'System Uptime', icon: Zap },
              { value: '0.8s', label: 'Recognition Speed', icon: Cpu }
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="relative">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-2 sm:mb-4 border border-blue-200 shadow-sm group-hover:border-blue-300 transition-all duration-500">
                    <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                  </div>
                  <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 rounded-xl sm:rounded-2xl transition-all duration-500"></div>
                </div>
                <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-700 mb-1 sm:mb-2">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Main Actions */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <Card hover className="text-center group bg-white/80 backdrop-blur-xl border border-blue-200 relative overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 p-6 sm:p-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 border border-blue-300 shadow-md group-hover:border-blue-400 transition-all duration-500">
                  <Camera className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 sm:mb-4">Face Scan</h3>
                <p className="text-slate-600 mb-4 sm:mb-6 leading-relaxed font-light text-sm sm:text-base">
                  Instant facial verification using advanced AI recognition. 
                  Secure access to campus facilities and digital resources.
                </p>
                <Link href="/verification">
                  <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 border-0 text-white transform hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/25">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Start Scan
                  </Button>
                </Link>
              </div>
            </Card>

            <Card hover className="text-center group bg-white/80 backdrop-blur-xl border border-blue-200 relative overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10 p-6 sm:p-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 border border-blue-300 shadow-md group-hover:border-blue-400 transition-all duration-500">
                  <UserPlus className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 sm:mb-4">Face Enrollment</h3>
                <p className="text-slate-600 mb-4 sm:mb-6 leading-relaxed font-light text-sm sm:text-base">
                  Register your facial biometrics with our secure system. 
                  Required for all students and faculty members.
                </p>
                <Link href="/register">
                  <Button variant="outline" size="lg" className="w-full bg-transparent border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transform hover:scale-105 transition-all duration-300">
                    <Brain className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Enroll Now
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16 lg:mb-20">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-blue-700 to-blue-800 bg-clip-text text-transparent">
                Advanced Features
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-light px-4">
              Powered by cutting-edge artificial intelligence and security protocols
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: Clock,
                title: 'Real-time Face Processing',
                description: 'Lightning-speed verification with deep learning algorithms processing facial features in milliseconds.',
                color: 'blue'
              },
              {
                icon: Shield,
                title: 'Advanced Security Layer',
                description: 'Military-grade encryption ensuring secure biometric data protection and privacy.',
                color: 'blue'
              },
              {
                icon: BarChart3,
                title: 'Smart Analytics AI',
                description: 'Intelligent monitoring with machine learning that detects patterns and prevents security breaches.',
                color: 'blue'
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center group bg-white/80 backdrop-blur-xl border border-blue-200 hover:border-blue-300 transition-all duration-500 relative overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 p-6">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 border border-blue-300 shadow-md group-hover:border-blue-400 transition-all duration-500">
                    <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-3 sm:mb-4">{feature.title}</h3>
                  <p className="text-slate-600 font-light leading-relaxed text-sm sm:text-base">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="bg-white/90 backdrop-blur-2xl border border-blue-300 p-6 sm:p-8 lg:p-12 relative overflow-hidden group shadow-2xl">
            {/* Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black,transparent)]"></div>
            
            {/* Border Glow */}
            <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-blue-500/10 via-blue-600/10 to-blue-700/10 rounded-2xl [mask-image:linear-gradient(black,black),linear-gradient(black,black)] [mask-composite:exclude] [mask-clip:content-box,border-box] group-hover:from-blue-500/20 group-hover:via-blue-600/20 group-hover:to-blue-700/20 transition-all duration-700"></div>
            
            <div className="relative z-10">
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-2 bg-blue-500/10 border border-blue-400/30 rounded-full">
                  <span className="text-blue-700 text-xs sm:text-sm font-semibold">SYSTEM READY</span>
                </div>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-black text-slate-900 mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  INITIATE FACE SCAN
                </span>
              </h2>
              
              <p className="text-lg sm:text-xl text-slate-700 mb-6 sm:mb-8 max-w-2xl mx-auto font-light">
                Join the digital frontier with our secure biometric authentication system
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <Link href="/verification">
                  <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 border-0 text-white font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/25 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-400/0 group-hover:bg-blue-400/10 transition-all duration-500"></div>
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    <span className="relative">START SCAN</span>
                  </Button>
                </Link>
                
                <Link href="/register">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto bg-transparent border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transform hover:scale-105 transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600 transition-all duration-500"></div>
                    <UserPlus className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    <span className="relative">ENROLL FACE</span>
                  </Button>
                </Link>
              </div>

              {/* Status Indicator */}
              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 text-xs sm:text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-600 font-medium">SYSTEM ONLINE</span>
                </div>
                <span className="hidden sm:inline text-slate-400">|</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-blue-600 font-medium">FACE RECOGNITION ACTIVE</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-xl border-t border-blue-200 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="relative">
                <img 
                  src="https://www.uniport.edu.ng/wp-content/themes/unipix/assets/images/logo/uniport_logo1.png" 
                  alt="University of Port Harcourt"
                  className="h-6 sm:h-8 w-auto"
                />
                <div className="absolute inset-0 bg-blue-500/10 rounded-lg blur-sm"></div>
              </div>
              <div className="text-center md:text-left">
                <h3 className="font-semibold text-slate-800 text-sm sm:text-base">University of Port Harcourt</h3>
                <p className="text-slate-600 text-xs sm:text-sm">FaceID Verification System</p>
              </div>
            </div>
            <div className="text-slate-600 text-xs sm:text-sm text-center md:text-right">
              © 2024 University of Port Harcourt. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}