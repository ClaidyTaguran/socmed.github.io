function loadSidebar() {
  fetch('../sidebar/sidebar.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('sidebar-container').innerHTML = data;
      initializeSidebar();
    })
    .catch(error => console.error('Error loading sidebar:', error));
}

function initializeSidebar() {
  const hamBurger = document.querySelector(".toggle-btn");
  const mainContent = document.querySelector(".container-fluid.p-4"); // Ensure this matches your main content
  const sidebar = document.querySelector("#sidebar");
  const topBar = document.querySelector(".top-bar"); // Add reference to the top-bar

  if (hamBurger && mainContent && sidebar && topBar) {
    hamBurger.addEventListener("click", function () {
      sidebar.classList.toggle("expand");
      mainContent.style.transition = "margin-left 0.35s ease-in-out"; // Smooth transition
      topBar.style.transition = "left 0.35s ease-in-out"; // Smooth transition for top-bar
      if (sidebar.classList.contains("expand")) {
        mainContent.style.marginLeft = "260px";
        topBar.style.left = "260px"; // Adjust top-bar position
      } else {
        mainContent.style.marginLeft = "100px";
        topBar.style.left = "100px"; // Adjust top-bar position
      }
      localStorage.setItem("sidebarExpanded", sidebar.classList.contains("expand"));
    });

    // Set initial state from localStorage
    const expanded = localStorage.getItem("sidebarExpanded") === "true";
    if (expanded) {
      sidebar.classList.add("expand");
      mainContent.style.marginLeft = "260px";
      topBar.style.left = "260px";
    } else {
      mainContent.style.marginLeft = "100px";
      topBar.style.left = "100px";
    }
  } else {
    console.error("Sidebar, main content, or top bar not found.");
  }
}

document.addEventListener("DOMContentLoaded", loadSidebar);
