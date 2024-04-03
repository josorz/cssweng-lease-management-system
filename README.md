# Lease Management System
Major Course Output in CSSWENG
## Group
CSSWENG S11 Group 6
- John Zechariah Kho (QA)
- Mezen Lababidi (PO)
- Martin Jose Lada (QA)
- Kenneth Louis Mangulabnan (Designer)
- Jose Lorenzo Santos (SM)
- John Angelo Soriano (Dev)

## Setup

1. **Set Up MongoDB Atlas:**
   - Sign up for MongoDB Atlas and create a cluster.
   - Or, install MongoDB on a local machine.
2. **Add Configuration Files:**

   - Create an `.env` file in the backend folder.
   - Add the following content to the `.env` file:
     ```
     ATLAS_URI=<CLUSTER_URI>
     ```
   - Then, still in the backend directory, create an `uploads` folder.

3. **Install Dependencies:**

   - Run `npm install` to both the root and `backend` folders.

4. **Run the Application:**
   ```
   npm run dev
   ```
