import React from 'react';
import { shallow } from 'enzyme';
import { useSelector } from 'react-redux';
import DCASimulator from './DCASimulator';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('DCASimulator Component', () => {
  it('renders without crashing', () => {
    useSelector.mockReturnValue({});
    const wrapper = shallow(<DCASimulator />);
    expect(wrapper.exists()).toBe(true);
  });

  it('renders all child components', () => {
    useSelector.mockReturnValue({});
    const wrapper = shallow(<DCASimulator />);
    expect(wrapper.find('Statistics').length).toBe(1);
    expect(wrapper.find('Form').length).toBe(1);
    expect(wrapper.find('Chart').length).toBe(1);
    expect(wrapper.find('InvestmentTable').length).toBe(1);
  });
});
