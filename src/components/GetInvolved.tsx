import React, { useState } from 'react';
import { Gift, Heart, UserPlus, Sparkles } from 'lucide-react';
import { Input, Button, Form, Select, message } from 'antd';

const { Option } = Select;

// Replace this with your actual Formspree Form ID after registering wsharks003@gmail.com on formspree.io
const FORMSPREE_FORM_ID = 'mnjypzgl'; // Placeholder ID

export const GetInvolved: React.FC = () => {
  const [donateAmount, setDonateAmount] = useState<number>(50);
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const handleVolunteerSubmit = async (values: any) => {
    setSubmitting(true);
    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          county: values.county,
          pillar: values.pillar,
          message: values.message || 'No message provided',
        }),
      });

      if (response.ok) {
        message.success('Thank you! Your volunteer application has been sent directly to wsharks003@gmail.com.');
        form.resetFields();
      } else {
        message.error('Oops! There was a problem submitting your application. Please try again.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      message.error('Network error. Please check your internet connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Donation impact calculations
  const calculateImpact = (amount: number) => {
    const trees = Math.floor(amount * 1); // 1 USD = 1 tree
    const jobs = Math.floor(amount / 25); // 25 USD = 1 day of nursery labor
    const water = Math.floor(amount * 10); // 1 USD = 10 liters of rainwater storage
    return { trees, jobs, water };
  };

  const impact = calculateImpact(donateAmount);

  return (
    <section id="get-involved" className="py-24 bg-brand-cream/20 border-t border-brand-cream relative">
      <div className="w-full px-6 md:px-12 lg:px-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <div className="inline-block px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold font-bold text-xs uppercase tracking-widest font-sans">
            Get Involved
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-brand-dark">
            Join the Green Settlement Movement
          </h2>
          <p className="text-slate-500 font-sans text-sm sm:text-md">
            Whether you donate, volunteer, or partner with us, your contribution directly empowers communities and restores vital ecosystems in Kenya.
          </p>
        </div>

        {/* 2-Column Split: Left Donation Calculator, Right Volunteer Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column: Donation & Impact Calculator (6 cols) */}
          <div className="lg:col-span-6 bg-brand-alabaster border border-brand-cream rounded-2xl p-8 flex flex-col justify-between shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-brand-cream pb-4 text-left">
                <div className="p-2.5 rounded-xl bg-brand-gold/10 text-brand-gold">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-brand-dark">Direct Restoration Funding</h3>
                  <p className="text-xs text-slate-500 font-sans">Make an instant tax-deductible contribution to our Kenyan nursery network.</p>
                </div>
              </div>

              {/* Amount Selectors */}
              <div className="space-y-3 text-left">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">Select Donation Amount (USD)</label>
                <div className="grid grid-cols-4 gap-3">
                  {[15, 30, 50, 100].map((amt) => (
                    <button
                      key={amt}
                      onClick={() => setDonateAmount(amt)}
                      className={`py-3 rounded-xl font-sans font-bold text-sm border transition-all-300 ${
                        donateAmount === amt
                          ? 'bg-brand-gold text-white border-brand-gold shadow-md shadow-brand-gold/10'
                          : 'bg-white text-slate-600 border-brand-cream hover:bg-brand-cream/30'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>
                
                {/* Custom Amount input */}
                <div className="mt-4">
                  <Input
                    type="number"
                    prefix="$"
                    placeholder="Enter custom amount"
                    value={donateAmount || ''}
                    onChange={(e) => setDonateAmount(Number(e.target.value))}
                    className="rounded-xl border-brand-cream hover:border-brand-gold focus:border-brand-gold py-2.5 font-sans"
                    style={{ borderRadius: '12px' }}
                  />
                </div>
              </div>

              {/* Impact Display Grid */}
              <div className="bg-brand-green/5 rounded-xl p-6 border border-brand-green/10 text-left space-y-4">
                <h4 className="text-xs font-bold text-brand-green uppercase tracking-wider font-sans flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-brand-gold" />
                  Your Impact Calculator
                </h4>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <span className="text-2xl font-serif font-bold text-brand-green">+{impact.trees}</span>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Trees Planted</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-2xl font-serif font-bold text-brand-green">+{impact.jobs}</span>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Nursery Days</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-2xl font-serif font-bold text-brand-green">+{impact.water}L</span>
                    <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Water Saved</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Donation CTA */}
            <div className="pt-8 border-t border-brand-cream/80 text-left">
              <Button
                type="primary"
                size="large"
                block
                icon={<Heart className="w-4 h-4 fill-white" />}
                className="bg-brand-gold hover:bg-brand-gold/90 border-none font-semibold text-white py-6 rounded-xl flex items-center justify-center gap-2"
                onClick={() => message.info('Donation portal simulation: GSSF donation processing module.')}
                style={{ backgroundColor: '#997D2F', borderRadius: '12px' }}
              >
                Donate ${donateAmount || 0} Instantly
              </Button>
              <p className="text-[10px] text-slate-400 text-center mt-3 font-sans">
                Secured by GSSF Financial Trustees. All donations receive standard IRS/KRA tax receipts.
              </p>
            </div>
          </div>

          {/* Right Column: Volunteer Form (6 cols) */}
          <div className="lg:col-span-6 bg-brand-alabaster border border-brand-cream rounded-2xl p-8 flex flex-col justify-between shadow-sm">
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-brand-cream pb-4 text-left">
                <div className="p-2.5 rounded-xl bg-brand-green/10 text-brand-green">
                  <UserPlus className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-brand-dark">Apply to Volunteer</h3>
                  <p className="text-xs text-slate-500 font-sans">Join our network of over 250 local Kenyan environment stewards.</p>
                </div>
              </div>

              {/* Form Input fields */}
              <Form
                form={form}
                layout="vertical"
                onFinish={handleVolunteerSubmit}
                requiredMark={false}
                className="text-left"
              >
                <div className="grid grid-cols-2 gap-4">
                  <Form.Item
                    name="name"
                    label={<span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">Full Name</span>}
                    rules={[{ required: true, message: 'Please enter your name' }]}
                  >
                    <Input className="rounded-xl py-2 font-sans" style={{ borderRadius: '12px' }} placeholder="Jomo Omondi" />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    label={<span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">Email Address</span>}
                    rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}
                  >
                    <Input className="rounded-xl py-2 font-sans" style={{ borderRadius: '12px' }} placeholder="jomo@domain.com" />
                  </Form.Item>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Form.Item
                    name="county"
                    label={<span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">County (Kenya)</span>}
                    rules={[{ required: true, message: 'Please select your county' }]}
                  >
                    <Select placeholder="Select County" className="font-sans" style={{ borderRadius: '12px' }}>
                      <Option value="Nairobi">Nairobi</Option>
                      <Option value="Makueni">Makueni</Option>
                      <Option value="Kitui">Kitui</Option>
                      <Option value="Machakos">Machakos</Option>
                      <Option value="Kajiado">Kajiado</Option>
                      <Option value="Other">Other</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="pillar"
                    label={<span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">Primary Interest</span>}
                    rules={[{ required: true, message: 'Please select an area of interest' }]}
                  >
                    <Select placeholder="Area of Interest" className="font-sans" style={{ borderRadius: '12px' }}>
                      <Option value="Ecology">Ecological Preservation</Option>
                      <Option value="Settlement">Sustainable Settlements</Option>
                      <Option value="Empowerment">Community Empowerment</Option>
                    </Select>
                  </Form.Item>
                </div>

                <Form.Item
                  name="message"
                  label={<span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-sans">Why do you want to join GSSF?</span>}
                >
                  <Input.TextArea
                    rows={3}
                    className="rounded-xl py-2 font-sans"
                    style={{ borderRadius: '12px' }}
                    placeholder="Tell us about yourself and what drives you to contribute..."
                  />
                </Form.Item>

                <Form.Item className="mb-0">
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    block
                    loading={submitting}
                    className="bg-brand-green hover:bg-brand-green/90 border-none font-semibold text-white py-6 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: '#3B5A2B', borderRadius: '12px' }}
                  >
                    Submit Volunteer Application
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
