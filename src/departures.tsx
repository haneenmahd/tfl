import { Detail } from "@raycast/api";
import StopPoints from "./components/points";

export default function Command() {
    return (
        <StopPoints onSelectPoint={points => <Detail markdown={`
            ${points.commonName}
        `} />} />
    );
}