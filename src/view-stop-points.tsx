import { Detail, Icon, List } from "@raycast/api";
import { useEffect, useState } from "react";
import { filterStopPoints, getStopPoints } from "./lib/stopPoints";
import { StopPoint } from "./lib/types";

export default function ViewStopPoints() {
  const [stopPoints, setStopPoints] = useState<StopPoint[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const filteredStopPoints = stopPoints.filter(point => point.commonName.includes(searchTerm) || point.commonName.startsWith(searchTerm))

  const isLoading = stopPoints.length === 0;
  const showList = !isLoading && searchTerm !== "";

  useEffect(() => {
    getStopPoints()
      .then(setStopPoints)
      .catch(console.error)
  }, []);

  return (
    <List
      searchText={searchTerm}
      onSearchTextChange={setSearchTerm}
      isLoading={isLoading}>
      {showList &&
        filteredStopPoints.map(point => (
          <List.Item
            title={point.commonName}
            icon={Icon.Geopin}
          />
        ))
      }
      <List.EmptyView
        title="Start typing"
        description="Search for any stop point to get started"
        icon={Icon.MagnifyingGlass}
      />
    </List>
  )
}
