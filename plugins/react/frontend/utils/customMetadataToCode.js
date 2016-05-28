const customMetadataToCode = (metadata) => `${JSON.stringify({ ...metadata }, null, 2)};`;

export default customMetadataToCode;
