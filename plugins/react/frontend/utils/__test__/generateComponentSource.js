const generateComponentSource = require('../generateComponentSource');
const expect = require('chai').expect;

describe('generateComponentSource', () => {
  it('handles no props', () => {
    const source = generateComponentSource('UserCard');
    expect(source).to.equal('<UserCard />');
  });

  it('handle children props', () => {
    const source = generateComponentSource('button', { children: 'click me' });
    expect(source).to.equal('<button>click me</button>');
  });

  it('handles string props', () => {
    const source = generateComponentSource('UserCard', { name: 'User' });
    expect(source).to.equal('<UserCard name="User" />');
  });

  it('handles number props', () => {
    const source = generateComponentSource('Component', { count: 1 });
    expect(source).to.equal('<Component count={1} />');
  });

  it('handles boolean props', () => {
    const source = generateComponentSource('Component', { isActive: true });
    expect(source).to.equal('<Component isActive={true} />');
  });

  it('handles nested object props', () => {
    const source = generateComponentSource('Component', { style: { color: 'red' } });
    expect(source).to.equal('<Component style={{"color":"red"}} />');
  });

  it('handles array props', () => {
    const source = generateComponentSource('Component', { results: [223, 665, 20] });
    expect(source).to.equal('<Component results={[223,665,20]} />');
  });

  it.skip('handles date props', () => {
    const createdAt = new Date('2016-06-12T06:52:13.000Z');
    const source = generateComponentSource('Component', { createdAt });
    expect(source).to.equal(
      '<Component createdAt={new Date(\'2016-06-12T06:52:13.000Z\')} />'
    );
  });

  it('handles multiple props', () => {
    const source = generateComponentSource('Component', { a: '1', b: '2' });
    expect(source).to.equal('<Component a="1" b="2" />');
  });

  it('ignores function props', () => {
    const source = generateComponentSource('Component', { onClick: () => {} });
    expect(source).to.equal('<Component />');
  });
});
