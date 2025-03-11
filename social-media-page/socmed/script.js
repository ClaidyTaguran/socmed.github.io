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

document.addEventListener('DOMContentLoaded', function () {
  if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
      document.querySelectorAll('.toggle-dark-mode').forEach(btn => {
          btn.classList.add('btn-dark');
          btn.classList.remove('btn-light');
      });
      document.querySelectorAll('.card').forEach(card => {
          card.classList.add('card-dark');
      });
  }
});

document.getElementById('themeToggle').addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');
  document.querySelectorAll('.toggle-dark-mode').forEach(btn => {
      btn.classList.toggle('btn-dark');
      btn.classList.toggle('btn-light');
  });
  document.querySelectorAll('.card').forEach(card => {
      card.classList.toggle('card-dark');
  });
  
  if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('darkMode', 'enabled');
  } else {
      localStorage.setItem('darkMode', 'disabled');
  }
});
 
