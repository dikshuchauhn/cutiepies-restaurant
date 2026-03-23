# cutiepies~ Restaurant Website

## Current State
A Bella Vista restaurant app exists with: Home, Menu, About, Reservations, Contact pages. Backend has basic reservation CRUD (no auth, no email field, no admin access control). No admin section.

## Requested Changes (Diff)

### Add
- Admin section (protected by Internet Identity login) to view all reservations
- Email field to the reservation form and backend model
- Phone field to reservation form
- Authorization component for role-based access (admin vs guest)
- Admin can promote themselves as the first admin via Internet Identity
- On-screen confirmation screen after booking with full details
- Admin dashboard showing all reservations in a sortable table
- Admin can mark reservations as confirmed or cancelled

### Modify
- Restaurant name: cutiepies~
- Owner: Dikshita Chauhan
- Phone: +91 93183 94925
- Email: dikshuchauhn25@gmail.com
- Hours: Tuesday to Sunday, 6:00 PM – 12:00 AM
- Cuisines: Chinese, Italian, Indian, Mexican
- Menu updated to reflect the four cuisine categories
- Reservation time slots restricted to 6:00 PM – 11:30 PM (last seating)
- Reservation days restricted to Tuesday–Sunday
- Backend reservation model updated to include email and phone
- getAllReservations returns all reservations (admin check done frontend-side via auth roles)

### Remove
- Old generic restaurant branding (Bella Vista)

## Implementation Plan
1. Select `authorization` component
2. Regenerate Motoko backend: Reservation model adds `email` and `phone` fields; add `deleteReservation` and `updateReservationStatus` functions; admin management
3. Update App.tsx to add `/admin` route (protected)
4. Update all pages with cutiepies~ branding
5. Update Header/Footer with new restaurant info
6. Update ReservationsPage: add email/phone fields, restrict days to Tue–Sun, time slots 6pm–11:30pm, show confirmation screen after booking
7. Create AdminPage: login with Internet Identity, view table of all reservations, confirm/cancel actions
8. Update MenuPage: four cuisine categories (Chinese, Italian, Indian, Mexican)
9. Update HomePage, AboutPage, ContactPage with new details
