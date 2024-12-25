// Function to display storage data
function displayStorage() {
    const localStorageData = document.getElementById("localStorageData");
    const sessionStorageData = document.getElementById("sessionStorageData");

    // Clear existing data
    localStorageData.innerHTML = "";
    sessionStorageData.innerHTML = "";

    // Display Local Storage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        const item = document.createElement("div");
        item.className = "storage-item";
        item.innerHTML = `<span><strong>${key}:</strong> ${value}</span>
            <button onclick="removeItem('local', '${key}')">Remove</button>`;
        localStorageData.appendChild(item);
    }

    // Display Session Storage
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        const value = sessionStorage.getItem(key);
        const item = document.createElement("div");
        item.className = "storage-item";
        item.innerHTML = `<span><strong>${key}:</strong> ${value}</span>
            <button onclick="removeItem('session', '${key}')">Remove</button>`;
        sessionStorageData.appendChild(item);
    }
}

// Function to remove item from storage
function removeItem(type, key) {
    if (type === "local") {
        localStorage.removeItem(key);
    } else if (type === "session") {
        sessionStorage.removeItem(key);
    }
    displayStorage();
}

// Function to save data to storage
function saveToStorage(type) {
    const key = document.getElementById("storageKey").value;
    const value = document.getElementById("storageValue").value;

    if (!key || !value) {
        alert("Please enter both key and value.");
        return;
    }

    if (type === "local") {
        localStorage.setItem(key, value);
    } else if (type === "session") {
        sessionStorage.setItem(key, value);
    }

    document.getElementById("storageKey").value = "";
    document.getElementById("storageValue").value = "";
    displayStorage();
}

// Add event listeners for save buttons
document.getElementById("saveLocal").addEventListener("click", () => saveToStorage("local"));
document.getElementById("saveSession").addEventListener("click", () => saveToStorage("session"));

// On window load, display storage data
window.onload = displayStorage;

// Function to copy content of single.txt to clipboard
document.getElementById("copyButton").addEventListener("click", async function() {
    try {
        // Fetching the content of single.txt file
        const response = await fetch("single.txt");
        if (!response.ok) throw new Error("File not found");
        const text = await response.text();

        // Copying text to clipboard
        await navigator.clipboard.writeText(text);
        alert("Content copied to clipboard!");
    } catch (error) {
        console.error("Error copying content:", error);
        alert("Failed to copy content. Please check console for details.");
    }
});