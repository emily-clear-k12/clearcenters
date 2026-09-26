# Maker Studio generated images

Wave 3 Paint / Postcard AI images are **not** written here at runtime on Vercel.

**Storage choice:** the image API returns a data URL (or temporary remote URL). The student client saves it inside `maker_studio_data.modes[id].imageDataUrl` (JSONB). Serverless filesystem under `public/` is ephemeral, so runtime writes would disappear.

This folder is reserved if a future durable upload (e.g. Supabase Storage / Blob) lands. Hand-authored library art still lives in `public/maker/` (see parent README).
