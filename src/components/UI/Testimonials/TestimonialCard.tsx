
import React from "react";

type Testimonial = {
  organization: string;
  author: string;
  testimonial: string;
};

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
  <div className="border rounded-lg p-4 shadow-md bg-white border-stone-400 border-r-4 border-b-4">
    <p className="text-gray-700 italic mb-3">“{testimonial.testimonial}”</p>
    <p className="font-semibold text-sm text-gray-900">
      — {testimonial.author}, {testimonial.organization}
    </p>
  </div>
);

export default TestimonialCard;
