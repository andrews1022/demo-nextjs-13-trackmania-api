import { headers } from "next/headers";
import type { TrackmaniaTrack } from "@/types/trackmania";

const getMapInfo = async (): Promise<TrackmaniaTrack> => {
  const mapUId = "7hk8IflYsbMbpJv2gyYzx48Zvt7";
  const url = `https://live-services.trackmania.nadeo.live/api/token/map/${mapUId}`;

  const auth = headers().get("Authorization") || "";

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth
    }
  });

  if (!res.ok) {
    const text = await res.text(); // get the response body for more information

    throw new Error(`
      Failed to fetch data
      Status: ${res.status}
      Response: ${text}
    `);
  }

  return res.json();
};

const HomePage = async () => {
  const mapInfo = await getMapInfo();

  console.log("mapInfo: ", mapInfo);

  return (
    <div>
      <h1 className="text-4xl">Home Page</h1>

      <p>Track name: {mapInfo.name}</p>
    </div>
  );
};

export default HomePage;
