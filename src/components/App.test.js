import { wrapperCreator } from 'util/testing';
import { auth } from 'util/firebase';
import { UnconnectedApp } from './App';
import NavDrawer from './NavDrawer';

jest.mock('util/firebase');
jest.mock('images/facebook-logo.png');
jest.mock('images/hero-image.jpg');
jest.mock('images/amy.jpg');
jest.mock('images/helen.jpg');
jest.mock('images/facebook-logo.png');
jest.mock('images/joon.jpeg');
jest.mock('images/julia.jpg');
jest.mock('images/kevin.jpg');
jest.mock('images/madison.jpg');
jest.mock('images/surprised_student.svg');

describe('App', () => {
  const defaultProps = {
    fetchCurrentTerm: () => {},
  };
  const getWrapper = wrapperCreator(UnconnectedApp, defaultProps);

  beforeEach(() => {
    auth.onAuthStateChanged = jest.fn(callback => callback(true));
  });

  it('should render correctly', () => {
    const wrapper = getWrapper();

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('should sign in and fetch data correctly', () => {
    const fetchCurrentTermMock = jest.fn();

    getWrapper({
      fetchCurrentTerm: fetchCurrentTermMock,
    });

    expect(auth.signInAnonymously).toHaveBeenCalled();
    expect(fetchCurrentTermMock).toHaveBeenCalled();
  });

  it('does not fetch data if signed out', () => {
    auth.onAuthStateChanged = jest.fn(callback => callback(false));
    const fetchCurrentTermMock = jest.fn();

    getWrapper({
      fetchCurrentTerm: fetchCurrentTermMock,
    });

    expect(fetchCurrentTermMock).not.toHaveBeenCalled();
  });

  it('should toggle navigation', () => {
    const wrapper = getWrapper();
    wrapper.find(NavDrawer).props().closeFunc();

    expect(wrapper.find(NavDrawer).prop('isOpen')).toBe(true);
  });
});
