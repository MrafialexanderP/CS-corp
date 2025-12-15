# Contact Form Setup Guide

## Features Implemented

✅ **Form Validation** - Button is disabled until all fields are filled with valid data
✅ **Email Notifications** - Users receive confirmation email when form is submitted
✅ **Admin Notifications** - Admin receives submission details
✅ **Loading State** - Button shows loading spinner and "Sending..." text during submission
✅ **Toast Notifications** - Success/error messages via Sonner toast

## Installation & Setup

### 1. Install Backend Dependencies

```bash
npm install express cors dotenv nodemailer
# or
yarn add express cors dotenv nodemailer
# or
bun add express cors dotenv nodemailer
```

### 2. Create Environment Variables

Copy `.env.example` to `.env` in your project root:

```bash
cp .env.example .env
```

Update `.env` with your email configuration:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
ADMIN_EMAIL=admin@cscorp.com
PORT=3001
```

### 3. Gmail Configuration (Recommended)

If using Gmail:

1. Enable 2-Factor Authentication on your Google Account
2. Generate an [App Password](https://myaccount.google.com/apppasswords)
3. Use the generated 16-character password in `EMAIL_PASSWORD`

### 4. Run the Backend Server

In a separate terminal:

```bash
node server.js
# or with bun
bun run server.js
```

The server should run on `http://localhost:3001`

### 5. Update CORS in server.js (if needed)

If your frontend runs on a different port, update the CORS configuration:

```javascript
app.use(cors({
  origin: 'http://localhost:5173', // Your Vite dev server
  credentials: true
}));
```

## How It Works

### Frontend (Contact.tsx)

1. Form validation checks:
   - All fields are filled (non-empty)
   - Email is valid format
   - Button is disabled if validation fails

2. On submit:
   - Shows loading state with spinner
   - Sends POST request to `/api/send-email`
   - Shows success/error toast notification
   - Clears form on success

### Backend (server.js)

1. Receives form data from frontend
2. Sends email to admin with submission details
3. Sends confirmation email to user
4. Returns success/error response

## Button States

- **Disabled State**: When form is incomplete
  - 60% opacity
  - Cursor shows "not-allowed"
  - No hover animations

- **Loading State**: During submission
  - Shows spinning loader icon
  - Text changes to "Sending..."
  - Button remains clickable but disabled

- **Normal State**: When form is valid
  - Full opacity
  - Hover animations work
  - Click animation works

## Customization

### Change Admin Email
Edit `server.js`:
```javascript
to: process.env.ADMIN_EMAIL || 'your-email@gmail.com',
```

### Use Different Email Service
Nodemailer supports many services. Update `server.js`:

```javascript
// For Outlook
const transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: { user, pass }
});

// For custom SMTP
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false,
  auth: { user, pass }
});
```

### Customize Email Templates
Edit the HTML templates in `server.js` email sending section.

## Deployment

### Frontend (Vite)
```bash
npm run build
npm run preview
```

### Backend
- Deploy `server.js` to a Node.js hosting service (Heroku, Railway, Render, etc.)
- Set environment variables in the hosting platform
- Update frontend API endpoint from `/api/send-email` to your deployed server URL

## Troubleshooting

**Problem**: "Failed to send email"
- Check `.env` file exists and has correct credentials
- Verify Gmail app password is correct
- Ensure 2FA is enabled on Gmail account

**Problem**: Button remains disabled
- Check browser console for validation errors
- Ensure all fields have valid values
- Check email format (must include @)

**Problem**: CORS errors
- Update origin in server.js CORS configuration
- Ensure server is running on correct port

**Problem**: Toast notifications not showing
- Verify `sonner` is installed
- Check if toast component is imported in Contact.tsx
- Ensure Toaster component is present in the page

## Files Modified/Created

- ✅ `src/pages/Contact.tsx` - Updated with form validation and email integration
- ✅ `src/components/AnimatedSubmitButton.tsx` - Updated with disabled/loading states
- ✅ `server.js` - NEW Backend API server
- ✅ `.env.example` - NEW Environment variables template
