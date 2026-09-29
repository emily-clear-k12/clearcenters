-- Broadcast Booth wave10: SCI.3.9B-BB, SCI.3.10A-BB, SCI.3.10B-BB, SCI.3.10C-BB.
-- Playable content is in lib/cases/broadcast-booth/wave10.js.
-- Safe to run twice.

INSERT INTO cases (standard, title, engine, grade, subject) VALUES
  ('SCI.3.9B-BB', 'Broadcast Booth: The planet walk (Explain)', 'broadcast_booth', 3, 'Science'),
  ('SCI.3.10A-BB', 'Broadcast Booth: Same day, two cities (Correspondent)', 'broadcast_booth', 3, 'Science'),
  ('SCI.3.10B-BB', 'Broadcast Booth: What is soil made of? (Explain)', 'broadcast_booth', 3, 'Science'),
  ('SCI.3.10C-BB', 'Broadcast Booth: The road that disappeared (Correspondent)', 'broadcast_booth', 3, 'Science')
ON CONFLICT (standard) DO UPDATE SET
  title = EXCLUDED.title, engine = EXCLUDED.engine, grade = EXCLUDED.grade, subject = EXCLUDED.subject;

UPDATE cases SET
  learning_target = 'I can name the planets in order from the Sun.',
  lesson_summary = 'Grade 3 Explain broadcast. TEKS 3.9B. On a hallway planet walk, students explain the order of the eight planets from the Sun and a memory trick for it. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'Pluto is a dwarf planet, so it is not one of the eight planets. Earth is the third planet, not the first. The Sun is a star, not a planet.'
WHERE standard = 'SCI.3.9B-BB';

UPDATE cases SET
  learning_target = 'I can compare the weather in two places at the same time using air temperature, wind direction, and precipitation.',
  lesson_summary = 'Grade 3 Correspondent broadcast. TEKS 3.10A. From a weather desk, students compare one winter morning in Amarillo (38 degrees, north wind, light snow) and Houston (64 degrees, south wind, rain showers). Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'Wind direction is where the wind comes from, not where it is going. The whole state does not have the same weather at the same time. The readings are a sample morning, not a forecast.'
WHERE standard = 'SCI.3.10A-BB';

UPDATE cases SET
  learning_target = 'I can explain that soils like sand and clay form from weathered rock and from rotting plant and animal remains.',
  lesson_summary = 'Grade 3 Explain broadcast. TEKS 3.10B. Using a soil jar test, students explain that sand and clay come from weathered rock and that rotting leaves and animal remains are part of soil too. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'Soil is not just dirt; it is made of broken rock and material from once-living things. Sand and clay are different sizes of rock pieces. Soil forms very slowly.'
WHERE standard = 'SCI.3.10B-BB';

UPDATE cases SET
  learning_target = 'I can use a model to describe rapid changes to Earth''s surface, such as landslides, earthquakes, and volcanic eruptions.',
  lesson_summary = 'Grade 3 Correspondent broadcast. TEKS 3.10C. From a mountain road covered by a landslide, and a class sand-tray model, students describe how landslides, earthquakes, and volcanoes change the land quickly. Teacher listens. Not AI-graded. About 25–30 minutes.',
  misconception_note = 'Not all changes to the land are slow; landslides and earthquakes happen in seconds or minutes. This is the fast-change broadcast; the canyon is the slow-change one.'
WHERE standard = 'SCI.3.10C-BB';
