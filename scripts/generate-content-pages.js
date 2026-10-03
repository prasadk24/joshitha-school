const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const source = fs.readFileSync(path.join(root, "content.txt"), "utf8");
const pageDefinitions = [
  { id: "home", title: "Home", file: "home.html" },
  { id: "about-us", title: "About us", file: "aboutus.html" },
  { id: "academics", title: "Academics", file: "academics.html" },
  { id: "infrastructure", title: "Infrastructure", file: "infrastructure.html" },
  { id: "admission", title: "Admission", file: "admission.html" },
  { id: "contact-details", title: "Contact Details", file: "contact.html" },
  { id: "gallery", title: "Gallery", file: "gallery.html" },
  { id: "enquiry-form", title: "Enquiry Form", file: "enquiry.html" },
  { id: "career", title: "Career", file: "career.html" }
];
const documentAliases = {
  cbseaffiliation: "CBSE-Affiliation-Letter.pdf",
  recognitioncertificate: "Recognition.pdf",
  sanitarycertificate: "Health-Sanitation.pdf",
  selfcertificate: "SELF-CERTIFICATE.pdf",
  appendixix: "Mandatory-Public-Disclosure.pdf",
  infrasturcture: "Details-of-Infrastructure.pdf",
  result: "RESULT.pdf"
};
const pdfDirectory = path.join(root, "pdf");
const documents = new Map(fs.readdirSync(pdfDirectory)
  .filter((file) => file.toLowerCase().endsWith(".pdf"))
  .map((file) => [normalize(file), file]));
const galleryItems = [
  ["images/carousal/acrons.jpg", "Grade X results"],
  ["images/carousal/school-toppers.jpg", "School toppers"],
  ["images/carousal/subject-wise.jpg", "Subject-wise results"],
  ["images/carousal/xth-all-students.jpg", "Grade X students"],
  ["images/teaching/digital-classroom.jpg", "Digital classroom"],
  ["images/teaching/science-lab.jpg", "Science lab"],
  ["images/teaching/school-library.jpg", "School library"],
  ["images/teaching/dance.jpg", "Dance and music"]
];

function normalize(value) {
  return value.toLowerCase().replace(/\.pdf$/, "").replace(/[^a-z0-9]/g, "");
}

function slugify(value) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
}

function renderLine(value) {
  const label = value.trim();
  const key = normalize(label);
  const file = documentAliases[key] || documents.get(key);
  const text = escapeHtml(label);
  return file ? `<a href="pdf/${file}">${text}</a>` : text;
}

function renderGallery() {
  return `<div class="gallery-grid">\n${galleryItems.map(([src, caption]) =>
    `        <figure class="gallery-card"><img src="${src}" alt="${escapeHtml(caption)}" loading="lazy"><figcaption>${escapeHtml(caption)}</figcaption></figure>`
  ).join("\n")}\n      </div>`;
}

const infrastructureItems = [
  ["campus-1.jpg", "Campus grounds", "Joshitha School campus and grounds", "A two-acre campus with space for learning, sport and outdoor activity."],
  ["science-lab-1.jpg", "Science laboratories", "Students carrying out a supervised science experiment", "Practical lessons encourage students to test ideas and learn by doing."],
  ["science-lab-1 (1).jpg", "Guided experiments", "Teacher guiding students during a lab activity", "Lab work takes place with support from the school’s educators."],
  ["science-lab-1 (2).jpg", "Learning together", "Students working together at a laboratory bench", "Students build confidence through hands-on, collaborative learning."],
  ["science-lab-2.jpg", "Explore science", "Science lab activity at Joshitha School", "Dedicated lab spaces support practical science experiences."],
  ["library.jpg", "Library", "Books and reading space in the school library", "A welcoming space for reading, research and independent discovery."],
  ["hall-1.jpg", "Multipurpose hall", "School multipurpose hall", "A flexible venue for school programmes, talks and gatherings."],
  ["auditorium-1.jpg", "Student events", "Students presenting a school programme on stage", "A stage for students to share their talents with the school community."],
  ["auditorium-2.jpg", "Open-air auditorium", "School auditorium prepared for a student event", "School events bring students together to perform and celebrate."],
  ["infirmary.jpg", "Infirmary", "School infirmary room", "A dedicated room for students who need care during school hours."],
  ["transport.jpg", "School transport", "Joshitha School transport bus", "Transport service supports students travelling to and from campus."]
];

