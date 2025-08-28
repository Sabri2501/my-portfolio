document.addEventListener('DOMContentLoaded', function () {
  // Initialiser EmailJS avec votre Public Key
  emailjs.init("7x3nDwiZl9Plr7jL-"); // Remplacez par votre clé publique EmailJS

  const typewriter = document.getElementById('typewriter');
  const texts = ["Full-Stack", "Front-End", "Back-End", "Web"];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      typewriter.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typewriter.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typingSpeed = 1000;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }
  type();

  // Navigation mobile
  const menuBtn = document.getElementById('menu-btn');
  const navLinks = document.getElementById('nav-links');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });
  }

  // Navigation fluide & mise à jour active
  const navItems = document.querySelectorAll('.nav-link');
  navItems.forEach(item => {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        navLinks.classList.remove('active');
        window.scrollTo({
          top: targetSection.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });

  // Mise à jour automatique des liens actifs au scroll
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', function () {
    let scrollPos = window.scrollY + 75; // décalage pour la navbar
    sections.forEach(section => {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        navItems.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  });

  // Gestion du formulaire de contact avec EmailJS
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('form-message');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      
      // Afficher un message de chargement
      formMessage.textContent = "Envoi en cours...";
      formMessage.style.display = "block";
      formMessage.className = "form-message";
      
      // Récupérer les données du formulaire
      const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
      };
      
      // Envoyer l'email via EmailJS
      emailjs.send("service_qmdd6xl", "template_19ms8xz", {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: "sabrikhadija2501@gmail.com"
      })
      .then(function(response) {
        console.log("SUCCESS!", response.status, response.text);
        formMessage.textContent = "Message envoyé avec succès! Je vous répondrai dès que possible.";
        formMessage.className = "form-message success";
        contactForm.reset();
      }, function(error) {
        console.log("FAILED...", error);
        formMessage.textContent = "Une erreur s'est produite. Veuillez réessayer ou me contacter directement à sabrikhadija2501@gmail.com";
        formMessage.className = "form-message error";
      });
    });
  }

  // Animation au défilement
  const animateOnScroll = function () {
    const elements = document.querySelectorAll('.skill-item, .categorie, .timeline-content, .project-card');
    elements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      if (elementPosition < screenPosition) {
        element.style.opacity = 1;
        element.style.transform = 'translateY(0)';
      }
    });
  };

  const animatedElements = document.querySelectorAll('.skill-item, .categorie, .timeline-content, .project-card');
  animatedElements.forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  });

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll();
});


