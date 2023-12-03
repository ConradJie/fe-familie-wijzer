import './Home.css';
import logo from '../../assets/familiewijzer.svg';

function Home() {

    const role = localStorage.getItem('role');
    if (role) {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.reload(false);
    }

    return (
        <main className="outer-content-container section-home-branding">
            <figure>
                <img src={logo} alt="Familie Wijzer"/>
            </figure>
            <div className="inner-content-containerr">
                <h1>Familie Wijzer</h1>
                <p>Wordt wijzer over je familie door je familie beter te leren kennen.</p>
            </div>
        </main>
    );
}

export default Home;