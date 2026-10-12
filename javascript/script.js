// Select DOM Elements using querySelector
const noteForm = document.querySelector('#note-form');
const noteInput = document.querySelector('#note-input');
const noteCategory = document.querySelector('#note-category');
const searchInput = document.querySelector('#search-input');
const notesList = document.querySelector('#notes-list');
const noteCount = document.querySelector('#note-count');
const errorMessage = document.querySelector('#error-message');

// Storage Key for localStorage
const STORAGE_KEY = 'quick_notes_data';

// Load initial notes array from localStorage or initialize empty array
let notes = loadNotes();

// Initial Render on Load
render();

// --- Event Listeners ---

// Form Submission Event
noteForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const text = noteInput.value.trim();
  const category = noteCategory.value;

  // Validation 1: Empty note check
  if (text === '') {
    errorMessage.textContent = 'Please type a note first.';
    return;
  }

  // Validation 2: Character limit check
  if (text.length > 200) {
    errorMessage.textContent = 'Notes must be 200 characters or fewer.';
    return;
  }

  // Clear error message when valid note is submitted
  errorMessage.textContent = '';

  // Create new note object
  const newNote = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: formatDateTime(new Date())
  };

  // Add object to array, save to localStorage, reset input, and re-render
  notes.unshift(newNote);
  saveNotes();
  noteInput.value = '';
  render();
});

// Real-time Search Input Event
searchInput.addEventListener('input', function () {
  render();
});

// --- Core Helper Functions ---

// Save array to localStorage using JSON.stringify
function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

// Load array from localStorage using JSON.parse
function loadNotes() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (!savedData) return [];
  try {
    return JSON.parse(savedData) || [];
  } catch (err) {
    console.error('Error parsing notes from localStorage:', err);
    return [];
  }
}

// Format Date object to a readable date string
function formatDateTime(date) {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return date.toLocaleDateString(undefined, options);
}

// Delete note by ID
function deleteNote(id) {
  notes = notes.filter(note => note.id !== id);
  saveNotes();
  render();
}

// Update the note count message according to notes count
function updateNoteCount(totalCount) {
  if (totalCount === 0) {
    noteCount.textContent = 'You have no notes yet.';
  } else if (totalCount === 1) {
    noteCount.textContent = 'You have 1 note.';
  } else {
    noteCount.textContent = `You have ${totalCount} notes.`;
  }
}

// Render function rebuilds list using createElement & textContent (never innerHTML for user text)
function render() {
  // Clear notes list
  notesList.textContent = '';

  // Update total note count display
  updateNoteCount(notes.length);

  // Filter notes based on search query (case-insensitive)
  const query = searchInput.value.trim().toLowerCase();
  const filteredNotes = notes.filter(note =>
    note.text.toLowerCase().includes(query)
  );

  // If there are no notes at all, stop early
  if (notes.length === 0) {
    return;
  }

  // If search query yields no results
  if (filteredNotes.length === 0) {
    const noResults = document.createElement('li');
    noResults.className = 'no-notes-msg';
    noResults.textContent = 'No notes match your search.';
    notesList.appendChild(noResults);
    return;
  }

  // Render each matching note item using createElement and textContent
  filteredNotes.forEach(note => {
    const li = document.createElement('li');
    li.className = `note-item category-${note.category.toLowerCase()}`;

    // Header with Category Badge
    const headerDiv = document.createElement('div');
    headerDiv.className = 'note-header';

    const categoryBadge = document.createElement('span');
    categoryBadge.className = 'category-badge';
    categoryBadge.textContent = note.category;
    headerDiv.appendChild(categoryBadge);

    // Note Text Body
    const textP = document.createElement('p');
    textP.className = 'note-text';
    textP.textContent = note.text;

    // Footer with Date & Delete Button
    const footerDiv = document.createElement('div');
    footerDiv.className = 'note-footer';

    const dateSpan = document.createElement('span');
    dateSpan.className = 'note-date';
    dateSpan.textContent = note.createdAt;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.type = 'button';
    deleteBtn.addEventListener('click', function () {
      deleteNote(note.id);
    });

    footerDiv.appendChild(dateSpan);
    footerDiv.appendChild(deleteBtn);

    // Assemble components into li element
    li.appendChild(headerDiv);
    li.appendChild(textP);
    li.appendChild(footerDiv);

    notesList.appendChild(li);
  });
}