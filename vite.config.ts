import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {type ManifestOptions, VitePWA} from "vite-plugin-pwa";

// https://vite.dev/config/

const manifest: Partial<ManifestOptions> | false = {
    "theme_color": "#ffffff",
    "background_color": "#2EC6FE",
    "icons": [
        {
            "purpose": "maskable",
            "sizes": "512x512",
            "src": "icon512_maskable.png",
            "type": "image/png"
        },
        {
            "purpose": "any",
            "sizes": "512x512",
            "src": "icon512_rounded.png",
            "type": "image/png"
        }
    ],
    screenshots: [
        {
            src: "/screenshots/destop.png",
            type: "image/png",
            sizes: "1444x745",
            form_factor: "wide"
        },
        {
            src: "/screenshots/mobile.png",
            type: "image/png",
            sizes: "369x663",
            form_factor: "narrow"
        }
    ],
    "orientation": "any",
    "display": "standalone",
    "lang": "ru-RU",
    "name": "Umamiq",
    "short_name": "UMIQ"
}


export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            workbox: {
                globPatterns: ["**/*.{html,css,js,ico,png,svg}"]
            },
            manifest
        })
    ],
    server: {
        allowedHosts: ['345c629bb451.ngrok-free.app'],
    },
    optimizeDeps: {
        exclude: ['lucide-react'],
    },
})
