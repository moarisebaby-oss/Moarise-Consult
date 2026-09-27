const WHATSAPP_NUMBER = "2349038132148";

// IMPORTANT:
// Replace this URL with your deployed Google Apps Script Web App endpoint.
// Do not put Google credentials, service-account keys, API secrets, or database
// passwords in this file.
const GOOGLE_SHEETS_ENDPOINT = "PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE";

const programmes = {
  ai: {
    title:"AI EDUCATION", subtitle:"From AI Beginner to Confident AI User",
    description:"This programme introduces learners to artificial intelligence from beginner level and gradually develops their practical ability to use AI tools.",
    levels:[
      ["Level 1 — AI Foundations",["Introduction to Artificial Intelligence","Understanding Generative AI","Understanding AI tools","AI literacy","Responsible use of AI"]],
      ["Level 2 — Prompting",["What prompting means","How AI interprets instructions","Basic and structured prompts","Role prompting and context","Requirements and output formatting","Improving weak prompts","Practical prompt engineering"]],
      ["Level 3 — AI Image Generation",["Text-to-image generation","Professional portraits","Marketing and educational graphics","Social media graphics","Product images","Creative concepts","Character, 2D and 3D visual generation"]],
      ["Level 4 — AI Video Generation",["AI video concepts","Text-to-video","Image-to-video","Promotional and educational videos","Social media videos","Storytelling with AI"]],
      ["Level 5 — Practical AI Tools",["QR code generation","Temporary email as a productivity/security concept","WhatsApp link generation","AI-assisted content creation","AI research and productivity","AI for education and business"]]
    ],
    benefits:["Save time","Create content faster","Improve productivity","Generate professional visuals","Create videos","Conduct research","Improve learning","Support business activities","Develop modern digital skills"],
    projects:["Prompt-building exercises","AI image projects","Short AI video project","AI-assisted research task","Digital productivity workflow"],
    cta:"Register for AI Education"
  },
  automation: {
    title:"AUTOMATION", subtitle:"Turn Repetitive Work Into Automated Systems",
    description:"Learn how to move from beginner-level automation concepts to building practical automated workflows.",
    levels:[
      ["Beginner Level",["What automation means","Identifying repetitive tasks","Triggers and actions","Understanding workflows","Basic data movement","Forms and databases","Notifications"]],
      ["Intermediate Level",["n8n","Make","Zapier","Botpress","Airtable","Google Sheets"]],
      ["Advanced Level",["Customer response automation","Lead capture","Registration automation","Email notifications","WhatsApp workflow concepts","Data collection","AI-powered customer support","Chatbots","Business workflow automation"]]
    ],
    workflow:"CUSTOMER → FORM/CHAT → DATABASE → AUTOMATION → AI/RESPONSE → FOLLOW-UP",
    benefits:["Reduce repetitive work","Improve response speed","Reduce human error","Organize customer information","Improve customer experience","Save time","Help businesses scale"],
    projects:["Lead capture workflow","Registration workflow","Customer response flow","AI/customer-support concept"],
    cta:"Start Learning Automation"
  },
  web: {
    title:"WEB DESIGN", subtitle:"Build Modern Websites Without Traditional Coding",
    description:"Learn how to use AI-assisted and no-code tools to create professional websites.",
    levels:[
      ["Beginner",["Understanding websites","Domains and hosting","Website structure","Pages and navigation","Sections and forms","Responsive design"]],
      ["Intermediate",["Using AI to plan websites","Writing website copy with AI","Creating layouts and landing pages","Business and portfolio websites","Contact forms","WhatsApp buttons"]],
      ["Advanced",["AI-assisted website development","Improving UX","Responsive design","Website optimization","Connecting forms to databases","Connecting automation systems","Conversion-focused landing pages"]]
    ],
    benefits:["Understand website structure","Plan sites with AI","Build responsive pages","Create business websites","Connect forms and WhatsApp","Connect automation systems"],
    projects:["Landing page","Business website","Portfolio website","AI-assisted website plan"],
    cta:"Learn AI-Powered Web Design"
  },
  digital: {
    title:"DIGITAL TRAINING SKILLS", subtitle:"Practical Digital Skills For An AI-Driven World",
    description:"This programme introduces learners to essential digital tools and practical skills needed to function effectively in today's rapidly changing technological environment.",
    levels:[
      ["Foundation",["Digital literacy","Online research","Cloud tools","Google Workspace","Digital communication"]],
      ["Practical Skills",["Productivity tools","Online collaboration","AI productivity","Digital content creation","Basic graphics","Digital organization"]],
      ["Workplace Readiness",["Online safety","Practical workplace technology","Using AI to improve everyday tasks","Building confidence with modern digital tools"]]
    ],
    benefits:["Work more efficiently","Research online better","Collaborate digitally","Use AI for everyday tasks","Organize digital work","Build modern workplace skills"],
    projects:["Google Workspace task","AI productivity task","Digital research task","Content creation exercise"],
    cta:"Develop Your Digital Skills"
  }
};

