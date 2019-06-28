const reactRedux = jest.genMockFromModule('react-redux');
const { connect } = jest.requireActual('react-redux');

reactRedux.connect = connect;

module.exports = reactRedux;
