# Command Center Dashboard

## Overview
The Dashboard has been evolved into a visual **Command Center** designed to provide immediate, high-level insights into the commercial health and geographic reach of the operation.

## Key Components

### 1. KPI Cards
High-level cards displaying critical metrics at a glance:
- **Total Agencias**: Total count of active agencies.
- **Clientes Activos**: Agencies with `relationship_type = 'client'`.
- **Tasa Conversión**: Calculated as `Active Clients / (Active Clients + Total Leads)`.
- **Leads Calientes**: Count of leads with `lead_temperature = 'hot'`.

### 2. Funnel Chart (Vertical Bar)
Visualizes the sales pipeline volume across stages:
- **Sin Contactar**: Initial stage.
- **Contactado**: Communication initiated.
- **Interesado**: Lead showing intent.
- **Cliente**: Successfully converted.

### 3. Lead Temperature (Donut Chart)
Distribution of lead quality to prioritize efforts:
- **Frio**: Blue
- **Tibio**: Yellow/Orange
- **Caliente**: Red

### 4. Venezuela Map (Interactive Analytics)
A detailed geographic density map of Venezuela.
- **Split-Screen Layout**: Interactive map on the left, analytical metrics on the right.
- **Visuals**: States colored by density (quantile scale).
- **Analytics**: Ranked list of states by agency count, with percentage bars and exact figures.

### 5. Digital Presence (Radar Chart)
Visualizes the adoption of digital platforms by agencies:
- Website
- Instagram
- TikTok
- Facebook

## Technical Implementation
- **Data Source**: `/api/stats` (Aggregated, optimized SQL query).
- **Libraries**: `recharts` (charts), `react-simple-maps` (map), `d3-scale` (color scales).
- **Responsiveness**: Fully responsive layout adapting to mobile and desktop screens.
