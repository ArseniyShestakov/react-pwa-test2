import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // If you are deploying to a subdirectory, for example https://<user>.github.io/<repo>/,
  // you need to set the base property to '/<repo>/'.
  // base: '/your-repo-name/',
})
