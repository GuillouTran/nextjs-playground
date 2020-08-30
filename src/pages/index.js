import Layout from '../components/Layout';
import NowPlaying from '../components/NowPlaying';
import TopTracks from '../components/TopTracks';

function HomePage() {
  return (<><Layout secondaryPage><br /><br /><NowPlaying /><TopTracks />
          </Layout>
    </>);
}

export default HomePage;
