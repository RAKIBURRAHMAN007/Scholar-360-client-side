
# Project Name: Scholar 360 - A Scholarship Management System  

## Purpose:  
Scholar 360 is a comprehensive Scholarship Management System designed to simplify the process of searching, applying for, and managing scholarships. It provides an intuitive and secure platform for users, administrators, and moderators, ensuring a smooth experience for all stakeholders.  

## Live URL: https://scholar360.netlify.app/ 

---

## Website Features:  
- **Homepage Design:** Welcoming design with a search bar and featured scholarships.  
- **Scholarship Search:** Filter and search scholarships by criteria like eligibility, country, and price range.  
- **User Roles:**  
  - **User:** Search and apply for scholarships, view application status, and .  
  - **Admin:** Manage scholarships, users, and moderators, and oversee user roles and permissions,leave feedback.  
  - **Moderator:** Review scholarship applications, provide feedback, and moderate content.  
- **Scholarship Details Page:** Displays detailed information about scholarships, application process, and deadlines.  
- **Dashboard:**  
  - **User Dashboard:** Shows applied scholarships,manag  applied scholarships, application status, and history.  
  - **Admin Dashboard:** Tools to manage users, scholarships, reviews, and feedback.  
  - **Moderator Dashboard:** Tools to review and approve scholarship applications.  
- **Review System:** Users can leave reviews about scholarships.  
- **Responsive Design:** Fully responsive and optimized for all devices.  
- **Secure Data Management:** Firebase and MongoDB integration with secure user authentication.  
- **Authentication:** Email/password authentication and social login options.  
- **Payment Method:**  
  - Integrated **Stripe payment system** to facilitate secure transactions for scholarship application fees.  
  - Users can pay fees directly through the system while applying for scholarships.  
- **404 Page:** Custom page for invalid routes.  

---

## Packages Used:  

### Dependencies:  
- **React:** Core library for building the UI.  
- **React Router DOM:** For routing and navigation.  
- **@stripe/react-stripe-js & @stripe/stripe-js:** For payment integration.  
- **@tanstack/react-query:** For server state management.  
- **Axios:** To make HTTP requests.  
- **Firebase:** For authentication and backend services.  
- **Chart.js & react-chartjs-2:** For creating interactive charts and graphs.  
- **Lottie React:** For adding animations.  
- **React Slick & slick-carousel:** For carousel sliders.  
- **React Toastify:** For toast notifications.  
- **SweetAlert2:** For modals and alerts.  
- **Swiper:** For modern sliders.  
- **LocalForage:** For local storage management.  
- **React Icons:** For reusable icons.  
- **React Google Button:** For Google login buttons.  
- **Match Sorter & Sort By:** For sorting functionality.  
- **React Modal:** For managing modals.  
- **React Countup:** For animated number counters.  

### Dev Dependencies:  
- **Vite:** Development build tool for fast performance.  
- **Tailwind CSS:** Utility-first CSS framework for styling.  
- **DaisyUI:** Tailwind CSS component library.  
- **ESLint:** For linting and maintaining code quality.  
- **PostCSS & Autoprefixer:** For processing CSS styles.  
- **@vitejs/plugin-react:** For Vite and React integration.  

---

### How to Run Scholar 360 Locally  

1. **Clone the Repository:**  
   Clone the project repository to your local machine:  

   ```bash
   git clone <repository-url>
   ```  

2. **Navigate to the Project Directory:**  
   Change into the project folder:  

   ```bash
   cd scholar360-client
   ```  

3. **Install Dependencies:**  
   Install all the required dependencies:  

   ```bash
   npm install
   ```  

4. **Set Up Environment Variables:**  
   - Create a `.env` file in the root directory.  
   - Add your Firebase and MongoDB credentials:  

     ```bash
     REACT_APP_FIREBASE_API_KEY=<your-firebase-api-key>  
     REACT_APP_FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>  
     REACT_APP_FIREBASE_PROJECT_ID=<your-firebase-project-id>  
     REACT_APP_FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>  
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<your-firebase-messaging-sender-id>  
     REACT_APP_FIREBASE_APP_ID=<your-firebase-app-id>  
     REACT_APP_MONGODB_URI=<your-mongodb-uri>  
     REACT_APP_STRIPE_PUBLISHABLE_KEY=<your-stripe-publishable-key>
     ```  

5. **Start the Development Server:**  
   Run the following command to start the development server:  

   ```bash
   npm run dev
   ```  

   The app will be accessible at [http://localhost:5173](http://localhost:5173).  

---

### Additional Information:  
- **Database Setup:** Ensure MongoDB is properly configured and connected. For local development, make sure the MongoDB server is running.  
- **Authentication:** Confirm the Firebase authentication setup is complete for email/password and social logins.  
- **Environment Variables:** Keep sensitive data like API keys and database URIs secure.  
- **Stripe Payment Integration:** Make sure the Stripe publishable key is set in the `.env` file and the Stripe dashboard is properly configured for production or test mode.  
