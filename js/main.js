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
  
  function openModal(modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal(modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  document.getElementById("donationModalClose").addEventListener("click", () => closeModal(donationModal));

  window.addEventListener("click", (e) => {
    if (e.target === donationModal) closeModal(donationModal);
  });

  // Open Donation Modals
  document.getElementById("donateBtnHero").addEventListener("click", () => openModal(donationModal));
  document.getElementById("donateNavBtn").addEventListener("click", () => openModal(donationModal));

  // Notification Logic
  const notification = document.getElementById("notification");
  const notificationMessage = document.getElementById("notificationMessage");
  document.getElementById("notificationClose").addEventListener("click", () => notification.classList.remove("active"));

  function showNotification(message) {
    notificationMessage.textContent = message;
    notification.classList.add("active");
    setTimeout(() => notification.classList.remove("active"), 4000);
  }

  // Handle Form Submission (Fake for now)
  document.getElementById("submitDonationBtn").addEventListener("click", (e) => {
    e.preventDefault();
    closeModal(donationModal);
    showNotification("Donation recorded! Check your email for instructions.");
  });
});
