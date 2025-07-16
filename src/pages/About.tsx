import React from 'react';
import { motion } from 'framer-motion';
import { Award, Target, Users, Lightbulb } from 'lucide-react';

// const teamMembers = [
//   { name: 'Alex Johnson', role: 'Founder & CEO', image: 'https://i.pravatar.cc/150?u=alex' },
//   { name: 'Samantha Lee', role: 'Head of Engineering', image: 'https://i.pravatar.cc/150?u=samantha' },
//   { name: 'Michael Chen', role: 'Lead Product Designer', image: 'https://i.pravatar.cc/150?u=michael' },
//   { name: 'Jessica Brown', role: 'Marketing Director', image: 'https://i.pravatar.cc/150?u=jessica' },
// ];

const values = [
  { icon: Lightbulb, title: 'Innovation', description: 'We constantly seek out and develop the most advanced technology.' },
  { icon: Award, title: 'Quality', description: 'Our products undergo rigorous testing to ensure top-tier performance.' },
  { icon: Users, title: 'Customer-Centric', description: 'Your needs and satisfaction are at the core of everything we do.' },
  { icon: Target, title: 'Reliability', description: 'We build products you can depend on, day in and day out.' },
];

const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            About InnoMakers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-200 max-w-3xl mx-auto"
          >
            Pioneering the future of personal and home technology with innovative solutions that connect and protect what matters most.
          </motion.p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2020, InnoMakers was born from a passion for technology that simplifies and secures modern life. We saw a need for reliable, user-friendly GPS and smart home devices that weren't just functional, but beautifully designed and accessible to everyone.
              </p>
              <p className="text-gray-600">
                From a small team of dedicated engineers and designers, we've grown into a trusted name in the consumer tech space, driven by our commitment to innovation and customer satisfaction.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" alt="Our Team" className="rounded-lg shadow-xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600">The principles that guide our work and our company.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6 bg-white rounded-lg shadow-md"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      {/* <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600">The brilliant minds behind InnoMakers.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <img src={member.image} alt={member.name} className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg" />
                <h3 className="text-xl font-semibold text-gray-900">{member.name}</h3>
                <p className="text-primary-600">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default About;
