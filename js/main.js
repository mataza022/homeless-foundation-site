document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");

  mobileMenuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("active");
    const icon = mobileMenuBtn.querySelector("i");
    icon.classList.toggle("fa-bars");
    icon.classList.toggle("fa-times");
  });

  // Smooth Scrolling
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({ top: targetElement.offsetTop - 80, behavior: "smooth" });
        navLinks.classList.remove("active");
        mobileMenuBtn.querySelector("i").classList.add("fa-bars");
        mobileMenuBtn.querySelector("i").classList.remove("fa-times");
      }
    });
  });

  // Hero Background Rotation
  let currentBg = 1;
  const totalBgs = 2;
  let bgInterval;

  function changeBackground(bgNumber) {
    document.querySelectorAll(".hero-bg-image").forEach((bg) => bg.classList.remove("active"));
    const activeBg = document.getElementById(`bg-image-${bgNumber}`);
    if (activeBg) activeBg.classList.add("active");
    currentBg = bgNumber;
  }

  function nextBackground() {
    let nextBg = currentBg + 1;
    if (nextBg > totalBgs) nextBg = 1;
    changeBackground(nextBg);
  }

  bgInterval = setInterval(nextBackground, 5000);

  // Modals
  const donationModal = document.getElementById("donationModal");
  const projectModal = document.getElementById("projectModal");
  
  function openModal(modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal(modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  document.getElementById("donationModalClose").addEventListener("click", () => closeModal(donationModal));
  document.getElementById("projectModalClose").addEventListener("click", () => closeModal(projectModal));

  window.addEventListener("click", (e) => {
    if (e.target === donationModal) closeModal(donationModal);
    if (e.target === projectModal) closeModal(projectModal);
  });

  // Open Donation Modals
  document.getElementById("donateBtnHero").addEventListener("click", () => openModal(donationModal));
  document.getElementById("donateNavBtn").addEventListener("click", () => openModal(donationModal));
  document.getElementById("donateCtaBtn").addEventListener("click", () => openModal(donationModal));

  // Project Details Logic (Based strictly on PDF text)
  const projectData = {
    "child-rescue": { 
      title: "Orphans, homeless, disabled and vulnerable Children's wing", 
      desc: "We support these needy people by donating food, clothes, medical care, education and education materials and shelter. For the categories who have projects we give them grand money to boost their projects." 
    },
    "widow-empowerment": { 
      title: "Women empowerment wing", 
      desc: "Supporting women who are affected by poverty in their families. The organization branched into this category as one way of reaching the needy people in the community." 
    },
    "youth": { 
      title: "Youth empowerment wing", 
      desc: "One of the three main categories registered separately but under one umbrella of the main foundation. We give them grand money to boost their projects." 
    },
    "healthcare": { 
      title: "Medical and Health Attention", 
      desc: "Medical and health attention especially AID, HIV and Cancer complication patients is a great problem as they can't afford the price of medicine when they fall sick. In some remote areas the health centres are very far away from the residential areas. People travel many kilometers looking for health centres. These poor people needs affordable medicines near their homes." 
    },
    "education": { 
      title: "Schools and Education", 
      desc: "Many children from the poor families do not attend schools. The family cannot afford to pay for the school fees and the education materials. The children are therefore left to move around without attending schools. These children needs support such that they can go to schools just like other children from the rich families." 
    },
    "food-clothing": { 
      title: "Food and Clothing", 
      desc: "Most of the community especially in the rural areas moves half naked. This goes to the children and adults too. These people need clothes to hide their nakedness. The poor people in the community goes around with empty stomachs. Most of them gets only one small meal per day. They are starving for food and clean water." 
    }
  };

  document.querySelectorAll(".learn-more").forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const projectId = this.getAttribute("data-project");
      const data = projectData[projectId];
      
      if (data) {
        document.getElementById("projectModalTitle").textContent = data.title;
        document.getElementById("projectModalContent").innerHTML = `<p>${data.desc}</p><button class="btn btn-primary" style="margin-top:20px; width:100%;" onclick="document.getElementById('projectModalClose').click(); document.getElementById('donateBtnHero').click();">Support this Program</button>`;
        openModal(projectModal);
      }
    });
  });

  // Notification Logic
  const notification = document.getElementById("notification");
  const notificationMessage = document.getElementById("notificationMessage");
  document.getElementById("notificationClose").addEventListener("click", () => notification.classList.remove("active"));

  function showNotification(message) {
    notificationMessage.textContent = message;
    notification.classList.add("active");
    setTimeout(() => notification.classList.remove("active"), 4000);
  }

  // Handle Form Submission (Fake for now, will connect to Firebase next)
  document.getElementById("submitDonationBtn").addEventListener("click", (e) => {
    e.preventDefault();
    closeModal(donationModal);
    showNotification("Donation recorded! Check your email for instructions.");
  });
});
