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
  const mainContent = document.querySelector(".container-fluid.p-4");
  const sidebar = document.querySelector("#sidebar");
  const topBar = document.querySelector(".top-bar");

  if (hamBurger && mainContent && sidebar && topBar) {
    hamBurger.addEventListener("click", function () {
      sidebar.classList.toggle("expand");
      mainContent.style.transition = "margin-left 0.35s ease-in-out";
      topBar.style.transition = "left 0.35s ease-in-out";

      if (sidebar.classList.contains("expand")) {
        mainContent.style.marginLeft = "260px";
        topBar.style.left = "260px"; // Adjust for expanded sidebar
      } else {
        mainContent.style.marginLeft = "100px";
        topBar.style.left = "100px"; // Adjust for collapsed sidebar
      }

      localStorage.setItem("sidebarExpanded", sidebar.classList.contains("expand"));
    });

    // Responsive behavior: Collapse sidebar on smaller screens
    function adjustForScreenSize() {
      if (window.innerWidth <= 991) {
        sidebar.style.position = "fixed";
        sidebar.style.top = "60px"; // Align below top bar
        sidebar.style.width = "100%";
        sidebar.style.left = "0";
        topBar.style.left = "0";
        mainContent.style.marginTop = "0px"; // Avoid overlap
        mainContent.style.marginLeft = "0";
      } else {
        sidebar.style.position = "fixed";
        sidebar.style.top = "0";
        sidebar.style.width = sidebar.classList.contains("expand") ? "260px" : "100px";
        topBar.style.left = sidebar.classList.contains("expand") ? "260px" : "100px";
        mainContent.style.marginTop = "80px";
        mainContent.style.marginLeft = sidebar.classList.contains("expand") ? "260px" : "100px";
      }
    }

    window.addEventListener("resize", adjustForScreenSize);
    adjustForScreenSize(); // Run on page load
  } else {
    console.error("Sidebar, main content, or top bar not found.");
  }
}

document.addEventListener("DOMContentLoaded", loadSidebar);
document.addEventListener("DOMContentLoaded", initializeSidebar);
