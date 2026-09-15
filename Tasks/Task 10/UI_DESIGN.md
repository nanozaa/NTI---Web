# DineFlow UI Design Specification

This document explains how the DineFlow screens should look. Each section can be made as one frame in Figma. Use 1440 x 1024 for desktop screens and 390 x 844 for mobile screens.

## Design System

### Colors

| Token | Value | Use |
| --- | --- | --- |
| Charcoal | `#202321` | Sidebar, headings, footer |
| Tomato | `#D94F3D` | Primary actions, active states |
| Herb | `#4F7655` | Success, available status |
| Mustard | `#D9A441` | Warnings and pending status |
| Cream | `#F7F3ED` | Page background |
| White | `#FFFFFF` | Cards and form surfaces |
| Ink | `#2F3330` | Body text |
| Mist | `#E4E6E1` | Borders and dividers |

### Components

- Primary button: tomato fill, white label, 8 px radius
- Secondary button: white fill, charcoal border, charcoal label
- Danger button: dark red fill, white label
- Input: 48 px height, 1 px mist border, visible label, clear error text
- Status badge: small label with an icon and text, not color alone
- Card: white surface, 8 px radius, subtle border, 24 px padding
- Icon buttons: familiar icon, accessible tooltip, 40 x 40 px target
- Table: sticky header on desktop, card rows on mobile

## Frame Inventory

### 1. Home Page

- Header: DineFlow logo, Menu, Reservations, About, Log in, primary “Book a table” button
- Hero: full-width restaurant dish image, headline “Good food, beautifully organized”, supporting text, “View menu” and “Book a table” buttons
- Below fold: featured menu row, three service highlights, opening-hours strip, footer
- Mobile: stacked hero content with image above the call-to-action buttons

### 2. Login and Register

- Split desktop layout: food image panel on the left, form panel on the right
- Login form: email, password, show-password icon, remember me, submit, forgot password
- Register form: full name, email, phone, password, confirmation, profile image dropzone, terms checkbox
- Mobile: image becomes a short top banner and form fills the viewport width

### 3. Public Menu

- Header and cart indicator
- Page title with restaurant opening status
- Category tabs across the top
- Search field and dietary filter menu
- Responsive menu grid with item image, item name, short description, tags, price, availability, and add button
- Empty state when a filter has no matching items

### 4. Menu Item Details

- Breadcrumb back to menu
- Two-column desktop layout: large image and details panel
- Details: name, rating, description, ingredients, allergens, dietary tags, price, quantity stepper, special instructions, add-to-cart button
- Related items row below

### 5. Customer Dashboard

- Customer greeting and profile avatar
- Active order banner with progress timeline
- Upcoming reservation card with date, time, party size, and manage button
- Recent orders list with reorder buttons
- Mobile bottom navigation: Home, Menu, Orders, and Profile

### 6. Cart and Checkout

- Three steps at the top: Cart, Details, and Confirmation
- Cart item rows with thumbnail, quantity stepper, notes, and remove icon
- Order type segmented control: Delivery, Pickup, Dine-in
- Delivery address or table details form
- Summary panel: subtotal, tax, delivery fee, discount, total, place-order button
- Clear validation messages beside invalid fields

### 7. Kitchen Display

- Dark page background so it is easy to see in the kitchen
- Top bar: current time, open orders count, sound toggle, staff profile
- Three equal columns: New, Preparing, Ready
- Order cards: order number, elapsed timer, item list, customer notes, priority badge, next-status button
- Order cards move to the next column after the status is changed

### 8. Operations Dashboard

- Left sidebar: Overview, Orders, Reservations, Menu, Tables, Staff, Reports, and Settings
- Header with date range selector, notifications, and user menu
- KPI row: Today’s revenue, orders, reservations, average order value
- Main row: revenue line chart and live order queue
- Lower row: popular menu items, reservation occupancy, recent activity
- Loading skeletons and permission-aware empty states

### 9. Menu Management

- Page heading and “Add menu item” button
- Search input, category dropdown, availability filter
- Table columns: image, item, category, price, status, updated, actions
- Row actions: edit, duplicate, or archive
- Add/edit drawer or page with image upload dropzone and all menu item fields
- Delete/archive confirmation dialog explains the effect on active orders

### 10. Reservations

- Calendar/list segmented control
- Date navigation and “New reservation” button
- Availability summary with free, reserved, and blocked table counts
- Calendar entries show guest name, party size, time, table, and status
- Reservation detail drawer with confirm, seat, edit, and cancel actions

### 11. Reports

- Date range and export CSV controls
- Revenue and order-volume charts
- Best-selling items ranked list with thumbnails
- Reservation utilization chart
- Summary table with totals and comparison to the previous period

### 12. Profile and Settings

- Profile page: avatar upload, personal details, password change, notification preferences
- Settings page for Admin/Manager: restaurant details, opening hours, taxes, delivery zones, and staff permissions
- Unsaved changes warning when navigating away from an edited form

## Interaction States

Every data screen should have loading, empty, error, success, and no-permission messages. Show a confirmation message before deleting something. Upload areas should show the file name, preview, progress, and errors. Forms should show a clear message when something is entered incorrectly.

## Accessibility and Responsive Rules

- Keyboard focus is visible on every interactive control.
- Text and colors should be easy to read.
- Images should have useful alternative text.
- Tables collapse to labeled cards below 768 px.
- Sidebar becomes a drawer on mobile.
- Touch targets are at least 40 x 40 px.
- Show status with text and an icon as well as color.
