\# Database Schema (Supabase)



\## agencies

\- id (uuid, pk)

\- name

\- created\_at



\## branches

\- id (uuid, pk)

\- agency\_id (fk)

\- branch\_name

\- contact\_name

\- email

\- phone

\- country

\- state

\- city

\- instagram\_url

\- tiktok\_url

\- website\_url

\- contact\_status

\- lead\_temperature

\- relationship\_type

\- notes

\- created\_at

\- updated\_at



\## agency\_notes

\- id (uuid, pk)

\- branch\_id (fk)

\- content

\- created\_by (user\_id)

\- created\_at



\## agency\_activity\_log

\- id (uuid, pk)

\- branch\_id (fk)

\- user\_id (fk)

\- action\_type

\- field\_name

\- old\_value

\- new\_value

\- created\_at



\## import\_logs

\- id (uuid, pk)

\- file\_name

\- uploaded\_by

\- total\_rows

\- valid\_rows

\- duplicate\_rows

\- invalid\_rows

\- created\_at



\## profiles

\- id (uuid, pk, auth.users)

\- name

\- email

\- role

\- created\_at



