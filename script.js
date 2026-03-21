// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Initialize EmailJS
(function(){
  emailjs.init("XFFiix4VCIeLYJKXB");
})();

// Scroll animation
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.aos').forEach(el => observer.observe(el));

// Counter animation
function animateCounter(el, target, suffix) {
  let start = 0;
  const duration = 1800;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const val = Math.floor(progress * target);
    el.innerHTML = val + '<span class="plus">' + suffix + '</span>';
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const nums = e.target.querySelectorAll('.stat-num');
      nums.forEach(n => {
        const raw = n.textContent.trim();
        const num = parseInt(raw);
        const suf = raw.includes('%') ? '%' : '+';
        animateCounter(n, num, suf);
      });
      statObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
const statsSection = document.getElementById('stats');
if (statsSection) statObserver.observe(statsSection);

// Form submit
function handleSubmit(btn) {
  // Lấy giá trị từ form
  const name = document.getElementById('contact-name').value;
  const email = document.getElementById('contact-email').value;
  const subject = document.getElementById('contact-subject').value;
  const message = document.getElementById('contact-message').value;

  // Kiểm tra nếu các trường bắt buộc trống
  if (!name || !email || !message) {
    alert('Vui lòng điền đầy đủ thông tin.');
    return;
  }

  // Gửi email sử dụng EmailJS
  emailjs.send('service_jxesrfr', 'template_182rovx', {
    from_name: name,
    from_email: email,
    subject: subject,
    message: message,
    to_email: 'phamphutoan55@gmail.com', // Email của bạn
    date: new Date().toLocaleDateString('vi-VN'),
    time: new Date().toLocaleTimeString('vi-VN')
  })
  .then(function(response) {
    console.log('SUCCESS!', response.status, response.text);
    btn.textContent = '✅ Đã gửi! Tôi sẽ liên hệ sớm.';
    btn.style.background = 'linear-gradient(135deg, #059669, #10B981)';
    btn.style.boxShadow = '0 8px 24px rgba(5,150,105,0.4)';
    // Reset form
    document.getElementById('contact-name').value = '';
    document.getElementById('contact-email').value = '';
    document.getElementById('contact-subject').value = '';
    document.getElementById('contact-message').value = '';
    setTimeout(() => {
      btn.textContent = '🚀 Gửi tin nhắn';
      btn.style.background = '';
      btn.style.boxShadow = '';
    }, 3500);
  }, function(error) {
    console.log('FAILED...', error);
    alert('Có lỗi xảy ra khi gửi tin nhắn. Vui lòng thử lại sau.');
  });
}

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});