## KeDa Tech Associate Backend Test

### Installation

1. Clone this repo

2. Install dependencies for client

   ```shell
   npm install
   ```

3. Install dependencies for server

   ```shell
   cd server
   npm install
   ```

4. Migrate database (in **server** directory)

   ```shell
   knex migrate:up --knexfile ./configs/db.config.js
   ```

5. Copy .env.example to .env and replace the values with your database configuration (in **server** directory)

   ```shell
   cp .env.example .env
   ```

6. Run tests (in **server** directory)

   ```shell
   npm run test
   ```

7. Run the server
   ```shell
   npm run dev
   ```

8. Run the client
    ```
    cd ..
    npm run dev
    ```

### Screenshots
1. Halaman Input
![Halaman Input](/halaman-input.png)

2. Halaman List
![Halaman List](/halaman-list.png)

