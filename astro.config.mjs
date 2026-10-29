// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://athdevtech.github.io',
	integrations: [
		starlight({
			title: 'NetLab TH',
			description: 'คลังความรู้อินเทอร์เน็ตและเครือข่าย อธิบายหลักการทำงานของเน็ตบ้าน ไฟเบอร์ Wi-Fi และอุปกรณ์เครือข่าย',
			defaultLocale: 'root',
			locales: { root: { label: 'ไทย', lang: 'th' } },
			favicon: '/favicon.svg',
			lastUpdated: false,
			customCss: [
				'@fontsource/ibm-plex-sans-thai/400.css',
				'@fontsource/ibm-plex-sans-thai/600.css',
				'@fontsource/ibm-plex-sans-thai/700.css',
				'./src/styles/custom.css',
			],
			routeMiddleware: './src/routeData.ts',
			sidebar: [
				{ label: 'พื้นฐานอินเทอร์เน็ต', items: [{ autogenerate: { directory: 'internet-basics' } }] },
				{ label: 'เน็ตไฟเบอร์', items: [{ autogenerate: { directory: 'fiber' } }] },
				{ label: 'Wi-Fi', items: [{ autogenerate: { directory: 'wifi' } }] },
				{ label: 'อุปกรณ์เครือข่าย', items: [{ autogenerate: { directory: 'devices' } }] },
				{ label: 'เครือข่ายในบ้าน', items: [{ autogenerate: { directory: 'home-network' } }] },
				{ label: 'ความปลอดภัย', items: [{ autogenerate: { directory: 'security' } }] },
				{ label: 'แก้ปัญหาเน็ต', items: [{ autogenerate: { directory: 'troubleshooting' } }] },
				{ label: 'เครื่องมือ', items: [{ autogenerate: { directory: 'tools' } }] },
				{ label: 'เกี่ยวกับเว็บ', link: '/about/' },
			],
		}),
	],
});
