const createQuoteForm = document.getElementById('create-quote-form');

createQuoteForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const author = document.getElementById('author').value;
  const text = document.getElementById('text').value;

  const response = await fetch('/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ author, text }),
  });

  if (response.ok) {
    const quote = await response.json();
    alert(`Quote '${quote.text}' by ${quote.author} was created!`);
  } else {
    alert('Failed to create quote!');
  }
});

const getUsersButton = document.getElementById('get-users');
getUsersButton.addEventListener('click', () => {
  fetch('/users')
    .then((response) => response.json())
    .then((users) => {
      // do something with the users data
      console.log(users);
    })
    .catch((error) => console.error(error));
});

const updateEmailButton = document.getElementById('update-email');
updateEmailButton.addEventListener('click', (event) => {
  event.preventDefault();
  const userId = document.getElementById('user-id').value;
  const newEmail = document.getElementById('new-email').value;
  fetch(`/user/${userId}`, {
    method: 'PUT',
    body: JSON.stringify({ email: newEmail }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // do something with the response data
      console.log(data);
    })
    .catch((error) => console.error(error));
});

const deleteUserButton = document.getElementById('delete-user');
deleteUserButton.addEventListener('click', (event) => {
  event.preventDefault();
  const userId = document.getElementById('user-id').value;
  fetch(`/user/${userId}`, {
    method: 'DELETE',
  })
    .then((response) => response.json())
    .then((data) => {
      // do something with the response data
      console.log(data);
    })
    .catch((error) => console.error(error));
});
