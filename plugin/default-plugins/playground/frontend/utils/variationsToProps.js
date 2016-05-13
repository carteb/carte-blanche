const MATCH_FIRST_CURLY_BRACES_REGEX = /^\{/;
const MATCH_LAST_CURLY_BRACES_REGEX = /\};$/;
const PROPS_REGEX = /\s*props: /;
const LAST_COMMA_REGEX = /,\s*$/;

const variationsToProps = (variations) => {
  let props;
  const code =
    variations
      .replace(MATCH_FIRST_CURLY_BRACES_REGEX, '')
      .replace(MATCH_LAST_CURLY_BRACES_REGEX, '')
      .replace(PROPS_REGEX, 'props = ')
      .replace(LAST_COMMA_REGEX, ';');
  eval(code); // eslint-disable-line no-eval
  return props;
};

export default variationsToProps;
