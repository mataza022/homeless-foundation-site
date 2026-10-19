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
  const bgIndicators = document.querySelectorAll(".bg-indicator");

  function changeBackground(bgNumber) {
    document.querySelectorAll(".hero-bg-image").forEach((bg) => bg.classList.remove("active"));
    const activeBg = document.getElementById(`bg-image-${bgNumber}`);
    if (activeBg) activeBg.classList.add("active");
    
    bgIndicators.forEach((indicator) => indicator.classList.remove("active"));
    const activeIndicator = document.querySelector(`.bg-indicator[data-bg="${bgNumber}"]`);
    if (activeIndicator) activeIndicator.classList.add("active");
    currentBg = bgNumber;
  }

  function nextBackground() {
    let nextBg = currentBg + 1;
    if (nextBg > totalBgs) nextBg = 1;
    changeBackground(nextBg);
  }

  function startRotation() {
    bgInterval = setInterval(nextBackground, 5000);
  }

  bgIndicators.forEach((indicator) => {
    indicator.addEventListener("click", function () {
      const bgNumber = parseInt(this.getAttribute("data-bg"));
      changeBackground(bgNumber);
      clearInterval(bgInterval);
      startRotation();
    });
  });
  startRotation();

  // Modal Logic
  const donationModal = document.getElementById("donationModal");
  const volunteerModal = document.getElementById("volunteerModal");
  
  function openModal(modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeModal(modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }

  document.getElementById("donationModalClose").addEventListener("click", () => closeModal(donationModal));
  document.getElementById("volunteerModalClose").addEventListener("click", () => closeModal(volunteerModal));

  window.addEventListener("click", (e) => {
    if (e.target === donationModal) closeModal(donationModal);
    if (e.target === volunteerModal) closeModal(volunteerModal);
  });

  // Buttons to open modals
  document.getElementById("donateBtnHero").addEventListener("click", () => openModal(donationModal));
  document.getElementById("volunteerBtnNav").addEventListener("click", () => openModal(volunteerModal));
  document.getElementById("supportMaweniBtn").addEventListener("click", () => {
    openModal(donationModal);
    document.getElementById("donationPurpose").value = "child-rescue";
  });
  document.getElementById("sponsorChildBtn").addEventListener("click", () => openModal(donationModal));
  document.getElementById("learnMoreBtn").addEventListener("click", () => {
    document.querySelector("#about").scrollIntoView({ behavior: "smooth" });
  });

  // Copy to clipboard & Notification
  const notification = document.getElementById("notification");
  const notificationMessage = document.getElementById("notificationMessage");
  document.getElementById("notificationClose").addEventListener("click", () => notification.classList.remove("active"));

  function showNotification(message) {
    notificationMessage.textContent = message;
    notification.classList.add("active");
    setTimeout(() => notification.classList.remove("active"), 4000);
  }

  document.getElementById("mpesaBtn").addEventListener("click", () => {
    navigator.clipboard.writeText("Paybill: 891300\nAccount: Your Name");
    showNotification("M-PESA details copied!");
  });

  document.getElementById("bankBtn").addEventListener("click", () => {
    navigator.clipboard.writeText("Bank: Kenya Commercial Bank\nName: Homeless Child & Widows Foundation\nAcc: 1123456789");
    showNotification("Bank details copied!");
  });

  // Handle Form Submissions (Prevent actual reload for now)
  document.getElementById("submitDonationBtn").addEventListener("click", (e) => {
    e.preventDefault();
    closeModal(donationModal);
    showNotification("Donation recorded! Check your email for instructions.");
  });

  document.getElementById("submitVolunteerBtn").addEventListener("click", (e) => {
    e.preventDefault();
    closeModal(volunteerModal);
    showNotification("Volunteer application submitted! We will contact you soon.");
  });
});
