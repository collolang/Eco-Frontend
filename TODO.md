# EcoTrack Frontend - Backend-Dependent Calculations

## Progress: 0/7 ✅

### Backend Setup (User to complete first)
- [ ] Add `getScore` and `getPrediction` to `ecotrack-backend/src/controllers/emissionsController.js`
- [ ] Add routes to `ecotrack-backend/src/routes/emissions.js` 
- [ ] Restart backend server `npm run dev`
- [ ] Test endpoints: `GET /api/companies/{id}/emissions/score`, `/prediction`

### Frontend Changes
1. ✅ Update api.js with new functions
2. ✅ Edit DashboardPanel.jsx - remove client calcs, use new APIs
3. ✅ Edit DataEntry.jsx - remove calcScore, use entry.score or API
4. ✅ Verified no remaining client-side calcs
5. [ ] Test app functionality
5. [ ] Test DataEntry table scores
6. [ ] Verify no client-side math remains (search_files)
7. [ ] Complete ✅

