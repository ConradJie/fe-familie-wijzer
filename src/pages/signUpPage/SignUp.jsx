import './SignUp.css';
import {Link} from "react-router-dom";

function SignIn() {
    return (
        <main className="section-signup">
            <h2>Registreren</h2>
            <p>
                Deze site is alleen toegankelijk voor familieleden.
                Meld je aan door een e-mail te sturen naar
                <Link to="mailto:registratie@famliewijzer.nl"> registratie@famliewijzer.nl </Link>,
                dan wordt er zo spoedig mogelijk contact met je opgenomen.
            </p>
        </main>
    )
}

export default SignIn;