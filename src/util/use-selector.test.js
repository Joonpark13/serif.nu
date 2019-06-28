import { fromJS } from 'immutable';
import * as reactRedux from 'react-redux';
import useSelector from './use-selector';

function selector() {}

describe('useSelector', () => {
  it('returns vanilla JS value if returned value is immutable', () => {
    reactRedux.useSelector.mockReturnValue(fromJS([]));
    const value = useSelector(selector);

    expect(value).toEqual([]);
    expect(reactRedux.useSelector).toHaveBeenCalledWith(selector);
  });

  it('returns unchanged value if returned value is not immutable', () => {
    reactRedux.useSelector.mockReturnValue([]);
    const value = useSelector(() => {});

    expect(value).toEqual([]);
    expect(reactRedux.useSelector).toHaveBeenCalledWith(selector);
  });
});
