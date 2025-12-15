# Contact Form - Quick Start Guide

## ✅ What's Been Implemented

### 1. **Form Validation**
- ✅ Button disabled until all fields are filled
- ✅ Email format validation
- ✅ Empty field checks
- ✅ Real-time validation feedback

### 2. **Loading States**
- ✅ Loading spinner during submission
- ✅ "Sending..." text changes
- ✅ Button disabled during submission
- ✅ Prevents double-submission

### 3. **Toast Notifications** (Success/Error)
- ✅ Success message when form submitted
- ✅ Error messages for validation failures
- ✅ Toast position: top-right corner
- ✅ Automatic dismissal after 5 seconds

### 4. **Email System**
- ✅ Backend API (Node.js/Express)
- ✅ Send notification to admin
- ✅ Send confirmation email to user
- ✅ Email templates with styling

### 5. **Animated Submit Button**
- ✅ Flying arrow animation on hover
- ✅ Loading spinner shows during submission
- ✅ Disabled state styling (60% opacity)
- ✅ Click animation hides text

---

## 🚀 Getting Started

### Step 1: Install Backend Dependencies

```bash
npm install express cors dotenv nodemailer
```

### Step 2: Create .env File

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Then edit `.env` with your email settings:

```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-specific-password
ADMIN_EMAIL=admin@yourcompany.com
PORT=3001
```

### Step 3: Configure Gmail (if using Gmail)

1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable 2-Step Verification
3. Generate [App Password](https://myaccount.google.com/apppasswords)
4. Copy the 16-character password to `.env`

### Step 4: Run the Backend Server

Open a new terminal and run:

```bash
node server.js
```

You should see: `Server is running on port 3001`

### Step 5: Run the Frontend

In another terminal:

```bash
npm run dev
# or
bun run dev
```

Visit `http://localhost:5173/contact` and test the form!

---

## 📋 Form Validation Rules

The button is **disabled** until:

✓ Full Name: Not empty  
✓ Email: Valid email format (contains @)  
✓ Phone: Not empty  
✓ Message: Not empty  

Once all fields are filled, the button **enables** and shows hover animations.

---

## 🔔 Toast Notifications

### Success Message
- Shows when email is sent successfully
- Text: "✅ Message sent successfully! We will get back to you soon."
- Form automatically clears

### Error Messages
- Shows if form validation fails
- Shows if email sending fails
- Shows if server connection fails
- Allows user to try again

---

## 🎨 Button States

| State | Appearance | Behavior |
|-------|------------|----------|
| Disabled | 60% opacity, grayed out | Click has no effect |
| Normal | Full brightness, hover animations | Hover shows arrow animation |
| Loading | Spinner icon, "Sending..." text | Submission in progress |
| Hover | Arrow rotates 45°, scales up | Text fades away |
| Click | Scale down (0.95) | Text completely hidden |

---

## 📧 Email Templates

### Admin Email Receives:
- Full name
- Email address
- Phone number
- Message content
- Formatted HTML layout

### User Email Receives:
- Confirmation message
- Thank you note
- Assurance that you'll respond soon

---

## 🔧 File Structure

```
src/
├── pages/
│   └── Contact.tsx          (Updated with validation & notifications)
├── components/
│   └── AnimatedSubmitButton.tsx (Updated with loading state)
└── lib/
    └── email.ts             (NEW - Email utilities & validation)

server.js                     (NEW - Backend API server)
.env.example                  (NEW - Environment variables template)
CONTACT_FORM_SETUP.md         (NEW - Detailed setup guide)
```

---

## 🚨 Troubleshooting

### Problem: Button stays disabled
**Solution:** Check that all fields have values and email is in correct format

### Problem: Toast notifications don't show
**Solution:** Ensure `Toaster` component is imported in Contact.tsx (already done!)

### Problem: "Failed to send email"
**Solution:** Check that server.js is running on port 3001

### Problem: CORS errors in console
**Solution:** Update the API_URL in `src/lib/email.ts` to match your backend URL

### Problem: Gmail authentication fails
**Solution:** 
- Ensure 2FA is enabled
- Use app-specific password (not regular password)
- Check EMAIL_PASSWORD in .env is correct

---

## 📱 Responsive Design

The form works perfectly on:
- ✅ Mobile phones (single column)
- ✅ Tablets (single/dual column)
- ✅ Desktops (two-column layout with info left, form right)

---

## 🎯 Next Steps (Optional)

1. **Add more fields**: Name, Company, etc.
2. **File uploads**: Allow users to attach files
3. **Spam protection**: Add reCAPTCHA
4. **Database**: Store submissions in database
5. **Admin dashboard**: View all submissions
6. **Auto-responder**: Different emails based on inquiry type

---

## 📞 Support

For questions or issues:
1. Check the error message in the toast notification
2. Check browser console for JavaScript errors
3. Check server terminal for backend errors
4. Review CONTACT_FORM_SETUP.md for detailed instructions

---

**Status**: ✅ Ready to use!

Test the form now and enjoy smooth, validated submissions with beautiful animations.
