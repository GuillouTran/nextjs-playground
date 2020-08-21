import TopTracks from "../components/TopTracks";
import NowPlaying from "../components/NowPlaying";
import Unsplash from "../components/metrics/Unsplash";
import Layout from "../components/Layout";

function HomePage() {
  return (
    <>
      <Layout secondaryPage>
        <br />
        <br />
        <NowPlaying />
        <TopTracks />
        <Unsplash />
      </Layout>
    </>
  );
}

export default HomePage;
