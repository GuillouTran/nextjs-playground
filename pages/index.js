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
        <Unsplash />
        <TopTracks />
        <NowPlaying />
      </Layout>
    </>
  );
}

export default HomePage;