function renderInfrastructureNavigation() {
  return `<nav class="infrastructure-feature-nav mb-4" aria-label="Infrastructure sections">
        <ul class="nav nav-pills flex-wrap gap-2">
          <li class="nav-item"><a class="nav-link" href="#campus-facilities">Campus</a></li>
          <li class="nav-item"><a class="nav-link" href="#sports">Sports</a></li>
          <li class="nav-item"><a class="nav-link" href="#academic-infrastructure">Academic facilities</a></li>
          <li class="nav-item"><a class="nav-link" href="#safety-support">Safety &amp; support</a></li>
        </ul>
      </nav>`;
}

function renderInfrastructureGallery() {
  const cards = infrastructureItems.map(([file, title, alt, description]) =>
    `        <div class="col"><article class="card infrastructure-feature-card h-100"><div class="ratio ratio-4x3"><img src="images/infrastructure/${file}" class="card-img-top" alt="${escapeHtml(alt)}" loading="lazy"></div><div class="card-body"><h3 class="card-title">${escapeHtml(title)}</h3><p class="card-text">${escapeHtml(description)}</p></div></article></div>`
  ).join("\n");
  return `<h2 class="mt-5">Campus in pictures</h2>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-xl-3 g-3 infrastructure-feature-grid">
${cards}
      </div>`;
}

