# DineFlow Restaurant App

## Project Name

**DineFlow**

## Project Description

DineFlow is a restaurant website and management system. Customers can see the menu, reserve a table, order food, and follow their order. Restaurant workers can manage the menu, tables, reservations, and orders in one place.

This application helps a restaurant avoid using different systems for orders and daily work. Its main purpose is to make ordering easier for customers and managing the restaurant easier for staff.

### Target Users

- Restaurant customers
- Cashiers and front-of-house staff
- Kitchen staff
- Restaurant managers
- System administrators

## User Roles and Permissions

| Role | Permissions | Available actions |
| --- | --- | --- |
| Customer | Use the menu, orders, and reservations | Register, log in, browse the menu, upload a profile image, place orders, reserve tables, and write reviews |
| Cashier | Manage orders and reservations | View orders, create walk-in orders, change order status, and confirm or cancel reservations |
| Kitchen Staff | Manage kitchen orders | View new orders, accept them, mark them as preparing, and mark them as ready |
| Manager | Manage the restaurant | Manage menu items, tables, reservations, orders, staff, and reports |
| Admin | Manage the whole system | Manage users, roles, restaurant settings, and all application data |

### Authorization Rules

- Visitors who are not logged in can view the home page and public menu.
- Customers can only edit their own profile, reservations, orders, reviews, and uploaded profile image.
- Kitchen staff can access kitchen orders but cannot edit prices, users, or restaurant settings.
- Cashiers can manage operational orders and reservations but cannot manage staff permissions.
- Managers can manage restaurant data but cannot create or delete system administrators.
- Admin-only pages can only be opened by admins.
- Every protected request checks the user's login and role before allowing the action.

## Main Features

### Authentication

- Customer and staff registration
- Login and logout
- Passwords are stored safely
- Email verification
- Forgot-password and reset-password flow
- Keep users logged in safely
- Optional two-step login for managers and admins
- Profile editing and profile image management

### Authorization

- Different permissions for each role
- Different dashboards for each type of user
- Protected pages for customers, kitchen staff, cashiers, managers, and admins
- Staff account activation and deactivation
- Admin record of important actions

### Customer Experience

- Browse menu by category
- Search and filter menu items by name, price, food type, and availability
- View item details, ingredients, allergens, image, and price
- Add items to a cart and change quantities
- Choose delivery, pickup, or dine-in ordering
- Place an order and view its status timeline
- Reserve a table by date, time, party size, and seating preference
- View upcoming and previous reservations
- Rate completed orders and write reviews
- Receive notifications about orders and reservations

### Restaurant Operations

- Cashier order queue and order detail view
- Kitchen display with status columns
- Reservation calendar and table availability
- Manager dashboard with revenue, order, reservation, and popular-item statistics
- Menu availability toggle for sold-out items
- Discount and promotion management
- Low-stock and unavailable-item alerts
- Export order and sales data as CSV

## CRUD Resources

### Menu Categories

- **Create:** Add a category such as Starters, Main Courses, Desserts, or Drinks.
- **Read:** View all categories and the items in each category.
- **Update:** Rename a category, change its display order, or hide it.
- **Delete:** Remove an empty category; prevent deletion while it contains menu items.
- **Allowed roles:** Manager and Admin.

### Menu Items

- **Create:** Add item name, description, price, category, ingredients, allergens, dietary tags, and image.
- **Read:** View the public menu and manager menu table.
- **Update:** Edit details, price, image, availability, and preparation time.
- **Delete:** Archive or permanently delete an item when it is not referenced by active orders.
- **Allowed roles:** Manager and Admin. Customers have read-only access.

### Orders

- **Create:** Customers create online orders; cashiers create walk-in orders.
- **Read:** Customers view their own orders; staff view operational orders according to role.
- **Update:** Staff update status from Pending to Confirmed, Preparing, Ready, Completed, or Cancelled.
- **Delete:** Customers may cancel an eligible pending order; staff may void an order with a reason.
- **Allowed roles:** Customer, Cashier, Kitchen Staff, Manager, and Admin, with ownership and status restrictions.

