import { create } from "react-test-renderer";
import ProfileStatus from "../components/Profile/ProfileInfo/ProfileStatus";
import {updateStatus} from "../redux/profile-reducer";
import TestRenderer from 'react-test-renderer';

describe("ProfileStatus component", () => {
    test("status from props should be in the state", () => {
        const component = TestRenderer.create(<ProfileStatus status='it-kamasutra' updateStatus={updateStatus}/>);
        const instance = component.getInstance();
        expect(instance?.props.status).toBe('it-kamasutra');
    });
    test("after creation span should be displayed", () => {
        const component = create(<ProfileStatus status='it-kamasutra'  updateStatus={updateStatus}/>);
        const root = component.root;
        const span = root.findByType("span");
        expect(span).not.toBeNull();
    });
    test("after creation input shouldn't be displayed", () => {
        const component = create(<ProfileStatus status='it-kamasutra'  updateStatus={updateStatus}/>);
        const root = component.root;
        expect(()=>{
            const input = root.findByType("input");
        }).toThrow();
    });
    test("status from props should contains correct status", () => {
        const component = create(<ProfileStatus status='it-kamasutra'  updateStatus={updateStatus}/>);
        const root = component.root;
        const span = root.findByType("span");
        expect(span.children[0]).toBe("it-kamasutra");
    });
    test("input should be displayed in editMode instead of span", () => {
        const component = create(<ProfileStatus status='it-kamasutra'  updateStatus={updateStatus}/>);
        const root = component.root;
        const span = root.findByType("span");
        span.props.onDoubleClick()
        const input = root.findByType("input");
        expect(input.props.value).toBe("it-kamasutra")
        expect(()=>{
            const span = root.findByType("span");
        }).toThrow();
    });
    test("callback should be called", () => {
        const mockCallback = jest.fn();
        const component = TestRenderer.create(<ProfileStatus status='it-kamasutra' updateStatus={updateStatus}/>);
        const instance = component.getInstance();
        instance?.props.deactivateMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
});