import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

const SITE = 'https://athdevtech.github.io';
const NAME = 'NetLab TH';
const CATEGORIES: Record<string, string> = {
	'internet-basics': 'พื้นฐานอินเทอร์เน็ต',
	fiber: 'เน็ตไฟเบอร์',
	wifi: 'Wi-Fi',
	devices: 'อุปกรณ์เครือข่าย',
	'home-network': 'เครือข่ายในบ้าน',
	security: 'ความปลอดภัย',
	troubleshooting: 'แก้ปัญหาเน็ต',
	tools: 'เครื่องมือ',
};

const abs = (p: string) => (/^https?:\/\//.test(p) ? p : SITE + (p.startsWith('/') ? p : '/' + p));

export const onRequest = defineRouteMiddleware((context) => {
	const route = context.locals.starlightRoute;
	const { entry, id, head } = route;
	const data = entry.data as any;
	const slug = id.replace(/\/index$/, '').replace(/^index$/, '');
	const url = `${SITE}/${slug ? slug + '/' : ''}`;
	const parts = slug.split('/').filter(Boolean);
	const isHome = parts.length === 0;
	const image = abs(data.cover || '/images/og-default.png');

	head.push({ tag: 'meta', attrs: { property: 'og:image', content: image } });
	head.push({ tag: 'meta', attrs: { property: 'og:locale', content: 'th_TH' } });
	head.push({ tag: 'meta', attrs: { name: 'twitter:image', content: image } });

	const graph: any[] = [];
	if (isHome) {
		graph.push({
			'@context': 'https://schema.org',
			'@type': 'WebSite',
			name: NAME,
			url: SITE + '/',
			inLanguage: 'th',
			description: data.description,
		});
	} else {
		const crumbs = [{ name: NAME, item: SITE + '/' }];
		if (CATEGORIES[parts[0]]) crumbs.push({ name: CATEGORIES[parts[0]], item: `${SITE}/${parts[0]}/` });
		if (parts.length > 1) crumbs.push({ name: data.title, item: url });
		graph.push({
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.item })),
		});
		if (parts.length > 1 && data.pubDate) {
			graph.push({
				'@context': 'https://schema.org',
				'@type': 'Article',
				headline: data.title,
				description: data.description,
				datePublished: new Date(data.pubDate).toISOString().slice(0, 10),
				image,
				inLanguage: 'th',
				mainEntityOfPage: url,
				publisher: { '@type': 'Organization', name: NAME },
			});
		}
	}
	for (const g of graph) {
		head.push({ tag: 'script', attrs: { type: 'application/ld+json' }, content: JSON.stringify(g) });
	}
});
