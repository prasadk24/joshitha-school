const pageDefinitions = [
  { id: "home", label: "Home", file: "home.html" },
  { id: "about-us", label: "Aboutus", file: "aboutus.html" },
  { id: "academics", label: "Academics", file: "academics.html" },
  { id: "infrastructure", label: "Infrastructure", file: "infrastructure.html" },
  { id: "admission", label: "Admission", file: "admission.html" },
  { id: "contact-details", label: "Contact Details", file: "contact.html" },
  { id: "gallery", label: "Gallery", file: "gallery.html" },
  { id: "enquiry-form", label: "Enquiry Form", file: "enquiry.html" },
  { id: "career", label: "Career", file: "career.html" }
];
const currentPageId = document.body.dataset.page;
const navigationMarkup = pageDefinitions.map((page) => {
  const active = page.id === currentPageId;
  return `<li class="nav-item"><a class="nav-link${active ? " active" : ""}" href="${page.file}"${active ? ' aria-current="page"' : ""}>${page.label}</a></li>`;
}).join("");

document.getElementById("site-shell").innerHTML = `
  <div class="topline">
    <div class="container topline-inner">
      <span class="topline-address"><i class="fa-solid fa-location-dot me-2" aria-hidden="true"></i>Jankampet, Ameenpur Mandal, Sangareddy District</span>
      <span class="topline-affiliation">CBSE Affiliation No: 3630429</span>
      <span><a href="tel:9989422020"><i class="fa-solid fa-phone me-2" aria-hidden="true"></i>99894 22020</a><span class="mx-2">|</span><a href="mailto:info@joshithaschool.com"><i class="fa-regular fa-envelope me-2" aria-hidden="true"></i>Contact the school</a></span>
    </div>
  </div>
  <nav class="navbar navbar-expand-lg site-nav" aria-label="Main navigation">
    <div class="container nav-inner">
      <a class="brand" href="home.html" aria-label="Joshitha School home">
        <img src="images/logo.png" alt="Joshitha School emblem">
        <span><span class="brand-name">Joshitha School</span><span class="brand-caption">Raising leaders for the 21st Century</span></span>
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#schoolNav" aria-controls="schoolNav" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse justify-content-end" id="schoolNav"><ul class="navbar-nav align-items-lg-center">${navigationMarkup}</ul></div>
    </div>
  </nav>
  <header class="hero home-only" id="home-hero">
    <div class="container"><div class="hero-copy">
      <span class="eyebrow"><i class="fa-solid fa-sun" aria-hidden="true"></i> Joshitha Techno School · Hyderabad</span>
      <h1>Learning to lead.<br>Ready to grow.</h1>
      <p class="hero-quote">Raising leaders for the 21st Century through curious minds, confident voices and learning that connects to real life.</p>
      <div class="hero-actions"><a class="btn btn-school" href="admission.html">Explore admissions <i class="fa-solid fa-arrow-right ms-2" aria-hidden="true"></i></a><a class="btn btn-outline-light" href="aboutus.html">Discover Joshitha</a></div>
    </div></div>
  </header>
  <div class="intro-strip home-only" id="intro-strip"><div class="container"><div class="row g-0">
    <div class="col-4 intro-item"><span class="intro-icon"><i class="fa-solid fa-seedling" aria-hidden="true"></i></span><span><strong>Whole-child growth</strong><span>Learning, confidence and character</span></span></div>
    <div class="col-4 intro-item"><span class="intro-icon"><i class="fa-solid fa-flask" aria-hidden="true"></i></span><span><strong>Hands-on learning</strong><span>Concepts brought into real life</span></span></div>
    <div class="col-4 intro-item"><span class="intro-icon"><i class="fa-solid fa-shield-halved" aria-hidden="true"></i></span><span><strong>A supportive campus</strong><span>Space to learn, play and belong</span></span></div>
  </div></div></div>
  <footer class="site-footer">
    <div class="container footer-main"><div class="row g-4">
      <div class="col-md-5"><h2>Joshitha Techno School</h2><p class="mb-0">Raising leaders for the 21st Century. A learning community for curious, capable and confident children.</p></div>
      <div class="col-md-4"><h2>Visit us</h2><p class="mb-1">Sy.No: 19 to 21 &amp; 73, H.No. 3-51</p><p class="mb-1">Jankampet Village &amp; Panchayat, Kistareddy Pet</p><p class="mb-1">Ameenpur Mandal, Sangareddy District, Telangana 502319</p></div>
      <div class="col-md-3"><h2>Get in touch</h2><p class="mb-1"><a href="tel:9989422020">9989422020</a></p><p class="mb-1"><a href="tel:9573706660">9573706660</a></p><p class="mb-0"><a href="mailto:info@joshithaschool.com">info@joshithaschool.com</a></p></div>
    </div></div>
    <div class="footer-bottom"><div class="container d-flex flex-wrap justify-content-between gap-2"><span>Joshitha School · CBSE Affiliation No: 3630429</span><span>Hyderabad, Telangana</span></div></div>
  </footer>
  <button class="back-top" type="button" aria-label="Back to top" title="Back to top"><i class="fa-solid fa-arrow-up" aria-hidden="true"></i></button>
`;
document.getElementById("site-footer").append(
  document.querySelector(".site-footer"),
  document.querySelector(".back-top")
);

if (currentPageId !== "home") {
  document.querySelectorAll(".home-only").forEach((element) => { element.hidden = true; });
}

document.querySelector(".back-top").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
