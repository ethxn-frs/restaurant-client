import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import NotFound from '../../Components/NotFound/NotFound';

const NotFoundPage: React.FC = () => {
    return (
        <div>
            <Header title={`Error 404`} subtitle="page not found" />
            <NotFound />
            <Footer />
        </div>
    );
};

export default NotFoundPage;