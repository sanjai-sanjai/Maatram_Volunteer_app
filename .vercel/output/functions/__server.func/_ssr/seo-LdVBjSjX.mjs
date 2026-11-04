//#region node_modules/.nitro/vite/services/ssr/assets/seo-LdVBjSjX.js
function seo(title, description) {
	const full = `${title} · Maatram Volunteer Quest`;
	return { meta: [
		{ title: full },
		{
			name: "description",
			content: description
		},
		{
			property: "og:title",
			content: full
		},
		{
			property: "og:description",
			content: description
		},
		{
			property: "og:type",
			content: "website"
		},
		{
			name: "twitter:card",
			content: "summary_large_image"
		}
	] };
}
//#endregion
export { seo as t };
