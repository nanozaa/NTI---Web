const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const PORT = 3000;
const booksFile = path.join(__dirname, 'books.json');
const maxBodySize = 1024 * 1024;

function sendJson(response, statusCode, payload) {
  response.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  response.end(JSON.stringify(payload));
}

async function readBooks() {
  const fileContents = await fs.readFile(booksFile, 'utf8');
  const books = JSON.parse(fileContents);

  if (!Array.isArray(books)) {
    throw new Error('Books data must be an array');
  }

  return books;
}

async function saveBooks(books) {
  await fs.writeFile(booksFile, `${JSON.stringify(books, null, 2)}\n`, 'utf8');
}

function getRequestBody(request) {
  return new Promise((resolve, reject) => {
    let body = '';

    request.setEncoding('utf8');
    request.on('data', (chunk) => {
      body += chunk;

      if (Buffer.byteLength(body, 'utf8') > maxBodySize) {
        reject(new Error('Request body is too large'));
        request.destroy();
      }
    });
    request.on('end', () => resolve(body));
    request.on('error', reject);
  });
}

function validateBookInput(book) {
  return book &&
    typeof book === 'object' &&
    typeof book.title === 'string' && book.title.trim() &&
    typeof book.author === 'string' && book.author.trim() &&
    typeof book.price === 'number' && Number.isFinite(book.price) && book.price >= 0 &&
    typeof book.available === 'boolean';
}

async function handleRequest(request, response) {
  const requestUrl = new URL(request.url, `http://${request.headers.host || 'localhost'}`);
  const pathname = requestUrl.pathname;

  try {
    if (request.method === 'GET' && pathname === '/books') {
      const books = await readBooks();
      return sendJson(response, 200, books);
    }

    if (request.method === 'POST' && pathname === '/books') {
      let body;

      try {
        body = JSON.parse(await getRequestBody(request));
      } catch (error) {
        const message = error.message === 'Request body is too large'
          ? error.message
          : 'Request body must contain valid JSON';
        return sendJson(response, error.message === 'Request body is too large' ? 413 : 400, { error: message });
      }

      if (!validateBookInput(body)) {
        return sendJson(response, 400, {
          error: 'Book must include a title, author, non-negative numeric price, and boolean available value'
        });
      }

      const books = await readBooks();
      const nextId = books.reduce((highestId, book) => Math.max(highestId, Number(book.id) || 0), 0) + 1;
      const newBook = {
        id: nextId,
        title: body.title.trim(),
        author: body.author.trim(),
        price: body.price,
        available: body.available
      };

      books.push(newBook);
      await saveBooks(books);
      return sendJson(response, 201, newBook);
    }

    const deleteMatch = pathname.match(/^\/books\/(\d+)$/);
    if (request.method === 'DELETE' && deleteMatch) {
      const bookId = Number(deleteMatch[1]);
      const books = await readBooks();
      const bookIndex = books.findIndex((book) => book.id === bookId);

      if (bookIndex === -1) {
        return sendJson(response, 404, { error: 'Book not found' });
      }

      const [deletedBook] = books.splice(bookIndex, 1);
      await saveBooks(books);
      return sendJson(response, 200, deletedBook);
    }

    return sendJson(response, 404, { error: 'Route not found' });
  } catch (error) {
    console.error(error);
    return sendJson(response, 500, { error: 'Unable to process the request' });
  }
}

const server = http.createServer(handleRequest);

server.on('clientError', (error, socket) => {
  console.error(error);
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(PORT, () => {
  console.log(`Library API listening on http://localhost:${PORT}`);
});
