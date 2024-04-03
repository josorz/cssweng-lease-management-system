# Lease Management System

Manage contracts, dues, and property maintenance of leased properties.

## Contributors

- John Zechariah Kho (QA)
- Mezen Lababidi (PO)
- Martin Jose Lada (QA)
- Kenneth Louis Mangulabnan (Designer)
- Jose Lorenzo Santos (SM)
- John Angelo Soriano (Dev)

## Setup

1. **Set Up MongoDB Atlas:**
   - Sign up for MongoDB Atlas and create a cluster.
   - Optionally, install MongoDB on a local machine.
2. **Configure Environment Variables:**

   - Create an `.env` file in the backend folder.
   - Add the following content to the `.env` file:
     ```
     ATLAS_URI=<CLUSTER_URI>
     ```

3. **Install Dependencies:**

   - Run `npm install` to both the root and `backend` folders.

4. **Run the Application:**
   ```
   npm run dev
   ```
