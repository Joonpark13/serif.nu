import { ListItem } from '@material-ui/core';
import { wrapperCreator, mockUseSelector, mockUseDispatch } from 'util/testing';
import { changeBrowseLevel, fetchSubjectsRequest, selectSchoolInBrowse } from 'actions';
import { UnstyledSchools, styles } from './Schools';

describe('Schools', () => {
  const testSchools = [{
    id: 'MUSIC',
    name: 'Bienen School of Music',
    term: '4720',
  }, {
    id: 'MEAS',
    name: 'McCormick School of Engineering and Applied Science',
    term: '4720',
  }];

  const getComponent = wrapperCreator(UnstyledSchools, undefined, styles);

  beforeEach(() => {
    mockUseSelector(testSchools, false);
  });

  it('renders correctly', () => {
    const wrapper = getComponent();

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('renders loading correctly', () => {
    mockUseSelector(testSchools, true);
    const wrapper = getComponent();

    expect(wrapper.get(0)).toMatchSnapshot();
  });

  it('showSubjects gets called correctly', () => {
    const mockDispatch = mockUseDispatch();
    const wrapper = getComponent();

    wrapper.find(ListItem).first().simulate('click');

    expect(mockDispatch).toHaveBeenCalledWith(fetchSubjectsRequest(testSchools[0].id));
    expect(mockDispatch).toHaveBeenCalledWith(selectSchoolInBrowse(testSchools[0].id));
    expect(mockDispatch).toHaveBeenCalledWith(changeBrowseLevel('subject'));
  });
});
