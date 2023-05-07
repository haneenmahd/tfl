import { Icon, List } from "@raycast/api";
import { ReactNode, useEffect, useState } from "react";
import { getStopPoints } from "../lib/api";
import { StopPoint } from "../types";
import Point from "./point";
import useSWR from "swr"
import { addStopPointToFavorites, getFavoriteStopPoints, removeStopPointFromFavorites } from "../lib/points";

interface PointsProps {
    onSelectPoint: (stopPoint: StopPoint) => ReactNode;
}

export default function Points({ onSelectPoint }: PointsProps) {
    const [stopPoints, setStopPoints] = useState<StopPoint[]>([]);
    const [search, setSearch] = useState<string>("");

    const loadStopPoints = async () => {
        const data = await getStopPoints();
        setStopPoints(data);
    }

    useEffect(() => {
        loadStopPoints();
    }, []);

    const {
        data: favouriteStopPoints,
        mutate
    } = useSWR('favourite-stop-points', getFavoriteStopPoints);

    const handleToggleFavourite = async (stopPoint: StopPoint) => {
        const isFavourite = favouriteStopPoints?.some(({ naptanId }) => naptanId === stopPoint.naptanId);

        if (isFavourite) {
            await removeStopPointFromFavorites(stopPoint);
        } else {
            await addStopPointToFavorites(stopPoint);
        }

        mutate();
    }

    return (
        <List
            isLoading={stopPoints.length === 0}
            navigationTitle="Stop Points"
            onSearchTextChange={setSearch}
            throttle
        >
            {stopPoints
                .filter(point => point.commonName.toLowerCase().includes(search.toLowerCase()))
                .map(point => {
                    const isFavorite = favouriteStopPoints?.some(({ naptanId }) => naptanId === point.naptanId);

                    return (
                        <Point
                            isFavorite={isFavorite}
                            onSelect={onSelectPoint}
                            onToggleFavorite={() => handleToggleFavourite(point)}
                            stopPoint={point}
                            key={[point.name, point.commonName, point.naptanId].join("-")}
                        />
                    )
                })}

            <List.EmptyView
                icon={Icon.MagnifyingGlass}
                title="Start typing"
                description="Search for a stop point"
            />
        </List>
    );
}