### Reservations

- **Create:** Customers or cashiers create a reservation with date, time, party size, and contact details.
- **Read:** Customers view their own reservations; staff view the restaurant reservation calendar.
- **Update:** Customers edit eligible future reservations; staff confirm, seat, complete, or cancel them.
- **Delete:** Customers cancel before the cancellation deadline; staff remove invalid or cancelled entries.
- **Allowed roles:** Customer, Cashier, Manager, and Admin.

### Tables

- **Create:** Add table number, capacity, area, and status.
- **Read:** View a floor/table list and availability for reservations.
- **Update:** Change capacity, area, status, or mergeable-table settings.
- **Delete:** Remove a table that has no active reservation or order assignment.
- **Allowed roles:** Manager and Admin.

### Users and Staff

- **Create:** Admin creates staff accounts and assigns roles.
- **Read:** Admin and manager view permitted user/staff lists.
- **Update:** Users edit their own profile; Admin changes roles, status, and permissions.
- **Delete:** Admin deactivates accounts instead of immediately erasing audit history.
- **Allowed roles:** Customer for own profile; Admin for staff and user administration.

### Reviews

- **Create:** A customer submits one review for a completed order.
- **Read:** Customers and staff view approved reviews; managers view moderation status.
- **Update:** Customers edit their own review within the allowed period; managers moderate visibility.
- **Delete:** Customers delete their own review; managers remove inappropriate content.
- **Allowed roles:** Customer, Manager, and Admin.

## Image and File Uploads

### User Profile Image

- Allowed types: JPG, JPEG, PNG, and WEBP
- Maximum size: 5 MB
- Uploaded by: Authenticated customers and staff for their own profile
- Processing: Validate MIME type, resize to a maximum of 512 x 512 pixels, and remove metadata

### Menu Item Image

- Allowed types: JPG, JPEG, PNG, and WEBP
- Maximum size: 8 MB
- Uploaded by: Manager and Admin
- Processing: Generate a thumbnail and optimized display image; store the original only when required

### Staff Verification Document

- Allowed types: PDF, JPG, and PNG
- Maximum size: 10 MB
- Uploaded by: Staff during onboarding or Admin on behalf of staff
- Visibility: Private; only Admin and authorized managers can access it

### Review Attachment

- Allowed types: JPG, JPEG, and PNG
- Maximum size: 5 MB per image, up to 3 images per review
- Uploaded by: Customers with a completed order
- Visibility: Public after moderation

### Upload Security

- Validate extension, MIME type, file size, and image dimensions on the server.
- Generate unique stored filenames and never trust the original filename.
- Store private documents outside public web access and serve them through authorization-checked downloads.
- Reject executable and unsupported file types.

## Main Pages and UI Screens

### Public Pages

- **Home:** Header, restaurant branding, hero dish image, opening hours, featured menu items, reservation call-to-action, and footer.
- **Menu:** Category tabs, search, dietary filters, item cards, price, availability badge, and add-to-cart button.
- **Menu Item Details:** Large image, ingredients, allergens, quantity selector, notes field, and add-to-cart action.
- **Login:** Email, password, remember-me checkbox, login button, password reset link, and registration link.
- **Register:** Name, email, phone, password, confirmation, terms checkbox, and profile image upload.
- **Reservation:** Date picker, time slots, party-size selector, seating preference, contact details, and confirmation summary.

### Customer Pages

- **Customer Dashboard:** Active order status, upcoming reservation, quick reorder, and recent activity.
- **Cart and Checkout:** Cart items, quantity controls, order type, address or table details, payment summary, and place-order button.
- **My Orders:** Filterable order cards with status, total, date, and view-details action.
- **Order Details:** Items, totals, status timeline, estimated time, receipt, and review action.
- **My Reservations:** Upcoming/past tabs, reservation cards, edit, cancel, and add-to-calendar actions.
- **Profile:** Personal details, profile image upload, password change, and notification preferences.

