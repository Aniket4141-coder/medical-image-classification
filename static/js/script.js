document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const themeToggle = document.getElementById("themeToggle");
    const imageInput = document.getElementById("imageInput");
    const imagePreview = document.getElementById("imagePreview");
    const previewEmpty = document.getElementById("previewEmpty");
    const fileName = document.getElementById("fileName");
    const dropZone = document.getElementById("dropZone");
    const uploadForm = document.getElementById("uploadForm");
    const loadingOverlay = document.getElementById("loadingOverlay");
    const animatedConfidence = document.getElementById("animatedConfidence");
    let loaderTimer = null;

    const hideLoader = () => {
        if (loaderTimer) {
            clearTimeout(loaderTimer);
            loaderTimer = null;
        }
        if (loadingOverlay) {
            loadingOverlay.hidden = true;
        }
    };

    const storedTheme = localStorage.getItem("brain-tumor-theme");
    if (storedTheme) {
        body.setAttribute("data-theme", storedTheme);
    }

    themeToggle?.addEventListener("click", () => {
        const nextTheme = body.getAttribute("data-theme") === "light" ? "dark" : "light";
        if (nextTheme === "dark") {
            body.removeAttribute("data-theme");
        } else {
            body.setAttribute("data-theme", "light");
        }
        localStorage.setItem("brain-tumor-theme", nextTheme);
    });

    const showPreview = (file) => {
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            imagePreview.src = event.target.result;
            imagePreview.hidden = false;
            previewEmpty.hidden = true;
        };
        reader.readAsDataURL(file);
    };

    imageInput?.addEventListener("change", () => {
        const file = imageInput.files && imageInput.files[0];
        if (file) {
            fileName.textContent = file.name;
            showPreview(file);
        } else {
            fileName.textContent = "No file selected";
            imagePreview.hidden = true;
            previewEmpty.hidden = false;
        }
    });

    ["dragenter", "dragover"].forEach((eventName) => {
        dropZone?.addEventListener(eventName, (event) => {
            event.preventDefault();
            event.stopPropagation();
            dropZone.classList.add("dragover");
        });
    });

    ["dragleave", "drop"].forEach((eventName) => {
        dropZone?.addEventListener(eventName, (event) => {
            event.preventDefault();
            event.stopPropagation();
            dropZone.classList.remove("dragover");
        });
    });

    dropZone?.addEventListener("drop", (event) => {
        const files = event.dataTransfer?.files;
        if (files && files.length > 0) {
            imageInput.files = files;
            imageInput.dispatchEvent(new Event("change", { bubbles: true }));
        }
    });

    window.addEventListener("pageshow", hideLoader);
    hideLoader();

    if (animatedConfidence) {
        const target = Number(animatedConfidence.dataset.target || "0");
        let start = 0;
        const duration = 1400;
        const startTime = performance.now();

        const animate = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const value = Math.round(start + (target - start) * progress);
            animatedConfidence.textContent = `${value}%`;
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    document.querySelectorAll(".glass-card, .stat-card, .history-item, .workflow-steps div, .feature-list article").forEach((el, index) => {
        el.classList.add("reveal");
        el.style.animationDelay = `${Math.min(index * 0.05, 0.45)}s`; 
    });
});
