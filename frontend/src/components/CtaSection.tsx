
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';

const CtaSection: React.FC = () => {
  return (
    <section className="py-16 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
        <div className="mb-8 md:mb-0 text-center md:text-left">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Take Control of Your Healthcare?</h2>
          <p className="text-lg text-white/90 max-w-xl">
            Join thousands of users who have simplified their healthcare journey with HealthConnect.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild variant="secondary" size="lg" className="text-primary font-bold">
            <Link to="/register">Sign Up Now</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-white/10">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
