/** Local filename for a Contentful asset: `{assetId}-{fileName}`, stable across runs. */
export const assetFile = (a: { sys: { id: string }; fields: { file?: { fileName: string } } }) =>
	`${a.sys.id}-${a.fields.file?.fileName.replace(/[^\w.-]+/g, "_")}`;
