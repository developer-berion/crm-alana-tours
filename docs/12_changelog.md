# Changelog

## [Unreleased] - 2025-12-19

### Added
- **Branch Management:**
    - **Quick Add Branch:** Added a "+" button in the agency row to quickly add a new branch without navigating to details.
    - **Soft Delete:** Implemented "Archivar Agencia" functionality. Agencies are now soft-deleted (archived) instead of permanently removed.
    - **Deleted Agencies View:** Updated API to filter out archived agencies by default.
- **Agency List View:**
    - **Location Refactor:** Split "Ubicación" into separate "País", "Estado", and "Ciudad" columns.
    - **Socials Management:** Added interactive social media icons (Instagram, TikTok, Facebook, Website) directly in the table with inline editing.
    - **Enhanced Search:** Global search now filters by specific location fields (Country, State, City).

### Changed
- **Backend:**
    - **Branch Creation:** Made `email` field optional in the `POST /api/branches` endpoint.
    - **Soft Delete:** Added `deleted_at` column to `agencies` table and updated delete logic to set this timestamp.
- **Authentication:**
    - Refactored `/login` page to use Next.js Server Components.
    - Moved client-side logic (search params handling) to `LoginClient.tsx`.
    - Wrapped client component in `Suspense` boundary to fix build warnings.
- **Documentation:**
    - Added `12_changelog.md` to track project history.

### Fixed
- Fixed issues with `address` and `google_maps_url` persistence in Branch Details.
- Fixed `facebook_url` update errors.

## [Initial Release] - 2025-12-18
- Initial project setup with Next.js, Tailwind CSS, and Supabase.
- Basic Authentication (Login).
- Agencies and Branches CRUD.
- Activity Logging system.
- Import functionality (Draft).
