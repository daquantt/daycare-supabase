## Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (version 14.x or later).
- **NPM**: Node Package Manager, which comes with Node.js.
- **Supabase Account**: You will need a Supabase account to create a new project.

### Installation

1. **Clone the Repository**

   ```
   git clone https://github.com/daquantt/daycare-supabase
   cd daycare-supabase
   ```
2. **Install Dependencies**
    ```
    npm install
    ```
3. **Set Up Supabase**
   If you don't have Supabase set up yet, follow these steps:
    Go to the [Supabase website](https://supabase.com/) and sign up for an account.
    Create a new project.
    Once your project is created, you will receive a SUPABASE_URL and SUPABASE_KEY.
4. **Create a .env File**
   ```
    VITE_APP_SUPABASE_URL=your_supabase_url
    VITE_APP_SUPABASE_KEY=your_supabase_key
   ```
   Replace your_supabase_url and your_supabase_key with the values provided by Supabase.
5. Run the Development Server
    ```
    npm run dev
    ```
