import { branchGroups, stateGroups } from './data.js';

const branchSection = document.getElementById("branch-section");
const stateSection = document.getElementById("state-section");

function createCopyButton(link) {
  const btn = document.createElement("button");
  btn.className = "copy-button";
  btn.textContent = "Copy Link";
  btn.onclick = () => {
    navigator.clipboard.writeText(link).then(() => {
      btn.textContent = "Copied!";
      setTimeout(() => btn.textContent = "Copy Link", 1500);
    });
  };
  return btn;
}

function loadBranchGroups() {
  if (branchSection.childElementCount > 0) return; // Load only once
  branchGroups.forEach(group => {
    const div = document.createElement("div");
    div.className = "group";
    const contacts = group.contacts.map(c => `${c}<br>`).join('');
    const a = document.createElement("a");
    a.href = group.link;
    a.className = "group-link";
    a.innerText = "Join Group";
    const p = document.createElement("p");
    p.appendChild(document.createTextNode("Group: "));
    p.appendChild(a);
    p.appendChild(createCopyButton(group.link));
    div.innerHTML = `<h2>${group.name}</h2><p class="contact">Contact:<br>${contacts}</p>`;
    div.appendChild(p);
    branchSection.appendChild(div);
  });
}

function loadStateGroups() {
  if (stateSection.childElementCount > 0) return;
  stateGroups.forEach(state => {
    const div = document.createElement("div");
    div.className = "group";
    const a = document.createElement("a");
    a.href = state.link;
    a.className = "group-link";
    a.innerText = "Join Group";
    const p = document.createElement("p");
    p.appendChild(document.createTextNode("Group: "));
    p.appendChild(a);
    p.appendChild(createCopyButton(state.link));
    div.innerHTML = `<h2>${state.name}</h2>`;
    div.appendChild(p);
    stateSection.appendChild(div);
  });
}

// Tab switching logic
const navLinks = document.querySelectorAll(".nav-link");
const tabContents = document.querySelectorAll(".tab-content");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    // Update active nav
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    // Show relevant tab
    const selected = link.dataset.tab;
    tabContents.forEach(section => {
      section.classList.toggle("active", section.id === selected);
    });

    // Load data if needed
    if (selected === "branch") loadBranchGroups();
    if (selected === "state") loadStateGroups();
  });
});
