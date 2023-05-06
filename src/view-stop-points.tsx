import { Action, ActionPanel, Detail, Icon, List } from "@raycast/api";
import { useEffect, useState } from "react";
import { getStopPoints } from "./lib/api";
import { StopPoint } from "./lib/types";

export default function ViewStopPoints() {
  const [stopPoints, setStopPoints] = useState<StopPoint[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedPoint, setPoint] = useState<string>("");

  const isLoading = stopPoints.length === 0;
  const filteredStopPoints = stopPoints.filter(point => point.commonName.toLowerCase().includes(searchTerm.toLowerCase()));
  const showList = !isLoading && searchTerm !== "";

  useEffect(() => {
    getStopPoints()
      .then(setStopPoints)
      .catch(console.error)
  }, []);

  return (
    <List
      searchBarPlaceholder={`Search for a stop point`}
      onSearchTextChange={setSearchTerm}
      isLoading={isLoading}>
      {showList &&
        filteredStopPoints.map(point => (
          <List.Item
            key={point.commonName}
            title={point.commonName}
            subtitle={point.id}
            icon={Icon.Geopin}
            keywords={[point.commonName]}
            accessories={
              [
                {
                  tooltip: "View lines",
                  icon: Icon.ArrowRight,
                }
              ]
            }
            actions={
              <ActionPanel>
                <Action.Push
                  title="Select"
                  icon={Icon.ArrowRight}
                  target={
                    <List>
                      {point.lines.map(line => (
                        <List.Item
                          title={line.name}
                          subtitle={line.commonName}
                          icon={Icon.Map}
                          keywords={[line.id, line.name]}
                          accessories={[
                            {
                              text: line.status
                            }
                          ]}
                          key={line.id}
                        />
                      ))}
                    </List>
                  }
                />
              </ActionPanel>
            }
          />
        ))
      }
      {!showList &&
        <List.EmptyView
          title="Start typing"
          description="Search for any stop point to get started"
          icon={Icon.MagnifyingGlass}
        />
      }
    </List>
  )
}
