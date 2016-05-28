const MATCH_LAST_SEMICOLON_REGEX = /;\s*$/;

const codeToCustomMetadata = (code) => {
  try {
    return JSON.parse(code.replace(MATCH_LAST_SEMICOLON_REGEX, ''));
  } catch (err) {
    return {
      err: err.toString(),
    };
  }
};

export default codeToCustomMetadata;
