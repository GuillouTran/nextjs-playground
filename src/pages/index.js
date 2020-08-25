import Layout from "../components/Layout";
import Unsplash from "../components/metrics/Unsplash";
import NowPlaying from "../components/NowPlaying";
import TopTracks from "../components/TopTracks";

function HomePage() {
  return (<><Layout secondaryPage><br /><br /><NowPlaying /><TopTracks />
          <Unsplash /></Layout>
    </>);
}

export default HomePage;
