document.addEventListener('DOMContentLoaded', loadEntries);


function getEntries() {
  const storedEntries = localStorage.getItem('diaryEntries');
  return storedEntries ? JSON.parse(storedEntries) : [];
}


document.addEventListener('DOMContentLoaded', loadEntries);

function saveEntry() {
  const entryText = document.getElementById('diary-entry').value;

  if (entryText.trim() !== '') {
    const timestamp = new Date().toLocaleString();
    const entry = { timestamp, text: entryText };

    let entries = getEntries();
    entries.push(entry);
    localStorage.setItem('diaryEntries', JSON.stringify(entries));

    document.getElementById('diary-entry').value = '';
    loadEntries();
  }
}

function loadEntries() {
  const entriesContainer = document.getElementById('entries-container');
  entriesContainer.innerHTML = '';

  const entries = getEntries();

  entries.forEach((entry, index) => {
    const truncatedText = entry.text.length > 10 ? entry.text.substring(0, 10) + '...' : entry.text;
    const entryElement = document.createElement('div');
    entryElement.classList.add('entry');
    entryElement.innerHTML = `<strong>${entry.timestamp}:</strong><br>${truncatedText}
      <span class="edit-button" onclick="openModal(${index})">&#9998; Edit</span>
      <span class="delete-button" onclick="deleteEntry(${index})">&#128465; Delete</span>`;
      entryElement.addEventListener('click', () => openReadModal(entry.text));
    entriesContainer.appendChild(entryElement);
  });
}

function openModal(index) {
  const modal = document.getElementById('myModal');
  modal.style.display = 'block';
  const editEntryText = document.getElementById('edit-entry-text');
  const entries = getEntries();
  editEntryText.value = entries[index].text;
  editEntryText.setAttribute('data-index', index);
}

function openReadModal(text) {
  const readModal = document.getElementById('readModal');
  const readText = document.getElementById('read-text');
  readText.innerHTML = text;
  readModal.style.display = 'block';
}

function closeModal() {
  document.getElementById('myModal').style.display = 'none';
}

function closeReadModal() {
  document.getElementById('readModal').style.display = 'none';
}

function updateEntry() {
  const editEntryText = document.getElementById('edit-entry-text');
  const index = editEntryText.getAttribute('data-index');
  const entries = getEntries();
  entries[index].text = editEntryText.value;
  localStorage.setItem('diaryEntries', JSON.stringify(entries));
  closeModal();
  loadEntries();
}

function deleteEntry(index) {
  const entries = getEntries();
  entries.splice(index, 1);
  localStorage.setItem('diaryEntries', JSON.stringify(entries));
  loadEntries();
}