const academicFacilityItems = [
  { title: "Digital Class Rooms", kicker: "Interactive learning", image: "images/teaching/digital-classroom.jpg", alt: "Digital classroom with interactive teaching technology", paragraphs: [
    "The school has a teaching tool that’s known for its creative, imaginative and innovative approach that make learning engrossing, inspiring and interesting. To make learning proactive and interactive, teachers make use of a Technologically advanced version of Digital boards in Classrooms. These interactive teaching sessions help in enabling better focus and attention to what is being taught in the class, making a dry subject interesting.",
    "Equipped with the latest High-end Smartboards we add more life everyday lessons. Built in tools enhance the teaching – learning process. Textbooks and subject digital content are loaded onto the Smartboard so as to be accessible within the classroom. Smartboard technology caters to different learning styles with students demonstrating increased motivation leading to increased participation in class."
  ] },
  { title: "Library", kicker: "Read and discover", image: "images/infrastructure/library.jpg", alt: "Joshitha School library and reading space", paragraphs: [
    "The library plays an integral part in the delivery of the curricular program. It provides supporting material for learning in the classrooms and help(s) teach skills required by the students to become literate(intellectual), informed, and able to face the world.",
    "Our library is equipped with more than 2,000 books from different publishers and offering adequate reading space. The use of latest technologies, ensures smooth flow of processes. Our children are given the opportunity to choose from a range of authors, genres and periodicals.",
    "The books in the library cover a wide range of Subjects, from Fiction, Biographies, Encyclopaedias, Science and Crafts. New Journals and books get added regularly to upgrade the present stocks."
  ] },
  { title: "Maths Lab", kicker: "Learn by doing", image: "images/teaching/abacus.jpg", alt: "Abacus learning activity", paragraphs: [
    "Math lab helps the students in terms of learning, interest development, confidence development and subject effectiveness. The Math lab curriculum provides an opportunity for students to discover mathematics through doing. Math teachers allow students take interest to understand mathematical facts practically through model, continue work on the tasks and teachers help as and when they are stuck."
  ] },
  { title: "Science Lab", kicker: "Practical discovery", image: "images/infrastructure/science-lab-1.jpg", alt: "Students carrying out a supervised science experiment", paragraphs: [
    "Science is essentially a practical subject which emphasizes on experimental work and learning by doing. Experiments carried in our school laboratories are an integral part of the teaching and learning process of the subject. The students are encouraged to test theories prove concepts and validate hypotheses. It helps students to remember the concepts better.",
    "The school has separate labs for Physics, Chemistry, Biology, and Home Science. The labs are well equipped with the latest equipments, specimens, chemicals / reagents and appliances. It is here that the skills, aptitudes and abilities are sharpened and the students know how to apply practically the knowledge they have gained."
  ], accordion: [
    ["physics", "Physics lab", "The Physics lab allows for a complete practical experience in kinematics to electricity."],
    ["chemistry", "Chemistry lab", "From titrations to deducing boiling points, our Chemistry lab is the perfect place for every experiment. We have a range of chemicals used for a variety of experiments and practical work."],
    ["biology", "Biology lab", "The Biology lab allows students to examine and investigate the wonders of life. With microscopes and specimens (both plant and animal), students can explore, experiment and discover the wonders of nature beyond the classroom."],
    ["lab-safety", "Safety is our priority", "All students wear lab coats, goggles and gloves when handling chemicals, furthermore, no experiments are conducted without the supervision of a professional. In addition, safety posters are displayed in all labs to ensure an educational and safe experience when dealing with equipment and chemicals."]
  ] },
  { title: "Computer (ICT) Lab", kicker: "Digital skills", icon: "fa-computer", paragraphs: [
    "While teaching children the importance of mind power, we train them for the effective use of computers to enhance their performance and to optimize their learning potential. We follow the functional approach in computer training which can enliven the subjects and enable the children to explore the concepts in a virtual environment.",
    "The Campus is well equipped modern computing facilities for more than 30 students and teachers at a time. Our computers are state of the art and include all the necessary software for students to utilize during their classes.",
    "Furthermore, our computers are safe and allow internet access only for educational purposes. In addition, the labs are only used under the strict supervision of a teacher."
  ] },
  { title: "Language (ASL) Lab", kicker: "Speak and listen", image: "images/teaching/group-discussion.jpg", alt: "Students improving speaking and listening skills together", paragraphs: [
    "Language is a medium of communication. During ASL, the learners are taken through a course wherein listening and speaking are taught as skills in the classroom sessions. To improve the students' use language effectively, expand their vocabulary, and enunciate words, teachers conduct Assessment of Speaking and Listening at regular intervals of time."
  ] },
  { title: "Art and Craft Lab", kicker: "Creative practice", image: "images/teaching/poster-making.jpg", alt: "Students creating artwork and posters", paragraphs: [
    "Art & Craft classes are conducted by experienced faculty in well designed & spacious room. Through this platform, students gain knowledge to create artistic pieces by exploring their creative imaginations."
  ] },
  { title: "Dance & Music", kicker: "Perform and create", image: "images/teaching/dance.jpg", alt: "Students taking part in dance and music", paragraphs: [
    "Music is a vital part of education here at Joshitha and we ensure that students get an opportunity to play and enjoy all forms of music. Our music room includes instruments that students can play during music classes or club classes. The Music room is used as a place for students to practice and play their preferred instruments. Students who choose to be part of the Music Club may also bring their own instruments. Our instruments include a complete drum kit, keyboards, and guitars (both acoustic and electric), among others."
  ] }
];

