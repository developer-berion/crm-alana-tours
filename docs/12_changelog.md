# Changelog

## [Unreleased] - 2025-12-19

### Added
- **Branch Details:**
    - added "Nombre de Contacto" (Contact Name) field in the contact information section.
    - Implemented inline editing and autosave for the contact name.
    - Added user activity logging for changes in contact name.
- **Agency List View:**
    - Refactored grid view to a table/list view for better scalability.
    - Added "Fecha de ingreso" (Entry Date) column.
    - Added "Temperatura" (Lead Temperature) and "Estado" (Status) filters.
    - Added sorting capabilities by entry date.
    - Added "Ciudad" (City) column.
    
### Changed
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
