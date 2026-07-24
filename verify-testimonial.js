const fetch = globalThis.fetch;

async function run() {
  try {
    const response = await fetch('http://127.0.0.1:3000/api/testimonials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Ali',
        course: 'python programming',
        testimonial: 'Excellent instructor',
      }),
    });

    console.log('status', response.status);
    const text = await response.text();
    console.log(text);
  } catch (error) {
    console.error('error', error);
  }
}

run();
