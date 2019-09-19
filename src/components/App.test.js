import { wrapperCreator } from 'util/testing';
import { UnconnectedApp } from './App';
import NavDrawer from './NavDrawer';

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
    fetchSchools: () => {},
  };
  const getWrapper = wrapperCreator(UnconnectedApp, defaultProps);

  it('should render correctly', () => {
    const fetchSchoolsMock = jest.fn();
    const wrapper = getWrapper({ fetchSchools: fetchSchoolsMock });

    expect(wrapper.get(0)).toMatchSnapshot();
    expect(fetchSchoolsMock).toHaveBeenCalled();
  });

  it('should toggle navigation', () => {
    const wrapper = getWrapper();
    wrapper.find(NavDrawer).props().closeFunc();

    expect(wrapper.find(NavDrawer).prop('isOpen')).toBe(true);
  });
});
