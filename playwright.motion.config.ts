import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: "./tests/motion",
    timeout: 60_000,
    expect: {
        timeout: 10_000,
    },
    use: {
        baseURL: "http://127.0.0.1:3000",
        trace: "retain-on-failure",
        screenshot: "only-on-failure",
    },
    webServer: {
        command: "npm run dev -- --hostname 127.0.0.1 --port 3000",
        url: "http://127.0.0.1:3000",
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
    },
    projects: [
        {
            name: "desktop-motion",
            use: {
                ...devices["Desktop Chrome"],
                viewport: { width: 1440, height: 1100 },
            },
        },
        {
            name: "mobile-motion",
            use: {
                ...devices["Pixel 7"],
            },
        },
        {
            name: "reduced-motion",
            use: {
                ...devices["Desktop Chrome"],
                viewport: { width: 1280, height: 900 },
                reducedMotion: "reduce",
            },
        },
    ],
});