function renderAcademicFacilities() {
  const cards = academicFacilityItems.map((facility) => {
    const media = facility.image
      ? `<div class="ratio ratio-16x9"><img src="${facility.image}" class="card-img-top" alt="${escapeHtml(facility.alt)}" loading="lazy"></div>`
      : `<div class="facility-icon-panel"><i class="fa-solid ${facility.icon}" aria-hidden="true"></i></div>`;
    const paragraphs = facility.paragraphs.map((paragraph) => `<p class="card-text">${escapeHtml(paragraph)}</p>`).join("\n");
    const accordion = facility.accordion ? `<div class="accordion academic-lab-accordion" id="science-lab-details">
${facility.accordion.map(([id, title, body]) => `          <div class="accordion-item"><h3 class="accordion-header" id="${id}-heading"><button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${id}-details" aria-expanded="false" aria-controls="${id}-details">${escapeHtml(title)}</button></h3><div id="${id}-details" class="accordion-collapse collapse" aria-labelledby="${id}-heading" data-bs-parent="#science-lab-details"><div class="accordion-body">${escapeHtml(body)}</div></div></div>`).join("\n")}
        </div>` : "";
    return `        <div class="col"><article class="card academic-facility-card h-100">${media}<div class="card-body"><span class="facility-kicker">${escapeHtml(facility.kicker)}</span><h2 class="card-title">${escapeHtml(facility.title)}</h2>${paragraphs}${accordion}</div></article></div>`;
  }).join("\n");
  return `<div class="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4 academic-facility-grid">\n${cards}\n      </div>`;
}

const teachingMethodologySections = [
  {
    title: "Structured syllabus",
    pointImages: [
      ["images/teaching/activity.jpg", "Students learning by taking part in an activity"],
      ["images/teaching/xseed.jpg", "XSEED learning material"],
      ["images/teaching/cbse.jpg", "CBSE curriculum material"],
      ["images/teaching/cce.jpg", "Students taking part in classroom assessment"],
      ["images/teaching/digital-classroom.jpg", "Digital classroom lesson"],
      ["images/teaching/group-discussion.jpg", "Students practising language in a group discussion"]
    ],
    points: [
      "Activity (Concept) Based, Project Oriented and How to apply concept in real time",
      "XSEED CBSE SYLLABUS – Hands on experience.",
      "Assessments and Exams pattern we followed as per CBSE",
      "Children should be evaluating throughout the year through CCE",
      "DIGITAL CLASSES – Tata Classedge – Visual representation of the concept.",
      "Digital Language Lab from Orell – Emphasis on Strong Communication Skills & Leadership qualities through the concepts like Phonetics, Spelling Strategies, Build a Sentence, Group discussions, Debates….etc."
    ]
  },
  {
    title: "Real time Activities",
    pointImages: [
      ["images/teaching/science-lab.jpg", "Students working in a science lab"],
      ["images/teaching/school-library.jpg", "Students reading in the school library"],
      ["images/teaching/abacus.jpg", "Student using an abacus"],
      ["images/teaching/writing-skills.jpg", "Student practising handwriting"],
      ["images/teaching/ratio.jpg", "Teacher working with a small group of students"],
      ["images/teaching/teacher.jpg", "Joshitha teacher guiding students"],
      ["images/teaching/ptm.jpg", "Parents and teachers meeting at school"]
    ],
    points: [
      "Computer, Maths, Science Labs – For Practical Experience",
      "Library hours to expose reading skills.",
      "ABACUS – to improve fast calculations, overall brain development and build self confidence.",
      "Encouraging Neat cursive and legible hand writing.",
      "Ideal Student Teacher Ratio.",
      "Well qualified and experienced team of educators",
      "Parent seminars, regular PTMs and orientations."
    ]
  },
  {
    title: "Extra Curricular Activities",
    pointImages: [
      ["images/teaching/poster-making.jpg", "Students making a school poster"],
      ["images/teaching/dance.jpg", "Students taking part in dance and music"],
      ["images/teaching/indore-games.jpg", "Students playing indoor games"],
      ["images/teaching/playgroud.jpg", "Students playing on the school playground"],
      ["images/teaching/celebration.jpg", "Students celebrating a school occasion"],
      ["images/teaching/field-trip.jpg", "Students on an educational field trip"],
      ["images/teaching/fee-structure.jpg", "School fee structure information"],
      ["images/teaching/transport.jpg", "Joshitha School transport"]
    ],
    points: [
      "Co Curricular Activities like Elocution, Poem Recitation, Storytelling, Essay Writing, Word Building, Slogan Writing, Spell Bee, Role Play, Card Making, Poster Making…..etc.",
      "Extra Co Curricular Activities like Karate, Dance and Music.",
      "Indoor Games-Chess, Caroms and Table Tennis.",
      "Playground for games and Sports",
      "Celebrations of All festivals and National Days",
      "Educational field trips and Excursions",
      "Affordable Fee structure",
      "Transport Facility Available"
    ]
  }
];

function renderTeachingPoint(point, image, imageAlt) {
  return `          <li class="list-group-item"><div class="teaching-point-row"><img class="teaching-point-image" src="${image}" alt="${escapeHtml(imageAlt)}" loading="lazy"><span class="teaching-point-text">${escapeHtml(point)}</span></div></li>`;
}

function renderTeachingMethodology() {
  const tabs = teachingMethodologySections.map((section, index) => {
    const id = `teaching-methodology-${index + 1}`;
    const active = index === 0;
    return `          <li class="nav-item" role="presentation"><button class="nav-link${active ? " active" : ""}" id="${id}-tab" data-bs-toggle="tab" data-bs-target="#${id}-panel" type="button" role="tab" aria-controls="${id}-panel" aria-selected="${active}">${escapeHtml(section.title)}</button></li>`;
  }).join("\n");
  const panels = teachingMethodologySections.map((section, index) => {
    const id = `teaching-methodology-${index + 1}`;
    const active = index === 0;
    const points = section.points.map((point, pointIndex) => {
      const [image, imageAlt] = section.pointImages[pointIndex];
      return renderTeachingPoint(point, image, imageAlt);
    }).join("\n");
    return `          <div class="tab-pane fade${active ? " show active" : ""}" id="${id}-panel" role="tabpanel" aria-labelledby="${id}-tab" tabindex="0"><article class="card teaching-methodology-card"><div class="card-body"><span class="teaching-card-kicker">0${index + 1} · ${index === 0 ? "Learning by understanding" : index === 1 ? "Learning in practice" : "Learning beyond class"}</span><h3 class="card-title">${escapeHtml(section.title)}</h3><ul class="list-group list-group-flush teaching-points">\n${points}\n        </ul></div></article></div>`;
  }).join("\n");
  return `<div class="teaching-methodology-tabs">
        <ul class="nav nav-tabs" role="tablist" aria-label="Teaching methodology">
${tabs}
        </ul>
        <div class="tab-content">
${panels}
        </div>
      </div>`;
}

function renderEnquiryForm() {
  const fields = [
    ["Student Name", "text", "student-name", true],
    ["Father Name", "text", "father-name", true],
    ["Contact Number", "tel", "contact-number", true],
    ["Date of birth", "date", "date-of-birth", false],
    ["Class", "text", "class", true]
  ];
  const inputs = fields.map(([label, type, id, required]) =>
    `          <div class="col-sm-6"><label class="form-label" for="${id}">${label}</label><input class="form-control" type="${type}" id="${id}" name="${label}"${required ? " required" : ""}></div>`
  ).join("\n");
  return `<div class="enquiry-layout">
        <aside class="enquiry-note"><h3>Let’s start a conversation.</h3><p>Send us a note about your child and our school team will be in touch.</p><p class="mb-0"><i class="fa-solid fa-phone me-2" aria-hidden="true"></i><a href="tel:9989422020">9989422020</a></p></aside>
        <form action="mailto:info@joshithaschool.com" method="post" enctype="text/plain" class="row g-3">
${inputs}
          <div class="col-12"><label class="form-label" for="comments">Comments</label><textarea class="form-control" id="comments" name="Comments" rows="4"></textarea></div>
          <div class="col-12"><button class="btn btn-school" type="submit">Send enquiry <i class="fa-regular fa-paper-plane ms-2" aria-hidden="true"></i></button><p class="small text-secondary mt-2 mb-0">Your email application will open with your enquiry details ready to send.</p></div>
        </form>
      </div>`;
}

function renderContent(page) {
  const lines = source.split(/\r?\n/);
  const content = [];
  let active = false;
  let skipAcademicFacilities = false;
  let skipTeachingMethodology = false;
  let block = [];
  const flushBlock = () => {
    if (!block.length) return;
    if (block.length === 1) content.push(`<p>${renderLine(block[0])}</p>`);
    else content.push(`<ul>\n${block.map((line) => `  <li>${renderLine(line)}</li>`).join("\n")}\n</ul>`);
    block = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line.startsWith("::")) {
      if (active) flushBlock();
      active = slugify(line.slice(2)) === page.id;
      continue;
    }
    if (!active) continue;
    if (skipAcademicFacilities) {
      if (line !== "-Safety & Support Services") continue;
      content.push('<hr class="page-break">');
      skipAcademicFacilities = false;
    }
    if (skipTeachingMethodology) {
      if (!/^-----+$/.test(line)) continue;
      content.push('<hr class="page-break">');
      skipTeachingMethodology = false;
      continue;
    }
    if (!line) { flushBlock(); continue; }
    if (/^-----+$/.test(line)) {
      flushBlock();
      content.push('<hr class="page-break">');
      continue;
    }
    if (page.id === "infrastructure" && line === "---Accessibility:") {
      flushBlock();
      content.push(renderInfrastructureGallery());
    }
    const heading = line.match(/^(----|---|--|-)(?!-)(.*)$/);
    if (heading) {
      flushBlock();
      const level = heading[1].length;
      const title = heading[2].trim();
      const infrastructureAnchors = {
        "Campus Facilities": "campus-facilities",
        Sports: "sports",
        "Academic Infrastructure": "academic-infrastructure",
        "Safety & Support Services": "safety-support"
      };
      const id = page.id === "infrastructure" ? infrastructureAnchors[title] : null;
      content.push(`<h${level}${id ? ` id="${id}"` : ""}>${escapeHtml(title)}</h${level}>`);
      if (page.id === "infrastructure" && title === "Campus Facilities") content.push(renderInfrastructureNavigation());
      if (page.id === "about-us" && title === "Teaching Methodology") {
        content.push(renderTeachingMethodology());
        skipTeachingMethodology = true;
      }
      if (page.id === "infrastructure" && title === "Academic Infrastructure") {
        content.push(renderAcademicFacilities());
        skipAcademicFacilities = true;
      }
      continue;
    }
    block.push(line);
  }
  if (active) flushBlock();
  if (page.id === "gallery") content.push(renderGallery());
  if (page.id === "enquiry-form") return renderEnquiryForm();
  return content.join("\n      ");
}

const requestedPageId = process.argv[2];
if (requestedPageId && !pageDefinitions.some((page) => page.id === requestedPageId)) {
  throw new Error(`Unknown page id: ${requestedPageId}`);
}

for (const page of pageDefinitions) {
  if (requestedPageId && page.id !== requestedPageId) continue;
  const htmlPath = path.join(root, page.file);
  let html = fs.readFileSync(htmlPath, "utf8");
  const main = `<main id="site-content" class="container">\n  <section class="page-view" aria-labelledby="page-title">\n    <div class="page-heading"><h2 id="page-title">${escapeHtml(page.title)}</h2></div>\n    <div class="content-flow">\n      ${renderContent(page)}\n    </div>\n  </section>\n</main>`;
  html = html.replace(/<main id="site-content" class="container">[\s\S]*?<\/main>\r?\n?/g, "");
  html = html.replace(/  <div id="site-footer"><\/div>\r?\n?/g, "");
  html = html.replace('  <div id="site-shell"></div>', `  <div id="site-shell"></div>\n${main}\n  <div id="site-footer"></div>`);
  html = html.replace(/  <script src="content-data\.js"><\/script>\r?\n/g, "");
  fs.writeFileSync(htmlPath, html);
}

const generatedCount = requestedPageId ? 1 : pageDefinitions.length;
console.log(`Generated ${generatedCount} static HTML page${generatedCount === 1 ? "" : "s"} from content.txt.`);