### Staff and Manager Pages

- **Operations Dashboard:** Sidebar navigation, KPI cards, live order queue, reservation snapshot, and revenue chart.
- **Kitchen Display:** Three status columns: New, Preparing, and Ready. Each order card has items, notes, elapsed time, and status buttons.
- **Order Management:** Searchable table with order ID, customer, type, total, status, date, and actions.
- **Reservation Management:** Calendar/list toggle, date navigation, availability summary, and reservation actions.
- **Menu Management:** Category filter, search, item table, availability toggle, add-item button, edit, archive, and image preview.
- **Menu Item Form:** Image dropzone, name, category, price, ingredients, allergens, tags, preparation time, availability, and save/cancel buttons.
- **Table Management:** Floor/table list with capacity, area, status, and add/edit/delete actions.
- **Staff Management:** Staff table with name, role, status, last login, and activate/deactivate actions.
- **Reports:** Date range, revenue/order charts, best-selling items, reservation rate, and CSV export.
- **Settings:** Restaurant profile, opening hours, delivery zones, taxes, notification settings, and role restrictions.

### Shared Layout Components

- Responsive top bar with logo, search, notification bell, cart, and profile menu
- Desktop sidebar for protected dashboards
- Breadcrumbs and page title
- Toast notifications for success and error states
- Confirmation dialog for destructive actions
- Empty, loading, and error states for every list page
- Responsive tables that become cards on small screens

## Suggested Database Entities

- `users`: identity, contact details, password hash, role, status, and profile image URL
- `roles` and `permissions`: role-permission mapping for authorization
- `menu_categories`: category name, display order, and active status
- `menu_items`: item details, price, image URL, availability, and category ID
- `tables`: table number, capacity, area, and status
- `reservations`: customer, table, date/time, party size, and status
- `orders`: customer, order type, total, payment status, and order status
- `order_items`: order, menu item, quantity, price snapshot, and notes
- `reviews`: order, customer, rating, text, images, and moderation status
- `uploads`: owner, storage key, type, size, and visibility
- `notifications`: recipient, type, message, read status, and timestamps
- `audit_logs`: actor, action, resource, resource ID, and timestamp

## UI Design Link

The complete screen-by-screen UI design specification is available here: [DineFlow UI Design](UI_DESIGN.md).

This specification can be recreated in Figma using one frame per page at 1440 px desktop and 390 px mobile widths. Use the page names and component inventory below as the Figma frame structure.

## Recommended Visual Direction

- Warm charcoal navigation with tomato-red action color and fresh herb-green success states
- Off-white page background with white content surfaces
- Strong food photography for the home hero and menu item cards
- Clear sans-serif typography with bold headings and comfortable body text
- 8 px spacing system, 8 px card radius, and high-contrast accessible controls
- Desktop-first operations dashboard with responsive mobile customer flows

## Development Milestones

1. Set up the frontend, backend, database, environment variables, and file storage.
2. Implement registration, login, sessions, roles, permissions, and protected routes.
3. Build menu categories, menu items, image uploads, and the public menu.
4. Build cart, checkout, order creation, and order status workflows.
5. Build reservations, table availability, and staff operations screens.
6. Add reviews, reports, notifications, audit logs, and responsive polish.
7. Test authorization boundaries, upload validation, CRUD flows, and mobile layouts.

## Submission Checklist

- [x] Restaurant project name and description
- [x] Target users and role permissions
- [x] Authentication features
- [x] Authorization and protected-page rules
- [x] CRUD resources with create, read, update, and delete operations
- [x] Image and document upload requirements
- [x] Main pages and UI screen descriptions
- [x] Database entities
- [x] UI design specification link
