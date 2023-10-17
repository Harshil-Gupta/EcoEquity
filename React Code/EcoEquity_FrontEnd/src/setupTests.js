// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import EnzymeAdapater from '@cfaester/enzyme-adapter-react-18';
import Enzyme, { shallow } from 'enzyme';
import serializer from "enzyme-to-json/serializer";
expect.addSnapshotSerializer(serializer);
Enzyme.configure({ adapter: new EnzymeAdapater() })
