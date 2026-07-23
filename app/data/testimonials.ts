export type Testimonial = {
  name: string;
  course: string;
  quote: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    name: 'Amina Rahman',
    course: 'AI & Generative AI Workshop',
    quote:
      'The workshop was practical, engaging, and extremely relevant to real-world AI usage. I left with confidence and several immediate use cases I could apply at work.',
    rating: 5,
  },
  {
    name: 'David Okafor',
    course: 'Data Science Mentoring Program',
    quote:
      'Working with Skilloria Studio helped me move from theory to implementation. The mentoring sessions were structured, supportive, and very goal-oriented.',
    rating: 5,
  },
  {
    name: 'Sofia Martinez',
    course: 'Python Programming Bootcamp',
    quote:
      'I appreciated the friendly guidance and practical exercises. The learning pace was perfect for building both confidence and technical skill.',
    rating: 5,
  },
];
