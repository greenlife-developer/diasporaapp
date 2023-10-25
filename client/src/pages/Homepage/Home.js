import { Footer } from 'antd/es/layout/layout';
import Banner from '../../components/Banner/Banner';
import Header from '../../components/Header/Header';
import Register from '../../components/Register/Register';

const Home = () => {
  return (
    <section>
        <Header />
        <Banner />
        <Register />
        <Footer />
    </section>
  );
};

export default Home;
