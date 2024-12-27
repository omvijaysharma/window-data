// Function to copy the content of single.txt to the clipboard
async function copyFileContent() {
    try {
        // Fetch the content of single.txt
        const response = await fetch('single.txt');
        if (!response.ok) {
            throw new Error('File not found or cannot be accessed');
        }
        const text = await response.text();

        // Copy the content to the clipboard
        await navigator.clipboard.writeText(text);
        alert('File content copied to clipboard!');
    } catch (error) {
        console.error('Error copying file content:', error);
        alert('Failed to copy file content.');
    }
}

// Display all data with delete buttons
function displayData() {
    // LocalStorage
    const localStorageData = document.getElementById('localStorageData');
    localStorageData.innerHTML = '';
    Object.entries(localStorage).forEach(([key, value]) => {
        const li = document.createElement('li');
        li.textContent = `${key} : ${value}`;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => { removeLocalStorageItem(key); };
        li.appendChild(deleteBtn);
        localStorageData.appendChild(li);
    });

    // SessionStorage
    const sessionStorageData = document.getElementById('sessionStorageData');
    sessionStorageData.innerHTML = '';
    Object.entries(sessionStorage).forEach(([key, value]) => {
        const li = document.createElement('li');
        li.textContent = `${key} : ${value}`;
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete";
        deleteBtn.onclick = () => { removeSessionStorageItem(key); };
        li.appendChild(deleteBtn);
        sessionStorageData.appendChild(li);
    });

    // Cookies
    const cookiesData = document.getElementById('cookiesData');
    cookiesData.innerHTML = '';
    document.cookie.split("; ").forEach(cookie => {
        const [key, value] = cookie.split('=');
        if (key) {
            const li = document.createElement('li');
            li.textContent = `${decodeURIComponent(key)} : ${decodeURIComponent(value || '')}`;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = "Delete";
            deleteBtn.onclick = () => { removeCookie(key); };
            li.appendChild(deleteBtn);
            cookiesData.appendChild(li);
        }
    });
}

// Add LocalStorage
function addLocalStorage() {
    const key = document.getElementById('localKey').value;
    const value = document.getElementById('localValue').value;
    if (key && value) {
        localStorage.setItem(key, value);
        displayData();
        document.getElementById('localKey').value = '';
        document.getElementById('localValue').value = '';
    }
}

// Remove specific LocalStorage item
function removeLocalStorageItem(key) {
    localStorage.removeItem(key);
    displayData();
}

// Add SessionStorage
function addSessionStorage() {
    const key = document.getElementById('sessionKey').value;
    const value = document.getElementById('sessionValue').value;
    if (key && value) {
        sessionStorage.setItem(key, value);
        displayData();
        document.getElementById('sessionKey').value = '';
        document.getElementById('sessionValue').value = '';
    }
}

// Remove specific SessionStorage item
function removeSessionStorageItem(key) {
    sessionStorage.removeItem(key);
    displayData();
}

// Add Cookie
function addCookie() {
    const key = document.getElementById('cookieKey').value;
    const value = document.getElementById('cookieValue').value;
    if (key && value) {
        document.cookie = `${encodeURIComponent(key)}=${encodeURIComponent(value)}; path=/; max-age=3600`;
        displayData();
        document.getElementById('cookieKey').value = '';
        document.getElementById('cookieValue').value = '';
    }
}

// Remove specific Cookie
function removeCookie(key) {
    document.cookie = `${encodeURIComponent(key)}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    displayData();
}

// Initial Display
displayData();