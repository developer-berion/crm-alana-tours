-- ============================================================
-- IMPORTACIÓN DE DATOS: Supabase → Cloud SQL
-- Generado automáticamente
-- ============================================================

-- ============================================================
-- Tabla: profiles (1 registros)
-- ============================================================

INSERT INTO profiles (id, name, email, role, created_at)
VALUES ('346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'Victor', 'victor@alanatours.com', 'superadmin', '2025-12-18T17:37:19.717683+00:00')
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- Tabla: agencies (28 registros)
-- ============================================================

INSERT INTO agencies (id, name, created_at)
VALUES ('6282e4a6-79b2-4c93-bd37-4d5bef5758fa', 'Test Agency', '2025-12-18T22:19:36.406264+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agencies (id, name, created_at)
VALUES ('8f928053-34e3-440c-a6f1-e1626b46d2ff', 'Test MultiPhone Agency 2', '2025-12-18T22:39:50.840433+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agencies (id, name, created_at)
VALUES ('9e19ff6a-0816-4df2-b003-019793864f60', 'DE VIAJE EN VIAJE', '2025-12-19T13:55:48.632371+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agencies (id, name, created_at)
VALUES ('14beaba3-09f5-48ea-918a-54558651ad83', 'Arcadia Viajes', '2025-12-19T15:57:05.834045+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agencies (id, name, created_at)
VALUES ('11693ee6-1702-4d9f-a42a-b2ae0ee40079', 'Molina Viajes', '2025-12-19T16:05:53.687836+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agencies (id, name, created_at)
VALUES ('bd39db2a-eaa4-4f44-a21d-252ee439ce31', 'Viajes Humboldt', '2025-12-19T17:13:35.190674+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agencies (id, name, created_at)
VALUES ('8c3ade24-64db-4b2d-9a1c-f0d864c5aa5b', 'Paria Tours & Eventos Venezuela C.A', '2025-12-19T17:25:40.176506+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agencies (id, name, created_at)
VALUES ('10a7d8a7-3f09-48d2-a3e1-9cb1ffdb5ffa', 'Luz del Mar', '2025-12-19T17:45:52.028782+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agencies (id, name, created_at)
VALUES ('dd8b6893-f824-40ba-90b1-f76475561fa9', 'Global Paraiso Travel', '2025-12-19T20:47:01.103322+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agencies (id, name, created_at)
VALUES ('92adeaed-294b-4fc5-bf1d-0335786a4bcc', 'Mundo Turismo Margarita', '2025-12-19T20:52:44.578053+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agencies (id, name, created_at)
VALUES ('9c3975ab-a8e9-4fc9-bc0c-e10cceb81c0d', 'Agencia Tucuam', '2025-12-19T20:57:41.455485+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agencies (id, name, created_at)
VALUES ('8d0babd1-ce1d-4768-b8eb-4cfaf136bb6c', 'Plandeviaje.vzla ', '2025-12-19T21:00:09.490364+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agencies (id, name, created_at)
VALUES ('85c1df93-b51f-4a32-8a46-f0bc5e09f68d', 'Ubicalo Travel', '2025-12-19T21:04:28.032871+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agencies (id, name, created_at)
VALUES ('1601b5ea-8f4b-4d95-99cd-258ec89c1efa', 'Ire Travel Agency', '2025-12-19T21:07:54.713768+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agencies (id, name, created_at)
VALUES ('42e9784d-df20-4c7f-b894-7079538343b0', 'viajes trebol margarita', '2025-12-19T21:10:16.200243+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agencies (id, name, created_at)
VALUES ('c44ead56-c232-4319-971a-ca1d94215af2', 'MyL viajes oficial', '2025-12-19T21:13:40.054493+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agencies (id, name, created_at)
VALUES ('a376c0eb-9f24-4684-9627-9a02638af4c0', 'Grupo BT Travel', '2025-12-19T21:17:08.211938+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agencies (id, name, created_at)
VALUES ('b4504514-3368-47e4-a899-c6f05bbe9982', 'Viajes Margarita', '2025-12-19T21:28:57.842278+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agencies (id, name, created_at)
VALUES ('60d0c310-553a-4edb-a3b7-525611525642', 'Lagarto Tours', '2025-12-19T21:30:37.824326+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agencies (id, name, created_at)
VALUES ('c13940f1-479f-4c88-ba67-e2ddba4cbfb3', 'Viajes Soleta', '2025-12-19T21:32:27.345402+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agencies (id, name, created_at)
VALUES ('7280517d-853e-4c69-9577-c055a73fcd98', 'Moon Travel', '2025-12-19T21:34:36.418417+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agencies (id, name, created_at)
VALUES ('879acec3-a773-4f79-93f0-ee1de6e2b337', 'LL Tours', '2025-12-19T21:36:22.321669+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agencies (id, name, created_at)
VALUES ('99925805-dd7b-4d35-8528-f7b11755a189', 'Edene Travel', '2025-12-19T21:38:29.842231+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agencies (id, name, created_at)
VALUES ('e5cc3813-ca2f-4232-859d-5d3b503cc197', 'Turismo Light', '2025-12-19T21:40:21.240537+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agencies (id, name, created_at)
VALUES ('e82ca1dd-8a17-40ea-8aed-1139cdd9994c', 'ZM Travel Margarita', '2025-12-19T21:43:06.194346+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agencies (id, name, created_at)
VALUES ('82aea704-b0d6-42a7-a6f7-c55f5e907c24', 'Hover Tours', '2025-12-19T21:44:57.94175+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agencies (id, name, created_at)
VALUES ('af26423f-88f0-41d3-8e9a-4d63aad937ff', 'Viajes Margarita VZLA', '2025-12-19T21:48:35.076224+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agencies (id, name, created_at)
VALUES ('cb7a8678-3d21-4aa2-955a-134a33cb657c', 'Vene travel', '2025-12-19T21:52:10.650679+00:00')
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- Tabla: branches (29 registros)
-- ============================================================

INSERT INTO branches (id, agency_id, branch_name, contact_name, email, phone, country, state, city, instagram_url, tiktok_url, website_url, contact_status, lead_temperature, relationship_type, notes, created_at, updated_at, facebook_url, address, google_maps_url)
VALUES ('b819e317-fed4-43c2-aa78-9fd978c8d4a0', '8d0babd1-ce1d-4768-b8eb-4cfaf136bb6c', 'Principal', 'Sin Contacto', 'reservasplandeviaje@gmail.com', '584120933867', 'Venezuela', 'Nueva Esparta', 'Porlamar', 'https://www.instagram.com/plandeviajemgta/', NULL, 'https://www.plandeviaje.com.ve/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnlXj8NiSvUf8zBTnRmVxJRqRwAWc9keV3Krlb4w7L30wrQx1fpNX5iTQWqls_aem_ZkULdX5wN5GI9uMOfbXXdw', 'not_contacted', 'cold', 'lead', NULL, '2025-12-19T21:00:09.661793+00:00', '2025-12-19T21:00:09.661793+00:00', 'https://www.facebook.com/plandeviaje.vzla/?ref=pl_edit_xav_ig_profile_page_web#', 'Av. 4 de Mayo, Porlamar 6301, Nueva Esparta, Venezuela', 'https://maps.app.goo.gl/JbC4ouQqCav3ixoY6')
ON CONFLICT (id) DO NOTHING;

INSERT INTO branches (id, agency_id, branch_name, contact_name, email, phone, country, state, city, instagram_url, tiktok_url, website_url, contact_status, lead_temperature, relationship_type, notes, created_at, updated_at, facebook_url, address, google_maps_url)
VALUES ('d85e7bab-c455-4104-9c53-66d89a816139', '92adeaed-294b-4fc5-bf1d-0335786a4bcc', 'Principal', 'Sin contacto', 'reservas1mundoturismo@gmail.com', '584123509010', 'Venezuela', 'Nueva Esparta', 'Porlamar', 'https://www.instagram.com/mundoturismomgta/', NULL, 'https://www.mundoturismo.com.ve/newmundo/', 'not_contacted', 'cold', 'lead', NULL, '2025-12-19T20:52:44.780177+00:00', '2025-12-19T20:52:44.780177+00:00', 'https://www.facebook.com/mundoturismomgta/', 'Centro comercial el valle 6301 Porlamar, Venezuela', NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO branches (id, agency_id, branch_name, contact_name, email, phone, country, state, city, instagram_url, tiktok_url, website_url, contact_status, lead_temperature, relationship_type, notes, created_at, updated_at, facebook_url, address, google_maps_url)
VALUES ('c0b226b7-0d16-4286-85f7-38911a9f442c', '8c3ade24-64db-4b2d-9a1c-f0d864c5aa5b', 'Principal', 'Yisbelis Rodríguez', NULL, '584126972075', 'Venezuela', 'Anzoátegui', 'Carupano', NULL, NULL, 'https://www.facebook.com/pariavzla', 'not_contacted', 'cold', 'lead', NULL, '2025-12-19T17:25:40.440947+00:00', '2025-12-19T17:25:40.440947+00:00', 'https://www.facebook.com/pariavzla', NULL, NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO branches (id, agency_id, branch_name, contact_name, email, phone, country, state, city, instagram_url, tiktok_url, website_url, contact_status, lead_temperature, relationship_type, notes, created_at, updated_at, facebook_url, address, google_maps_url)
VALUES ('5b0ab35a-15bf-4cea-affd-23cd4e379b70', '6282e4a6-79b2-4c93-bd37-4d5bef5758fa', 'Principal', 'Test Person', 'test@test.com', '+584121234567', 'Venezuela', 'Amazonas', 'Valencia', 'Instagram', 'TikTok', 'Sitio webhttps://example.com', 'contacted', 'warm', 'lead', NULL, '2025-12-18T22:19:36.897724+00:00', '2025-12-18T22:19:36.897724+00:00', 'https://facebook.com/alanatours', 'Calle Principal 789', '')
ON CONFLICT (id) DO NOTHING;

INSERT INTO branches (id, agency_id, branch_name, contact_name, email, phone, country, state, city, instagram_url, tiktok_url, website_url, contact_status, lead_temperature, relationship_type, notes, created_at, updated_at, facebook_url, address, google_maps_url)
VALUES ('03856513-016c-4a49-a789-323698dd1709', '11693ee6-1702-4d9f-a42a-b2ae0ee40079', 'Principal', 'Snn contacto', 'SucursalMaturin@molinaviajes.com', '582916430297, 0414 766 6307', 'Venezuela', 'Monagas', 'maturin', 'https://www.instagram.com/molinaviajes/', NULL, 'https://www.molinaviajes.com/', 'not_contacted', 'cold', 'lead', NULL, '2025-12-19T16:05:54.068262+00:00', '2025-12-19T16:05:54.068262+00:00', 'https://www.facebook.com/MolinaViajes/?locale=es_LA', 'Av. Luis del Valle García, Anexo Centro Clínico La Pirámide, Local 1 y 2 P.B.', 'https://maps.app.goo.gl/U8yZW1JEYyUVJ5HXA')
ON CONFLICT (id) DO NOTHING;

INSERT INTO branches (id, agency_id, branch_name, contact_name, email, phone, country, state, city, instagram_url, tiktok_url, website_url, contact_status, lead_temperature, relationship_type, notes, created_at, updated_at, facebook_url, address, google_maps_url)
VALUES ('eb8bfad1-fc08-43b0-9456-a4e0b80fc9e1', '9e19ff6a-0816-4df2-b003-019793864f60', 'Principal', 'Desconocido', 'reservas@deviajeenviajeagencia.com', '+58 424-9221313', 'Venezuela', 'Anzoátegui', 'lecheria', 'https://www.instagram.com/deviajeenviajeagencia/?hl=es', '', '', 'not_contacted', 'cold', 'lead', NULL, '2025-12-19T13:55:48.975147+00:00', '2025-12-19T13:55:48.975147+00:00', 'https://www.facebook.com/deviajeenviajeagencia/?ref=_xav_ig_profile_page_web', 'Centro Empresarial Ancora, Lecheria, Venezuela', '')
ON CONFLICT (id) DO NOTHING;

INSERT INTO branches (id, agency_id, branch_name, contact_name, email, phone, country, state, city, instagram_url, tiktok_url, website_url, contact_status, lead_temperature, relationship_type, notes, created_at, updated_at, facebook_url, address, google_maps_url)
VALUES ('1e7ef62f-9123-441e-a297-735b33dfb1b0', '8f928053-34e3-440c-a6f1-e1626b46d2ff', 'Principal', 'Maria Rodriguez', NULL, '0412-1111111, 0424-2222222', 'Venezuela', 'Amazonas', 'Valencia', NULL, NULL, NULL, 'not_contacted', 'cold', 'lead', NULL, '2025-12-18T22:39:51.219674+00:00', '2025-12-18T22:39:51.219674+00:00', NULL, NULL, NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO branches (id, agency_id, branch_name, contact_name, email, phone, country, state, city, instagram_url, tiktok_url, website_url, contact_status, lead_temperature, relationship_type, notes, created_at, updated_at, facebook_url, address, google_maps_url)
VALUES ('5579e810-728d-4f47-bfe0-ca17e5ae3619', '6282e4a6-79b2-4c93-bd37-4d5bef5758fa', 'segunda', 'pedro', NULL, NULL, 'Venezuela', 'Anzoátegui', 'lecheria', NULL, NULL, NULL, 'not_contacted', 'cold', 'lead', NULL, '2025-12-19T13:51:08.083852+00:00', '2025-12-19T13:51:08.083852+00:00', NULL, NULL, NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO branches (id, agency_id, branch_name, contact_name, email, phone, country, state, city, instagram_url, tiktok_url, website_url, contact_status, lead_temperature, relationship_type, notes, created_at, updated_at, facebook_url, address, google_maps_url)
VALUES ('d31ef068-3c1b-4a4d-add0-67497f11de7e', '1601b5ea-8f4b-4d95-99cd-258ec89c1efa', 'Principal', 'Sin contacto', 'iretravelagency@gmail.com', '584126503015, 584248340731', 'Venezuela', 'Nueva Esparta', 'Porlamar', 'https://www.instagram.com/iretravelagency/', NULL, 'https://ireagenciadeviajes.my.canva.site/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnWu9YrNQq_E5fZ7IU_yMlNU6sMMlbfBkfi7zpBOUClibZYrZ9OUPhp1M4qg8_aem_RMuA2dm6QuiYUubMhH9AXA#home', 'not_contacted', 'cold', 'lead', NULL, '2025-12-19T21:07:54.888823+00:00', '2025-12-19T21:07:54.888823+00:00', NULL, 'Playa el angel, avenida Aldonza Manrique, Pampatar, Nueva Esparta, Venezuela', NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO branches (id, agency_id, branch_name, contact_name, email, phone, country, state, city, instagram_url, tiktok_url, website_url, contact_status, lead_temperature, relationship_type, notes, created_at, updated_at, facebook_url, address, google_maps_url)
VALUES ('ae9d6007-ed5c-4ef1-abc9-89f3bda8611f', '9c3975ab-a8e9-4fc9-bc0c-e10cceb81c0d', 'Principal', 'Sin contacto', 'ventastucuam@gmail.com', '584261884783', 'Venezuela', 'Nueva Esparta', 'Porlamar', 'https://www.instagram.com/agenciatucuam/', NULL, NULL, 'not_contacted', 'cold', 'lead', NULL, '2025-12-19T20:57:41.643564+00:00', '2025-12-19T20:57:41.643564+00:00', 'https://www.facebook.com/agenciatucuam/?ref=pro_upsell_xav_ig_profile_page_web#', 'C.C Concord Local 161 - Frente CORPOELEC., Porlamar 6301', NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO branches (id, agency_id, branch_name, contact_name, email, phone, country, state, city, instagram_url, tiktok_url, website_url, contact_status, lead_temperature, relationship_type, notes, created_at, updated_at, facebook_url, address, google_maps_url)
VALUES ('6413f84c-c912-4dbb-979f-df685e8c5c12', '10a7d8a7-3f09-48d2-a3e1-9cb1ffdb5ffa', 'Principal', 'Luzderlis Rosario', 'luzdelmarviajes@gmail.com', '+58 414 8712201, +58 291 6436161', 'Venezuela', 'Monagas', 'Maturín', 'https://www.instagram.com/luzdelmarviajes/', NULL, 'https://www.luzdelmarviajes.com/inicio', 'not_contacted', 'cold', 'lead', NULL, '2025-12-19T17:45:52.299763+00:00', '2025-12-19T17:45:52.299763+00:00', '', NULL, NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO branches (id, agency_id, branch_name, contact_name, email, phone, country, state, city, instagram_url, tiktok_url, website_url, contact_status, lead_temperature, relationship_type, notes, created_at, updated_at, facebook_url, address, google_maps_url)
VALUES ('1e8644f6-b48a-4cbd-932b-ae19087f8534', 'bd39db2a-eaa4-4f44-a21d-252ee439ce31', 'Principal', 'Sin contacto', 'info@viajeshumboldt.com', '584129181111', 'Venezuela', 'Nueva Esparta', 'Pampatar', 'https://www.instagram.com/viajeshumboldt/', NULL, 'https://lufthansa-city-center.com/en/travel-agency-venezuela/viajes-humboldt-caracas/?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExNFJqdlQ2TUp0S0pKRjZXRHNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR7tzfuShXT40ZxMwA5N8jPWzeSuLMOZa2MJF-VFssvdH9A-xFTuiTqcbsoDQA_aem_Op0SWNdVM_c0LH9noEMB3g', 'not_contacted', 'cold', 'lead', NULL, '2025-12-19T17:13:35.451664+00:00', '2025-12-19T17:13:35.451664+00:00', 'https://www.facebook.com/ViajesHumboldt/?ref=_xav_ig_profile_page_web#', 'Centro Comercial Sambil, Av Jóvito Villalba, Pampatar 6316, Nueva Esparta', 'https://maps.app.goo.gl/t9pvTYkxq7jXSHFx7')
ON CONFLICT (id) DO NOTHING;

INSERT INTO branches (id, agency_id, branch_name, contact_name, email, phone, country, state, city, instagram_url, tiktok_url, website_url, contact_status, lead_temperature, relationship_type, notes, created_at, updated_at, facebook_url, address, google_maps_url)
VALUES ('801ac46d-a117-403a-909f-5123207d5836', '14beaba3-09f5-48ea-918a-54558651ad83', 'Principal', 'Sin contacto', 'info@arcadia-viajes.com', '584241542685', 'Venezuela', 'Anzoátegui', 'Lecheria', 'https://www.instagram.com/arcadia.viajes/?hl=es', 'https://tiktok.com/@viajaarcadia', 'https://arcadia-viajes.com/', 'not_contacted', 'cold', 'lead', NULL, '2025-12-19T15:57:06.300096+00:00', '2025-12-19T15:57:06.300096+00:00', NULL, 'Centro comercial Anna, planta baja local #8', 'https://maps.app.goo.gl/P3dhumuay8epBpeTA')
ON CONFLICT (id) DO NOTHING;

INSERT INTO branches (id, agency_id, branch_name, contact_name, email, phone, country, state, city, instagram_url, tiktok_url, website_url, contact_status, lead_temperature, relationship_type, notes, created_at, updated_at, facebook_url, address, google_maps_url)
VALUES ('9e5dab3f-6c19-4d96-9263-33ea50825257', '85c1df93-b51f-4a32-8a46-f0bc5e09f68d', 'Principal', 'Sin contacto', NULL, NULL, 'Venezuela', 'Nueva Esparta', 'porlamar', 'https://www.instagram.com/ubicalotravel/', NULL, NULL, 'not_contacted', 'cold', 'lead', NULL, '2025-12-19T21:04:28.209461+00:00', '2025-12-19T21:04:28.209461+00:00', 'https://www.facebook.com/UBICALOTRAVEL/', NULL, NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO branches (id, agency_id, branch_name, contact_name, email, phone, country, state, city, instagram_url, tiktok_url, website_url, contact_status, lead_temperature, relationship_type, notes, created_at, updated_at, facebook_url, address, google_maps_url)
VALUES ('387273db-6b47-40d4-8cfe-eceb22fee3a8', 'dd8b6893-f824-40ba-90b1-f76475561fa9', 'Principal', 'Sin contacto', 'globalparaisotravel@gmail.com', '584248476544, 584147772466', 'Venezuela', 'Nueva Esparta', 'Porlamar', 'https://www.instagram.com/GlobalParaisoTravel/', NULL, NULL, 'not_contacted', 'cold', 'lead', NULL, '2025-12-19T20:47:01.414635+00:00', '2025-12-19T20:47:01.414635+00:00', 'https://www.facebook.com/Globalparaisotravelca/', 'Calle Narváez con Fermín, Residencias Las Margaritas Edif. Torre II, PB, oficina 3, Porlamar, Isla de Margarita, Nueva Esparta, Venezuela.', NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO branches (id, agency_id, branch_name, contact_name, email, phone, country, state, city, instagram_url, tiktok_url, website_url, contact_status, lead_temperature, relationship_type, notes, created_at, updated_at, facebook_url, address, google_maps_url)
VALUES ('8235ec85-9c3b-4180-b9b8-e5b1ce34ee3d', '42e9784d-df20-4c7f-b894-7079538343b0', 'Principal', 'Derniel Franco', NULL, '584123010717', 'Venezuela', 'Nueva Esparta', 'porlamar', 'https://www.instagram.com/viajestrebolmargarita/', NULL, NULL, 'not_contacted', 'cold', 'lead', NULL, '2025-12-19T21:10:16.3845+00:00', '2025-12-19T21:10:16.3845+00:00', NULL, NULL, NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO branches (id, agency_id, branch_name, contact_name, email, phone, country, state, city, instagram_url, tiktok_url, website_url, contact_status, lead_temperature, relationship_type, notes, created_at, updated_at, facebook_url, address, google_maps_url)
VALUES ('8cf592a9-bbb1-467c-9731-3fa8beccde12', 'a376c0eb-9f24-4684-9627-9a02638af4c0', 'Principal', 'Sin contacto', 'ventasdirectas@grupobttravel.com', '582952620627, 04147826845, 04248116631, 04248664785', 'Venezuela', 'Nueva Esparta', 'Pampatar', 'https://www.instagram.com/bttravelvzla/', NULL, 'https://tiendadeturismo-test.web.app/', 'not_contacted', 'cold', 'lead', NULL, '2025-12-19T21:17:08.441967+00:00', '2025-12-19T21:17:08.441967+00:00', 'https://www.facebook.com/profile.php?id=100091444620884&viewas=&show_switched_toast=false&show_switched_tooltip=false&is_tour_dismissed=false&is_tour_completed=false&show_podcast_settings=false&show_community_review_changes=false&should_open_composer=fals', NULL, NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO branches (id, agency_id, branch_name, contact_name, email, phone, country, state, city, instagram_url, tiktok_url, website_url, contact_status, lead_temperature, relationship_type, notes, created_at, updated_at, facebook_url, address, google_maps_url)
VALUES ('83c09063-c454-4e7d-8fe6-5aa14b059f1c', 'c44ead56-c232-4319-971a-ca1d94215af2', 'Principal', 'Sin contacto', NULL, '584147926454', 'Venezuela', 'Nueva Esparta', 'Porlamar', 'https://www.instagram.com/mylviajesoficial/', NULL, NULL, 'not_contacted', 'cold', 'lead', NULL, '2025-12-19T21:13:40.269941+00:00', '2025-12-19T21:13:40.269941+00:00', NULL, NULL, NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO branches (id, agency_id, branch_name, contact_name, email, phone, country, state, city, instagram_url, tiktok_url, website_url, contact_status, lead_temperature, relationship_type, notes, created_at, updated_at, facebook_url, address, google_maps_url)
VALUES ('eb797275-d6b2-4dff-a95d-c825c4970d51', '60d0c310-553a-4edb-a3b7-525611525642', 'Principal', 'Sin contacto', 'lagartotour@gmail.com', '584121962703', 'Venezuela', 'Nueva Esparta', 'Porlamar', 'https://www.instagram.com/lagartotour/', NULL, NULL, 'not_contacted', 'cold', 'lead', NULL, '2025-12-19T21:30:38.006574+00:00', '2025-12-19T21:30:38.006574+00:00', 'https://www.facebook.com/profile.php?id=61562756653666&ref=pl_edit_xav_ig_profile_page_web#', NULL, NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO branches (id, agency_id, branch_name, contact_name, email, phone, country, state, city, instagram_url, tiktok_url, website_url, contact_status, lead_temperature, relationship_type, notes, created_at, updated_at, facebook_url, address, google_maps_url)
VALUES ('3634d784-92a6-4498-8f16-86012b91a2e3', 'c13940f1-479f-4c88-ba67-e2ddba4cbfb3', 'Principal', 'Sin Contacto', NULL, '584141889873', 'Venezuela', 'Nueva Esparta', 'sin ciudad', 'https://www.instagram.com/viajes_solesta/', NULL, NULL, 'not_contacted', 'cold', 'lead', NULL, '2025-12-19T21:32:27.546864+00:00', '2025-12-19T21:32:27.546864+00:00', NULL, NULL, NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO branches (id, agency_id, branch_name, contact_name, email, phone, country, state, city, instagram_url, tiktok_url, website_url, contact_status, lead_temperature, relationship_type, notes, created_at, updated_at, facebook_url, address, google_maps_url)
VALUES ('763b5aea-4d1b-4679-bf69-72ee280f5359', '7280517d-853e-4c69-9577-c055a73fcd98', 'Principal', 'Genesis Valera', 'genej.valera@gmail.com', '584249533945', 'Venezuela', 'Nueva Esparta', 'sin ciudad', 'https://www.instagram.com/agenciamoontravels/', NULL, NULL, 'not_contacted', 'cold', 'lead', NULL, '2025-12-19T21:34:36.606864+00:00', '2025-12-19T21:34:36.606864+00:00', NULL, NULL, NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO branches (id, agency_id, branch_name, contact_name, email, phone, country, state, city, instagram_url, tiktok_url, website_url, contact_status, lead_temperature, relationship_type, notes, created_at, updated_at, facebook_url, address, google_maps_url)
VALUES ('76c5bdc9-bd51-474f-8e17-b2cb3c887d0f', '879acec3-a773-4f79-93f0-ee1de6e2b337', 'Principal', 'Sin contacto', 'ventas@lltours.com.ve', '584147942802', 'Venezuela', 'Nueva Esparta', 'Sin ciudad', 'https://www.instagram.com/lltours/', NULL, NULL, 'not_contacted', 'cold', 'lead', NULL, '2025-12-19T21:36:22.511914+00:00', '2025-12-19T21:36:22.511914+00:00', NULL, NULL, NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO branches (id, agency_id, branch_name, contact_name, email, phone, country, state, city, instagram_url, tiktok_url, website_url, contact_status, lead_temperature, relationship_type, notes, created_at, updated_at, facebook_url, address, google_maps_url)
VALUES ('59f3143a-f821-481d-9f29-4e84fe01e55a', '99925805-dd7b-4d35-8528-f7b11755a189', 'Principal', 'Sin contacto', NULL, '584120961647', 'Venezuela', 'Nueva Esparta', 'Sin ciudad', 'https://www.instagram.com/edenetravel_int/', NULL, '', 'not_contacted', 'cold', 'lead', NULL, '2025-12-19T21:38:30.028097+00:00', '2025-12-19T21:38:30.028097+00:00', NULL, NULL, NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO branches (id, agency_id, branch_name, contact_name, email, phone, country, state, city, instagram_url, tiktok_url, website_url, contact_status, lead_temperature, relationship_type, notes, created_at, updated_at, facebook_url, address, google_maps_url)
VALUES ('6468071c-9e65-47e0-9d27-46f2d1da9a73', 'af26423f-88f0-41d3-8e9a-4d63aad937ff', 'Principal', 'Sin contacto', NULL, '584248733794', 'Venezuela', 'Nueva Esparta', 'Porlamar', 'https://www.instagram.com/viajesmargaritavzla/', 'https://www.tiktok.com/@viajesmargaritavz?fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn1VCdP7Hcuj6T8w6hvB7D3Su8re0zCWOJPqTiNGxfnpyuK5M2cf-Hhodp3ts_aem_pRMalSjj0xpgouaR43IFgw', NULL, 'not_contacted', 'cold', 'lead', NULL, '2025-12-19T21:48:35.330273+00:00', '2025-12-19T21:48:35.330273+00:00', NULL, 'Av. Boulevard Ramon Vasquez Brito CC Boulevard Porlamar - Nivel PA Local A-9 Sector Boulevard Vasquez Brito Porlamar - Nueva Esparta - Z.P 6301, Porlamar 6301', NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO branches (id, agency_id, branch_name, contact_name, email, phone, country, state, city, instagram_url, tiktok_url, website_url, contact_status, lead_temperature, relationship_type, notes, created_at, updated_at, facebook_url, address, google_maps_url)
VALUES ('bbbe77f1-fd71-4f44-9e69-2c7f64c77bda', 'cb7a8678-3d21-4aa2-955a-134a33cb657c', 'Principal', 'Sin contacto', NULL, NULL, 'Venezuela', 'Nueva Esparta', 'Porlamar', 'https://www.instagram.com/venetravel/', NULL, NULL, 'not_contacted', 'cold', 'lead', NULL, '2025-12-19T21:52:10.866162+00:00', '2025-12-19T21:52:10.866162+00:00', NULL, NULL, NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO branches (id, agency_id, branch_name, contact_name, email, phone, country, state, city, instagram_url, tiktok_url, website_url, contact_status, lead_temperature, relationship_type, notes, created_at, updated_at, facebook_url, address, google_maps_url)
VALUES ('a1a6851e-91c9-4beb-81a2-35afa60c8f07', 'e5cc3813-ca2f-4232-859d-5d3b503cc197', 'Principal', 'Alejandro', 'administracion@turismolight.com', '584248584681', 'Venezuela', 'Nueva Esparta', 'sin ciudad', 'https://www.instagram.com/turismolight/', NULL, NULL, 'not_contacted', 'cold', 'lead', NULL, '2025-12-19T21:40:21.427264+00:00', '2025-12-19T21:40:21.427264+00:00', NULL, NULL, NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO branches (id, agency_id, branch_name, contact_name, email, phone, country, state, city, instagram_url, tiktok_url, website_url, contact_status, lead_temperature, relationship_type, notes, created_at, updated_at, facebook_url, address, google_maps_url)
VALUES ('d347cb66-9502-43aa-9028-de5905609497', 'e82ca1dd-8a17-40ea-8aed-1139cdd9994c', 'Principal', 'Zoila Morao', NULL, '584126064768', 'Venezuela', 'Nueva Esparta', 'Sin ciudad', 'https://www.instagram.com/zmtravelmargarita/', NULL, '', 'not_contacted', 'cold', 'lead', NULL, '2025-12-19T21:43:06.412782+00:00', '2025-12-19T21:43:06.412782+00:00', 'https://www.facebook.com/zoila.morao/', NULL, NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO branches (id, agency_id, branch_name, contact_name, email, phone, country, state, city, instagram_url, tiktok_url, website_url, contact_status, lead_temperature, relationship_type, notes, created_at, updated_at, facebook_url, address, google_maps_url)
VALUES ('515cd58e-9170-466e-8246-3aaa74525900', '82aea704-b0d6-42a7-a6f7-c55f5e907c24', 'Principal', 'Sin contacto', 'info@hovertours.com', '584124969257', 'Venezuela', 'Nueva Esparta', 'Porlamar ', 'https://www.instagram.com/hovertours/', 'https://tiktok.com/@hovertours', 'https://hovertours.com.ve/', 'not_contacted', 'cold', 'lead', NULL, '2025-12-19T21:44:58.143106+00:00', '2025-12-19T21:44:58.143106+00:00', NULL, 'Calle Narváez, Residencias Las Margaritas, Isla de Margarita. Venezuela.', NULL)
ON CONFLICT (id) DO NOTHING;

INSERT INTO branches (id, agency_id, branch_name, contact_name, email, phone, country, state, city, instagram_url, tiktok_url, website_url, contact_status, lead_temperature, relationship_type, notes, created_at, updated_at, facebook_url, address, google_maps_url)
VALUES ('36ba5c9d-3f4b-4342-af67-414cfbb086f2', 'b4504514-3368-47e4-a899-c6f05bbe9982', 'Principal', 'Sin contacto', NULL, '584147881640', 'Venezuela', 'Nueva Esparta', 'Porlamar', 'https://www.instagram.com/viajesamargarita/', NULL, '', 'not_contacted', 'cold', 'lead', NULL, '2025-12-19T21:28:58.023049+00:00', '2025-12-19T21:28:58.023049+00:00', NULL, '', NULL)
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- Tabla: agency_notes (8 registros)
-- ============================================================

INSERT INTO agency_notes (id, branch_id, content, created_by, created_at, updated_at, archived)
VALUES ('432f031c-9950-447c-ac14-dd12be59f568', '03856513-016c-4a49-a789-323698dd1709', 'Tiene sedes en Sede Principal · Caracas Módulo de Maiquetía, Maracaibo, Valencia, Maturín, El Tigre.
Otros correos:
- reservasweb@molinaviajes.com', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', '2025-12-19T16:21:20.430874+00:00', '2025-12-19T17:10:27.529+00:00', FALSE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_notes (id, branch_id, content, created_by, created_at, updated_at, archived)
VALUES ('e3ce7f4b-317a-488d-8931-c1b5435d91d5', 'b819e317-fed4-43c2-aa78-9fd978c8d4a0', 'Lista de contactos ampliada:
https://linktr.ee/Promos_Especiales?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnFOrr9zOxjXwqmS2P3ToTfipYQyM-OqOuevkB8Q8iP5Z-Z5XVirjyGLDMIIc_aem_D3pJuzgmRcYNPn_KXl2ulQ', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', '2025-12-19T21:00:26.254807+00:00', '2025-12-19T21:00:26.254807+00:00', FALSE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_notes (id, branch_id, content, created_by, created_at, updated_at, archived)
VALUES ('b6a5d509-56cf-4b3d-924f-c5a9fbd8e001', '9e5dab3f-6c19-4d96-9263-33ea50825257', 'No tiene informacion de contacto pero está activamente en las redes', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', '2025-12-19T21:06:01.340699+00:00', '2025-12-19T21:06:01.340699+00:00', FALSE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_notes (id, branch_id, content, created_by, created_at, updated_at, archived)
VALUES ('33e4452b-9f3a-416a-b7f1-37002699b7fd', '8235ec85-9c3b-4180-b9b8-e5b1ce34ee3d', 'Activo solo por instagram y Whatsapp', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', '2025-12-19T21:11:29.386633+00:00', '2025-12-19T21:11:29.386633+00:00', FALSE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_notes (id, branch_id, content, created_by, created_at, updated_at, archived)
VALUES ('0082ff1b-7d11-4652-8288-7feb85626a2c', '83c09063-c454-4e7d-8fe6-5aa14b059f1c', 'Activo solo instagram y Whatsapp', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', '2025-12-19T21:14:33.40362+00:00', '2025-12-19T21:14:33.40362+00:00', FALSE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_notes (id, branch_id, content, created_by, created_at, updated_at, archived)
VALUES ('1b5701e2-c433-4d18-9f39-2df93e6212f0', '36ba5c9d-3f4b-4342-af67-414cfbb086f2', 'Solo activo por instagram', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', '2025-12-19T21:29:22.326171+00:00', '2025-12-19T21:29:22.326171+00:00', FALSE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_notes (id, branch_id, content, created_by, created_at, updated_at, archived)
VALUES ('30f41a75-009f-4185-a975-63c9666a25d3', '763b5aea-4d1b-4679-bf69-72ee280f5359', 'Instagram de Fundadora: https://www.instagram.com/g_valera/', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', '2025-12-19T21:35:33.030158+00:00', '2025-12-19T21:35:33.030158+00:00', FALSE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_notes (id, branch_id, content, created_by, created_at, updated_at, archived)
VALUES ('bd985a7e-7913-4495-bf04-c7f6ee148deb', '515cd58e-9170-466e-8246-3aaa74525900', 'https://www.linkedin.com/company/hover-tours/', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', '2025-12-19T21:46:43.966162+00:00', '2025-12-19T21:46:43.966162+00:00', FALSE)
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- Tabla: agency_activity_log (192 registros)
-- ============================================================

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('77b49676-011f-4ea4-b9d4-d6bf29d7bc76', '5b0ab35a-15bf-4cea-affd-23cd4e379b70', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'create', NULL, NULL, 'Agencia creada: Test Agency', '2025-12-18T22:19:37.372107+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('756435ea-502f-4cb1-b8c6-9bc46fe93e0e', '5b0ab35a-15bf-4cea-affd-23cd4e379b70', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'instagram_url', 'null', 'Instagram', '2025-12-18T22:21:06.903856+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('8e0ff5a4-922e-4de5-9002-d745720c8065', '5b0ab35a-15bf-4cea-affd-23cd4e379b70', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'website_url', 'null', 'Sitio web', '2025-12-18T22:21:06.910797+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('a630816b-f38a-41b5-b26f-9271c72199d2', '5b0ab35a-15bf-4cea-affd-23cd4e379b70', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'tiktok_url', 'null', 'TikTok', '2025-12-18T22:21:14.480764+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('8378a4df-10f3-42e4-bc96-56b126272b7b', '5b0ab35a-15bf-4cea-affd-23cd4e379b70', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'relationship_type', 'lead', 'client', '2025-12-18T22:21:20.047694+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('639ea32f-970e-4e7c-8d7c-46c924f36073', '5b0ab35a-15bf-4cea-affd-23cd4e379b70', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'relationship_type', 'client', 'lead', '2025-12-18T22:21:31.836959+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('1f253272-57b7-4a01-a83e-9cbb640b19d2', '5b0ab35a-15bf-4cea-affd-23cd4e379b70', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'lead_temperature', 'cold', 'warm', '2025-12-18T22:21:32.897956+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('7000a389-fbd6-4a47-be22-068144b04dd7', '5b0ab35a-15bf-4cea-affd-23cd4e379b70', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'contact_status', 'not_contacted', 'contacted', '2025-12-18T22:21:35.333274+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('b45a4a24-47f2-4030-9b8a-4082d9d1ac20', '5b0ab35a-15bf-4cea-affd-23cd4e379b70', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'phone', '+584121234567', '+584121234567', '2025-12-18T22:21:44.099409+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('4fae9ab0-d7dd-4972-9e55-d2689de82b6a', '5b0ab35a-15bf-4cea-affd-23cd4e379b70', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'email', 'test@test.com', 'test@test.com', '2025-12-18T22:21:45.655239+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('ec4988bf-2132-4d3c-ab9b-06717ad72f24', '5b0ab35a-15bf-4cea-affd-23cd4e379b70', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'city', 'Valencia', 'Valencia', '2025-12-18T22:22:08.728664+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('b484c122-85d6-46d1-bb5e-d58ac4d5a553', '1e7ef62f-9123-441e-a297-735b33dfb1b0', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'create', NULL, NULL, 'Agencia creada: Test MultiPhone Agency 2', '2025-12-18T22:39:51.643787+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('21578cc1-df12-4e83-8a02-423c66822fb9', '5579e810-728d-4f47-bfe0-ca17e5ae3619', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'create', NULL, NULL, 'Sucursal creada: segunda para agencia Test Agency', '2025-12-19T13:51:08.532368+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('4cbd2545-3f59-4d18-9e52-430c79841cac', 'eb8bfad1-fc08-43b0-9456-a4e0b80fc9e1', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'create', NULL, NULL, 'Agencia creada: DE VIAJE EN VIAJE', '2025-12-19T13:55:49.288022+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('02f9fdb9-e3e3-439a-a8c5-ce98e337a28a', 'eb8bfad1-fc08-43b0-9456-a4e0b80fc9e1', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'website_url', 'null', 'https://www.facebook.com/deviajeenviajeagencia/?ref=_xav_ig_profile_page_web#', '2025-12-19T13:57:09.610844+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('89a25bf0-7795-44b9-a012-152960b8e7d0', 'eb8bfad1-fc08-43b0-9456-a4e0b80fc9e1', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'instagram_url', 'null', 'https://www.instagram.com/deviajeenviajeagencia/?hl=es', '2025-12-19T13:57:34.030977+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('625efc53-482f-4b0b-8a3e-9da5503f88a9', 'eb8bfad1-fc08-43b0-9456-a4e0b80fc9e1', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'email', 'reservas@deviajeenviajeagencia.com', 'reservas@deviajeenviajeagencia.com', '2025-12-19T13:57:50.451848+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('8fdb0d22-517f-4223-875b-0468a5afeada', 'eb8bfad1-fc08-43b0-9456-a4e0b80fc9e1', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'phone', 'null', '+58 424-9221313', '2025-12-19T14:07:12.308706+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('301a4fdc-3311-47aa-99dc-f2c2d0951d0d', 'eb8bfad1-fc08-43b0-9456-a4e0b80fc9e1', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'website_url', 'https://www.facebook.com/deviajeenviajeagencia/?ref=_xav_ig_profile_page_web#', 'https://www.google.com/search?q=test', '2025-12-19T14:28:23.723508+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('cca23936-456c-4286-bbcb-2cf907668e53', 'eb8bfad1-fc08-43b0-9456-a4e0b80fc9e1', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'website_url', 'https://www.google.com/search?q=test', '', '2025-12-19T14:30:41.51092+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('206f892c-3605-4604-b1ab-407971ab7a65', 'eb8bfad1-fc08-43b0-9456-a4e0b80fc9e1', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'website_url', '', 'fetch.ts:7   PATCH https://hyeyvcqebzfkkcccypac.supabase.co/rest/v1/branches?id=eq.eb8bfad1-fc08-43b0-9456-a4e0b80fc9e1 400 (Bad Request) (anonymous)	@	fetch.ts:7 (anonymous)	@	fetch.ts:34 await in (anonymous)		 then	@	PostgrestBuilder.ts:122', '2025-12-19T14:31:26.909687+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('424e074f-69e2-4a4c-9ea3-c4afcb834267', 'eb8bfad1-fc08-43b0-9456-a4e0b80fc9e1', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'website_url', 'fetch.ts:7   PATCH https://hyeyvcqebzfkkcccypac.supabase.co/rest/v1/branches?id=eq.eb8bfad1-fc08-43b0-9456-a4e0b80fc9e1 400 (Bad Request) (anonymous)	@	fetch.ts:7 (anonymous)	@	fetch.ts:34 await in (anonymous)		 then	@	PostgrestBuilder.ts:122', '', '2025-12-19T14:31:30.813+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('82f78b6c-70d5-400f-b9ae-e14be8c6e406', 'eb8bfad1-fc08-43b0-9456-a4e0b80fc9e1', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'tiktok_url', 'null', 'tester_tiktok', '2025-12-19T14:50:53.798296+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('2331b58a-b45e-41f2-a471-ab058f95a65f', 'eb8bfad1-fc08-43b0-9456-a4e0b80fc9e1', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'facebook_url', 'null', '', '2025-12-19T14:56:54.755819+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('c23aa738-00e7-4db8-ab72-cb0d0b6e28cc', 'eb8bfad1-fc08-43b0-9456-a4e0b80fc9e1', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'facebook_url', '', 'https://www.facebook.com/deviajeenviajeagencia/?ref=_xav_ig_profile_page_web', '2025-12-19T14:56:58.541384+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('e3ba4360-ed4a-46ee-922a-be71ba89cf4f', 'eb8bfad1-fc08-43b0-9456-a4e0b80fc9e1', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'tiktok_url', 'tester_tiktok', '', '2025-12-19T14:57:04.722078+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('780da227-0bb8-4dbe-868b-9d4b14f4fb8c', '5b0ab35a-15bf-4cea-affd-23cd4e379b70', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'website_url', 'Sitio web', 'Sitio webhttps://example.com', '2025-12-19T15:15:40.275687+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('d5b6b144-9be7-47a7-bd20-bc2227d7df1f', '5b0ab35a-15bf-4cea-affd-23cd4e379b70', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'address', 'Calle Principal 456', 'Calle Principal 456', '2025-12-19T15:24:34.635513+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('a46240d3-3c33-42dd-889f-3821dd4fd853', '5b0ab35a-15bf-4cea-affd-23cd4e379b70', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'facebook_url', 'null', '', '2025-12-19T15:25:08.650981+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('e6d3f626-a40f-4d03-9d29-133782850ad9', '5b0ab35a-15bf-4cea-affd-23cd4e379b70', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'facebook_url', '', 'https://facebook.com/alana', '2025-12-19T15:27:12.358208+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('fdaf8899-3d6a-44eb-80c9-e22b1c3a1e7d', '5b0ab35a-15bf-4cea-affd-23cd4e379b70', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'address', 'Calle Principal 456Calle Principal 789', 'Calle Principal 789', '2025-12-19T15:33:11.987355+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('3221428f-a655-4bdd-a898-96f0c3cabfd6', '5b0ab35a-15bf-4cea-affd-23cd4e379b70', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'google_maps_url', 'null', 'https://maps.google.com/test', '2025-12-19T15:34:59.697143+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('c2159cf3-1753-401e-ad55-f6e7163a5e84', '5b0ab35a-15bf-4cea-affd-23cd4e379b70', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'tiktok_url', 'TikTok', 'TikTok', '2025-12-19T15:35:51.400074+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('20a7dc01-5787-41dd-9361-147108fbad51', '5b0ab35a-15bf-4cea-affd-23cd4e379b70', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'facebook_url', 'https://facebook.com/alana', 'https://facebook.com/alanatours', '2025-12-19T15:37:34.775246+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('63bc00c7-76af-48ea-9a2b-66ef1c0fd96d', '5b0ab35a-15bf-4cea-affd-23cd4e379b70', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'google_maps_url', 'https://maps.google.com/test', '', '2025-12-19T15:42:25.883876+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('cd787831-ec6e-4139-9711-009b80c2bcbe', 'eb8bfad1-fc08-43b0-9456-a4e0b80fc9e1', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'google_maps_url', 'null', 'https://maps.app.goo.gl/8d94MUnSg5tXdURf9', '2025-12-19T15:42:41.98317+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('7a5d26ee-b36f-42bf-a174-a0ecdfaf8aa6', 'eb8bfad1-fc08-43b0-9456-a4e0b80fc9e1', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'address', 'null', '', '2025-12-19T15:42:47.777879+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('75d00e0c-d1cd-4152-9527-8c2ead544e8f', 'eb8bfad1-fc08-43b0-9456-a4e0b80fc9e1', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'address', 'Centro Empresarial Ancora, Lecheria, Venezuela', 'Centro Empresarial Ancora, Lecheria, Venezuela', '2025-12-19T15:43:33.373227+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('408caf04-b0a3-4ca6-a532-2e9814d4903d', 'eb8bfad1-fc08-43b0-9456-a4e0b80fc9e1', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'google_maps_url', 'https://maps.app.goo.gl/8d94MUnSg5tXdURf9', '', '2025-12-19T15:44:06.758158+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('fdda62f1-b7cc-4f14-aa34-36744bdf4774', '801ac46d-a117-403a-909f-5123207d5836', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'create', NULL, NULL, 'Agencia creada: Arcadia Viajes', '2025-12-19T15:57:06.726964+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('ca799caf-8a94-49b5-8ad2-eea2c93e1ebb', '801ac46d-a117-403a-909f-5123207d5836', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'address', 'Centro comercial Anna, planta baja local #8', 'Centro comercial Anna, planta baja local #8', '2025-12-19T15:59:37.349422+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('879f85f8-d5ea-4c3f-b792-9986070b98c8', '801ac46d-a117-403a-909f-5123207d5836', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'phone', 'null', '584241542685', '2025-12-19T16:00:43.816543+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('9e409715-44b1-438a-9057-a0f14ea57c19', '801ac46d-a117-403a-909f-5123207d5836', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'website_url', 'null', 'https://arcadia-viajes.com/', '2025-12-19T16:01:04.19999+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('c16a0f86-a6ad-4244-9a3f-844d7c5a7c0a', '801ac46d-a117-403a-909f-5123207d5836', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'instagram_url', 'null', 'https://www.instagram.com/arcadia.viajes/?hl=es', '2025-12-19T16:01:14.553523+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('b6e02573-4be5-4ea5-b6e8-17a1976b81ec', '801ac46d-a117-403a-909f-5123207d5836', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'tiktok_url', 'null', 'https://tiktok.com/@viajaarcadia', '2025-12-19T16:01:36.165259+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('b574a86f-2a93-4ae1-87f8-b6b16424a1d5', '801ac46d-a117-403a-909f-5123207d5836', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'email', 'info@arcadia-viajes.com', 'info@arcadia-viajes.com', '2025-12-19T16:02:01.900517+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('c4d3d306-371c-4cb1-86fc-1ddb76c8a4c1', '801ac46d-a117-403a-909f-5123207d5836', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'address', 'Centro comercial Anna, planta baja local #8', 'Centro comercial Anna, planta baja local #8', '2025-12-19T16:03:00.402047+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('ea320e02-2737-4b71-adc1-89f576c2b8aa', '801ac46d-a117-403a-909f-5123207d5836', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'google_maps_url', 'null', 'https://maps.app.goo.gl/P3dhumuay8epBpeTA', '2025-12-19T16:03:19.412239+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('47676133-4821-484c-a815-46caeada942e', '03856513-016c-4a49-a789-323698dd1709', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'create', NULL, NULL, 'Agencia creada: Molina Viajes', '2025-12-19T16:05:54.371895+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('f084a7b3-1858-48e7-bee4-576c65eb9ed8', '03856513-016c-4a49-a789-323698dd1709', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'facebook_url', 'null', 'https://www.facebook.com/MolinaViajes/?locale=es_LA', '2025-12-19T16:06:32.80093+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('9ffa23af-a648-47df-ae59-65c12d1acac0', '03856513-016c-4a49-a789-323698dd1709', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'instagram_url', 'null', 'https://www.instagram.com/molinaviajes/', '2025-12-19T16:06:48.242357+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('cf7a325d-22b6-4a45-b48c-a13b139e24c5', '03856513-016c-4a49-a789-323698dd1709', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'website_url', 'null', 'https://www.molinaviajes.com/', '2025-12-19T16:06:53.251801+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('5c4a5e5e-8e27-4afe-9837-76d70b678146', '03856513-016c-4a49-a789-323698dd1709', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'email', 'SucursalMaturin@molinaviajes.com', 'SucursalMaturin@molinaviajes.com', '2025-12-19T16:07:19.394602+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('c01db593-36bb-4664-84dd-a7ab83510630', '03856513-016c-4a49-a789-323698dd1709', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'address', 'Av. Luis del Valle García, Anexo Centro Clínico La Pirámide, Local 1 y 2 P.B.', 'Av. Luis del Valle García, Anexo Centro Clínico La Pirámide, Local 1 y 2 P.B.', '2025-12-19T16:07:07.961027+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('e360eace-a583-45f1-afe2-7bb5bf77bc72', '03856513-016c-4a49-a789-323698dd1709', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'phone', '582916430297 ', '582916430297, 0414 766 6307', '2025-12-19T16:07:40.213077+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('b3f585cb-2655-450b-8856-8c65bde1b12e', '03856513-016c-4a49-a789-323698dd1709', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'google_maps_url', 'null', 'https://maps.app.goo.gl/U8yZW1JEYyUVJ5HXA', '2025-12-19T16:07:55.078708+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('c1aeebd0-495a-4bbe-bd8a-41697b9639b3', '03856513-016c-4a49-a789-323698dd1709', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'add_note', NULL, NULL, 'Nota añadida', '2025-12-19T16:21:20.779155+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('4342c41e-459e-42b8-a710-29097d7ee7b5', '1e8644f6-b48a-4cbd-932b-ae19087f8534', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'create', NULL, NULL, 'Agencia creada: Viajes Humboldt', '2025-12-19T17:13:35.707067+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('141a0080-a96f-4cc6-b1c6-e5482b33a3d1', '1e8644f6-b48a-4cbd-932b-ae19087f8534', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'google_maps_url', 'null', 'X5XP+2JQ Centro Comercial Sambil, Av Jóvito Villalba, Pampatar 6316, Nueva Esparta', '2025-12-19T17:13:44.900572+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('af7009a6-0540-442a-8286-31fcc3ea00bd', '1e8644f6-b48a-4cbd-932b-ae19087f8534', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'google_maps_url', 'X5XP+2JQ Centro Comercial Sambil, Av Jóvito Villalba, Pampatar 6316, Nueva Esparta', 'https://maps.app.goo.gl/t9pvTYkxq7jXSHFx7', '2025-12-19T17:13:56.03043+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('7f04abe4-0604-43e1-8b24-3a26aa42190d', '1e8644f6-b48a-4cbd-932b-ae19087f8534', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'address', 'Centro Comercial Sambil, Av Jóvito Villalba, Pampatar 6316, Nueva Esparta', 'Centro Comercial Sambil, Av Jóvito Villalba, Pampatar 6316, Nueva Esparta', '2025-12-19T17:14:34.825229+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('abc025fa-d73d-4dde-9516-293df758c810', '1e8644f6-b48a-4cbd-932b-ae19087f8534', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'instagram_url', 'null', 'https://www.instagram.com/viajeshumboldt/', '2025-12-19T17:14:41.285512+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('00f68aa1-077f-4f21-8ad5-5aa659c68765', '1e8644f6-b48a-4cbd-932b-ae19087f8534', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'website_url', 'null', 'https://www.facebook.com/ViajesHumboldt/?ref=_xav_ig_profile_page_web#', '2025-12-19T17:14:46.541602+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('2d3d2ae1-6883-47ab-ac83-7329e18caa9e', '1e8644f6-b48a-4cbd-932b-ae19087f8534', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'website_url', 'https://www.facebook.com/ViajesHumboldt/?ref=_xav_ig_profile_page_web#', '', '2025-12-19T17:14:50.220302+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('a5ea9857-a1ce-4409-bc8f-27fd304268ad', '1e8644f6-b48a-4cbd-932b-ae19087f8534', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'facebook_url', 'null', 'https://www.facebook.com/ViajesHumboldt/?ref=_xav_ig_profile_page_web#', '2025-12-19T17:14:52.171073+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('bda1ac52-d5c7-44d1-bc10-74336cba05c5', '1e8644f6-b48a-4cbd-932b-ae19087f8534', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'website_url', '', 'https://lufthansa-city-center.com/en/travel-agency-venezuela/viajes-humboldt-caracas/?fbclid=IwZXh0bgNhZW0CMTAAYnJpZBExNFJqdlQ2TUp0S0pKRjZXRHNydGMGYXBwX2lkEDIyMjAzOTE3ODgyMDA4OTIAAR7tzfuShXT40ZxMwA5N8jPWzeSuLMOZa2MJF-VFssvdH9A-xFTuiTqcbsoDQA_aem_Op0SWNdVM_c0LH9noEMB3g', '2025-12-19T17:15:04.308981+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('2b04f9fc-d478-4f7c-99d5-73ac0ef5e0b3', 'c0b226b7-0d16-4286-85f7-38911a9f442c', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'create', NULL, NULL, 'Agencia creada: Paria Tours & Eventos Venezuela C.A', '2025-12-19T17:25:40.704536+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('df2d89f5-999a-41d3-b649-faac05ff1289', 'c0b226b7-0d16-4286-85f7-38911a9f442c', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'website_url', 'null', 'https://www.facebook.com/pariavzla', '2025-12-19T17:25:57.014611+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('0e696acf-e1f1-4a8c-8e1f-b09a66f5d95d', 'c0b226b7-0d16-4286-85f7-38911a9f442c', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'phone', 'null', '58 4126972075', '2025-12-19T17:26:07.920511+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('39dc4123-ea70-4cab-9a6e-2655477a7c51', 'c0b226b7-0d16-4286-85f7-38911a9f442c', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'facebook_url', 'null', 'https://www.facebook.com/pariavzla', '2025-12-19T17:34:56.294543+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('ea7468a8-84bb-465f-9d8f-f9f3381a2ec7', 'c0b226b7-0d16-4286-85f7-38911a9f442c', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'phone', '58 4126972075', '584126972075', '2025-12-19T17:35:02.515954+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('26b321ee-e8ca-4098-b682-acdbabcb5054', 'c0b226b7-0d16-4286-85f7-38911a9f442c', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'contact_name', 'Yisbelis Rodríguez', 'Yisbelis Rodríguez', '2025-12-19T17:36:27.056131+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('a101984c-7385-45b8-92a0-a9298b3d92be', '6413f84c-c912-4dbb-979f-df685e8c5c12', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'create', NULL, NULL, 'Agencia creada: Luz del Mar', '2025-12-19T17:45:52.556314+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('5bcba70d-bbca-4416-a241-b4e71e24f2f7', '6413f84c-c912-4dbb-979f-df685e8c5c12', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'website_url', 'null', 'https://www.luzdelmarviajes.com/inicio', '2025-12-19T17:46:06.84908+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('56dd4536-6fe9-4ede-b199-852790ef68b9', '6413f84c-c912-4dbb-979f-df685e8c5c12', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'instagram_url', 'null', 'https://www.instagram.com/luzdelmarviajes/', '2025-12-19T17:46:11.12837+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('308a4c24-cc37-40aa-9b50-50236fa14119', '6413f84c-c912-4dbb-979f-df685e8c5c12', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'facebook_url', 'null', 'https://www.facebook.com/profile.php?id=100054572779260', '2025-12-19T17:46:21.130276+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('63b5ff22-cb09-4dec-ba64-e10bbcf39732', '6413f84c-c912-4dbb-979f-df685e8c5c12', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'website_url', 'https://www.luzdelmarviajes.com/inicio', 'https://www.luzdelmarviajes.com/inicio', '2025-12-19T17:46:44.541203+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('2f689de7-164e-4512-9964-a8efe71e4d0a', '6413f84c-c912-4dbb-979f-df685e8c5c12', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'facebook_url', 'https://www.facebook.com/profile.php?id=100054572779260', '', '2025-12-19T17:46:47.048424+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('a5120f60-075a-4779-97f7-22d81d03d8ad', '387273db-6b47-40d4-8cfe-eceb22fee3a8', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'create', NULL, NULL, 'Agencia creada: Global Paraiso Travel', '2025-12-19T20:47:01.720213+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('8cd027ed-a687-4f80-9859-5ff8106610c8', '387273db-6b47-40d4-8cfe-eceb22fee3a8', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'facebook_url', 'null', 'https://www.facebook.com/Globalparaisotravelca/', '2025-12-19T20:47:18.587929+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('0beeb89d-cb77-4395-9e5c-313147a0bee0', '387273db-6b47-40d4-8cfe-eceb22fee3a8', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'instagram_url', 'null', 'https://www.instagram.com/GlobalParaisoTravel/', '2025-12-19T20:47:21.335008+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('74113c4c-5e21-42ed-be99-6719ebea76dc', '387273db-6b47-40d4-8cfe-eceb22fee3a8', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'address', 'Calle Narváez con Fermín, Residencias Las Margaritas Edif. Torre II, PB, oficina 3, Porlamar, Isla de Margarita, Nueva Esparta, Venezuela.', 'Calle Narváez con Fermín, Residencias Las Margaritas Edif. Torre II, PB, oficina 3, Porlamar, Isla de Margarita, Nueva Esparta, Venezuela.', '2025-12-19T20:47:37.555853+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('d5d83e0a-f1d8-4c2b-9cc8-eb797dd190f5', 'd85e7bab-c455-4104-9c53-66d89a816139', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'create', NULL, NULL, 'Agencia creada: Mundo Turismo Margarita', '2025-12-19T20:52:44.977046+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('511caaf0-196e-470f-b883-c5e91122e89e', 'd85e7bab-c455-4104-9c53-66d89a816139', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'facebook_url', 'null', 'https://www.facebook.com/mundoturismomgta/', '2025-12-19T20:52:59.172042+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('2d1f6e91-2d4d-4c13-819c-305bc1b88c27', 'd85e7bab-c455-4104-9c53-66d89a816139', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'instagram_url', 'null', 'https://www.instagram.com/mundoturismomgta/', '2025-12-19T20:53:39.777271+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('76b96977-0669-4e61-aa34-61cb7b7f257c', 'd85e7bab-c455-4104-9c53-66d89a816139', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'website_url', 'null', 'https://www.mundoturismo.com.ve/newmundo/', '2025-12-19T20:53:47.473351+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('c9869a63-6004-4653-8fed-69af2d4089dc', 'd85e7bab-c455-4104-9c53-66d89a816139', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'address', 'Centro comercial el valle 6301 Porlamar, Venezuela', 'Centro comercial el valle 6301 Porlamar, Venezuela', '2025-12-19T20:54:17.919802+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('737a757d-3ca2-40ed-b2e0-ea7d9e83df66', 'ae9d6007-ed5c-4ef1-abc9-89f3bda8611f', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'create', NULL, NULL, 'Agencia creada: Agencia Tucuam', '2025-12-19T20:57:41.843362+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('1124eecc-e577-4798-b9c4-17b618b8afe2', 'ae9d6007-ed5c-4ef1-abc9-89f3bda8611f', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'facebook_url', 'null', 'https://www.facebook.com/agenciatucuam/?ref=pro_upsell_xav_ig_profile_page_web#', '2025-12-19T20:57:52.436536+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('e1cbda5d-f5a6-441c-ab68-a9b6fb556283', 'ae9d6007-ed5c-4ef1-abc9-89f3bda8611f', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'instagram_url', 'null', 'https://www.instagram.com/agenciatucuam/', '2025-12-19T20:57:57.870006+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('5da96cdd-08ba-448c-bd67-97b52fb34c2d', 'ae9d6007-ed5c-4ef1-abc9-89f3bda8611f', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'address', 'C.C Concord Local 161 - Frente CORPOELEC., Porlamar 6301', 'C.C Concord Local 161 - Frente CORPOELEC., Porlamar 6301', '2025-12-19T20:58:04.963638+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('fb194c29-a9c8-45c6-bd56-15a0a3b45f43', 'b819e317-fed4-43c2-aa78-9fd978c8d4a0', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'create', NULL, NULL, 'Agencia creada: Plandeviaje.vzla ', '2025-12-19T21:00:09.841598+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('995ced63-8057-43d0-9a74-520a1d9544a5', 'b819e317-fed4-43c2-aa78-9fd978c8d4a0', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'add_note', NULL, NULL, 'Nota añadida', '2025-12-19T21:00:26.44412+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('f169305a-cf36-45fe-90b3-94a17f8e2927', 'b819e317-fed4-43c2-aa78-9fd978c8d4a0', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'website_url', 'null', 'https://www.plandeviaje.com.ve/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnlXj8NiSvUf8zBTnRmVxJRqRwAWc9keV3Krlb4w7L30wrQx1fpNX5iTQWqls_aem_ZkULdX5wN5GI9uMOfbXXdw', '2025-12-19T21:00:49.695023+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('9e00cd55-8395-47d3-a4df-0bb184040020', 'b819e317-fed4-43c2-aa78-9fd978c8d4a0', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'instagram_url', 'null', '', '2025-12-19T21:00:57.553616+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('1b219b30-5d88-46f0-ad28-35cfb9ea4f04', 'b819e317-fed4-43c2-aa78-9fd978c8d4a0', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'facebook_url', 'null', 'https://www.facebook.com/plandeviaje.vzla/?ref=pl_edit_xav_ig_profile_page_web#', '2025-12-19T21:01:01.789435+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('a048017a-31d1-4d6a-a8e4-e3e49c815c8d', 'b819e317-fed4-43c2-aa78-9fd978c8d4a0', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'instagram_url', '', 'https://www.instagram.com/plandeviajemgta/', '2025-12-19T21:01:16.131173+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('9d729cd4-5879-4b4d-b1d9-982fb3ab13a1', 'b819e317-fed4-43c2-aa78-9fd978c8d4a0', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'address', 'Av. 4 de Mayo, Porlamar 6301, Nueva Esparta, Venezuela', 'Av. 4 de Mayo, Porlamar 6301, Nueva Esparta, Venezuela', '2025-12-19T21:01:31.483836+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('4757dbee-5c33-4f90-97c4-3341afe579f8', 'b819e317-fed4-43c2-aa78-9fd978c8d4a0', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'address', 'Av. 4 de Mayo, Porlamar 6301, Nueva Esparta, Venezuela', 'Av. 4 de Mayo, Porlamar 6301, Nueva Esparta, Venezuela', '2025-12-19T21:01:38.736418+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('23e92248-e3e7-41e1-918c-46f29c6ff172', 'b819e317-fed4-43c2-aa78-9fd978c8d4a0', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'google_maps_url', 'null', 'https://maps.app.goo.gl/JbC4ouQqCav3ixoY6', '2025-12-19T21:01:41.336213+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('943a23d3-4c84-4e4a-b4a0-9228800035b6', 'b819e317-fed4-43c2-aa78-9fd978c8d4a0', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'email', 'RESERVASPLANDEVIAJE@GMAIL.COM', 'RESERVASPLANDEVIAJE@GMAIL.COM', '2025-12-19T21:01:54.006599+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('dafa2d7e-ac61-449a-949c-7e27a270e75e', 'b819e317-fed4-43c2-aa78-9fd978c8d4a0', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'email', 'reservasplandeviaje@gmail.com', 'reservasplandeviaje@gmail.com', '2025-12-19T21:02:31.358437+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('31663db6-3cda-4010-a7db-d31375702d4e', '9e5dab3f-6c19-4d96-9263-33ea50825257', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'create', NULL, NULL, 'Agencia creada: Ubicalo Travel', '2025-12-19T21:04:28.395125+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('40683a21-2e12-4c0b-aefa-f8013e133847', '9e5dab3f-6c19-4d96-9263-33ea50825257', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'facebook_url', 'null', 'https://www.facebook.com/UBICALOTRAVEL/', '2025-12-19T21:04:42.748728+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('9eff666e-6a81-456e-be20-05a35bdeb83f', '9e5dab3f-6c19-4d96-9263-33ea50825257', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'instagram_url', 'null', 'https://www.instagram.com/ubicalotravel/', '2025-12-19T21:05:14.985145+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('df006d34-58c9-4ebc-acbf-1aab57956d8e', '9e5dab3f-6c19-4d96-9263-33ea50825257', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'add_note', NULL, NULL, 'Nota añadida', '2025-12-19T21:06:01.528518+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('57e27548-46a1-4679-84aa-a0da8f623f69', 'd31ef068-3c1b-4a4d-add0-67497f11de7e', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'create', NULL, NULL, 'Agencia creada: Ire Travel Agency', '2025-12-19T21:07:55.067629+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('09425e0b-c78a-4029-87bc-7f2f127969c2', 'd31ef068-3c1b-4a4d-add0-67497f11de7e', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'instagram_url', 'null', '', '2025-12-19T21:08:07.710127+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('911c42a0-813a-4a36-a7c3-2a0972c68933', 'd31ef068-3c1b-4a4d-add0-67497f11de7e', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'phone', 'null', '584126503015', '2025-12-19T21:08:11.890598+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('defe59d2-41d0-4318-91e1-4974fae28bc8', 'd31ef068-3c1b-4a4d-add0-67497f11de7e', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'email', 'iretravelagency@gmail.com', 'iretravelagency@gmail.com', '2025-12-19T21:08:18.001315+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('7a6bafa9-02cc-4e13-830d-f8242e655156', 'd31ef068-3c1b-4a4d-add0-67497f11de7e', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'email', 'iretravelagency@gmail.com', 'iretravelagency@gmail.com', '2025-12-19T21:08:26.076637+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('d78ae551-d82b-4716-aa15-36d1af999c9a', 'd31ef068-3c1b-4a4d-add0-67497f11de7e', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'email', 'iretravelagency@gmail.com', 'iretravelagency@gmail.com', '2025-12-19T21:08:27.833915+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('5e620ef7-781b-4ed6-a1cc-c0c870ef1e96', 'd31ef068-3c1b-4a4d-add0-67497f11de7e', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'phone', '584126503015', '584126503015, 584248340731', '2025-12-19T21:08:30.628077+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('cbc5ca6e-babe-4b0b-ba81-f201a2ebbfb2', 'd31ef068-3c1b-4a4d-add0-67497f11de7e', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'address', 'Playa el angel, avenida Aldonza Manrique, Pampatar, Nueva Esparta, Venezuela', 'Playa el angel, avenida Aldonza Manrique, Pampatar, Nueva Esparta, Venezuela', '2025-12-19T21:08:37.542406+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('348cae3b-dca9-4fc6-abcb-f0baafbebdfb', 'd31ef068-3c1b-4a4d-add0-67497f11de7e', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'website_url', 'null', '', '2025-12-19T21:08:57.308468+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('df2dd303-014d-4cb7-ac26-6cbe4b36d759', 'd31ef068-3c1b-4a4d-add0-67497f11de7e', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'instagram_url', '', 'https://www.instagram.com/iretravelagency/', '2025-12-19T21:08:59.703015+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('fc4422ce-5df8-40ff-adb0-343a009a70f8', 'd31ef068-3c1b-4a4d-add0-67497f11de7e', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'website_url', '', 'https://ireagenciadeviajes.my.canva.site/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnWu9YrNQq_E5fZ7IU_yMlNU6sMMlbfBkfi7zpBOUClibZYrZ9OUPhp1M4qg8_aem_RMuA2dm6QuiYUubMhH9AXA#about', '2025-12-19T21:09:05.181708+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('b47c654b-e75e-47dd-b962-6a48136c4920', 'd31ef068-3c1b-4a4d-add0-67497f11de7e', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'website_url', 'https://ireagenciadeviajes.my.canva.site/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnWu9YrNQq_E5fZ7IU_yMlNU6sMMlbfBkfi7zpBOUClibZYrZ9OUPhp1M4qg8_aem_RMuA2dm6QuiYUubMhH9AXA#about', 'https://ireagenciadeviajes.my.canva.site/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGnWu9YrNQq_E5fZ7IU_yMlNU6sMMlbfBkfi7zpBOUClibZYrZ9OUPhp1M4qg8_aem_RMuA2dm6QuiYUubMhH9AXA#home', '2025-12-19T21:09:10.647947+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('cce68be9-de4a-4775-aa62-2f99a7097145', '8235ec85-9c3b-4180-b9b8-e5b1ce34ee3d', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'create', NULL, NULL, 'Agencia creada: viajes trebol margarita', '2025-12-19T21:10:16.569591+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('26754785-9ef0-4b57-9e75-9c9cd1fcaa3e', '8235ec85-9c3b-4180-b9b8-e5b1ce34ee3d', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'contact_name', 'Derniel Franco', 'Derniel Franco', '2025-12-19T21:10:44.56826+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('da120162-09ef-42bc-9c81-c2a6861e089d', '8235ec85-9c3b-4180-b9b8-e5b1ce34ee3d', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'phone', 'null', '58 412-3010717', '2025-12-19T21:10:46.089775+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('f329373a-bc8f-43a4-bd07-e82c5152a386', '8235ec85-9c3b-4180-b9b8-e5b1ce34ee3d', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'phone', '58 412-3010717', '584123010717', '2025-12-19T21:10:48.125295+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('1ef620f8-b856-4672-824c-b6703766fb9a', '8235ec85-9c3b-4180-b9b8-e5b1ce34ee3d', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'instagram_url', 'null', 'https://www.instagram.com/viajestrebolmargarita/', '2025-12-19T21:11:07.887457+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('957da5e1-470c-4899-9584-75a8bab8ff16', '8235ec85-9c3b-4180-b9b8-e5b1ce34ee3d', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'add_note', NULL, NULL, 'Nota añadida', '2025-12-19T21:11:29.577561+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('e1a2388c-755b-4738-a48c-892444e4aff9', '83c09063-c454-4e7d-8fe6-5aa14b059f1c', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'create', NULL, NULL, 'Agencia creada: MyL viajes oficial', '2025-12-19T21:13:40.464946+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('f0bc7e57-0f36-468f-a164-ea27acf9b8cd', '83c09063-c454-4e7d-8fe6-5aa14b059f1c', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'instagram_url', 'null', 'https://www.instagram.com/mylviajesoficial/', '2025-12-19T21:13:55.605958+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('f6419f03-5497-48de-9b2c-b9bb380daf86', '83c09063-c454-4e7d-8fe6-5aa14b059f1c', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'add_note', NULL, NULL, 'Nota añadida', '2025-12-19T21:14:33.701076+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('e72ae32a-0841-43ce-8098-b335bbbb63c9', '8cf592a9-bbb1-467c-9731-3fa8beccde12', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'create', NULL, NULL, 'Agencia creada: Grupo BT Travel', '2025-12-19T21:17:08.685645+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('1b0730c2-aaa7-48b6-a103-d5884293cd63', '8cf592a9-bbb1-467c-9731-3fa8beccde12', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'instagram_url', 'null', 'https://www.instagram.com/bttravelvzla/', '2025-12-19T21:17:25.109008+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('cd8472d8-9bcc-41db-b12f-98b22e8f88e6', '8cf592a9-bbb1-467c-9731-3fa8beccde12', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'website_url', 'null', 'https://tiendadeturismo-test.web.app/', '2025-12-19T21:17:46.668608+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('b4985fb3-f522-463a-9293-82a162c19be9', '8cf592a9-bbb1-467c-9731-3fa8beccde12', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'facebook_url', 'null', 'https://www.facebook.com/profile.php?id=100091444620884&viewas=&show_switched_toast=false&show_switched_tooltip=false&is_tour_dismissed=false&is_tour_completed=false&show_podcast_settings=false&show_community_review_changes=false&should_open_composer=fals', '2025-12-19T21:18:43.34533+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('8b135f3b-5860-4258-88e8-8d96d7d314be', '8cf592a9-bbb1-467c-9731-3fa8beccde12', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'phone', 'null', '582952620627', '2025-12-19T21:18:54.796001+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('23069ecf-fe4f-4571-aa41-c46a157018ba', '8cf592a9-bbb1-467c-9731-3fa8beccde12', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'phone', '582952620627', '582952620627, 04147826845', '2025-12-19T21:21:29.249387+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('763e942e-85d9-4064-9b17-cec85bd28d92', '8cf592a9-bbb1-467c-9731-3fa8beccde12', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'phone', '582952620627, 04147826845', '582952620627, 04147826845, 04248116631', '2025-12-19T21:21:38.340056+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('3e492dc3-3529-41c4-8951-baf7f549e87c', '8cf592a9-bbb1-467c-9731-3fa8beccde12', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'phone', '582952620627, 04147826845, 04248116631', '582952620627, 04147826845, 04248116631, 04248664785', '2025-12-19T21:21:51.424727+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('83b213bb-a2e5-4dbf-b84a-8b01f6888d74', '36ba5c9d-3f4b-4342-af67-414cfbb086f2', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'create', NULL, NULL, 'Agencia creada: Viajes Margarita', '2025-12-19T21:28:58.206593+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('1bc2fdb4-070a-4ce6-8e0d-a1f3c64e31ed', '36ba5c9d-3f4b-4342-af67-414cfbb086f2', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'instagram_url', 'null', '', '2025-12-19T21:29:09.286985+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('9615813f-5b57-46ba-a48b-fa1b980c20af', '36ba5c9d-3f4b-4342-af67-414cfbb086f2', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'instagram_url', '', 'https://www.instagram.com/viajesamargarita/', '2025-12-19T21:29:11.905545+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('c918c3f4-99c8-48b7-841a-1d9e1c1f684c', '36ba5c9d-3f4b-4342-af67-414cfbb086f2', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'add_note', NULL, NULL, 'Nota añadida', '2025-12-19T21:29:22.517025+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('851e1069-9589-4471-9137-822717ebc61e', '36ba5c9d-3f4b-4342-af67-414cfbb086f2', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'website_url', 'null', '', '2025-12-19T21:29:34.023086+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('d905030d-c10e-4c72-9fd2-e0eac4dadfda', '36ba5c9d-3f4b-4342-af67-414cfbb086f2', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'phone', 'null', '584147881640', '2025-12-19T21:29:37.417453+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('d2f885b6-f32f-4082-8a2e-c1a846d3a787', 'eb797275-d6b2-4dff-a95d-c825c4970d51', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'create', NULL, NULL, 'Agencia creada: Lagarto Tours', '2025-12-19T21:30:38.183443+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('fdffe2c0-04be-4c07-bff1-5037cb301866', 'eb797275-d6b2-4dff-a95d-c825c4970d51', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'phone', 'null', '584121962703', '2025-12-19T21:30:52.703534+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('949bd625-eac1-482d-9abb-3f849a8905dd', 'eb797275-d6b2-4dff-a95d-c825c4970d51', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'city', 'Porlamar', 'Porlamar', '2025-12-19T21:31:24.920287+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('d08ffb15-60bf-4f5d-b9b3-56389af75ed7', 'eb797275-d6b2-4dff-a95d-c825c4970d51', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'email', 'lagartotour@gmail.com', 'lagartotour@gmail.com', '2025-12-19T21:31:25.486138+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('defafed4-07d9-4da1-87f6-686aa8a904d3', 'eb797275-d6b2-4dff-a95d-c825c4970d51', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'facebook_url', 'null', 'https://www.facebook.com/profile.php?id=61562756653666&ref=pl_edit_xav_ig_profile_page_web#', '2025-12-19T21:31:29.797402+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('8a059df7-1c69-4610-b691-da469bb5943a', 'eb797275-d6b2-4dff-a95d-c825c4970d51', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'instagram_url', 'null', 'https://www.instagram.com/lagartotour/', '2025-12-19T21:31:33.24083+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('0ddb5523-cd47-40d3-aace-8125f97b56e4', '3634d784-92a6-4498-8f16-86012b91a2e3', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'create', NULL, NULL, 'Agencia creada: Viajes Soleta', '2025-12-19T21:32:27.734697+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('afb9d4f8-81e1-4eee-8631-be1d82d3caf1', '3634d784-92a6-4498-8f16-86012b91a2e3', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'instagram_url', 'null', 'https://www.instagram.com/viajes_solesta/', '2025-12-19T21:32:34.867082+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('c003aaf0-d540-44ab-a928-7b941620985c', '3634d784-92a6-4498-8f16-86012b91a2e3', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'phone', 'null', '584141889873', '2025-12-19T21:33:14.36681+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('819c4df2-d2ce-43ac-acae-8aa6c64cccd4', '763b5aea-4d1b-4679-bf69-72ee280f5359', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'create', NULL, NULL, 'Agencia creada: Moon Travel', '2025-12-19T21:34:36.791855+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('6d8f13bf-a44a-4225-b59a-86acd3e208b6', '763b5aea-4d1b-4679-bf69-72ee280f5359', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'instagram_url', 'null', 'https://www.instagram.com/agenciamoontravels/', '2025-12-19T21:34:45.980262+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('a24dc3d4-dadf-410d-b3ee-d80f4160887e', '763b5aea-4d1b-4679-bf69-72ee280f5359', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'email', 'genej.valera@gmail.com', 'genej.valera@gmail.com', '2025-12-19T21:34:59.427954+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('f8091e22-88ff-4907-a612-f5158d52c921', '763b5aea-4d1b-4679-bf69-72ee280f5359', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'add_note', NULL, NULL, 'Nota añadida', '2025-12-19T21:35:33.233326+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('fc77908c-4d4b-48be-9246-917486db7e45', '76c5bdc9-bd51-474f-8e17-b2cb3c887d0f', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'create', NULL, NULL, 'Agencia creada: LL Tours', '2025-12-19T21:36:22.708534+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('fe2b8a08-1e63-4cb5-b171-42a7bdf32484', '76c5bdc9-bd51-474f-8e17-b2cb3c887d0f', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'instagram_url', 'null', 'https://www.instagram.com/lltours/', '2025-12-19T21:36:31.549689+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('8ed10662-121a-40a6-92d3-87139020546e', '76c5bdc9-bd51-474f-8e17-b2cb3c887d0f', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'email', 'ventas@lltours.com.ve', 'ventas@lltours.com.ve', '2025-12-19T21:37:26.948487+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('e63c775c-4f50-4577-8dcc-44ac9a44b106', '59f3143a-f821-481d-9f29-4e84fe01e55a', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'create', NULL, NULL, 'Agencia creada: Edene Travel', '2025-12-19T21:38:30.224505+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('275218f5-7d4a-457c-8e37-4acafb331cdf', '59f3143a-f821-481d-9f29-4e84fe01e55a', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'website_url', 'null', '', '2025-12-19T21:38:45.515957+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('cd079e9d-1067-4689-8c74-1a4b6e660f71', '59f3143a-f821-481d-9f29-4e84fe01e55a', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'instagram_url', 'null', 'https://www.instagram.com/edenetravel_int/', '2025-12-19T21:38:46.023581+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('3ab9b6c5-dbd2-4d00-8922-5239589259fa', 'a1a6851e-91c9-4beb-81a2-35afa60c8f07', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'create', NULL, NULL, 'Agencia creada: Turismo Light', '2025-12-19T21:40:21.63052+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('e8fd74f9-f605-4a66-95cc-72c07329b7e0', 'a1a6851e-91c9-4beb-81a2-35afa60c8f07', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'contact_name', 'Alejandro', 'Alejandro', '2025-12-19T21:40:34.522123+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('f9a91409-07f7-46b0-8e45-aaaafa29469b', 'a1a6851e-91c9-4beb-81a2-35afa60c8f07', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'phone', 'null', '', '2025-12-19T21:40:36.587008+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('e3e51631-d9a9-4a80-bc6b-28e88072f6ce', 'a1a6851e-91c9-4beb-81a2-35afa60c8f07', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'phone', '', '58 424-8584681', '2025-12-19T21:40:49.076111+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('a94bcd76-1f20-4ca3-8f50-254d4d436f25', 'a1a6851e-91c9-4beb-81a2-35afa60c8f07', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'phone', '58 424-8584681', '584248584681', '2025-12-19T21:40:53.301117+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('aabb3ea2-7739-4b1d-97e5-afc919e45732', 'a1a6851e-91c9-4beb-81a2-35afa60c8f07', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'instagram_url', 'null', 'https://www.instagram.com/turismolight/', '2025-12-19T21:40:59.473476+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('25aee274-e75b-498e-ac79-832b97d5caba', 'a1a6851e-91c9-4beb-81a2-35afa60c8f07', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'email', 'administracion@turismolight.com', 'administracion@turismolight.com', '2025-12-19T21:41:52.020321+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('dba96903-3f67-42ba-b85e-f83e2da38d84', 'd347cb66-9502-43aa-9028-de5905609497', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'create', NULL, NULL, 'Agencia creada: ZM Travel Margarita', '2025-12-19T21:43:06.615751+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('8442bba7-205f-4316-b1a3-f3ba4d778d1c', 'd347cb66-9502-43aa-9028-de5905609497', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'contact_name', 'Zoila Morao', 'Zoila Morao', '2025-12-19T21:43:20.671488+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('06fd1b09-98b3-46bf-8ab9-4b3d3beda42a', 'd347cb66-9502-43aa-9028-de5905609497', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'facebook_url', 'null', 'https://www.facebook.com/zoila.morao/', '2025-12-19T21:43:23.769872+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('472cb6b0-00fd-498a-8379-905aeb06a599', 'd347cb66-9502-43aa-9028-de5905609497', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'website_url', 'null', '', '2025-12-19T21:43:28.860789+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('6bf4cd58-95c6-4092-b800-415af92815e5', 'd347cb66-9502-43aa-9028-de5905609497', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'instagram_url', 'null', 'https://www.instagram.com/zmtravelmargarita/', '2025-12-19T21:43:31.787844+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('0b86e103-5e2e-4741-b71b-bd3dff53c081', '515cd58e-9170-466e-8246-3aaa74525900', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'create', NULL, NULL, 'Agencia creada: Hover Tours', '2025-12-19T21:44:58.349715+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('11a43847-0b80-4918-9c63-21b5c092e37f', '515cd58e-9170-466e-8246-3aaa74525900', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'tiktok_url', 'null', 'https://tiktok.com/@hovertours', '2025-12-19T21:45:08.321338+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('985eefb2-8feb-41dd-b7f7-d127566487ce', '515cd58e-9170-466e-8246-3aaa74525900', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'instagram_url', 'null', 'https://www.instagram.com/hovertours/', '2025-12-19T21:45:13.920674+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('9231446e-b552-4870-bbbb-61de1eb0114e', '515cd58e-9170-466e-8246-3aaa74525900', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'website_url', 'null', 'https://hovertours.com.ve/', '2025-12-19T21:45:21.615543+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('aea46f9c-d4b4-4ff5-80b9-9894f361e5d9', '515cd58e-9170-466e-8246-3aaa74525900', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'phone', 'null', '584124969257', '2025-12-19T21:45:36.310028+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('0de3f300-3ff6-416d-8949-cc0dd0c4b3e7', '515cd58e-9170-466e-8246-3aaa74525900', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'email', 'info@hovertours.com', 'info@hovertours.com', '2025-12-19T21:45:39.660323+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('ef297a09-1ae0-44a0-887c-ce568537a2d9', '515cd58e-9170-466e-8246-3aaa74525900', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'address', 'Calle Narváez, Residencias Las Margaritas, Isla de Margarita. Venezuela.', 'Calle Narváez, Residencias Las Margaritas, Isla de Margarita. Venezuela.', '2025-12-19T21:46:21.0359+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('888346ee-5443-49f0-af84-90c249483c4b', '515cd58e-9170-466e-8246-3aaa74525900', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'add_note', NULL, NULL, 'Nota añadida', '2025-12-19T21:46:44.15482+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('e17bea75-81d8-4779-a7c3-6c096f278ae2', '36ba5c9d-3f4b-4342-af67-414cfbb086f2', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'address', 'Av. Boulevard Ramon Vasquez Brito CC Boulevard Porlamar - Nivel PA Local A-9 Sector Boulevard Vasquez Brito Porlamar - Nueva Esparta - Z.P 6301, Porlamar 6301', 'Av. Boulevard Ramon Vasquez Brito CC Boulevard Porlamar - Nivel PA Local A-9 Sector Boulevard Vasquez Brito Porlamar - Nueva Esparta - Z.P 6301, Porlamar 6301', '2025-12-19T21:47:59.805363+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('e491e73e-c80f-49b6-a2d0-e2f2bc565f24', '36ba5c9d-3f4b-4342-af67-414cfbb086f2', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'city', 'Porlamar', 'Porlamar', '2025-12-19T21:48:02.227336+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('8f36419f-a9af-416a-a848-8393cc696195', '36ba5c9d-3f4b-4342-af67-414cfbb086f2', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'address', '', '', '2025-12-19T21:48:15.869202+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('78e5a784-b566-4f4f-a6de-8b9ab78cc01f', '6468071c-9e65-47e0-9d27-46f2d1da9a73', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'create', NULL, NULL, 'Agencia creada: Viajes Margarita VZLA', '2025-12-19T21:48:35.520712+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('488666f0-0baa-4e4b-ae5f-ae0a923c7c6d', '6468071c-9e65-47e0-9d27-46f2d1da9a73', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'address', '', '', '2025-12-19T21:48:47.093106+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('5d3e11ec-0967-4fc2-acbb-6c321b67204a', '6468071c-9e65-47e0-9d27-46f2d1da9a73', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'instagram_url', 'null', 'https://www.instagram.com/viajesmargaritavzla/', '2025-12-19T21:48:49.136992+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('a0866e54-4b35-437c-b616-962a96267579', '6468071c-9e65-47e0-9d27-46f2d1da9a73', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'address', 'Av. Boulevard Ramon Vasquez Brito CC Boulevard Porlamar - Nivel PA Local A-9 Sector Boulevard Vasquez Brito Porlamar - Nueva Esparta - Z.P 6301, Porlamar 6301', 'Av. Boulevard Ramon Vasquez Brito CC Boulevard Porlamar - Nivel PA Local A-9 Sector Boulevard Vasquez Brito Porlamar - Nueva Esparta - Z.P 6301, Porlamar 6301', '2025-12-19T21:48:54.561962+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('0923f425-2a93-4bfc-bdcd-3f5c59a39a14', '6468071c-9e65-47e0-9d27-46f2d1da9a73', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'tiktok_url', 'null', 'https://www.tiktok.com/@viajesmargaritavz?fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn1VCdP7Hcuj6T8w6hvB7D3Su8re0zCWOJPqTiNGxfnpyuK5M2cf-Hhodp3ts_aem_pRMalSjj0xpgouaR43IFgw', '2025-12-19T21:49:18.990887+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('328233e8-9276-430a-90c3-58c611983108', '6468071c-9e65-47e0-9d27-46f2d1da9a73', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'phone', 'null', '58 424-8733794', '2025-12-19T21:49:43.008905+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('05eacb4f-f138-4622-85a8-84ee6b3d6527', '6468071c-9e65-47e0-9d27-46f2d1da9a73', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'phone', '58 424-8733794', '584248733794', '2025-12-19T21:49:47.015721+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('f1bc4657-6b67-4127-a483-817fe562a2cc', 'bbbe77f1-fd71-4f44-9e69-2c7f64c77bda', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'create', NULL, NULL, 'Agencia creada: Vene travel', '2025-12-19T21:52:11.123622+00:00')
ON CONFLICT (id) DO NOTHING;

INSERT INTO agency_activity_log (id, branch_id, user_id, action_type, field_name, old_value, new_value, created_at)
VALUES ('24b0c1bd-a1c9-4209-91f2-73a044a0ea74', 'bbbe77f1-fd71-4f44-9e69-2c7f64c77bda', '346d4255-320a-4f9a-bd86-4e2ddeee3ade', 'update', 'instagram_url', 'null', 'https://www.instagram.com/venetravel/', '2025-12-19T21:52:24.675533+00:00')
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- VERIFICACIÓN
-- ============================================================

SELECT 'profiles' as tabla, COUNT(*) as registros FROM profiles
UNION ALL
SELECT 'agencies', COUNT(*) FROM agencies
UNION ALL
SELECT 'branches', COUNT(*) FROM branches
UNION ALL
SELECT 'agency_notes', COUNT(*) FROM agency_notes
UNION ALL
SELECT 'agency_activity_log', COUNT(*) FROM agency_activity_log;

-- Verificar usuarios
SELECT id, email, name, role,
       CASE WHEN password_hash IS NOT NULL THEN '✅ Configurado' ELSE '❌ Pendiente' END as password_status
FROM profiles;
