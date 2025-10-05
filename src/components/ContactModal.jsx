'use client';

import React, { useState } from 'react';
import { supabase } from '../lib/db';

const ContactModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    industry: '',
    project_scope: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const { data, error } = await supabase
        .from('contact')
        .insert([formData]);

      if (error) {
        throw error;
      }

      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        industry: '',
        project_scope: '',
        description: '',
      });
      
      // Close modal after 2 seconds
      setTimeout(() => {
        onClose();
        setSubmitStatus(null);
      }, 2000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" data-bs-theme="dark">
      <div className="bg-dark-blue-4 border border-white border-opacity-10 rounded-5 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Get Started with Ijaad Labs</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-slate-800 border border-white border-opacity-10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-slate-800 border border-white border-opacity-10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                  placeholder="john@company.com"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-slate-800 border border-white border-opacity-10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-white mb-1">
                  Industry
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-800 border border-white border-opacity-10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                >
                  <option value="">Select Industry</option>
                  <option value="technology">Technology</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="finance">Finance</option>
                  <option value="ecommerce">E-commerce</option>
                  <option value="education">Education</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="retail">Retail</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="consulting">Consulting</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Project Information */}
            <div className="border-t border-white border-opacity-10 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Project Details</h3>
              
              <div>
                <label htmlFor="project_scope" className="block text-sm font-medium text-white mb-1">
                  Project Scope
                </label>
                <select
                  id="project_scope"
                  name="project_scope"
                  value={formData.project_scope}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-slate-800 border border-white border-opacity-10 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                >
                  <option value="">Select Project Scope</option>
                  <option value="mvp">MVP (Minimum Viable Product)</option>
                  <option value="prototype">Prototype/Proof of Concept</option>
                  <option value="full-featured">Full-Featured Application</option>
                  <option value="enterprise">Enterprise Solution</option>
                  <option value="redesign">Redesign/Modernization</option>
                  <option value="integration">System Integration</option>
                  <option value="consultation">Technical Consultation</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-white mb-1">
                Project Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-3 py-2 bg-slate-800 border border-white border-opacity-10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-dark focus:border-transparent"
                placeholder="Tell us about your project, goals, and any specific requirements..."
              />
            </div>

            {/* Submit Status */}
            {submitStatus === 'success' && (
              <div className="bg-green-900 border border-green-500 text-green-100 px-4 py-3 rounded-md">
                Thank you! We'll get back to you within 24 hours.
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="bg-red-900 border border-red-500 text-red-100 px-4 py-3 rounded-md">
                There was an error submitting your form. Please try again.
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-primary-dark text-white rounded-md hover:bg-primary-dark hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? 'Submitting...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
