import { mockStyles } from './testing';

describe('mockStyles', () => {
  it('returns a object with each style property as empty strings', () => {
    const style = {
      icon: {
        color: 'white',
      },
      title: {
        marginBotton: 2,
      },
    };

    expect(mockStyles(style)).toEqual({ icon: '', title: '' });
  });
});
