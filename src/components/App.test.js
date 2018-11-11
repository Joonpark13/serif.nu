import { wrapperCreator } from 'util/testing';
import { auth } from 'util/firebase';
import { UnstyledApp, styles } from './App';

jest.mock('util/firebase');

describe('App', () => {
  const defaultProps = {
    fetchSchools: () => {},
    fetchSearchIndex: () => {},
  };
  const getWrapper = wrapperCreator(UnstyledApp, defaultProps, styles);

  beforeEach(() => {
    auth.signInAnonymously = jest.fn();
    auth.onAuthStateChanged = jest.fn(callback => callback(true));
  });

  it('should render correctly', () => {
    const wrapper = getWrapper();

    expect(wrapper).toMatchSnapshot();
  });

  it('should sign in and fetch data correctly', () => {
    const fetchSchoolsMock = jest.fn();
    const fetchSearchIndexMock = jest.fn();

    getWrapper({
      fetchSchools: fetchSchoolsMock,
      fetchSearchIndex: fetchSearchIndexMock,
    });

    expect(auth.signInAnonymously).toHaveBeenCalled();
    expect(fetchSchoolsMock).toHaveBeenCalled();
    expect(fetchSearchIndexMock).toHaveBeenCalled();
  });

  it('does not fetch data if signed out', () => {
    auth.onAuthStateChanged = jest.fn(callback => callback(false));
    const fetchSchoolsMock = jest.fn();
    const fetchSearchIndexMock = jest.fn();

    getWrapper({
      fetchSchools: fetchSchoolsMock,
      fetchSearchIndex: fetchSearchIndexMock,
    });

    expect(fetchSchoolsMock).not.toHaveBeenCalled();
    expect(fetchSearchIndexMock).not.toHaveBeenCalled();
  });

  it('should toggle navigation', () => {
    const wrapper = getWrapper();
    wrapper.instance().toggleNav();

    expect(getWrapper).toMatchSnapshot();
  });
});
