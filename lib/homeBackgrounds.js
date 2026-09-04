// Sept 4, 2026 — the list of Home dashboard backgrounds a student can land
// on. One of these is picked at random by app/api/student-login/route.js
// each time a student actually logs in, held for that whole session via
// the cc_home_bg cookie, and re-validated against this same list by
// app/home/page.js before ever being used as an image src. Shared here
// (rather than exported from the route file directly) so both sides
// import one source of truth instead of a page importing from an API
// route module.
export const HOME_BACKGROUNDS = [
  "/student/hub_background.jpg",
  "/student/hub_background_library.jpg",
  "/student/hub_background_bridge.jpg",
  "/student/hub_background_mess_hall.jpg",
  "/student/hub_background_observatory.jpg",
  "/student/hub_background_work_room.jpg",
];