const content = document.getElementById("programmeContent");
const tabs = document.querySelectorAll(".programme-tab");

function renderProgramme(key){
  const p = programmes[key];
  let levels = p.levels.map(level => `<div><h4>${level[0]}</h4><ul>${level[1].map(x=>`<li>${x}</li>`).join("")}</ul></div>`).join("");
  let benefits = p.benefits.map(x=>`<div class="benefit">${x}</div>`).join("");
  let projects = p.projects.map(x=>`<li>${x}</li>`).join("");
  content.innerHTML = `
    <p class="eyebrow">${p.title}</p><h3>${p.subtitle}</h3><p>${p.description}</p>
    ${p.workflow ? `<div class="workflow" aria-label="Automation workflow">${p.workflow}</div>` : ""}
    ${levels}
    <h4>What Learners Stand To Gain</h4><div class="benefit-grid">${benefits}</div>
    <h4>Practical Projects</h4><ul>${projects}</ul>
    <div style="margin-top:28px"><a class="btn btn-red" href="#contact" data-programme-cta="${key}">${p.cta}</a></div>
  `;
}
renderProgramme("ai");

tabs.forEach(tab=>{
  tab.addEventListener("click",()=>{
    tabs.forEach(t=>{t.classList.remove("active");t.setAttribute("aria-selected","false")});
    tab.classList.add("active");tab.setAttribute("aria-selected","true");
    renderProgramme(tab.dataset.programme);
  });
});

document.addEventListener("click",e=>{
  const cta=e.target.closest("[data-programme-cta]");
  if(cta){
    const key=cta.dataset.programmeCta;
    const select=document.querySelector('[name="programme"]');
    select.value=({ai:"AI Education",automation:"Automation",web:"Web Design",digital:"Digital Training Skills"})[key];
  }
});

const menuToggle=document.getElementById("menuToggle");
const nav=document.getElementById("mainNav");
menuToggle.addEventListener("click",()=>{
  const open=nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded",open);
});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

const form=document.getElementById("leadForm");
const status=document.getElementById("formStatus");

form.addEventListener("submit", async (event)=>{
  event.preventDefault();
  status.textContent="";
  const data=Object.fromEntries(new FormData(form).entries());
  if(!data.fullName.trim() || !data.email.trim() || !data.phone.trim() || !data.programme){
    status.textContent="Please complete all required fields.";
    status.style.color="#8B1E2D"; return;
  }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)){
    status.textContent="Please enter a valid email address.";
    status.style.color="#8B1E2D"; return;
  }

  const source=window.location.href;
  const payload={...data,source,status:"New Lead",date:new Date().toISOString()};

  try{
    if(GOOGLE_SHEETS_ENDPOINT.startsWith("http")){
      status.textContent="Saving your enquiry...";
      await fetch(GOOGLE_SHEETS_ENDPOINT,{
        method:"POST",
        mode:"no-cors",
        headers:{"Content-Type":"text/plain;charset=utf-8"},
        body:JSON.stringify(payload)
      });
    } else {
      console.warn("Google Sheets endpoint has not been configured.");
    }

    const message=`Hello Moarise Consult, I am ${data.fullName}. I am interested in your training programmes, specifically ${data.programme}. ${data.message ? "My message: "+data.message : ""}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,"_blank","noopener");
    status.textContent="Your enquiry has been submitted. WhatsApp is opening now.";
    status.style.color="#1b6b3a";
    form.reset();
  }catch(error){
    console.error(error);
    status.textContent="We could not save the enquiry automatically. Please use WhatsApp directly.";
    status.style.color="#8B1E2D";
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Moarise Consult, I am interested in your training programmes. I would like more information.")}`,"_blank","noopener");
  }
});